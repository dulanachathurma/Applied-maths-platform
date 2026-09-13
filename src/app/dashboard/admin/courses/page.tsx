"use client";

import { useState, useEffect } from "react";

interface VideoItem {
  _id: string;
  title: string;
  videoUrl: string;
  description?: string;
}

export default function AdminCoursesPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [title, setTitle] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    if (Array.isArray(data)) setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoInput) return;
    setLoading(true);

    const cleanVideoId = extractYouTubeId(videoInput);

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, videoUrl: cleanVideoId }),
    });

    if (res.ok) {
      setTitle("");
      setVideoInput("");
      setDescription("");
      fetchVideos();
    }
    setLoading(false);
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchVideos();
  };

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-6">Course Videos Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleAddVideo} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-amber-400">Add New Lesson Video</h2>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Video Title</label>
            <input
              type="text"
              placeholder="e.g. Integration Part 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">YouTube URL or ID</label>
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Description (Optional)</label>
            <textarea
              placeholder="Lesson details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? "Adding..." : "Add Video"}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Uploaded Lessons ({videos.length})</h2>
          {videos.map((vid) => (
            <div key={vid._id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold">{vid.title}</h4>
                <p className="text-xs text-slate-400">Video ID: {vid.videoUrl}</p>
              </div>
              <button
                onClick={() => handleDeleteVideo(vid._id)}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 rounded text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
