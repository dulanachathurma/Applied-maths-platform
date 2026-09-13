"use client";

import { useState, useEffect } from "react";

interface VideoItem {
  _id: string;
  title: string;
  videoUrl: string;
  description?: string;
}

export default function StudentDashboardPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVideos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-2">My Enrolled Lessons</h1>
      <p className="text-slate-400 mb-8">Access all course videos and revision materials uploaded by your lecturer.</p>

      {loading ? (
        <p className="text-slate-400">Loading lessons...</p>
      ) : videos.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">No lessons uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div key={vid._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.videoUrl}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={vid.title}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-1">{vid.title}</h3>
                {vid.description && <p className="text-xs text-slate-400">{vid.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
