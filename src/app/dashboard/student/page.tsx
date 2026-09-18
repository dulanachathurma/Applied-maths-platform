"use client";

import { useState, useEffect } from "react";

interface MaterialItem {
  _id: string;
  title: string;
  videoUrl: string;
  type: string;
  description?: string;
}

export default function StudentDashboardPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMaterials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-2">My Enrolled Lessons</h1>
      <p className="text-slate-400 mb-8">Access all course videos, tutorials, and past papers.</p>

      {loading ? (
        <p className="text-slate-400">Loading lessons...</p>
      ) : materials.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">No materials uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div key={mat._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
              
              {mat.type === "video" || !mat.type ? (
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${mat.videoUrl}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={mat.title}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-slate-800 flex flex-col items-center justify-center p-6 text-center border-b border-slate-700">
                  <div className="text-5xl mb-3">
                    {mat.type === "tute" ? "📘" : "📝"}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white">{mat.type === "tute" ? "Tutorial" : "Past Paper"}</h4>
                  <a 
                    href={mat.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    Download / View Document
                  </a>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    mat.type === 'video' || !mat.type ? 'bg-blue-500/20 text-blue-400' :
                    mat.type === 'tute' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {mat.type || 'video'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{mat.title}</h3>
                {mat.description && <p className="text-xs text-slate-400 line-clamp-2">{mat.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
