import { Layout } from "@/components/layout";
import { useListCohorts, useGetCohortAnalysis } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Users, Activity, Clock, Navigation } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COHORT_GRADIENTS = [
  "from-orange-50 to-amber-50 border-orange-100",
  "from-teal-50 to-cyan-50 border-teal-100",
  "from-rose-50 to-red-50 border-rose-100",
  "from-lime-50 to-green-50 border-lime-100",
  "from-sky-50 to-indigo-50 border-sky-100",
  "from-fuchsia-50 to-pink-50 border-fuchsia-100",
];

const BAR_COLORS = ["#E8956D", "#2A9D8F", "#E76F51", "#52B788", "#4895EF", "#C77DFF"];

export default function Cohorts() {
  const { data: cohorts, isLoading: loadingCohorts } = useListCohorts();
  const { data: analysis, isLoading: loadingAnalysis } = useGetCohortAnalysis();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Banner — warm golden park */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-2xl overflow-hidden h-36 shadow-sm"
        >
          <img src="/zone-park.png" alt="Cohorts" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/65 via-emerald-800/38 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Users className="w-3 h-3" /> Behavioral Analytics
            </p>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Cohort Intelligence
            </h1>
            <p className="text-white/70 text-xs mt-0.5">Behavioral segmentation of citizen mobility patterns</p>
          </div>
        </motion.div>

        {/* Chart */}
        <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle>Avg Daily Trips by Cohort</CardTitle>
            <CardDescription>Behavioral comparison across citizen groups</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingAnalysis ? <Skeleton className="w-full h-[240px]" /> : (
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="cohortName" stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    />
                    <Bar dataKey="avgTripsPerDay" name="Avg Trips/Day" radius={[6, 6, 0, 0]}>
                      {analysis?.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cohort Cards */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden" animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {loadingCohorts
            ? Array(6).fill(0).map((_, i) => (
                <Card key={i} className="border-white/40">
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))
            : cohorts?.map((cohort, idx) => {
                const aData = analysis?.find(a => a.cohortId === cohort.id);
                const grad = COHORT_GRADIENTS[idx % COHORT_GRADIENTS.length];
                const color = BAR_COLORS[idx % BAR_COLORS.length];
                return (
                  <motion.div key={cohort.id} variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                    <Card
                      className={`bg-gradient-to-br ${grad} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full`}
                      data-testid={`cohort-${cohort.id}`}
                    >
                      <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                              {cohort.name}
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Users className="w-3 h-3" />{cohort.citizenCount} members
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] capitalize">{cohort.behaviorType}</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { icon: Activity,   label: "Trips", value: `${cohort.avgTripsPerDay.toFixed(1)}/d` },
                            { icon: Navigation, label: "Mode",  value: cohort.primaryTransport },
                            { icon: Clock,      label: "Peak",  value: `${cohort.peakHour}:00` },
                          ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-white/70 rounded-xl p-2.5 text-center border border-white/80">
                              <Icon className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
                              <p className="text-[9px] text-muted-foreground">{label}</p>
                              <p className="text-[11px] font-bold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                            </div>
                          ))}
                        </div>

                        {aData && (
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Retention Score</span>
                              <span className="font-bold" style={{ color }}>{aData.retentionScore}/100</span>
                            </div>
                            <Progress value={aData.retentionScore} className="h-1.5" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
        </motion.div>
      </div>
    </Layout>
  );
}
