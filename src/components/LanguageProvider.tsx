"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "si";

const translations = {
  en: {
    // Navbar
    home: "Home",
    brand: "Applied Maths",
    courses: "Courses",
    about: "About",
    dashboard: "Dashboard",
    signOut: "Sign out",
    logIn: "Log in",
    signUp: "Sign up",
    // Home Hero
    masterAL: "Master A/L",
    appliedMathematics: "Applied Mathematics",
    heroDesc: "Join Dulana Chathurma's exclusive online platform designed to transform your understanding of physics and mathematics for the Sri Lankan A/L examinations.",
    exploreCourses: "Explore Courses",
    joinForFree: "Join for Free",
    // Home Stats
    videoLessons: "Video Lessons",
    targetBatch: "Target Batch",
    accessToResources: "Access to Resources",
    // Footer
    quickLinks: "Quick Links",
    footerAbout: "About",
    registerForFree: "Register for Free",
    testPapers: "Test Papers",
    contact: "Contact",

    getStarted: "Get Started",
    getAccess: "Get access to every video now!",
    registerNow: "Register Now for Free",
    desktopShortcut: "Desktop Shortcut",
    stayConnected: "Stay Connected",
    poweredBy: "Powered by appliedmaths.lk. All rights reserved 2026.",
  },
  si: {
    // Navbar
    home: "මුල් පිටුව",
    brand: "ව්‍යවහාරික ගණිතය",
    courses: "පාඨමාලා",
    about: "ගැන",
    dashboard: "පාලක පුවරුව",
    signOut: "ඉවත් වන්න",
    logIn: "ඇතුල් වන්න",
    signUp: "ලියාපදිංචි වන්න",
    // Home Hero
    masterAL: "උසස් පෙළ",
    appliedMathematics: "ව්‍යවහාරික ගණිතය ජයගන්න",
    heroDesc: "ශ්‍රී ලංකා උසස් පෙළ විභාගය සඳහා භෞතික විද්‍යාව සහ ගණිතය පිළිබඳ ඔබේ අවබෝධය පරිවර්තනය කිරීමට සැලසුම් කර ඇති දුලාන චතුර්මගේ සුවිශේෂී මාර්ගගත වේදිකාවට සම්බන්ධ වන්න.",
    exploreCourses: "පාඨමාලා සොයන්න",
    joinForFree: "නොමිලේ සම්බන්ධ වන්න",
    // Home Stats
    videoLessons: "වීඩියෝ පාඩම්",
    targetBatch: "ඉලක්ක කණ්ඩායම",
    accessToResources: "සම්පත් සඳහා ප්‍රවේශය",
    // Footer
    quickLinks: "ඉක්මන් සබැඳි",
    footerAbout: "අප ගැන",
    registerForFree: "නොමිලේ ලියාපදිංචි වන්න",
    testPapers: "ප්‍රශ්න පත්‍ර",
    contact: "සම්බන්ධ වන්න",

    getStarted: "ආරම්භ කරන්න",
    getAccess: "සෑම වීඩියෝවක්ම දැන්ම නරඹන්න!",
    registerNow: "දැන්ම නොමිලේ ලියාපදිංචි වන්න",
    desktopShortcut: "ඩෙස්ක්ටොප් කෙටිමඟ",
    stayConnected: "රැඳී සිටින්න",
    poweredBy: "appliedmaths.lk බලගැන්වීමකි. සියලුම හිමිකම් ඇවිරිණි 2026.",
  },
};

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "si")) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: TranslationKey): string => {
    if (!mounted) return translations.en[key] || key;
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
