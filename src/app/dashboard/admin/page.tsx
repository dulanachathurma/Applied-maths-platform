"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-6 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-blue-600 tracking-tight">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Platform Management
            </p>
          </div>

          <nav className="space-y-2">
            <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <span className="text-lg">⚙️</span>
              <span>Manage Courses</span>
            </div>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center space-x-2"
          >
            <span>← Main Website</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50 p-6 sm:p-10 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Course & Lesson Administration
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-2 font-normal">
              Upload new video materials, manage student access, and update class modules.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Upload New Lesson Material
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Lesson Title</label>
                <input
                  type="text"
                  placeholder="e.g. Newton's Laws of Motion - Theory"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">YouTube Video URL</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md text-base">
              Publish Lesson
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}