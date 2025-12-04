import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import logo from '../../../src/Asserts/Logo.png';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="relative flex flex-col lg:flex-row items-stretch min-h-screen">

        {/* Left / Visual Panel (premium look) */}
        <aside className="relative hidden lg:flex w-1/2 items-center justify-center bg-[linear-gradient(135deg,#0f172a_0%,#0b1220_60%)] dark:bg-none overflow-hidden">
          {/* Decorative animated or static shapes */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
                <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="50" />
                </filter>
              </defs>
              <g filter="url(#blur)">
                <circle cx="160" cy="120" r="160" fill="url(#g1)" />
                <circle cx="620" cy="560" r="220" fill="#111827" fillOpacity="0.18" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-xs p-8">
            <Link to="/" className="block mb-4 transform-gpu transition-transform hover:scale-105">
              <img width={231} height={48} src={logo} alt="Logo" />
            </Link>
            <h2 className="text-white text-2xl font-semibold tracking-tight mb-2">Welcome to the Admin Panel</h2>
            <p className="text-slate-200 text-sm mb-6">A premium, secure interface to manage your application with confidence.</p>

            

            {/* Grid shape sitting behind the card for visual depth */}
            <div className="absolute -bottom-10 right-8 opacity-40 w-72 h-72">
              <GridShape />
            </div>
          </div>
        </aside>

        {/* Right / Form area (keeps same children but restyled container) */}
        <main className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:w-1/2">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            {/* Premium card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">

              {/* subtle top gradient stripe */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

              {/* content area: keep children as-is but place them inside a roomy padded area */}
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access your account</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to continue to the admin dashboard</p>
                  </div>

                  
                </div>

                <div className="mt-6">
                  {/* This is where the original children (form, etc.) will render. We do not change children. */}
                  {children}
                </div>

               
              </div>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  );
}
