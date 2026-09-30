"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="p-10 text-red-600 min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong in this page!</h2>
      <pre className="bg-red-50 p-4 rounded text-sm overflow-auto border border-red-200">
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
