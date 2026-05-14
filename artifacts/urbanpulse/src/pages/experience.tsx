import { Layout } from "@/components/layout";
import { useListExperienceScores, useGetExperienceByZone } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const SENTIMENT_COLORS = { positive: "#6366F1", neutral: "#94a3b8", negative: "#FB923C" };

export default function Experience() {
  const { data: scores, isLoading: loadingScores } = useListExperienceScores();
  const { data: zoneScores, isLoading: loadingZoneScores } = useGetExperienceByZone();

  const sentimentCounts = scores?.reduce((acc, curr) => {
    acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sentimentData = sentimentCounts
    ? Object.entries(sentimentCounts).map(([name, value]) => ({ name, value }))
    : [];

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
          <img src="/zone-transit.png" alt="Experience" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-violet-800/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Satisfaction Tracking
            </p>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Experience Monitor
            </h1>
            <p className="text-white/70 text-xs mt-0.5">Citizen sentiment and zone experience tracking</p>
          </div>
        </motion.div>

        {/* Charts row */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Experience by Zone</CardTitle>
              <CardDescription>Average satisfaction scores across districts</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingZoneScores ? <Skeleton className="w-full h-[260px]" /> : (
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={zoneScores?.slice(0, 8)} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="zoneName" stroke="#bbb" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} domain={[0, 10]} />
                      <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }} cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }} />
                      <Bar dataKey="avgScore" name="Avg Score" radius={[6, 6, 0, 0]}>
                        {zoneScores?.slice(0, 8).map((entry, i) => (
                          <Cell key={i} fill={entry.avgScore >= 7 ? "#6366F1" : entry.avgScore >= 5 ? "#A78BFA" : "#CBD5E1"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Sentiment Mix</CardTitle>
              <CardDescription>Citizen feedback distribution</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingScores ? <Skeleton className="w-full h-[220px]" /> : (
                <div className="flex flex-col items-center gap-4">
                  <div className="h-[170px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={68} paddingAngle={4} dataKey="value">
                          {sentimentData.map((entry, i) => (
                            <Cell key={i} fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS] ?? "#ccc"} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid hsl(var(--border))" }}
                          formatter={(v: number, n: string) => [`${v} ratings`, n.charAt(0).toUpperCase() + n.slice(1)]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {sentimentData.map(s => (
                      <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS[s.name as keyof typeof SENTIMENT_COLORS] }} />
                        <span className="capitalize">{s.name}</span>
                        <span className="font-semibold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Performance table */}
        <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle>Zone Performance Matrix</CardTitle>
            <CardDescription>Detailed breakdown of experience metrics by zone</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingZoneScores ? (
              <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : (
              <div className="rounded-xl border border-border/40 overflow-hidden">
                <Table>
                  <TableHeader className="bg-pink-50/60">
                    <TableRow>
                      <TableHead>Zone</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Avg Score</TableHead>
                      <TableHead className="text-right">Ratings</TableHead>
                      <TableHead className="text-right">Positive</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zoneScores?.map((zone) => (
                      <TableRow key={zone.zoneId} className="hover:bg-pink-50/30 transition-colors">
                        <TableCell className="font-semibold">{zone.zoneName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/10">{zone.zoneType}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1 font-bold">
                            {zone.avgScore.toFixed(1)}
                            <Star className={`w-3 h-3 ${zone.avgScore >= 7 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{zone.totalRatings}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm font-medium">{(zone.positiveRatio * 100).toFixed(0)}%</span>
                            <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${zone.positiveRatio * 100}%` }} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {zone.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500 mx-auto" />}
                          {zone.trend === "down" && <TrendingDown className="w-4 h-4 text-rose-500 mx-auto" />}
                          {zone.trend === "stable" && <Minus className="w-4 h-4 text-muted-foreground mx-auto" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
