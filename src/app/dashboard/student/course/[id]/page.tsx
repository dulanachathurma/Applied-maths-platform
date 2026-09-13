"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlayCircle, FileText, ChevronLeft, Download } from "lucide-react";
import Link from "next/link";

export default function CourseViewer() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  useEffect(() => {
    // For demo, we are fetching the course directly (without checking enrollment, assuming they passed the dashboard)
    // In production, we'd have a specific student endpoint checking enrollment status.
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/admin/courses`); 
        const courses = await res.json();
        const found = courses.find((c: any) => c._id === id);
        
        if (found) {
          setCourse(found);
          if (found.videos?.length > 0) {
            setActiveVideo(found.videos[0]);
          }
        } else {
          router.push("/dashboard/student");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id, router]);

  if (loading) return <div className="text-white p-12 text-center font-semibold">Loading course content...</div>;
  if (!course) return <div className="text-white p-12 text-center">Course not found.</div>;

  return (
    <div className="py-6 min-h-screen">
      <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to My Courses
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Video Player Area */}
        <div className="flex-1">
          {activeVideo ? (
            <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-zinc-800 shadow-2xl relative">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                title={activeVideo.title}
                className="w-full h-full absolute top-0 left-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="bg-zinc-900 rounded-2xl aspect-video border border-zinc-800 flex items-center justify-center text-zinc-500">
              No videos available for this course yet.
            </div>
          )}
          
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white">{activeVideo?.title || course.title}</h1>
            <p className="text-zinc-400 mt-2 leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* Sidebar content (Playlist & Tutes) */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          
          {/* Video Playlist */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col max-h-[500px]">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                Course Lessons
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{course.videos?.length || 0} videos available</p>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-1">
              {course.videos?.map((v: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideo(v)}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                    activeVideo?.youtubeId === v.youtubeId 
                      ? "bg-primary/10 border border-primary/30" 
                      : "hover:bg-zinc-800 border border-transparent"
                  }`}
                >
                  <div className={`mt-0.5 ${activeVideo?.youtubeId === v.youtubeId ? "text-primary" : "text-zinc-500"}`}>
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${activeVideo?.youtubeId === v.youtubeId ? "text-primary" : "text-zinc-300"}`}>
                      {idx + 1}. {v.title}
                    </p>
                  </div>
                </button>
              ))}
              {(!course.videos || course.videos.length === 0) && (
                <p className="p-4 text-sm text-zinc-500 text-center">Check back later for videos.</p>
              )}
            </div>
          </div>

          {/* Tutorials & Resources */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Tutorials & PDFs
              </h3>
            </div>
            <div className="p-3 space-y-2">
              {course.tutorials?.map((t: any, idx: number) => (
                <a 
                  key={idx} 
                  href={t.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden pr-2">
                    <FileText className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">{t.title}</p>
                  </div>
                  <Download className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 flex-shrink-0 transition-colors" />
                </a>
              ))}
              {(!course.tutorials || course.tutorials.length === 0) && (
                <p className="p-3 text-sm text-zinc-500 text-center">No tutorials available.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
