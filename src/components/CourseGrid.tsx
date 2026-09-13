"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export function CourseGrid({ initialCourses }: { initialCourses: any[] }) {
  const [search, setSearch] = useState("");

  const filteredCourses = initialCourses.filter(course => 
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-16">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Search for courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="glass-input h-14 pl-12 text-lg rounded-2xl w-full"
        />
      </div>

      <AnimatePresence mode="popLayout">
        {filteredCourses.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-zinc-500 py-20 border border-dashed border-white/10 rounded-3xl glass-card"
          >
            <p className="text-xl font-medium">No courses found matching "{search}"</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={course._id}
              >
                <Card className="glass-card flex flex-col overflow-hidden group hover:border-primary/50 transition-colors h-full">
                  <div className="relative h-56 bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src={course.thumbnail || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                        LKR {course.price}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-1 pt-6 pb-2">
                    <CardTitle className="text-2xl font-bold line-clamp-2 leading-tight text-white group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-zinc-400 line-clamp-3">
                      {course.description}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-2 pb-6">
                    <Link href={`/courses/${course._id}`} className="w-full">
                      <Button className="w-full bg-white/5 hover:bg-primary text-white hover:text-primary-foreground border border-white/10 hover:border-primary transition-all rounded-xl h-12 text-md font-semibold">
                        View Course
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
