"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data?.image) setUserImage(data.image);
        if (data?.name) setUserName(data.name);
      })
      .catch(() => {
        if (session?.user?.image) setUserImage(session.user.image);
        if (session?.user?.name) setUserName(session.user.name);
      });
  }, [session, pathname]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-amber-500">Student Portal</h2>
            <p className="text-xs text-slate-400">Learn at your own pace</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard/student"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/dashboard/student"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <span className="text-lg">📚</span> My Courses
            </Link>

            <Link
              href="/dashboard/student/profile"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/dashboard/student/profile"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-amber-500 overflow-hidden flex items-center justify-center shrink-0">
                {userImage ? (
                  <img src={userImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold">{userName?.charAt(0) || "U"}</span>
                )}
              </div>
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link href="/api/auth/signout" className="text-xs text-rose-400 hover:underline">
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
