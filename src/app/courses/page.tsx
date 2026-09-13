"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PlayCircle, BookOpen, Search, Lock } from "lucide-react";

// ─── A/L Applied Mathematics Syllabus Data ───────────────────────────────────
// Replace videoId values with real YouTube video IDs
const syllabus = [
  {
    id: 1,
    title: "1 - දෛශික (Vectors)",
    titleEn: "Vectors",
    isNew: true,
    videos: [
      { id: "v1", title: "Introduction to Vectors", videoId: "ml4NSzCQobk", free: true },
      { id: "v2", title: "Vector Addition & Subtraction", videoId: "ml4NSzCQobk", free: false },
      { id: "v3", title: "Dot Product & Cross Product", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 2,
    title: "2 - ලීතකාල බල පද්ධති (Coplanar Force Systems)",
    titleEn: "Coplanar Force Systems",
    isNew: false,
    videos: [
      { id: "v4", title: "Introduction to Forces", videoId: "ml4NSzCQobk", free: true },
      { id: "v5", title: "Resultant of Forces", videoId: "ml4NSzCQobk", free: false },
      { id: "v6", title: "Equilibrium of Coplanar Forces", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 3,
    title: "3 - සරල රේඛීය චලිතය (Rectilinear Motion)",
    titleEn: "Rectilinear Motion",
    isNew: false,
    videos: [
      { id: "v7", title: "Displacement, Velocity & Acceleration", videoId: "ml4NSzCQobk", free: true },
      { id: "v8", title: "Equations of Motion", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 4,
    title: "4 - සුමට දෘඪ වස්තූවල සමතුලිතතාව (Equilibrium Of Smooth Rigid Bodies)",
    titleEn: "Equilibrium Of Smooth Rigid Bodies",
    isNew: false,
    videos: [
      { id: "v9", title: "Rigid Body Equilibrium", videoId: "ml4NSzCQobk", free: true },
      { id: "v10", title: "Moments and Couples", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 5,
    title: "5 - ඝර්ෂණය (Friction)",
    titleEn: "Friction",
    isNew: true,
    videos: [
      { id: "v11", title: "Laws of Friction", videoId: "ml4NSzCQobk", free: true },
      { id: "v12", title: "Angle of Friction & Limiting Equilibrium", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 6,
    title: "6 - සාපේක්ෂ චලිතය (Relative Motion)",
    titleEn: "Relative Motion",
    isNew: false,
    videos: [
      { id: "v13", title: "Relative Velocity", videoId: "ml4NSzCQobk", free: true },
      { id: "v14", title: "Relative Motion Problems", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 7,
    title: "7 - ප්‍රක්ෂේප්‍ය (Projectiles)",
    titleEn: "Projectiles",
    isNew: true,
    videos: [
      { id: "v15", title: "Projectile Motion Theory", videoId: "ml4NSzCQobk", free: true },
      { id: "v16", title: "Range & Maximum Height", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 8,
    title: "8 - නිව්ටන්ගේ චලිත නියම (Newton's Laws of Motion)",
    titleEn: "Newton's Laws of Motion",
    isNew: true,
    videos: [
      { id: "v17", title: "Newton's 1st Law", videoId: "ml4NSzCQobk", free: true },
      { id: "v18", title: "Newton's 2nd & 3rd Law", videoId: "ml4NSzCQobk", free: false },
      { id: "v19", title: "Connected Bodies", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 9,
    title: "9 - ලඝු දේව රාමු සැකිලි (Frame Works of Light Rods)",
    titleEn: "Frame Works of Light Rods",
    isNew: true,
    videos: [
      { id: "v20", title: "Introduction to Frameworks", videoId: "ml4NSzCQobk", free: true },
      { id: "v21", title: "Method of Sections", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 10,
    title: "10 - බර දේව රාමු සැකිලි (Frameworks of Heavy Rods)",
    titleEn: "Frameworks of Heavy Rods",
    isNew: true,
    videos: [
      { id: "v22", title: "Heavy Rod Frameworks", videoId: "ml4NSzCQobk", free: true },
      { id: "v23", title: "Stresses in Heavy Rods", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 11,
    title: "11 - ශාර්යය සහ ස්‍මමතාව (Work and Power)",
    titleEn: "Work and Power",
    isNew: false,
    videos: [
      { id: "v24", title: "Work Done by a Force", videoId: "ml4NSzCQobk", free: true },
      { id: "v25", title: "Power and Efficiency", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 12,
    title: "12 - ආවේගය හා ශකතතාව (Impulse and Momentum)",
    titleEn: "Impulse and Momentum",
    isNew: true,
    videos: [
      { id: "v26", title: "Momentum & Impulse", videoId: "ml4NSzCQobk", free: true },
      { id: "v27", title: "Conservation of Momentum", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 13,
    title: "13 - චාකික චලිතය (Circular Motion)",
    titleEn: "Circular Motion",
    isNew: false,
    videos: [
      { id: "v28", title: "Uniform Circular Motion", videoId: "ml4NSzCQobk", free: true },
      { id: "v29", title: "Vertical Circular Motion", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 14,
    title: "14 - සරල අනුවර්ති චලිතය (Simple Harmonic Motion)",
    titleEn: "Simple Harmonic Motion",
    isNew: false,
    videos: [
      { id: "v30", title: "SHM Theory", videoId: "ml4NSzCQobk", free: true },
      { id: "v31", title: "SHM Equations", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 15,
    title: "15 - ගුරුත්ව කේන්ද්‍රය (Center Of Gravity)",
    titleEn: "Center Of Gravity",
    isNew: false,
    videos: [
      { id: "v32", title: "Centre of Gravity for Standard Shapes", videoId: "ml4NSzCQobk", free: true },
      { id: "v33", title: "Composite Bodies", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 16,
    title: "16 - සම්භාවිතතාව (Probability)",
    titleEn: "Probability",
    isNew: false,
    videos: [
      { id: "v34", title: "Probability Basics", videoId: "ml4NSzCQobk", free: true },
      { id: "v35", title: "Conditional Probability", videoId: "ml4NSzCQobk", free: false },
    ],
  },
  {
    id: 17,
    title: "17 - සංඛ්‍යානය (Statistics)",
    titleEn: "Statistics",
    isNew: true,
    videos: [
      { id: "v36", title: "Descriptive Statistics", videoId: "ml4NSzCQobk", free: true },
      { id: "v37", title: "Distributions", videoId: "ml4NSzCQobk", free: false },
    ],
  },
];

// ─── Video Player Modal ────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
}: {
  video: { title: string; videoId: string } | null;
  onClose: () => void;
}) {
  if (!video) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-background dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl border border-border dark:border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h3 className="text-foreground font-semibold text-lg truncate pr-4">{video.title}</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
            >
              ✕
            </button>
          </div>
          {/* Video Embed */}
          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Chapter Accordion Row ─────────────────────────────────────────────────────
function ChapterRow({
  chapter,
  index,
  onPlayVideo,
}: {
  chapter: (typeof syllabus)[0];
  index: number;
  onPlayVideo: (video: { title: string; videoId: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border border-border dark:border-white/10 rounded-xl overflow-hidden bg-card dark:bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors"
    >
      {/* Chapter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <span className="text-foreground font-medium group-hover:text-primary transition-colors">
            {chapter.title}
          </span>
          {chapter.isNew && (
            <span className="text-[10px] font-bold bg-primary text-black px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm hidden sm:block">
            {chapter.videos.length} video{chapter.videos.length !== 1 ? "s" : ""}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </button>

      {/* Videos List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 divide-y divide-white/5">
              {chapter.videos.map((video, vIdx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: vIdx * 0.05 }}
                  className="flex items-center justify-between px-5 py-3 bg-zinc-50 dark:bg-black/20 hover:bg-primary/5 transition-colors group/video"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-white/5 flex items-center justify-center text-xs text-zinc-500">
                      {vIdx + 1}
                    </div>
                    <span className="text-muted-foreground dark:text-zinc-300 text-sm group-hover/video:text-foreground transition-colors">
                      {video.title}
                    </span>
                    {video.free && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onPlayVideo(video)}
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary transition-all rounded-lg px-3 py-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span className="hidden sm:block">Watch</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState<{ title: string; videoId: string } | null>(null);

  const filtered = syllabus.filter(
    (ch) =>
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      ch.titleEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 relative overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" /> A/L Applied Mathematics
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Course <span className="text-primary">Syllabus</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            All 17 chapters of the A/L Applied Mathematics syllabus — click any chapter to watch embedded videos.
          </p>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { value: "17", label: "Chapters" },
              { value: "50+", label: "Videos" },
              { value: "FREE", label: "First Lessons" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chapters... (e.g. Vectors, Friction)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input w-full h-14 pl-12 pr-4 rounded-2xl text-base"
          />
        </motion.div>

        {/* Unlock Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6 flex items-center gap-3 glass p-4 rounded-xl border border-primary/20"
        >
          <Lock className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Free lessons</span> are open to everyone. To unlock all videos,{" "}
            <a href="/payment" className="text-primary underline underline-offset-2 hover:text-yellow-300">
              subscribe now →
            </a>
          </p>
        </motion.div>

        {/* Chapter Accordion */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((chapter, idx) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                index={idx}
                onPlayVideo={setActiveVideo}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-20">
              No chapters found for &quot;{search}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
