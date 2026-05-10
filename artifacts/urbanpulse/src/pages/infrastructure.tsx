import { Layout } from "@/components/layout";
import { useListInfrastructureReports, useGetInfraReportsByType } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Hammer, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

const SEVERITY_LEFT: Record<string, string> = {
  critical: "border-l-rose-500",
  high:     "border-l-orange-400",
  medium:   "border-l-amber-400",
  low:      "border-l-emerald-400",
};

const SEVERITY_BADGE: Record<string, string> = {
  critical: "bg-rose-100 text-rose-700",
  high:     "bg-orange-100 text-orange-700",
  medium:   "bg-amber-100 text-amber-700",
  low:      "bg-emerald-100 text-emerald-700",
};

const STATUS_META: Record<string, { icon: any; color: string; label: string }> = {
  open:         { icon: AlertTriangle,  color: "text-rose-500",    label: "Open" },
  "in-progress":{ icon: Hammer,         color: "text-amber-500",   label: "In Progress" },
  resolved:     { icon: CheckCircle2,   color: "text-emerald-500", label: "Resolved" },
};

export default function Infrastructure() {
  const { data: reports, isLoading: loadingReports } = useListInfrastructureReports();
  const { data: reportStats, isLoading: loadingStats } = useGetInfraReportsByType();

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans">Infrastructure Reports</h1>
          <p className="text-muted-foreground mt-1">City-wide maintenance and structural issues tracking.</p>
        </header>

        {/* Stacked bar */}
        <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle>Issues by Type & Status</CardTitle>
            <CardDescription>Current pipeline of reported infrastructure problems</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="w-full h-[260px]" /> : (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportStats} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="issueType" stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }} cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="open" name="Open" stackId="a" fill="#f87171" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#D4A017" />
                    <Bar dataKey="resolved" name="Resolved" stackId="a" fill="#34d399" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report list */}
        <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest infrastructure issues submitted</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingReports ? (
              <div className="grid gap-3 md:grid-cols-2">{Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
            ) : (
              <motion.div
                className="grid gap-3 md:grid-cols-2"
                initial="hidden" animate="show"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
              >
                {reports?.map((report) => {
                  const status = STATUS_META[report.status] ?? STATUS_META.open;
                  const StatusIcon = status.icon;
                  return (
                    <motion.div
                      key={report.id}
                      variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                      className={`flex flex-col gap-2.5 p-4 rounded-xl border-l-4 bg-white/80 border border-border/40 shadow-sm hover:shadow-md transition-all ${SEVERITY_LEFT[report.severity] ?? "border-l-gray-300"}`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm capitalize">{report.issueType.replace("_", " ")}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${SEVERITY_BADGE[report.severity] ?? "bg-muted text-muted-foreground"}`}>
                          {report.severity}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-[#C2185B]" />{report.zoneName}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />{status.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />{format(new Date(report.reportedAt), "MMM d, HH:mm")}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
