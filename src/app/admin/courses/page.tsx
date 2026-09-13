"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface VideoItem {
  _id: string;
  title: string;
  videoUrl: string;
}

export default function AdminCoursesPage() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [title, setTitle] = useState("");
  const [videoInput, setVideoInput] = useState("");

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    if (Array.isArray(data)) setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Helper function to extract YouTube Video ID from full URLs or Short links
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoInput) return;

    const cleanVideoId = extractYouTubeId(videoInput);

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, videoUrl: cleanVideoId }),
    });

    if (res.ok) {
      setTitle("");
      setVideoInput("");
      fetchVideos();
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchVideos();
  };

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-6">Your Courses</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Revision</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Videos Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🎥 Course Videos
            </h3>

            {/* Existing Videos List */}
            <div className="space-y-3 mb-6">
              {videos.map((vid) => (
                <div key={vid._id} className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{vid.title}</h4>
                    <p className="text-xs text-slate-400">ID: {vid.videoUrl}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteVideo(vid._id)}
                      className="text-rose-400 hover:text-rose-300 p-2"
                      title="Delete Video"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Video Form (Admin Only) */}
            {isAdmin && (
              <form onSubmit={handleAddVideo} className="bg-slate-800/40 border border-slate-700/40 p-4 rounded-lg space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ADD NEW VIDEO</h4>
                <input
                  type="text"
                  placeholder="Video Title (e.g. Differentiation Part 1)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="YouTube Video ID or Link (e.g. dQw4w9WgXcQ)"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition-colors"
                >
                  Add Video
                </button>
              </form>
            )}
          </div>

          {/* Tutorials & PDFs Column Placeholder */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📄 Tutorials & PDFs
            </h3>
            <p className="text-slate-500 text-sm">No tutorials added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
