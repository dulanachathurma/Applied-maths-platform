"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-black text-white">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out pointer-events-none ${
              currentSlide === index ? "opacity-60 scale-105" : "opacity-0 scale-100"
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(9,13,22,0.85)), url("${slide.image}")`,
              transitionProperty: "opacity, transform",
              transitionDuration: "1000ms"
            }}
          />
        ))}

        <div className="absolute inset-0 z-0 bg-radial from-amber-500/10 via-transparent to-black pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#1c160c] border border-amber-500/50 text-amber-400 px-5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-lg shadow-amber-500/10">
            <span>★ Sri Lanka's #1 A/L Applied Maths Platform</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-2 drop-shadow-lg">
            <span className="text-white block">Master A/L</span>
            <span className="text-[#facc15] block mt-1">Applied Mathematics</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-200 mt-6 mb-8 leading-relaxed font-normal drop-shadow">
            Join Dulana Chathurma's exclusive online platform designed to transform your understanding of physics and mathematics for the Sri Lankan A/L examinations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
            <Link 
              href="/courses" 
              className="w-full sm:w-auto bg-[#facc15] hover:bg-amber-400 text-black px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Explore Courses ›
            </Link>

            <Link 
              href="/register" 
              className="w-full sm:w-auto bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700 px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:border-gray-500"
            >
              Join for Free
            </Link>
          </div>

          <div className="flex items-center space-x-2.5 bg-black/80 border border-neutral-800 px-4 py-2 rounded-full backdrop-blur-md">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentSlide === index 
                    ? "w-8 bg-[#facc15]" 
                    : "w-2.5 bg-gray-500 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About The Teacher Section - Slightly Increased Font Sizes */}
      <section className="w-full bg-white py-24 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-50 shrink-0">
                <img 
                  src="/instructor2.jpg" 
                  alt="Dulana Chathurma" 
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="inline-block bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Instructor & Educator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About The Educator
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              Combining a deep-rooted passion for analytical problem solving with modern software engineering methodologies, I specialize in simplifying complex Applied Mathematics and Physics concepts for Advanced Level students across Sri Lanka. My goal is to bridge theoretical knowledge with logical application, empowering students to build strong core fundamentals and achieve top exam performance.
            </p>
            <div className="pt-2">
              <p className="text-amber-600 font-bold italic text-lg sm:text-xl">
                ~ Dulana Chathurma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Slightly Increased Font Sizes */}
      <section className="w-full bg-slate-50 py-24 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Mathematical Mission Visual" 
                className="w-full h-72 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 z-20 text-xs font-bold text-amber-300 tracking-widest uppercase">
                EXCELLENCE & QUALITY EDUCATION
              </div>
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2 space-y-6">
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Our Purpose
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              To deliver high-caliber, accessible, and structured Combined Mathematics and Physics education to every student in Sri Lanka. We aim to dismantle traditional learning barriers by providing interactive digital lessons, comprehensive exam strategies, and affordable resources that enable students from all provinces to excel in their A/L examinations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
