"use client";

import { useSession } from "next-auth/react";
import StudentCoursesPage from "@/app/student/courses/page";

export default function DashboardPage() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  if (isAdmin) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold">Welcome Admin</h1>
        <p className="text-slate-400">Go to Manage Courses to add/delete videos.</p>
      </div>
    );
  }

  return <StudentCoursesPage />;
}
