"use client";

import { useState, useEffect } from "react";

interface MaterialItem {
  _id: string;
  title: string;
  videoUrl: string;
  type: string;
  description?: string;
}

export default function AdminCoursesPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [title, setTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [type, setType] = useState("video");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMaterials = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    if (Array.isArray(data)) setMaterials(data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !urlInput) return;
    setLoading(true);

    const finalUrl = type === "video" ? extractYouTubeId(urlInput) : urlInput;

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, videoUrl: finalUrl, type }),
    });

    if (res.ok) {
      setTitle("");
      setUrlInput("");
      setDescription("");
      setType("video");
      fetchMaterials();
    }
    setLoading(false);
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchMaterials();
  };

  const getIcon = (itemType: string) => {
    if (itemType === "tute") return "📘";
    if (itemType === "paper") return "📝";
    return "📹";
  };

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold mb-6">Course Materials Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleAddMaterial} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-amber-400">Add New Material</h2>
          
          <div>
            <label className="block text-sm mb-1 text-slate-300">Material Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="video">Video Lesson</option>
              <option value="tute">Tutorial / Note</option>
              <option value="paper">Past Paper / Model Paper</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Title</label>
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
            <label className="block text-sm mb-1 text-slate-300">
              {type === "video" ? "YouTube URL or ID" : "File Link (Drive, DropBox, etc.)"}
            </label>
            <input
              type="text"
              placeholder={type === "video" ? "https://www.youtube.com/watch?v=..." : "https://drive.google.com/..."}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Description (Optional)</label>
            <textarea
              placeholder="Details about this material..."
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
            {loading ? "Adding..." : "Add Material"}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Uploaded Materials ({materials.length})</h2>
          {materials.map((mat) => (
            <div key={mat._id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getIcon(mat.type)}</div>
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    {mat.title}
                    <span className="text-[10px] uppercase bg-slate-800 px-2 py-0.5 rounded text-amber-400">
                      {mat.type}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 truncate max-w-xs">{mat.videoUrl}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteMaterial(mat._id)}
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
