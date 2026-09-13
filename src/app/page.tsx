import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-amber-400 mb-4">
        A/L Applied Mathematics Platform
      </h1>
      <p className="text-slate-300 max-w-md mb-8">
        Welcome to the premium learning portal. Access lessons, revision modules, and theory classes.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors"
        >
          Student Login
        </Link>
        <Link
          href="/dashboard/student"
          className="border border-slate-700 bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
        >
          View Dashboard
        </Link>
      </div>
    </main>
  );
}