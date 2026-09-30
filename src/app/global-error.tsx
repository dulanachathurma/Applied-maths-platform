"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Next.js Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="p-10 text-red-600">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
            {error.message}
          </pre>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
