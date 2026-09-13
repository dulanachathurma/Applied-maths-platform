"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Star, Shield, X, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Pricing Plans ─────────────────────────────────────────────────────────────
const plans = [
  {
    id: "monthly",
    icon: Zap,
    name: "Monthly",
    nameSi: "මාසික",
    price: 1500,
    period: "/ month",
    periodSi: "/ මාසිකව",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    popular: false,
    features: [
      "Access to all 17 chapters",
      "50+ video lessons",
      "Full HD quality",
      "Mobile & Desktop",
      "New videos every week",
    ],
  },
  {
    id: "term",
    icon: Crown,
    name: "Per Term",
    nameSi: "වාරික",
    price: 3500,
    period: "/ term (3 months)",
    periodSi: "/ වාරය (මාස 3)",
    color: "from-primary/30 to-yellow-500/20",
    borderColor: "border-primary/50",
    iconColor: "text-primary",
    popular: true,
    features: [
      "Everything in Monthly",
      "Save Rs. 1,000",
      "Priority support",
      "Past paper solutions",
      "Downloadable notes",
    ],
  },
  {
    id: "yearly",
    icon: Star,
    name: "Full Year",
    nameSi: "වාර්ෂික",
    price: 10000,
    period: "/ year",
    periodSi: "/ වර්ෂය",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    popular: false,
    features: [
      "Everything in Per Term",
      "Best value — save Rs. 8,000",
      "1-on-1 Q&A sessions",
      "Model paper bundle",
      "Certificate of completion",
    ],
  },
];

// ─── Payment Modal ──────────────────────────────────────────────────────────────
function PaymentModal({
  plan,
  onClose,
}: {
  plan: (typeof plans)[0] | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"details" | "method" | "processing" | "success">("details");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [method, setMethod] = useState<"card" | "mobile" | "">("");

  const handlePay = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2500));
    setStep("success");
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-md bg-background dark:bg-zinc-900 border border-border dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/3">
            <div>
              <h3 className="text-foreground font-bold text-xl">
                {step === "success" ? "Payment Successful! 🎉" : `Subscribe — ${plan.name} Plan`}
              </h3>
              {step !== "success" && (
                <p className="text-primary font-semibold text-lg mt-0.5">Rs. {plan.price.toLocaleString()}{plan.period}</p>
              )}
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Step: Details */}
            {step === "details" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Dulana Chathurma"
                    className="glass-input w-full h-11 px-4 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+94 76 757 4844"
                    type="tel"
                    className="glass-input w-full h-11 px-4 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    type="email"
                    className="glass-input w-full h-11 px-4 rounded-xl"
                  />
                </div>
                <Button
                  disabled={!form.name || !form.phone || !form.email}
                  onClick={() => setStep("method")}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl mt-2"
                >
                  Continue to Payment →
                </Button>
              </motion.div>
            )}

            {/* Step: Payment Method */}
            {step === "method" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-muted-foreground text-sm mb-2">Choose your payment method:</p>

                {/* Card */}
                <button
                  onClick={() => setMethod("card")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    method === "card"
                      ? "border-primary bg-primary/10"
                      : "border-border dark:border-white/10 bg-zinc-50 dark:bg-white/3 hover:border-zinc-300 dark:hover:border-white/20"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-foreground font-medium">Card Payment</div>
                    <div className="text-muted-foreground text-xs">Visa / Mastercard</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {["VISA", "MC"].map((c) => (
                      <span key={c} className="text-[10px] font-bold bg-zinc-200 dark:bg-white/10 px-2 py-1 rounded text-muted-foreground">{c}</span>
                    ))}
                  </div>
                </button>

                {/* Mobile Banking */}
                <button
                  onClick={() => setMethod("mobile")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    method === "mobile"
                      ? "border-primary bg-primary/10"
                      : "border-border dark:border-white/10 bg-zinc-50 dark:bg-white/3 hover:border-zinc-300 dark:hover:border-white/20"
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-foreground font-medium">Mobile Banking</div>
                    <div className="text-muted-foreground text-xs">PayHere / eZ Cash / mCash</div>
                  </div>
                </button>

                {/* Order Summary */}
                <div className="bg-white/5 rounded-xl p-4 space-y-2 border border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="text-foreground">{plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Student</span>
                    <span className="text-foreground">{form.name}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span className="text-zinc-300">Total</span>
                    <span className="text-primary text-lg">Rs. {plan.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("details")}
                    className="flex-1 h-11 border-border text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </Button>
                  <Button
                    disabled={!method}
                    onClick={handlePay}
                    className="flex-1 h-11 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
                  >
                    Pay Now
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step: Processing */}
            {step === "processing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-zinc-400 text-sm">Processing your payment...</p>
              </motion.div>
            )}

            {/* Step: Success */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 gap-4 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-2xl font-black text-foreground">You&apos;re Enrolled!</h4>
                <p className="text-muted-foreground max-w-xs">
                  Welcome to the <span className="text-primary font-semibold">{plan.name}</span> plan.
                  A confirmation will be sent to <span className="text-foreground">{form.email}</span>.
                </p>
                <Button onClick={onClose} className="mt-2 bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-xl">
                  Start Learning →
                </Button>
              </motion.div>
            )}
          </div>

          {/* Security note */}
          {step !== "success" && step !== "processing" && (
            <div className="px-6 pb-5 flex items-center justify-center gap-2 text-zinc-600 text-xs">
              <Shield className="w-3 h-3" /> Secured by PayHere · 256-bit SSL encryption
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Payment Page ─────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 relative overflow-hidden transition-colors">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Crown className="w-4 h-4" /> Premium Access
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Get unlimited access to all A/L Applied Mathematics video lessons. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border ${plan.borderColor} bg-gradient-to-br ${plan.color} backdrop-blur-sm p-6 flex flex-col gap-5 ${
                plan.popular ? "ring-2 ring-primary/60 shadow-[0_0_40px_rgba(250,204,21,0.15)]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-black px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center`}>
                  <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
                </div>
                <div>
                  <div className="text-foreground font-bold text-lg">{plan.name}</div>
                  <div className="text-zinc-500 text-xs">{plan.nameSi}</div>
                </div>
              </div>

              <div>
                <span className="text-4xl font-black text-foreground">Rs. {plan.price.toLocaleString()}</span>
                <span className="text-zinc-400 text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full h-12 font-bold rounded-xl transition-all ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl mb-12"
        >
          <h2 className="text-2xl font-black text-center mb-8">
            What&apos;s <span className="text-primary">Included</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "🎥", title: "50+ Videos", desc: "All 17 chapters covered" },
              { emoji: "📱", title: "Any Device", desc: "Mobile, tablet, PC" },
              { emoji: "📝", title: "Model Papers", desc: "Past paper solutions" },
              { emoji: "🔄", title: "Weekly Updates", desc: "New content every week" },
              { emoji: "🏆", title: "A/L Focused", desc: "Sri Lankan syllabus" },
              { emoji: "⚡", title: "HD Quality", desc: "Crystal clear video" },
              { emoji: "🎯", title: "Exam Tips", desc: "From the instructor" },
              { emoji: "🔒", title: "Secure Pay", desc: "PayHere protected" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-foreground font-semibold text-sm">{item.title}</div>
                <div className="text-zinc-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-zinc-500 text-sm">
            Have questions?{" "}
            <a href="/contact" className="text-primary underline underline-offset-2 hover:text-yellow-300">
              Contact us
            </a>{" "}
            · Payments powered by{" "}
            <span className="text-zinc-400 font-semibold">PayHere</span> (Sri Lanka)
          </p>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
