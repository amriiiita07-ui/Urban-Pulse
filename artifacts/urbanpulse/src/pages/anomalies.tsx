import { Layout } from "@/components/layout";
import { useListAnomalies } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const SEVERITY_META: Record<string, { topBar: string; badge: string; badgeText: string; bg: string }> = {
  critical: { topBar: "bg-rose-500",    badge: "bg-rose-100",    badgeText: "text-rose-700",    bg: "bg-rose-50/40" },
  high:     { topBar: "bg-orange-400",  badge: "bg-orange-100",  badgeText: "text-orange-700",  bg: "bg-orange-50/40" },
  medium:   { topBar: "bg-amber-400",   badge: "bg-amber-100",   badgeText: "text-amber-700",   bg: "bg-amber-50/30" },
  low:      { topBar: "bg-emerald-400", badge: "bg-emerald-100", badgeText: "text-emerald-700", bg: "bg-emerald-50/30" },
};

const RISK_BAR: Record<string, string> = {
  critical: "bg-rose-500",
  high:     "bg-orange-400",
  medium:   "bg-amber-400",
  low:      "bg-emerald-400",
};

export default function Anomalies() {
  const { data: anomalies, isLoading } = useListAnomalies();
  const activeCount = anomalies?.filter(a => !a.resolved).length ?? 0;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Elegant image header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-2xl overflow-hidden h-36 shadow-sm"
        >
          <img src="/city-hero.png" alt="Anomaly Detection" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-950/70 via-rose-900/45 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" /> AI-Driven Detection
            </p>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Anomaly Detection
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <p className="text-white/70 text-xs">Unusual mobility patterns and urban risk signals</p>
              {!isLoading && (
                <span className="bg-rose-500/80 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  {activeCount} Active
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Alert grid */}
        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden" animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
        >
          {isLoading
            ? Array(6).fill(0).map((_, i) => (
                <Card key={i} className="border-white/40">
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))
            : anomalies?.map((anomaly) => {
                const meta = SEVERITY_META[anomaly.severity] ?? SEVERITY_META.low;
                return (
                  <motion.div key={anomaly.id} variants={{ hidden: { scale: 0.96, opacity: 0 }, show: { scale: 1, opacity: 1 } }}>
                    <div
                      className={`relative rounded-2xl overflow-hidden border border-white/50 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${anomaly.resolved ? "opacity-55" : ""}`}
                      data-testid={`anomaly-${anomaly.id}`}
                    >
                      {/* Severity colour bar */}
                      <div className={`h-1 w-full ${meta.topBar}`} />

                      <div className={`p-5 flex flex-col gap-3 flex-1 ${meta.bg}`}>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm leading-tight capitalize">
                              {anomaly.anomalyType.replace("_", " ")}
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#C2185B]" />{anomaly.zoneName}
                            </p>
                          </div>
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${meta.badge} ${meta.badgeText}`}>
                            {anomaly.severity}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">{anomaly.description}</p>

                        {/* Risk score */}
                        <div className="bg-white/80 rounded-xl p-3 flex items-center justify-between border border-white/90">
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            <Activity className="w-3.5 h-3.5 text-muted-foreground" /> Risk Score
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${RISK_BAR[anomaly.severity] ?? "bg-gray-400"}`}
                                style={{ width: `${anomaly.riskScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold w-5 text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {anomaly.riskScore}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{format(new Date(anomaly.detectedAt), "MMM d, HH:mm")}
                          </span>
                          {anomaly.resolved && (
                            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Resolved
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </motion.div>
      </div>
    </Layout>
  );
}
