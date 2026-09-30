"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "../LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data?.image) setUserImage(data.image);
          if (data?.name) setUserName(data.name);
        })
        .catch(() => {
          if (session.user?.image) setUserImage(session.user.image ?? "");
          if (session.user?.name) setUserName(session.user.name ?? "");
        });
    }
  }, [session]);

  const changeLanguage = (lang: "en" | "si") => {
    setLanguage(lang);
    setLangDropdown(false);
  };

  const isAdmin = (session?.user as any)?.role === "admin";
  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/student";

  const navLinks = [
    { name: language === "si" ? "මුල් පිටුව" : "Home", href: "/" },
    { name: language === "si" ? "පාඨමාලා" : "Courses", href: "/courses" },
    { name: language === "si" ? "අප ගැන" : "About", href: "/about" },
    { name: language === "si" ? "සම්බන්ධ වන්න" : "Contact", href: "/contact" },
    { name: language === "si" ? "ගෙවීම්" : "Pricing", href: "/payment" },
  ];

  return (
    <nav className="w-full bg-[#0a192f] border-b border-gray-800 shadow-sm px-6 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center py-1">
        <img
          src="/nav-logo.jpg"
          alt="දුලන චතුර්ම Logo"
          className="h-14 w-auto object-contain"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors pb-0.5 ${
                isActive
                  ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Language Toggle */}
        <div className="relative">
          <button
            onClick={() => setLangDropdown(!langDropdown)}
            className="flex items-center space-x-1 text-slate-300 hover:text-white font-semibold text-xs uppercase"
          >
            <span className="text-sm">🌐</span>
            <span>{language === "si" ? "සිංහල" : "ENGLISH"}</span>
            <span className="text-[10px]">∨</span>
          </button>
          {langDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg py-2 text-xs z-50">
              <button
                onClick={() => changeLanguage("en")}
                className={`w-full text-left px-4 py-1.5 font-medium ${language === "en" ? "text-amber-500 font-bold bg-amber-50" : "text-slate-700 hover:bg-gray-50"}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("si")}
                className={`w-full text-left px-4 py-1.5 font-medium ${language === "si" ? "text-amber-500 font-bold bg-amber-50" : "text-slate-700 hover:bg-gray-50"}`}
              >
                සිංහල
              </button>
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        {session ? (
          <div className="flex items-center space-x-3">
            <Link
              href={dashboardPath}
              className="flex items-center space-x-2 bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-700 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-amber-200 border border-amber-400 overflow-hidden flex items-center justify-center shrink-0">
                {userImage ? (
                  <img src={userImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[9px] font-bold text-amber-800">{userName?.charAt(0) || "U"}</span>
                )}
              </div>
              <span>{language === "si" ? "පාලක පුවරුව" : "Dashboard"}</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
            >
              {language === "si" ? "ඉවත් වන්න" : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-slate-300 hover:text-white text-xs font-medium">
              {language === "si" ? "ඇතුළු වන්න" : "Log in"}
            </Link>
            <Link
              href="/register"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm"
            >
              {language === "si" ? "ලියාපදිංචි වන්න" : "Sign up"}
            </Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md px-6 py-4 flex flex-col space-y-3 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium py-1 ${pathname === link.href ? "text-amber-500 font-bold" : "text-slate-700"}`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-200" />
          {session ? (
            <>
              <Link href={dashboardPath} onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-amber-600">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-red-600 font-semibold text-left">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm text-slate-700 font-medium">Log in</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="text-sm text-amber-600 font-bold">Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
