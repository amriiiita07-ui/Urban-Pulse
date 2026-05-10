import { Layout } from "@/components/layout";
import { useListAnomalies } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const SEVERITY_META: Record<string, { topBar: string; badge: string; badgeText: string; bg: string }> = {
  critical: { topBar: "bg-rose-500",   badge: "bg-rose-100",   badgeText: "text-rose-700",   bg: "bg-rose-50/40" },
  high:     { topBar: "bg-orange-400", badge: "bg-orange-100", badgeText: "text-orange-700", bg: "bg-orange-50/40" },
  medium:   { topBar: "bg-amber-400",  badge: "bg-amber-100",  badgeText: "text-amber-700",  bg: "bg-amber-50/30" },
  low:      { topBar: "bg-emerald-400",badge: "bg-emerald-100",badgeText: "text-emerald-700",bg: "bg-emerald-50/30" },
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
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-sans">Anomaly Detection</h1>
            <p className="text-muted-foreground mt-1">AI-driven detection of unusual mobility patterns.</p>
          </div>
          {!isLoading && (
            <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> {activeCount} Active Alerts
            </span>
          )}
        </header>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden" animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
        >
          {isLoading
            ? Array(6).fill(0).map((_, i) => <Card key={i} className="border-white/40"><CardContent className="p-4 space-y-3"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-16 w-full" /><Skeleton className="h-4 w-full" /></CardContent></Card>)
            : anomalies?.map((anomaly) => {
                const meta = SEVERITY_META[anomaly.severity] ?? SEVERITY_META.low;
                return (
                  <motion.div key={anomaly.id} variants={{ hidden: { scale: 0.96, opacity: 0 }, show: { scale: 1, opacity: 1 } }}>
                    <div
                      className={`relative rounded-2xl overflow-hidden border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${meta.bg} ${anomaly.resolved ? "opacity-60" : ""}`}
                      data-testid={`anomaly-${anomaly.id}`}
                    >
                      {/* Severity bar */}
                      <div className={`h-1.5 w-full ${meta.topBar}`} />

                      <div className="p-5 flex flex-col gap-3 flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm leading-tight capitalize">{anomaly.anomalyType.replace("_", " ")}</h3>
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
                        <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between border border-white/80">
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            <Activity className="w-3.5 h-3.5 text-muted-foreground" /> Risk Score
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-white/80 rounded-full overflow-hidden border border-border/30">
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
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(anomaly.detectedAt), "MMM d, HH:mm")}</span>
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
