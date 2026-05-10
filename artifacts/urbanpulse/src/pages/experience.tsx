import { Layout } from "@/components/layout";
import { useListExperienceScores, useGetExperienceByZone } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";

export default function Experience() {
  const { data: scores, isLoading: loadingScores } = useListExperienceScores();
  const { data: zoneScores, isLoading: loadingZoneScores } = useGetExperienceByZone();

  // Aggregate sentiment
  const sentimentCounts = scores?.reduce((acc, curr) => {
    acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sentimentData = sentimentCounts ? Object.entries(sentimentCounts).map(([name, value]) => ({ name, value })) : [];
  const SENTIMENT_COLORS = { positive: '#34d399', neutral: '#94a3b8', negative: '#f87171' };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">Experience Monitor</h1>
          <p className="text-muted-foreground mt-1">Citizen sentiment and zone experience tracking.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Experience by Zone</CardTitle>
              <CardDescription>Average satisfaction scores across districts</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingZoneScores ? (
                <Skeleton className="w-full h-[300px]" />
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={zoneScores?.slice(0, 8)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="zoneName" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                      />
                      <Bar dataKey="avgScore" name="Avg Score" radius={[4, 4, 0, 0]}>
                        {zoneScores?.slice(0, 8).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="hsl(var(--primary))" opacity={entry.avgScore > 7 ? 0.9 : entry.avgScore > 5 ? 0.6 : 0.4} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
            <CardHeader>
              <CardTitle>Overall Sentiment</CardTitle>
              <CardDescription>Distribution of citizen feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingScores ? (
                <Skeleton className="w-full h-[250px]" />
              ) : (
                <div className="h-[250px] w-full flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS] || '#ccc'} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        formatter={(value: number, name: string) => [`${value} ratings`, name.charAt(0).toUpperCase() + name.slice(1)]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-4">
                    {sentimentData.map(s => (
                      <div key={s.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS[s.name as keyof typeof SENTIMENT_COLORS] }}></div>
                        <span className="capitalize text-muted-foreground">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
          <CardHeader>
            <CardTitle>Zone Performance Matrix</CardTitle>
            <CardDescription>Detailed breakdown of experience metrics by zone</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingZoneScores ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <div className="rounded-md border border-border/50 overflow-hidden bg-white/40">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Zone</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Avg Score</TableHead>
                      <TableHead className="text-right">Total Ratings</TableHead>
                      <TableHead className="text-right">Positive Ratio</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zoneScores?.map((zone) => (
                      <TableRow key={zone.zoneId} className="hover:bg-white/60 transition-colors">
                        <TableCell className="font-medium">{zone.zoneName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/10">
                            {zone.zoneType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 font-semibold">
                            {zone.avgScore.toFixed(1)}
                            <Star className={`w-3 h-3 ${zone.avgScore >= 7 ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{zone.totalRatings}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm">{(zone.positiveRatio * 100).toFixed(0)}%</span>
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-400 rounded-full" 
                                style={{ width: `${zone.positiveRatio * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {zone.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                            {zone.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
                            {zone.trend === 'stable' && <Minus className="w-4 h-4 text-muted-foreground" />}
                          </div>
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
