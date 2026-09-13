"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid credentials");
      } else {
        router.push("/dashboard/student");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12 px-4 transition-colors duration-400">
      <div 
        style={{ backgroundColor: "#333a46" }} 
        className="w-full max-w-[420px] p-8 sm:p-10 text-white rounded-none shadow-2xl border border-slate-700/50"
      >
        <h1 className="text-3xl font-normal text-white mb-6">
          Please Log In
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-xs text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-slate-900 border-2 border-blue-500 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-slate-900 border border-gray-300 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffc107] hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded transition-colors text-sm shadow mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link
            href="/register"
            className="block text-center w-full border border-[#ffc107] text-[#ffc107] hover:bg-[#ffc107]/10 font-semibold py-3 rounded transition-colors text-sm"
          >
            Register for Free
          </Link>
        </form>

        <div className="my-6 text-center text-sm font-semibold text-white">
          OR
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard/student" })}
            className="w-full bg-white text-slate-800 font-medium py-2.5 px-4 rounded transition-colors flex items-center justify-center space-x-3 text-sm border border-gray-200 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <button
            type="button"
            className="w-full bg-[#1877f2] hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded transition-colors flex items-center justify-center space-x-3 text-sm shadow-sm"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Log in With Facebook</span>
          </button>
        </div>
      </div>
    </main>
  );
}