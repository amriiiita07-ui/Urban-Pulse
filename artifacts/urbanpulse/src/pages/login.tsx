import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

type Tab = "email" | "phone";

export default function Login() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const identifier = tab === "email" ? email : phone;
    if (!identifier.trim()) {
      setError(tab === "email" ? "Please enter your email address." : "Please enter your phone number.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("urbanpulse_auth", "true");
      navigate("/");
    }, 900);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — city image */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        <img src="/city-hero.png" alt="City" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#1e3a5f]/75 to-indigo-900/60" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="UrbanPulse" className="w-12 h-12 object-contain" />
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                UrbanPulse
              </h2>
              <p className="text-white/50 text-[10px] uppercase tracking-widest">City Intelligence</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The city,<br />intelligently<br />observed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-white/60 text-sm leading-relaxed max-w-xs"
            >
              Real-time mobility analytics, citizen experience tracking, and urban intelligence — all in one platform.
            </motion.p>
            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 flex-wrap pt-2"
            >
              {["50 Citizens Tracked", "8 Active Zones", "300+ Events"].map(s => (
                <span key={s} className="bg-white/10 backdrop-blur-sm text-white/80 text-[11px] px-3 py-1.5 rounded-full border border-white/20">
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          <p className="text-white/25 text-xs">© 2026 UrbanPulse. City Intelligence Platform.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#fdf6f0] via-[#fce8ee] to-[#ede9f8] p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <img src="/logo.png" alt="UrbanPulse" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C2185B" }}>UrbanPulse</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Sign in to access your city intelligence dashboard</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/70 backdrop-blur rounded-xl border border-white/60 shadow-sm mb-6">
            {(["email", "phone"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === t
                    ? "bg-white shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "email" ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                {t === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Phone input */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "email" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                  {tab === "email" ? "Email address" : "Phone number"}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {tab === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </div>
                  {tab === "email" ? (
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="analyst@urbanpulse.io"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]/30 focus:border-[#C2185B]/50 placeholder:text-muted-foreground/50 transition-all"
                    />
                  ) : (
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/70 bg-white/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]/30 focus:border-[#C2185B]/50 placeholder:text-muted-foreground/50 transition-all"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/70 bg-white/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]/30 focus:border-[#C2185B]/50 placeholder:text-muted-foreground/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2.5 text-xs"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
              </motion.div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#C2185B] hover:underline">Forgot password?</button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
              style={{ background: loading ? "#aaa" : "linear-gradient(135deg, #C2185B, #9C1048)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>

            {/* Demo hint */}
            <p className="text-center text-[11px] text-muted-foreground pt-1">
              Demo: enter any email and password to sign in
            </p>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { localStorage.setItem("urbanpulse_auth", "true"); navigate("/"); }}
              className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-white/70 bg-white/80 backdrop-blur text-sm font-medium text-foreground hover:bg-white hover:shadow-sm transition-all"
            >
              {/* Google logo */}
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => { localStorage.setItem("urbanpulse_auth", "true"); navigate("/"); }}
              className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-white/70 bg-white/80 backdrop-blur text-sm font-medium text-foreground hover:bg-white hover:shadow-sm transition-all"
            >
              {/* Microsoft logo */}
              <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
