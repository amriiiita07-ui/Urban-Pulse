import { Layout } from "@/components/layout";
import { useListZones, useGetZoneHeatmap } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Users, Star, Activity } from "lucide-react";

export default function Zones() {
  const { data: zones, isLoading: loadingZones } = useListZones();
  const { data: heatmap, isLoading: loadingHeatmap } = useGetZoneHeatmap();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const getHeatmapData = (zoneId: number) => {
    return heatmap?.find(h => h.zoneId === zoneId);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">Zones Explorer</h1>
          <p className="text-muted-foreground mt-1">Detailed breakdown of city districts and activity intensity.</p>
        </header>

        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loadingZones || loadingHeatmap ? (
            Array(8).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/50 backdrop-blur border-white/20">
                <CardHeader>
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3 mt-2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : zones ? (
            zones.map((zone) => {
              const hData = getHeatmapData(zone.id);
              return (
                <motion.div key={zone.id} variants={itemVariants}>
                  <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col" data-testid={`zone-card-${zone.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{zone.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {zone.district}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {zone.zoneType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="flex flex-col gap-1 bg-muted/50 p-2 rounded-md">
                          <span className="text-xs text-muted-foreground flex items-center"><Activity className="w-3 h-3 mr-1"/> Activity</span>
                          <span className="text-sm font-semibold">{hData?.activityCount.toLocaleString() || '0'}</span>
                        </div>
                        <div className="flex flex-col gap-1 bg-muted/50 p-2 rounded-md">
                          <span className="text-xs text-muted-foreground flex items-center"><Users className="w-3 h-3 mr-1"/> Density</span>
                          <span className="text-sm font-semibold">{zone.populationDensity?.toLocaleString() || 'N/A'}</span>
                        </div>
                      </div>
                      {hData && (
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Heatmap Intensity</span>
                            <span className="font-medium text-primary">{(hData.intensity * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary/40 to-primary rounded-full" 
                              style={{ width: `${hData.intensity * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">No zones found.</div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
