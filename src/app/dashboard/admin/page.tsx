"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("Admin");
  const [videoCount, setVideoCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Fetch profile
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) setUserName(data.name);
      })
      .catch(() => {});

    // Fetch video count
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVideoCount(data.length);
      })
      .catch(() => {});

    // Time update
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [
    "🎓 Welcome to Applied Maths Admin Dashboard",
    "📚 Manage your courses and lessons efficiently",
    "🎯 Track student progress and engagement",
    "💡 Upload new video lessons for students",
    "⭐ Keep your platform updated with fresh content",
    "📊 Monitor platform analytics and growth",
    "🚀 Empower students with quality education",
  ];

  const statCards = [
    {
      title: "Total Lessons",
      value: videoCount,
      icon: "📹",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/20",
      color: "text-blue-400",
    },
    {
      title: "Platform Status",
      value: "Active",
      icon: "🟢",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/20",
      color: "text-emerald-400",
    },
    {
      title: "Your Role",
      value: "Admin",
      icon: "👑",
      gradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/20",
      color: "text-amber-400",
    },
    {
      title: "Quick Access",
      value: "Courses",
      icon: "🔗",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/20",
      color: "text-purple-400",
      href: "/dashboard/admin/courses",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Marquee Ticker */}
      <div className="overflow-hidden rounded-2xl glass-card py-3 animate-fade-in-down">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-slate-300 flex items-center gap-2 shrink-0">
              {item}
              <span className="text-amber-500/50">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-amber-50 border border-slate-200 p-8 sm:p-10 shadow-sm">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <p className="text-slate-500 text-sm font-medium mb-2 animate-fade-in-up delay-100">{currentTime}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 animate-fade-in-up delay-200 text-slate-900">
              Welcome back, <span className="text-gradient">{userName}</span> 👋
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl animate-fade-in-up delay-300">
              Manage your platform, upload lessons, and keep track of your educational content from one powerful dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat, i) => {
          const CardWrapper = stat.href ? Link : "div";
          return (
            <CardWrapper
              key={stat.title}
              href={stat.href || "#"}
              className={`
                bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow
                border border-slate-200
                animate-fade-in-up
                ${stat.href ? "cursor-pointer" : ""}
              `}
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl animate-float" style={{ animationDelay: `${i * 200}ms` }}>{stat.icon}</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color} animate-count-up`}>
                {stat.value}
              </p>
            </CardWrapper>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 animate-fade-in-up delay-500">
        <Link
          href="/dashboard/admin/courses"
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 group shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              📹
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Manage Courses</h3>
              <p className="text-xs text-slate-500">Add, edit, or delete video lessons</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Upload new YouTube lessons, manage existing content, and organize your course materials for students.
          </p>
          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-bold group-hover:gap-3 transition-all">
            <span>Go to Courses</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </div>

      {/* Marquee Ticker (Reverse) */}
      <div className="overflow-hidden rounded-2xl glass-card py-3 animate-fade-in-up delay-600">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[
            "🧮 Applied Mathematics", "📐 Mechanics", "📏 Statistics",
            "🔢 Pure Mathematics", "📊 Data Analysis", "🎯 Exam Preparation",
            "💡 Problem Solving", "📝 Past Papers", "🏆 A/L Success",
            "🧮 Applied Mathematics", "📐 Mechanics", "📏 Statistics",
            "🔢 Pure Mathematics", "📊 Data Analysis", "🎯 Exam Preparation",
            "💡 Problem Solving", "📝 Past Papers", "🏆 A/L Success",
          ].map((item, i) => (
            <span key={i} className="mx-6 text-sm font-semibold text-amber-400/60 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}