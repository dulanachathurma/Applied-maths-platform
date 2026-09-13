"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ShieldCheck, CreditCard, User, Phone, Mail, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// ─── SVG Card Logos ───────────────────────────────────────────────────────────
function VisaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="780" height="500" rx="40" fill="#1A1F71"/>
      <path d="M316.5 350.5L344.5 149.5H390.5L362.5 350.5H316.5Z" fill="white"/>
      <path d="M513.5 153.5C504.5 150 490.5 146 473.5 146C428 146 396 169 395.5 203C395 228 419 242 437 250.5C455 259 461.5 264.5 461 272C461 283 448 288 436 288C419.5 288 410.5 285.5 396.5 279L390.5 276L384 314.5C394.5 319.5 413.5 324 433.5 324C481.5 324 513 301 513.5 265C514 245.5 501.5 231 475.5 219C459.5 210.5 450 205 450 197.5C450.5 191 458 184.5 474 184.5C487.5 184 497.5 187 505.5 190L509.5 192L515.5 155L513.5 153.5Z" fill="white"/>
      <path d="M618 149.5H582C571 149.5 562.5 152.5 557.5 163.5L490.5 350.5H538L548 322.5H606L611.5 350.5H654L618 149.5ZM560.5 287C563.5 279 578.5 239 578.5 239C578 239.5 581.5 231 583.5 226L586.5 237.5C586.5 237.5 595 281 597 287H560.5Z" fill="white"/>
      <path d="M275 149.5L229.5 283.5L224.5 260C215.5 231 189 200 159.5 185L201 350H249.5L323 149.5H275Z" fill="white"/>
      <path d="M182 149.5H109L108 153C166 167 204.5 200 220.5 242L204 164.5C201 153.5 193.5 150 182 149.5Z" fill="#FAA61A"/>
    </svg>
  );
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 152 108" xmlns="http://www.w3.org/2000/svg">
      <rect width="152" height="108" rx="8" fill="#252525"/>
      <circle cx="58" cy="54" r="34" fill="#EB001B"/>
      <circle cx="94" cy="54" r="34" fill="#F79E1B"/>
      <path d="M76 26.5C83.5 32.5 88.5 41.5 88.5 54C88.5 66.5 83.5 75.5 76 81.5C68.5 75.5 63.5 66.5 63.5 54C63.5 41.5 68.5 32.5 76 26.5Z" fill="#FF5F00"/>
    </svg>
  );
}

function PayHereLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="32" rx="6" fill="#0066CC"/>
      <text x="10" y="22" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white">PayHere</text>
    </svg>
  );
}

export function CheckoutModal({ courseId, courseTitle, price }: { courseId: string, courseTitle: string, price: number }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState<"details" | "card">("details");
  const [fullName, setFullName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const formatCard = (val: string) => {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length >= 3 ? clean.slice(0, 2) + "/" + clean.slice(2) : clean;
  };

  const cardType = cardNumber.replace(/\s/g, "").startsWith("4")
    ? "visa"
    : ["51","52","53","54","55"].some(p => cardNumber.replace(/\s/g, "").startsWith(p))
    ? "mastercard"
    : null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push(`/login?callbackUrl=/courses/${courseId}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, price, userId: session.user.id }),
      });
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        alert("Payment processed. Order ID: " + data.orderId);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all h-14 rounded-xl">
          Enroll Now — LKR {price.toLocaleString()}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border-0 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
        style={{ background: "linear-gradient(145deg, #0f1827 0%, #131f30 60%, #0a1520 100%)" }}>
        
        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-yellow-300 to-primary" />

        {/* Background glow */}
        <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[60px] pointer-events-none" />

        <div className="relative z-10 p-6">
          {/* Header */}
          <DialogHeader className="mb-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                Secure Checkout
              </DialogTitle>
              {/* Card logos top-right */}
              <div className="flex items-center gap-1.5">
                <VisaLogo className="w-10 h-6 rounded" />
                <MastercardLogo className="w-10 h-6 rounded" />
                <PayHereLogo className="w-14 h-6 rounded" />
              </div>
            </div>
          </DialogHeader>

          {/* Order summary box */}
          <div className="mb-5 rounded-xl border border-[#2d4060] bg-[#0d1e2e] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Course</p>
                <p className="text-white text-sm font-semibold leading-tight">{courseTitle}</p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Total</p>
                <p className="text-primary text-xl font-black">LKR {price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Step tabs */}
          <div className="flex rounded-xl bg-[#0d1a27] border border-[#2d4060] p-1 mb-5 gap-1">
            <button
              type="button"
              onClick={() => setStep("details")}
              className={`flex-1 text-xs py-2 rounded-lg font-semibold transition-all ${step === "details" ? "bg-primary text-black shadow" : "text-zinc-400 hover:text-white"}`}
            >
              1. Your Details
            </button>
            <button
              type="button"
              onClick={() => step === "card" && setStep("card")}
              className={`flex-1 text-xs py-2 rounded-lg font-semibold transition-all ${step === "card" ? "bg-primary text-black shadow" : "text-zinc-400"}`}
            >
              2. Card Payment
            </button>
          </div>

          {step === "details" ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep("card"); }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input required value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder="Dulana Chathurma"
                    className="h-12 pl-9 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input required value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+94 76 757 4844"
                    className="h-12 pl-9 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 pl-9 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
                </div>
              </div>
              <Button type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(250,204,21,0.3)] mt-2 flex items-center justify-center gap-2">
                Continue to Payment <ChevronRight className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              {/* Card number with live type detection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                  <Input required value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className="h-12 pl-9 pr-16 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl tracking-widest font-mono" />
                  <div className="absolute right-3 top-2.5">
                    {cardType === "visa" && <VisaLogo className="w-9 h-6 rounded" />}
                    {cardType === "mastercard" && <MastercardLogo className="w-9 h-6 rounded" />}
                    {!cardType && <CreditCard className="w-5 h-5 text-zinc-600" />}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Name on Card</label>
                <Input required value={cardName} onChange={e => setCardName(e.target.value)}
                  placeholder="Dulana Chathurma"
                  className="h-12 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Expiry MM/YY</label>
                  <Input required value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder="12/26" maxLength={5}
                    className="h-12 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">CVC / CVV</label>
                  <Input required type="password" value={cvc} onChange={e => setCvc(e.target.value)}
                    placeholder="•••" maxLength={4}
                    className="h-12 bg-[#0d1e2e] border-[#2d4060] text-white placeholder:text-zinc-600 focus:border-primary/70 focus:ring-primary/30 rounded-xl" />
                </div>
              </div>

              {/* Pay button */}
              <Button type="submit" disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl text-base shadow-[0_0_24px_rgba(250,204,21,0.35)] mt-1 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                {loading ? "Processing..." : `Pay LKR ${price.toLocaleString()}`}
              </Button>

              <button type="button" onClick={() => setStep("details")}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                ← Back to details
              </button>
            </form>
          )}

          {/* Security badges */}
          <div className="mt-5 pt-4 border-t border-[#1e3048]">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="w-px h-3 bg-zinc-700" />
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
                <Lock className="w-3 h-3 text-blue-400" />
                <span>PCI Compliant</span>
              </div>
              <div className="w-px h-3 bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <VisaLogo className="w-7 h-4 rounded" />
                <MastercardLogo className="w-7 h-4 rounded" />
              </div>
            </div>
            <p className="text-center text-[9px] text-zinc-600 mt-2">
              Powered by PayHere · Secured by Dulana Applied Maths Platform
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


