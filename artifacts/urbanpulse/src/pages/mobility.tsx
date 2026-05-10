import { Layout } from "@/components/layout";
import { useListMobilityEvents, useGetCrowdingForecast } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, MapPin, Activity } from "lucide-react";
import { format } from "date-fns";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const TRANSPORT_COLORS: Record<string, { bg: string, text: string }> = {
  subway: { bg: 'bg-blue-100', text: 'text-blue-700' },
  bus: { bg: 'bg-orange-100', text: 'text-orange-700' },
  bicycle: { bg: 'bg-green-100', text: 'text-green-700' },
  walking: { bg: 'bg-teal-100', text: 'text-teal-700' },
  rideshare: { bg: 'bg-purple-100', text: 'text-purple-700' },
  'e-scooter': { bg: 'bg-pink-100', text: 'text-pink-700' }
};

const CROWDING_COLORS: Record<string, string> = {
  low: 'border-emerald-200 text-emerald-700 bg-emerald-50',
  medium: 'border-amber-200 text-amber-700 bg-amber-50',
  high: 'border-rose-200 text-rose-700 bg-rose-50'
};

export default function Mobility() {
  const { data: events, isLoading: loadingEvents } = useListMobilityEvents({ limit: 20 });
  const { data: forecast, isLoading: loadingForecast } = useGetCrowdingForecast();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  // Group forecast by hour
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
          <h1 className="text-3xl font-bold font-sans text-foreground">Mobility Feed</h1>
          <p className="text-muted-foreground mt-1">Real-time transport events and crowding forecasts.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
              <CardHeader>
                <CardTitle>City-Wide Crowding Forecast</CardTitle>
                <CardDescription>Predicted vs historical crowding levels by hour</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingForecast ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}:00`} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        />
                        <Line type="monotone" dataKey="forecastedCrowding" name="Forecast" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="historicalAvg" name="Historical Avg" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm h-full flex flex-col">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Live feed of mobility interactions</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto max-h-[600px] pr-2">
                {loadingEvents ? (
                  <div className="space-y-4">
                    {Array(6).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {events?.map((event) => (
                      <motion.div key={event.id} variants={itemVariants} className="flex flex-col p-3 rounded-lg border bg-card/50 gap-2 hover:bg-white/80 transition-colors">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`border-transparent ${TRANSPORT_COLORS[event.transportMode]?.bg} ${TRANSPORT_COLORS[event.transportMode]?.text}`}>
                            {event.transportMode}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {format(new Date(event.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-sm font-medium">
                            <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                            {event.zoneName}
                          </div>
                          <Badge variant="outline" className={`${CROWDING_COLORS[event.crowdingLevel] || 'border-gray-200 text-gray-700 bg-gray-50'}`}>
                            {event.crowdingLevel} crowding
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          Duration: {event.durationMins} mins
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
