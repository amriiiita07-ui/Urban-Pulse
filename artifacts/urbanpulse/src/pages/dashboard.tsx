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
import { Users, Map, Navigation, Star, AlertTriangle, ShieldAlert, TrendingUp, Clock } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";

const TRANSPORT_COLORS: Record<string, string> = {
  subway: '#D4A017',
  bus: '#E8B86D',
  bicycle: '#C97C5D',
  walking: '#B5874A',
  rideshare: '#E8C99A',
  'e-scooter': '#F2A6A6'
};

const KPI_CONFIG = [
  { key: "totalCitizens", title: "Total Citizens", icon: Users, gradient: "from-rose-100 to-pink-50", iconBg: "bg-rose-100", iconColor: "text-rose-500" },
  { key: "totalZones", title: "Active Zones", icon: Map, gradient: "from-amber-100 to-yellow-50", iconBg: "bg-amber-100", iconColor: "text-amber-500" },
  { key: "mobilityEventsToday", title: "Mobility Events Today", icon: Navigation, gradient: "from-pink-100 to-rose-50", iconBg: "bg-pink-100", iconColor: "text-pink-500" },
  { key: "avgExperienceScore", title: "Avg Experience Score", icon: Star, gradient: "from-amber-100 to-orange-50", iconBg: "bg-amber-100", iconColor: "text-amber-500" },
  { key: "activeInfraIssues", title: "Active Infra Issues", icon: AlertTriangle, gradient: "from-red-100 to-pink-50", iconBg: "bg-red-100", iconColor: "text-red-400" },
  { key: "crowdingAlerts", title: "Crowding Alerts", icon: ShieldAlert, gradient: "from-orange-100 to-amber-50", iconBg: "bg-orange-100", iconColor: "text-orange-400" },
];

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: trends, isLoading: loadingTrends } = useGetMobilityTrends();
  const { data: topZones, isLoading: loadingZones } = useGetTopZones();
  const { data: transportSplit, isLoading: loadingSplit } = useGetTransportSplit();
  const { data: anomalies, isLoading: loadingAnomalies } = useGetAnomaliesSummary();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const getKpiValue = (key: string) => {
    if (!summary) return "—";
    const v = (summary as any)[key];
    if (key === "avgExperienceScore") return Number(v).toFixed(1);
    return Number(v).toLocaleString();
  };

  return (
    <Layout>
      <div className="space-y-8">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden h-52 shadow-lg"
        >
          <img
            src="/city-hero.png"
            alt="City aerial"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#1e3a5f]/55 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-8">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {dateStr}
            </p>
            <h1 className="text-4xl font-bold text-white drop-shadow-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              City Intelligence
            </h1>
            <p className="text-white/80 text-sm mt-1">Real-time mobility and urban experience analytics</p>
            <div className="flex gap-4 mt-4">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                {summary?.totalZones ?? "—"} Active Zones
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Live Data
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                {summary?.crowdingAlerts ?? "—"} Alerts Active
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {loadingSummary
            ? Array(6).fill(0).map((_, i) => (
                <Card key={i} className="border-white/40">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </CardHeader>
                  <CardContent><Skeleton className="h-8 w-1/2" /></CardContent>
                </Card>
              ))
            : KPI_CONFIG.map(({ key, title, icon: Icon, gradient, iconBg, iconColor }) => (
                <motion.div key={key} variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                  <Card className={`bg-gradient-to-br ${gradient} border-white/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <p className="text-sm font-medium text-muted-foreground">{title}</p>
                      <div className={`${iconBg} p-2 rounded-xl`}>
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {getKpiValue(key)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Mobility Trends</CardTitle>
              <CardDescription>Hourly mobility events across all transport modes</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {loadingTrends ? (
                <Skeleton className="w-full h-[280px]" />
              ) : (
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends}>
                      <defs>
                        <linearGradient id="colorEvent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C2185B" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#C2185B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="hour" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}:00`} />
                      <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} labelStyle={{ fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="eventCount" stroke="#C2185B" strokeWidth={2} fillOpacity={1} fill="url(#colorEvent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Transport Split</CardTitle>
              <CardDescription>Distribution of trips by mode</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSplit ? (
                <Skeleton className="w-full h-[280px]" />
              ) : (
                <div className="h-[280px] w-full flex flex-col items-center justify-center gap-3">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={transportSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={4} dataKey="count">
                        {transportSplit?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TRANSPORT_COLORS[entry.transportMode] || '#D4A017'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid hsl(var(--border))' }} formatter={(value: number, name: string, props: any) => [`${value} trips`, props.payload.transportMode]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 px-2">
                    {transportSplit?.map((entry) => (
                      <span key={entry.transportMode} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: TRANSPORT_COLORS[entry.transportMode] || '#D4A017' }} />
                        {entry.transportMode}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Top Zones */}
          <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Top Zones</CardTitle>
              <CardDescription>Highest activity districts</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingZones ? (
                <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : (
                <div className="space-y-2">
                  {topZones?.map((zone) => (
                    <div key={zone.zoneId} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#C2185B]/20 to-[#C2185B]/10 text-[#C2185B] font-bold text-sm group-hover:from-[#C2185B]/30 transition-colors">
                          {zone.rank}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight">{zone.zoneName}</p>
                          <p className="text-xs text-muted-foreground">{zone.district}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{zone.activityCount.toLocaleString()} trips</div>
                        <div className="text-xs text-amber-500 flex items-center justify-end gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {zone.avgExperienceScore.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Anomalies */}
          <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Anomalies</CardTitle>
              <CardDescription>Latest alerts and unusual activities</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAnomalies ? (
                <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
              ) : (
                <div className="space-y-3">
                  {anomalies?.slice(0, 5).map((anomaly) => {
                    const severityMap: Record<string, string> = {
                      critical: 'bg-red-50 border-red-200',
                      high: 'bg-orange-50 border-orange-200',
                      medium: 'bg-amber-50 border-amber-200',
                      low: 'bg-pink-50 border-pink-200',
                    };
                    const badgeMap: Record<string, string> = {
                      critical: 'bg-red-100 text-red-700',
                      high: 'bg-orange-100 text-orange-700',
                      medium: 'bg-amber-100 text-amber-700',
                      low: 'bg-pink-100 text-pink-600',
                    };
                    return (
                      <div key={anomaly.id} className={`flex flex-col p-3 rounded-xl border ${severityMap[anomaly.severity] || 'bg-muted/30 border-border'} gap-1.5`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-500" />
                            <span className="text-sm font-semibold">{anomaly.zoneName}</span>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeMap[anomaly.severity] || 'bg-muted text-muted-foreground'}`}>
                            {anomaly.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 pl-6">{anomaly.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
