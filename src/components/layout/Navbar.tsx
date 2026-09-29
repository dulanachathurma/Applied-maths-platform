"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useLanguage } from "../LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [langDropdown, setLangDropdown] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (session?.user) {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data?.image) setUserImage(data.image);
          if (data?.name) setUserName(data.name);
        })
        .catch(() => {
          if (session.user?.image) setUserImage(session.user.image);
          if (session.user?.name) setUserName(session.user.name);
        });
    }
  }, [session]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    <nav className="w-full bg-black text-white px-8 py-2 flex items-center justify-between sticky top-0 z-50 border-b border-neutral-900">
      <Link href="/" className="flex items-center py-1">
        <img 
          src="/nav-logo.jpg" 
          alt="දුලන චතුර්ම Logo" 
          className="h-14 w-auto object-contain"
        />
      </Link>

      <div className="flex items-center space-x-7 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors pb-0.5 ${
                isActive
                  ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        <div className="relative">
          <button
            onClick={() => setLangDropdown(!langDropdown)}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-400 font-semibold text-xs uppercase"
          >
            <span className="text-sm">🌐</span>
            <span>{language === "si" ? "සිංහල" : "ENGLISH"}</span>
            <span className="text-[10px]">∨</span>
          </button>
          {langDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-[#141b2d] border border-slate-800 rounded-xl shadow-2xl py-2 text-xs z-50">
              <button 
                onClick={() => changeLanguage("en")}
                className={`w-full text-left px-4 py-1.5 font-medium ${language === "en" ? "text-amber-400 font-bold bg-slate-800/80" : "text-white hover:bg-slate-800/60"}`}
              >
                English
              </button>
              <button 
                onClick={() => changeLanguage("si")}
                className={`w-full text-left px-4 py-1.5 font-medium ${language === "si" ? "text-amber-400 font-bold bg-slate-800/80" : "text-gray-300 hover:bg-slate-800/60"}`}
              >
                සිංහල
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Blue Theme Toggle Icon */}
        <button 
          onClick={toggleTheme}
          title="Toggle Light / Dark Mode"
          className="text-blue-400 hover:text-blue-300 text-lg transition-transform active:scale-90"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {session ? (
          <div className="flex items-center space-x-3">
            <Link
              href={dashboardPath}
              className="flex items-center space-x-2 bg-[#090d16] border border-[#1e293b] hover:border-amber-500/50 text-amber-400 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-amber-400 overflow-hidden flex items-center justify-center shrink-0">
                {userImage ? (
                  <img src={userImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[9px] font-bold text-white">{userName?.charAt(0) || "U"}</span>
                )}
              </div>
              <span>{language === "si" ? "පාලක පුවරුව" : "Dashboard"}</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-[#381114] text-red-400 hover:bg-red-900/80 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
            >
              {language === "si" ? "ඉවත් වන්න" : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-gray-300 hover:text-white text-xs font-medium">Log in</Link>
            <Link href="/register" className="bg-amber-500 hover:bg-amber-400 text-black px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
