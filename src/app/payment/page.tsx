"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Zap, Crown, Star, Shield, X, CreditCard, ArrowLeft, Lock, Sparkles
} from "lucide-react";

const plans = [
  {
    id: "monthly",
    icon: Zap,
    name: "Monthly",
    nameSi: "මාසික",
    price: 1500,
    period: "/ month",
    desc: "Perfect for getting started",
    color: "from-blue-600/20 via-cyan-600/10 to-transparent",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    badge: null,
    popular: false,
    features: [
      "All 17 A/L chapters",
      "50+ HD video lessons",
      "Mobile & Desktop access",
      "New videos every week",
    ],
  },
  {
    id: "term",
    icon: Crown,
    name: "Per Term",
    nameSi: "වාරික",
    price: 3500,
    period: "/ 3 months",
    desc: "Most popular among students",
    color: "from-amber-500/25 via-yellow-500/15 to-transparent",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    badge: "MOST POPULAR",
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
    desc: "Best value for serious students",
    color: "from-purple-600/20 via-pink-500/10 to-transparent",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    badge: "BEST VALUE",
    popular: false,
    features: [
      "Everything in Per Term",
      "Save Rs. 8,000",
      "1-on-1 Q&A sessions",
      "Model paper bundle",
      "Certificate of completion",
    ],
  },
];

function CardForm({ onPay, loading }: { onPay: () => void; loading: boolean }) {
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length >= 3 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };

  const isValid =
    card.number.replace(/\s/g, "").length === 16 &&
    card.name.trim().length > 0 &&
    card.expiry.length === 5 &&
    card.cvv.length >= 3;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Card Number</p>
            <p className="text-white font-mono text-base tracking-widest mt-1">
              {card.number || "•••• •••• •••• ••••"}
            </p>
          </div>
          <div className="flex">
            <div className="w-7 h-7 rounded-full bg-red-500/80" />
            <div className="w-7 h-7 rounded-full bg-yellow-500/80 -ml-3" />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Card Holder</p>
            <p className="text-white text-sm mt-0.5">{card.name || "YOUR NAME"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Expires</p>
            <p className="text-white text-sm mt-0.5">{card.expiry || "MM/YY"}</p>
          </div>
        </div>
      </div>

      <input
        placeholder="Card Number"
        value={card.number}
        onChange={(e) => setCard((p) => ({ ...p, number: formatCard(e.target.value) }))}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm font-mono transition-colors"
      />
      <input
        placeholder="Card Holder Name"
        value={card.name}
        onChange={(e) => setCard((p) => ({ ...p, name: e.target.value.toUpperCase() }))}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="MM/YY"
          value={card.expiry}
          onChange={(e) => setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm font-mono transition-colors"
        />
        <input
          placeholder="CVV"
          type="password"
          maxLength={4}
          value={card.cvv}
          onChange={(e) =>
            setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))
          }
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm font-mono transition-colors"
        />
      </div>

      <button
        disabled={!isValid || loading}
        onClick={onPay}
        className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
      >
        <Lock className="w-4 h-4" />
        {loading ? "Processing..." : "Pay Securely"}
      </button>
    </div>
  );
}

function PaymentModal({
  plan,
  onClose,
}: {
  plan: (typeof plans)[0] | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"details" | "card" | "processing" | "success">("details");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2500));
    setStep("success");
    setLoading(false);
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
            <div className="flex items-center gap-3">
              {step === "card" && (
                <button
                  onClick={() => setStep("details")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h3 className="text-white font-bold text-lg">
                  {step === "success"
                    ? "🎉 Payment Successful!"
                    : step === "processing"
                    ? "Processing..."
                    : `${plan.name} Plan`}
                </h3>
                {step !== "success" && step !== "processing" && (
                  <p className="text-amber-400 font-bold text-base">
                    Rs. {plan.price.toLocaleString()}
                    <span className="text-slate-400 font-normal text-xs ml-1">{plan.period}</span>
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {step === "details" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <p className="text-slate-400 text-sm">Fill in your details to proceed:</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Dulana Chathurma"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+94 77 123 4567"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-white/4 rounded-xl p-4 border border-white/8 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Plan</span>
                    <span className="text-white font-medium">{plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">{plan.period}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span className="text-slate-300">Total</span>
                    <span className="text-amber-400 text-lg">Rs. {plan.price.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  disabled={!form.name || !form.phone || !form.email}
                  onClick={() => setStep("card")}
                  className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {step === "card" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <CardForm onPay={handlePay} loading={loading} />
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-14 gap-5"
              >
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-amber-400 rounded-full animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">Processing Payment</p>
                  <p className="text-slate-400 text-sm mt-1">Please wait...</p>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 gap-5 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2, damping: 15 }}
                  className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center"
                >
                  <Check className="w-12 h-12 text-green-400" />
                </motion.div>
                <div>
                  <h4 className="text-2xl font-black text-white">You&apos;re Enrolled!</h4>
                  <p className="text-slate-400 text-sm mt-2 max-w-xs">
                    Welcome to the{" "}
                    <span className="text-amber-400 font-semibold">{plan.name}</span> plan. A
                    confirmation will be sent to{" "}
                    <span className="text-white">{form.email}</span>.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 transition-all"
                >
                  Start Learning →
                </button>
              </motion.div>
            )}
          </div>

          {step !== "success" && step !== "processing" && (
            <div className="px-6 pb-5 flex items-center justify-center gap-1.5 text-slate-600 text-xs">
              <Shield className="w-3 h-3" />
              <span>256-bit SSL encrypted · Secured by PayHere</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #0f1629 0%, #090d16 50%, #050810 100%)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[20%] w-[600px] h-[600px] bg-amber-500/4 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Access — Sri Lanka&apos;s #1 A/L Maths Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight">
            Invest In Your
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              A/L Success
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Unlock every video, every chapter, every past paper solution — taught by Dulana
            Chathurma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border bg-gradient-to-br ${plan.color} backdrop-blur-sm flex flex-col overflow-hidden ${
                plan.popular
                  ? "border-amber-400/60 shadow-[0_0_50px_rgba(250,180,20,0.12)]"
                  : "border-white/10"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute top-0 right-0 text-[10px] font-black px-3 py-1.5 rounded-bl-xl ${
                    plan.popular ? "bg-amber-400 text-black" : "bg-purple-500 text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-7 flex flex-col gap-5 h-full">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${plan.iconBg} flex items-center justify-center`}
                  >
                    <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{plan.name}</div>
                    <div className="text-slate-500 text-xs">
                      {plan.nameSi} · {plan.desc}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-sm font-medium">Rs.</span>
                    <span className="text-5xl font-black text-white">
                      {plan.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? "bg-amber-500/20" : "bg-white/10"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.popular ? "text-amber-400" : "text-white"
                          }`}
                        />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm ${
                    plan.popular
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-[0_0_25px_rgba(250,180,20,0.3)]"
                      : "bg-white/8 hover:bg-white/14 text-white border border-white/15 hover:border-white/25"
                  }`}
                >
                  {plan.popular ? "✦ Get Started" : "Get Started"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-8 mb-10"
        >
          <h2 className="text-2xl font-black text-center mb-8">
            Everything{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Included
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "🎥", title: "50+ Videos", desc: "All 17 chapters" },
              { emoji: "📱", title: "Any Device", desc: "Mobile, tablet, PC" },
              { emoji: "📝", title: "Model Papers", desc: "Past paper solutions" },
              { emoji: "🔄", title: "Weekly Updates", desc: "Fresh content always" },
              { emoji: "🏆", title: "A/L Focused", desc: "Sri Lankan syllabus" },
              { emoji: "⚡", title: "HD Quality", desc: "Crystal clear video" },
              { emoji: "🎯", title: "Exam Tips", desc: "From the instructor" },
              { emoji: "🔒", title: "Secure Pay", desc: "SSL encrypted" },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="text-3xl mb-2 transition-transform group-hover:scale-110">
                  {item.emoji}
                </div>
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-slate-600 text-sm">
          Questions?{" "}
          <a
            href="/contact"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
          >
            Contact us
          </a>{" "}
          · Payments secured by{" "}
          <span className="text-slate-500 font-semibold">PayHere</span> (Sri Lanka)
        </p>
      </div>

      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
