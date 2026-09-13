"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12 px-4 transition-colors duration-400">
      <div 
        style={{ backgroundColor: "#333a46" }} 
        className="w-full max-w-xl p-8 sm:p-10 text-white rounded-none shadow-2xl border border-slate-700/50"
      >
        <h1 className="text-3xl font-normal text-white mb-6">
          Create an Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-xs text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Home Address</label>
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                required
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm focus:outline-none"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">School Name</label>
              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                required
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">A/L Year</label>
              <select
                name="alYear"
                value={formData.alYear}
                onChange={handleChange}
                className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm focus:outline-none"
              >
                {alYears.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white text-slate-900 rounded px-3.5 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffc107] hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded transition-colors text-sm shadow mt-2"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  );
}