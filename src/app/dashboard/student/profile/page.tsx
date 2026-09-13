"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch profile data directly from Database
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setName(data.name);
        if (data.image) setImage(data.image);
      })
      .catch(() => {
        if (session?.user) {
          setName(session.user.name || "");
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
      body: JSON.stringify({ name, image }),
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
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-6">User Profile Settings</h1>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-xl space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-amber-500 overflow-hidden flex items-center justify-center text-2xl font-bold relative">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              name.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name || "User"}</h3>
            <p className="text-xs text-slate-400">{session?.user?.email}</p>
          </div>
        </div>

        {message && <p className="text-xs text-amber-400 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
