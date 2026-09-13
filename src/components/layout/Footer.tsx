"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [lang, setLang] = useState("ENGLISH");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") || "ENGLISH";
    setLang(savedLang);

    const handleLangChange = () => {
      const updatedLang = localStorage.getItem("app_lang") || "ENGLISH";
      setLang(updatedLang);
    };

    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  const isSin = lang === "සිංහල";

  return (
    <footer style={{ backgroundColor: "#000000", color: "#ffffff" }} className="w-full mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Brand Logo */}
        <div className="flex items-start">
          <img 
            src="/nav-logo.jpg" 
            alt="දුලන චතුර්ම Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-4 tracking-wide">
            {isSin ? "ඉක්මන් සබැඳි" : "Quick Links"}
          </h3>
          <ul className="space-y-3 text-base font-medium" style={{ color: "#e2e8f0" }}>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition-colors">
                {isSin ? "අප ගැන" : "About"}
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-amber-400 transition-colors">
                {isSin ? "නොමිලේ ලියාපදිංචි වන්න" : "Register for Free"}
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-amber-400 transition-colors">
                {isSin ? "පාඨමාලා" : "Courses"}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition-colors">
                {isSin ? "සම්බන්ධ වන්න" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Started */}
        <div>
          <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-3 border-b border-gray-800 pb-2 tracking-wide">
            {isSin ? "ආරම්භ කරන්න" : "Get Started"}
          </h3>
          <div 
            style={{ color: "#ffffff", opacity: 1 }} 
            className="text-base font-bold mb-4 tracking-wide"
          >
            {isSin ? "සෑම වීඩියෝවකටම දැන්ම පිවිසෙන්න!" : "Get access to every video now!"}
          </div>
          <div className="space-y-3.5">
            <Link 
              href="/register" 
              className="block text-center w-full bg-[#facc15] hover:bg-yellow-400 text-black text-sm font-bold py-3 px-4 rounded-xl transition-colors shadow-lg"
            >
              {isSin ? "දැන්ම නොමිලේ ලියාපදිංචි වන්න" : "Register Now for Free"}
            </Link>
            <button 
              className="w-full bg-[#facc15] hover:bg-yellow-400 text-black text-sm font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span className="text-sm">⤓</span>
              <span>{isSin ? "ඩෙස්ක්ටොප් සෝට්කට්" : "Desktop Shortcut"}</span>
            </button>
          </div>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-4 border-b border-gray-800 pb-2 tracking-wide">
            {isSin ? "අප හා එක්වන්න" : "Stay Connected"}
          </h3>
          <div className="flex space-x-4 items-center">
            <a 
              href="#" 
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-400 transition-colors shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="#" 
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-400 transition-colors shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Yellow Bottom Copyright Bar */}
      <div className="w-full bg-[#facc15] text-black py-4 text-center text-sm font-bold rounded-b-2xl">
        {isSin 
          ? "dulanaapplied.lk මගින් බලගන්වන ලදී. සියලුම හිමිකම් ඇවිරිණි 2026." 
          : "Powered by dulanaapplied.lk. All rights reserved 2026."}
      </div>
    </footer>
  );
}
