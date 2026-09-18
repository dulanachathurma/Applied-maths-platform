"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/dashboard/student");
      return;
    }

    // Fetch profile from DB
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data?.image) setUserImage(data.image);
        if (data?.name) setUserName(data.name);
      })
      .catch(() => {
        if (session?.user?.name) setUserName(session.user.name);
        if (session?.user?.image) setUserImage(session.user.image || "");
      });
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm animate-pulse-soft">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard/admin", icon: "📊", emoji: true },
    { name: "Courses", href: "/dashboard/admin/courses", icon: "📚", emoji: true },
    { name: "Profile", href: "/dashboard/admin/profile", icon: "👤", emoji: true },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-[280px] min-h-screen
        bg-gradient-to-b from-[#0f1629] via-[#0c1220] to-[#080d18]
        border-r border-white/5
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 animate-fade-in-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-amber-500/20">
              A
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Admin Portal</h2>
              <p className="text-[11px] text-slate-500 font-medium">Platform Management</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 py-5">
          <div className="glass-card rounded-2xl p-4 animate-fade-in-up delay-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/50 overflow-hidden flex items-center justify-center shrink-0 animate-pulse-glow">
                {userImage ? (
                  <img src={userImage} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-amber-400">{userName?.charAt(0) || "A"}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{userName}</p>
                <p className="text-[11px] text-amber-400/70 font-medium">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 animate-fade-in-left
                  ${isActive
                    ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/5"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
                style={{ animationDelay: `${(i + 2) * 100}ms` }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
          >
            <span className="text-lg">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0e1a]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span>🏠</span>
            <span>/</span>
            <span className="text-white font-medium">Admin</span>
            <span>/</span>
            <span className="text-amber-400 font-medium capitalize">
              {pathname.split("/").pop() || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              ← Main Website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
