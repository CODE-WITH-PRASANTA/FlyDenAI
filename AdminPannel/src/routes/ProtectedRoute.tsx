import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

// cookie helper
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.*+?^=!:${}()|[\]\\/\\])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getCookie("fd_token");
  const expiry = getCookie("fd_token_expiry");

  // if missing or expired -> redirect to signin
  if (!token || !expiry || Date.now() > Number(expiry)) {
    // attempt to clean cookie values by expiring them (best-effort)
    try {
      document.cookie = "fd_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
      document.cookie = "fd_token_expiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
    } catch (e) {
      // ignore
    }

    try {
      localStorage.removeItem("fd_token");
      localStorage.removeItem("fd_token_expiry");
      localStorage.removeItem("isLoggedIn");
    } catch (e) {
      // ignore
    }

    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
