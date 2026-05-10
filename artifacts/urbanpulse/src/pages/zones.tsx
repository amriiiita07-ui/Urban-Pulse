import { Layout } from "@/components/layout";
import { useListZones, useGetZoneHeatmap } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Users, Activity, Zap } from "lucide-react";

const ZONE_IMAGES: Record<string, string> = {
  transit: "/zone-transit.png",
  recreational: "/zone-park.png",
  commercial: "/zone-tech.png",
  mixed: "/zone-tech.png",
  educational: "/zone-park.png",
  industrial: "/zone-transit.png",
};

const ZONE_BADGE_COLORS: Record<string, string> = {
  transit: "bg-blue-500/90",
  recreational: "bg-emerald-500/90",
  commercial: "bg-amber-500/90",
  mixed: "bg-purple-500/90",
  educational: "bg-teal-500/90",
  industrial: "bg-slate-500/90",
};

export default function Zones() {
  const { data: zones, isLoading: loadingZones } = useListZones();
  const { data: heatmap, isLoading: loadingHeatmap } = useGetZoneHeatmap();

  const getHeatmapData = (zoneId: number) => heatmap?.find(h => h.zoneId === zoneId);

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">Zones Explorer</h1>
          <p className="text-muted-foreground mt-1">Detailed breakdown of city districts and activity intensity.</p>
        </header>

        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        >
          {loadingZones || loadingHeatmap
            ? Array(8).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden border-white/40">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full mt-3" />
                  </div>
                </Card>
              ))
            : zones?.map((zone) => {
                const hData = getHeatmapData(zone.id);
                const img = ZONE_IMAGES[zone.zoneType] || "/city-hero.png";
                const badgeBg = ZONE_BADGE_COLORS[zone.zoneType] || "bg-gray-500/90";
                const intensity = hData ? hData.intensity * 100 : 0;

                return (
                  <motion.div
                    key={zone.id}
                    variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  >
                    <Card
                      className="overflow-hidden border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur h-full flex flex-col"
                      data-testid={`zone-card-${zone.id}`}
                    >
                      {/* Photo thumbnail */}
                      <div className="relative h-40 overflow-hidden flex-shrink-0">
                        <img
                          src={img}
                          alt={zone.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className={`absolute top-3 right-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full ${badgeBg} backdrop-blur-sm`}>
                          {zone.zoneType}
                        </span>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-bold text-base leading-tight drop-shadow-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {zone.name}
                          </h3>
                          <p className="text-white/80 text-[11px] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5" /> {zone.district}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-pink-50 rounded-lg p-2.5 flex flex-col gap-0.5">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Activity className="w-3 h-3" /> Activity</span>
                            <span className="text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {hData?.activityCount.toLocaleString() || '—'}
                            </span>
                          </div>
                          <div className="bg-amber-50 rounded-lg p-2.5 flex flex-col gap-0.5">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> Density</span>
                            <span className="text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {zone.populationDensity?.toLocaleString() || '—'}
                            </span>
                          </div>
                        </div>

                        {hData && (
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Heatmap Intensity</span>
                              <span className="font-semibold text-[#C2185B]">{intensity.toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#C2185B]/60 to-[#C2185B]"
                                initial={{ width: 0 }}
                                animate={{ width: `${intensity}%` }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                              />
                            </div>
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
