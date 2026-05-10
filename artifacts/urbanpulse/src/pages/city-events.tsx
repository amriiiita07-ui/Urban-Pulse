import { Layout } from "@/components/layout";
import { useListCityEvents } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Users, Navigation } from "lucide-react";
import { format } from "date-fns";

const IMPACT_COLORS: Record<string, string> = {
  high: 'bg-rose-100 text-rose-700 border-rose-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200'
};

export default function CityEvents() {
  const { data: events, isLoading: loadingEvents } = useListCityEvents();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">City Events</h1>
          <p className="text-muted-foreground mt-1">Scheduled events and their expected impact on urban mobility.</p>
        </header>

        <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Events Timeline</CardTitle>
            <CardDescription>Chronological view of activities affecting city pulse</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingEvents ? (
              <div className="space-y-6">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <motion.div 
                className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {events?.map((event, index) => (
                  <motion.div key={event.id} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card/80 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground text-[10px] uppercase tracking-wider">
                            {event.eventType}
                          </Badge>
                          <span className="text-xs font-semibold text-primary">
                            {format(new Date(event.startsAt), 'MMM d, HH:mm')}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-lg leading-tight">{event.name}</h3>
                        
                        <div className="flex flex-col gap-1.5 mt-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 mr-2 shrink-0" />
                            {event.zoneName}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-3.5 h-3.5 mr-2 shrink-0" />
                            {event.expectedAttendance.toLocaleString()} expected
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Navigation className="w-3 h-3 mr-1" />
                            Mobility Impact
                          </span>
                          <Badge variant="outline" className={`${IMPACT_COLORS[event.mobilityImpact]} capitalize text-[10px]`}>
                            {event.mobilityImpact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
