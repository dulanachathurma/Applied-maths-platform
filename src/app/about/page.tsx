"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Mail, Video, Share2, AtSign, BookOpen, Trophy, Users, Star, Send, MessageSquare, Phone, MapPin, Globe } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { icon: Video, label: "YouTube", color: "hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30", href: "#" },
  { icon: Share2, label: "Facebook", color: "hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-600/30", href: "#" },
  { icon: AtSign, label: "Instagram", color: "hover:bg-pink-600/20 hover:text-pink-400 hover:border-pink-600/30", href: "#" },
  { icon: Mail, label: "Email", color: "hover:bg-primary/20 hover:text-primary hover:border-primary/30", href: "mailto:dulana@appliedmaths.lk" },
];

const achievements = [
  { icon: Users, value: "5000+", label: "Students Taught" },
  { icon: Trophy, value: "95%", label: "Pass Rate" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: BookOpen, value: "10+ yrs", label: "Experience" },
];

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 transition-colors">
      {/* Glow effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-primary" /> About the Instructor
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Meet <span className="text-primary">Dulana Chathurma</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dedicated to transforming A/L students into confident problem solvers.
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] glass-card shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity z-10" />
              <Image
                src="/instructor4.jpg"
                alt="Dulana Chathurma"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-black mb-2">Dulana Chathurma</h2>
              <p className="text-primary font-semibold text-xl">Applied Mathematics Expert</p>
            </div>

            <div className="space-y-4 text-muted-foreground dark:text-zinc-300 leading-relaxed text-lg">
              <p>
                With a deep-rooted passion for numbers and logic, I specialize in simplifying complex Applied Mathematics concepts for Sri Lankan A/L students.
              </p>
              <p>
                My teaching philosophy revolves around building a strong foundation and developing critical thinking skills. Over the years, I have guided hundreds of students to exceptional results.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-border dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-muted-foreground dark:text-zinc-400 text-sm font-medium transition-all ${s.color}`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>

            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-5 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] text-lg">
                Start Learning Today
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all"
            >
              <a.icon className="w-7 h-7 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-foreground">{a.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
