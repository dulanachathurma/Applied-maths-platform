"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    homeAddress: "",
    district: "Ampara",
    schoolName: "",
    alYear: "2026 A/L",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const alYears = ["2024 A/L", "2025 A/L", "2026 A/L", "2027 A/L", "2028 A/L"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto login after registration
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (loginRes?.ok) {
          router.push("/dashboard/student");
          router.refresh();
        } else {
          // Registration ok but login failed — redirect to login
          router.push("/login");
        }
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <main className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12 px-4 bg-gradient-to-br from-amber-50 via-white to-blue-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Create Account</h1>
          <p className="text-slate-500 text-sm">Join the Applied Maths platform today</p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-sm text-center rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input type="text" name="firstName" placeholder="First Name" required
                value={formData.firstName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" required
                value={formData.lastName} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Contact + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Contact Number</label>
              <input type="tel" name="contactNumber" placeholder="07X XXX XXXX" required
                value={formData.contactNumber} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" placeholder="email@example.com" required
                value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Address + District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Home Address</label>
              <input type="text" name="homeAddress" placeholder="Your Address" required
                value={formData.homeAddress} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>District</label>
              <select name="district" value={formData.district} onChange={handleChange}
                className={inputClass}>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* School + A/L Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>School Name</label>
              <input type="text" name="schoolName" placeholder="Your School" required
                value={formData.schoolName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>A/L Year</label>
              <select name="alYear" value={formData.alYear} onChange={handleChange}
                className={inputClass}>
                {alYears.map((yr) => <option key={yr} value={yr}>{yr}</option>)}
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <input type="password" name="password" placeholder="Create a strong password" required
              value={formData.password} onChange={handleChange} className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm mt-2"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-600 hover:underline font-semibold">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  );
}