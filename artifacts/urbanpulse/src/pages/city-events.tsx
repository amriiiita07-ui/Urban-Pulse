import { Layout } from "@/components/layout";
import { useListCityEvents } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Navigation } from "lucide-react";
import { format } from "date-fns";

const IMPACT_STYLES: Record<string, { pill: string; dot: string }> = {
  high:   { pill: "bg-rose-100 text-rose-700",      dot: "bg-rose-400" },
  medium: { pill: "bg-amber-100 text-amber-700",    dot: "bg-amber-400" },
  low:    { pill: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400" },
};

const TYPE_PILL: Record<string, string> = {
  concert:    "bg-purple-100 text-purple-700",
  festival:   "bg-pink-100 text-pink-700",
  sports:     "bg-blue-100 text-blue-700",
  marathon:   "bg-teal-100 text-teal-700",
  conference: "bg-slate-100 text-slate-700",
  market:     "bg-amber-100 text-amber-700",
  education:  "bg-indigo-100 text-indigo-700",
  tour:       "bg-orange-100 text-orange-700",
};

const EVENT_THUMB: Record<string, string> = {
  concert:    "/event-concert.png",
  festival:   "/event-concert.png",
  sports:     "/event-sports.png",
  marathon:   "/event-sports.png",
  market:     "/zone-park.png",
  tour:       "/zone-transit.png",
  conference: "/zone-tech.png",
  education:  "/zone-tech.png",
};

export default function CityEvents() {
  const { data: events, isLoading } = useListCityEvents();
  const sorted = [...(events ?? [])].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans">City Events</h1>
          <p className="text-muted-foreground mt-1">Scheduled activities and their expected impact on urban mobility.</p>
        </header>

        <Card className="bg-white/70 backdrop-blur border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Chronological view of activities affecting city pulse</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <Skeleton className="w-14 h-10 rounded" />
                    <Skeleton className="w-px h-10" />
                    <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                    <Skeleton className="w-16 h-5 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="divide-y divide-border/30"
                initial="hidden" animate="show"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
              >
                {sorted.map((event) => {
                  const impact = IMPACT_STYLES[event.mobilityImpact] ?? IMPACT_STYLES.low;
                  const typePill = TYPE_PILL[event.eventType?.toLowerCase()] ?? "bg-muted text-muted-foreground";
                  const thumb = EVENT_THUMB[event.eventType?.toLowerCase()] ?? "/city-events-hero.png";

                  return (
                    <motion.div
                      key={event.id}
                      variants={{ hidden: { x: -10, opacity: 0 }, show: { x: 0, opacity: 1 } }}
                      className="flex items-center gap-4 py-3.5 px-2 hover:bg-pink-50/40 rounded-xl transition-colors group"
                    >
                      {/* Date block */}
                      <div className="flex-shrink-0 w-12 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-none">
                          {format(new Date(event.startsAt), "MMM")}
                        </p>
                        <p className="text-[22px] font-bold leading-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: "#C2185B" }}>
                          {format(new Date(event.startsAt), "d")}
                        </p>
                        <p className="text-[9px] text-muted-foreground leading-none">
                          {format(new Date(event.startsAt), "HH:mm")}
                        </p>
                      </div>

                      {/* Vertical rule */}
                      <div className="w-px h-10 bg-border/50 flex-shrink-0" />

                      {/* Small thumbnail */}
                      <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/80 shadow-sm">
                        <img
                          src={thumb}
                          alt={event.eventType}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize ${typePill}`}>
                            {event.eventType}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm leading-tight truncate">{event.name}</h3>
                        <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-[#C2185B]" />{event.zoneName}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users className="w-2.5 h-2.5" />
                            <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-medium text-foreground">
                              {event.expectedAttendance.toLocaleString()}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Impact pill */}
                      <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${impact.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${impact.dot}`} />
                        {event.mobilityImpact}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Summary row */}
        {!isLoading && events && (
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            {[
              { label: "Total Events",   value: events.length,                                                        icon: Calendar,   color: "bg-pink-50 border-pink-100" },
              { label: "High Impact",    value: events.filter(e => e.mobilityImpact === "high").length,               icon: Navigation, color: "bg-rose-50 border-rose-100" },
              { label: "Total Expected", value: events.reduce((s, e) => s + e.expectedAttendance, 0).toLocaleString(), icon: Users,      color: "bg-amber-50 border-amber-100" },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className={`${color} border shadow-sm`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-lg font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
