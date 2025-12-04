import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// src/icons/index.ts
import EyeIcon  from "../../icons/EyeIcon";
import EyeCloseIcon  from "../../icons/EyeCloseIcon";
// export { default as ChevronLeftIcon } from "./ChevronLeftIcon";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import BASE_URL from "../../Api";

/**
 * NOTE on security:
 * - We first try to use the browser's Credential Management API (recommended).
 * - If unavailable, we fall back to storing credentials encrypted in localStorage using Web Crypto.
 *   This fallback can be less secure than a true password manager (because the encryption key must
 *   be stored somewhere accessible to the client). I implemented a safer approach than plain text
 *   (AES-GCM), but for production prefer relying on browser password managers / Credential API and HTTPS.
 *
 * You asked explicitly for autofill on next open after signing out — this will happen because:
 * - credentials are stored on successful login with "Keep me logged in" checked,
 * - when the sign-in form mounts again, we attempt to restore and prefill email/password.
 */

const FALLBACK_KEY_NAME = "fd_saved_creds_v1"; // localStorage key for encrypted backup

// A static application secret used for fallback key derivation.
// WARNING: using a hardcoded secret in client JS is not fully secure — this is a fallback only.
// For better security in production, remove fallback and rely on Credential Management API / browser password manager.
const APP_FALLBACK_SECRET = "replace-with-your-app-specific-secret-or-make-dynamic";

async function deriveKeyFromSecret(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const salt = enc.encode("fd-app-salt-v1"); // static salt; you may change but must remain same across sessions
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

async function encryptObject(obj: object, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // AES-GCM recommended IV size
  const key = await deriveKeyFromSecret(secret);
  const plaintext = enc.encode(JSON.stringify(obj));
  const cipher = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);

  // store iv + cipher as base64 JSON
  const ivB64 = btoa(String.fromCharCode(...iv));
  const cipherB64 = btoa(String.fromCharCode(...new Uint8Array(cipher)));
  return JSON.stringify({ iv: ivB64, data: cipherB64 });
}

async function decryptObject(payload: string, secret: string): Promise<any | null> {
  try {
    const parsed = JSON.parse(payload);
    const iv = Uint8Array.from(atob(parsed.iv), (c: string) => c.charCodeAt(0));
    const cipher = Uint8Array.from(atob(parsed.data), (c: string) => c.charCodeAt(0));
    const key = await deriveKeyFromSecret(secret);
    const plain = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    const dec = new TextDecoder().decode(plain);
    return JSON.parse(dec);
  } catch (err) {
    // decryption failed or malformed data
    return null;
  }
}

export default function SignInForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Helper - Set Cookie
  const setCookie = (name: string, value: string, seconds: number) => {
    const d = new Date(Date.now() + seconds * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax;`;
  };

  // Attempt to restore credentials on mount:
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      // 1) Try Credential Management API first
      try {
        if ("credentials" in navigator) {
          const cred: any = await (navigator as any).credentials.get?.({
            password: true,
            mediation: "optional",
          });

          if (cred && !cancelled) {
            if (cred.id) setEmail(cred.id);
            if (cred.password) setPassword(cred.password);
            setIsChecked(true);
            return; // credential restored; done
          }
        }
      } catch {
        // ignore errors and try fallback
      }

      // 2) Fallback: try encrypted localStorage
      try {
        const saved = localStorage.getItem(FALLBACK_KEY_NAME);
        if (saved) {
          const restored = await decryptObject(saved, APP_FALLBACK_SECRET);
          if (restored && !cancelled) {
            if (restored.email) setEmail(restored.email);
            if (restored.password) setPassword(restored.password);
            setIsChecked(true);
            return;
          }
        }
      } catch {
        // ignore fallback errors
      }
    }

    restore();

    return () => {
      cancelled = true;
    };
  }, []);

  // -------------------------
  // ON SUBMIT
  // -------------------------
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Save token in cookie
      setCookie("fd_token", data.token, data.expiresIn);
      setCookie(
        "fd_token_expiry",
        (Date.now() + data.expiresIn * 1000).toString(),
        data.expiresIn
      );

      // Set login flag
      localStorage.setItem("isLoggedIn", "1");

      // -------------------------
      // Save credentials if "Keep me logged in" checked
      // -------------------------
      if (isChecked) {
        // 1) Try Credential Management API
        try {
          if ("credentials" in navigator) {
            // The best/standard approach: store a PasswordCredential
            // PasswordCredential constructor signature can vary; use feature-detect
            try {
              const PasswordCredConstructor = (window as any).PasswordCredential;
              if (typeof PasswordCredConstructor === "function") {
                // Some browsers accept an object
                const pc = new PasswordCredConstructor({
                  id: email,
                  password: password,
                  name: email,
                });
                await (navigator as any).credentials.store(pc);
              } else {
                // Some variants accept a FormData where keys match form fields' names
                const fd = new FormData();
                fd.append("id", email);
                fd.append("password", password);
                try {
                  const pc2 = new (window as any).PasswordCredential(fd);
                  await (navigator as any).credentials.store(pc2);
                } catch {
                  // ignore
                }
              }
            } catch {
              // ignore
            }
          }
        } catch {
          // ignore Credential API store errors and fall through to fallback
        }

        // 2) Fallback: encrypted localStorage (only if Credential API not present / store failed)
        try {
          // We still write the fallback so that users without Credential API get the autofill behavior.
          // encryptObject is asynchronous and uses Web Crypto.
          const encrypted = await encryptObject({ email, password }, APP_FALLBACK_SECRET);
          localStorage.setItem(FALLBACK_KEY_NAME, encrypted);
        } catch {
          // swallow fallback errors
        }
      } else {
        // If the user did NOT check "Keep me logged in", remove fallback storage (if any)
        try {
          localStorage.removeItem(FALLBACK_KEY_NAME);
        } catch {}
      }

      navigate("/"); // redirect to admin dashboard
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {/* FORM */}
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <div>
                <Label>Email *</Label>
                {/* Add name and autocomplete so Browser password managers can detect fields */}
                <Input
                  name="email"
                  autoComplete="username"
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="pr-12" // ensure input has right padding so icon is visible
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{ color: "#000" }} // force black color for currentColor-based svgs
                  >
                    {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
                  <span>Keep me logged in</span>
                </div>

                <Link to="#" className="text-sm text-brand-500">
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button className="w-full" size="sm" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
