import { Layout } from "@/components/layout";
import {
  useGetDashboardSummary,
  useGetMobilityTrends,
  useGetTopZones,
  useGetTransportSplit,
  useGetAnomaliesSummary,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Users, Map, Navigation, Star, AlertTriangle, ShieldAlert } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";

const TRANSPORT_COLORS: Record<string, string> = {
  subway: '#3B82F6',
  bus: '#F97316',
  bicycle: '#22C55E',
  walking: '#14B8A6',
  rideshare: '#A855F7',
  'e-scooter': '#EC4899'
};

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: trends, isLoading: loadingTrends } = useGetMobilityTrends();
  const { data: topZones, isLoading: loadingZones } = useGetTopZones();
  const { data: transportSplit, isLoading: loadingSplit } = useGetTransportSplit();
  const { data: anomalies, isLoading: loadingAnomalies } = useGetAnomaliesSummary();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">City Intelligence</h1>
          <p className="text-muted-foreground mt-1">Real-time mobility and experience analytics.</p>
        </header>

        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loadingSummary ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/50 backdrop-blur border-white/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : summary ? (
            <>
              <KpiCard title="Total Citizens" value={summary.totalCitizens.toLocaleString()} icon={Users} testId="kpi-citizens" />
              <KpiCard title="Active Zones" value={summary.totalZones.toLocaleString()} icon={Map} testId="kpi-zones" />
              <KpiCard title="Mobility Events Today" value={summary.mobilityEventsToday.toLocaleString()} icon={Navigation} testId="kpi-mobility" />
              <KpiCard title="Avg Experience Score" value={summary.avgExperienceScore.toFixed(1)} icon={Star} testId="kpi-experience" />
              <KpiCard title="Active Infra Issues" value={summary.activeInfraIssues.toString()} icon={AlertTriangle} testId="kpi-infra" />
              <KpiCard title="Crowding Alerts" value={summary.crowdingAlerts.toString()} icon={ShieldAlert} testId="kpi-crowding" />
            </>
          ) : null}
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-white/60 backdrop-blur border-white/40 shadow-sm">
            <CardHeader>
              <CardTitle>Mobility Trends</CardTitle>
              <CardDescription>Hourly mobility events across all transport modes</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {loadingTrends ? (
                <Skeleton className="w-full h-[300px]" />
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends}>
                      <defs>
                        <linearGradient id="colorEvent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}:00`} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="eventCount" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEvent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-white/60 backdrop-blur border-white/40 shadow-sm">
            <CardHeader>
              <CardTitle>Transport Split</CardTitle>
              <CardDescription>Distribution of trips by transport mode</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSplit ? (
                <Skeleton className="w-full h-[300px]" />
              ) : (
                <div className="h-[300px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transportSplit}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {transportSplit?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TRANSPORT_COLORS[entry.transportMode] || 'hsl(var(--primary))'} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                        formatter={(value: number, name: string, props: any) => [`${value} trips`, props.payload.transportMode]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
            <CardHeader>
              <CardTitle>Top Zones</CardTitle>
              <CardDescription>Highest activity districts</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingZones ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {topZones?.map((zone) => (
                    <div key={zone.zoneId} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {zone.rank}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{zone.zoneName}</p>
                          <p className="text-xs text-muted-foreground">{zone.district}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{zone.activityCount.toLocaleString()} trips</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {zone.avgExperienceScore.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Anomalies</CardTitle>
              <CardDescription>Latest alerts and unusual activities</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAnomalies ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {anomalies?.slice(0, 5).map((anomaly) => (
                    <div key={anomaly.id} className="flex flex-col p-3 rounded-lg border bg-card/50 gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-destructive" />
                          <span className="text-sm font-medium">{anomaly.zoneName}</span>
                        </div>
                        <Badge variant={anomaly.severity === 'critical' ? 'destructive' : 'secondary'} className="text-[10px]">
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{anomaly.description}</p>
                    </div>
                  ))}
                  {anomalies?.length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-4">No recent anomalies detected.</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function KpiCard({ title, value, icon: Icon, testId }: { title: string, value: string | number, icon: any, testId?: string }) {
  return (
    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm hover:shadow-md transition-all duration-300" data-testid={testId}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-sans">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
