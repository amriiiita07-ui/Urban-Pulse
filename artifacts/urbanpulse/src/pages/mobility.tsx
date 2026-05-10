import { Layout } from "@/components/layout";
import { useListMobilityEvents, useGetCrowdingForecast } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Clock, MapPin, Activity } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TRANSPORT_PILL: Record<string, string> = {
  subway:     "bg-blue-100 text-blue-700",
  bus:        "bg-orange-100 text-orange-700",
  bicycle:    "bg-green-100 text-green-700",
  walking:    "bg-teal-100 text-teal-700",
  rideshare:  "bg-purple-100 text-purple-700",
  "e-scooter":"bg-pink-100 text-pink-700",
};

const CROWDING_PILL: Record<string, string> = {
  low:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  high:   "bg-rose-50 text-rose-700 border border-rose-200",
};

export default function Mobility() {
  const { data: events, isLoading: loadingEvents } = useListMobilityEvents({ limit: 20 });
  const { data: forecast, isLoading: loadingForecast } = useGetCrowdingForecast();

  const hourlyForecast = forecast?.reduce((acc, curr) => {
    const existing = acc.find(item => item.hour === curr.hour);
    if (existing) {
      existing.forecastedCrowding += curr.forecastedCrowding;
      existing.historicalAvg += curr.historicalAvg;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as any[])?.sort((a, b) => a.hour - b.hour) || [];

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans">Mobility Feed</h1>
          <p className="text-muted-foreground mt-1">Real-time transport events and crowding forecasts.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Forecast Chart */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur border-white/50 shadow-sm">
            <CardHeader>
              <CardTitle>City-Wide Crowding Forecast</CardTitle>
              <CardDescription>Predicted vs historical crowding levels by hour</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingForecast ? <Skeleton className="w-full h-[300px]" /> : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyForecast}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}:00`} />
                      <YAxis stroke="#bbb" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="forecastedCrowding" name="Forecast" stroke="#C2185B" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="historicalAvg" name="Historical Avg" stroke="#D4A017" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Event Feed */}
          <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle>Live Events</CardTitle>
              <CardDescription>Latest mobility interactions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto max-h-[360px] space-y-2 pr-1">
              {loadingEvents ? Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />) : (
                <motion.div
                  className="space-y-2"
                  initial="hidden" animate="show"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
                >
                  {events?.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={{ hidden: { x: -12, opacity: 0 }, show: { x: 0, opacity: 1 } }}
                      className="flex flex-col gap-1.5 p-3 rounded-xl bg-pink-50/60 border border-pink-100 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TRANSPORT_PILL[event.transportMode] ?? "bg-muted text-muted-foreground"}`}>
                          {event.transportMode}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {format(new Date(event.timestamp), "HH:mm")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C2185B]" />{event.zoneName}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${CROWDING_PILL[event.crowdingLevel] ?? ""}`}>
                          {event.crowdingLevel}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5" /> {event.durationMins} mins
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
