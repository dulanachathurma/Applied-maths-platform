import { Course } from "@/models/Course";
import dbConnect from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock, ShieldCheck, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckoutModal } from "@/components/payment/CheckoutModal";

async function getCourse(id: string) {
  try {
    await dbConnect();
    const course = await Course.findById(id);
    if (!course) return null;
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    return null;
  }
}

export default async function SingleCoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground transition-colors">
      {/* Hero Section */}
      <div className="relative border-b border-white/10 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={course.thumbnail || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} 
            alt={course.title}
            className="w-full h-full object-cover opacity-10 blur-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <span className="bg-primary/20 text-primary border border-primary/50 px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-[0_0_10px_rgba(250,204,21,0.2)]">
              A/L Applied Maths
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              {course.title}
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                {course.videos?.length || 0} Video Lessons
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Lifetime Access
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Premium Quality
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="glass-card overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={course.thumbnail || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">LKR {course.price}</span>
                </div>
                
                <CheckoutModal courseId={course._id} courseTitle={course.title} price={course.price} />
                
                <p className="text-xs text-center text-zinc-500 flex items-center justify-center gap-1 mt-4">
                  <Lock className="w-3 h-3" /> Secure payment via PayHere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Content Curriculum Section */}
      <div className="container mx-auto max-w-4xl px-4 py-20 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-white">Course <span className="text-primary">Syllabus</span></h2>
        
        {course.videos && course.videos.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {course.videos.sort((a: any, b: any) => a.order - b.order).map((video: any, index: number) => (
              <AccordionItem key={video._id} value={video._id} className="border-none">
                <AccordionTrigger className="glass bg-white/5 hover:bg-white/10 hover:no-underline rounded-xl px-6 py-4 transition-all">
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{video.title}</h4>
                      <p className="text-sm text-zinc-400 font-normal mt-1">{video.duration || "Video Lesson"}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-white/5 rounded-b-xl border-x border-b border-white/10 -mt-2 pt-6 text-zinc-300 leading-relaxed">
                  {video.description || "In this module, you will learn the core concepts required for this section of Applied Mathematics. Make sure to complete the associated assignments."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="glass-card p-12 text-center text-zinc-500">
            Curriculum content is being updated.
          </div>
        )}
      </div>
    </div>
  );
}
