"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe, Star, Award } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4 text-primary" /> Contact Us
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Have a question about our courses or want to inquire about enrollment? We&apos;re here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* ✅ Premium Profile Card - Golden with Black Text */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Golden gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500" />
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,0,0,0.3) 0%, transparent 50%), 
                                    radial-gradient(circle at 80% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)`
                }}
              />

              <div className="relative z-10 p-6">
                {/* Badge row */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-1.5 bg-black/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Award className="w-3.5 h-3.5 text-black" />
                    <span className="text-black text-xs font-bold tracking-wide">INSTRUCTOR</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-black fill-black" />
                    <span className="text-black text-xs font-bold">4.9 Rating</span>
                  </div>
                </div>

                {/* Profile photo + name */}
                <div className="flex items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-black/20 shadow-xl">
                      <Image
                        src="/instructor.jpg"
                        alt="Dulana Chathurma"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full object-top"
                      />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-black text-black leading-tight">
                      Dulana Chathurma
                    </h2>
                    <p className="text-black/70 text-sm font-semibold mt-0.5">
                      BSc (Hons) Software Engineering
                    </p>
                    <p className="text-black/60 text-xs mt-1">
                      University of Kelaniya · Sri Lanka
                    </p>
                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-center">
                        <div className="text-black text-base font-black">500+</div>
                        <div className="text-black/60 text-[10px] font-semibold uppercase tracking-wide">Students</div>
                      </div>
                      <div className="w-px h-8 bg-black/20" />
                      <div className="text-center">
                        <div className="text-black text-base font-black">10+</div>
                        <div className="text-black/60 text-[10px] font-semibold uppercase tracking-wide">Courses</div>
                      </div>
                      <div className="w-px h-8 bg-black/20" />
                      <div className="text-center">
                        <div className="text-black text-base font-black">5★</div>
                        <div className="text-black/60 text-[10px] font-semibold uppercase tracking-wide">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-5 pt-4 border-t border-black/15">
                  <p className="text-black/65 text-xs italic leading-relaxed">
                    &quot;Passionate about making mathematics accessible and enjoyable for every student.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Connect with us heading */}
            <div>
              <h3 className="text-xl font-bold mb-1">Connect with us</h3>
              <p className="text-zinc-400 text-sm">Reach out through any of these platforms.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Phone', value: '+94 76 757 4844', href: 'tel:+94767574844', icon: Phone },
                { label: 'Email', value: 'dulanachathurma99@gmail.com', href: 'mailto:dulanachathurma99@gmail.com', icon: Mail },
                { label: 'Portfolio', value: 'Visit Website', href: 'https://dulanaportfolio.vercel.app/', icon: Globe },
                { label: 'X', value: '@DulanaChathurma', href: 'https://x.com/DulanaChathurma', icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg> },
                { label: 'LinkedIn', value: 'Dulana Chathurma', href: 'https://linkedin.com/in/dulana-chathurma', icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
                { label: 'GitHub', value: 'dulanachathurma', href: 'https://github.com/dulanachathurma', icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> },
                { label: 'Facebook', value: 'Dulana Chathurma', href: 'https://web.facebook.com/profile.php?id=61577216859902', icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                { label: 'Instagram', value: 'dulana_chathurma', href: 'https://www.instagram.com/dulana_chathurma/', icon: ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 glass p-3 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all group"
                >
                  <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <link.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{link.label}</div>
                    <div className="text-sm text-foreground font-medium truncate">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-2">
              <div className="glass p-6 rounded-xl flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="text-zinc-400">Sri Lanka (Online Educational Platform)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send us a Message
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h4>
                <p className="text-zinc-400">We&apos;ll get back to you within 24 hours.</p>
                <Button onClick={() => setSent(false)} className="mt-6 bg-primary text-primary-foreground">
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Your Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Dulana Chathurma"
                    className="glass-input w-full h-12 px-4 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="glass-input w-full h-12 px-4 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={5}
                    className="glass-input w-full px-4 py-3 rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.25)] transition-all"
                >
                  {sending ? "Sending..." : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
