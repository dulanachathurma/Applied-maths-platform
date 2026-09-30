"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [alYear, setAlYear] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch profile data directly from Database
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.contactNumber) setContactNumber(data.contactNumber);
        if (data.homeAddress) setHomeAddress(data.homeAddress);
        if (data.district) setDistrict(data.district);
        if (data.schoolName) setSchoolName(data.schoolName);
        if (data.alYear) setAlYear(data.alYear);
        if (data.image) setImage(data.image);
      })
      .catch(() => {
        if (session?.user) {
          setName(session.user.name || "");
          setEmail(session.user.email || "");
          setImage(session.user.image || "");
        }
      });
  }, [session]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("File size must be under 5MB");
        return;
      }
      setMessage("");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image); // Instant local preview update
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, contactNumber, homeAddress, district, schoolName, alYear }),
    });

    if (res.ok) {
      setMessage("Profile updated successfully!");
      await update({ name, image });
    } else {
      setMessage("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 flex justify-center items-start">
      <div className="bg-white border-t-4 border-blue-600 shadow-md p-8 rounded-xl w-full max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">My Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-3xl font-bold text-slate-400 relative">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              name.charAt(0).toUpperCase() || "U"
            )}
          </div>
        </div>

        {message && <p className="text-sm text-blue-600 font-medium mb-4 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Username</label>
            <input
              type="text"
              value={name}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-600 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Username cannot be changed.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Phone</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="076 757 4844"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Address</label>
            <textarea
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Beliatta, Southern Province"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your District"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your School"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">A/L Year</label>
            <input
              type="text"
              value={alYear}
              onChange={(e) => setAlYear(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2026 A/L"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-32 py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-sm"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
