import { Layout } from "@/components/layout";
import { useListCohorts, useGetCohortAnalysis } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Users, Activity, Clock, Navigation } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

export default function Cohorts() {
  const { data: cohorts, isLoading: loadingCohorts } = useListCohorts();
  const { data: analysis, isLoading: loadingAnalysis } = useGetCohortAnalysis();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">Cohort Intelligence</h1>
          <p className="text-muted-foreground mt-1">Behavioral analysis of citizen mobility patterns.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm col-span-2">
            <CardHeader>
              <CardTitle>Cohort Trip Analysis</CardTitle>
              <CardDescription>Average daily trips by behavioral cohort</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAnalysis ? (
                <Skeleton className="w-full h-[300px]" />
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="cohortName" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                      />
                      <Bar dataKey="avgTripsPerDay" name="Avg Trips/Day" radius={[4, 4, 0, 0]}>
                        {analysis?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="hsl(var(--primary))" opacity={0.8 + (index * 0.05)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loadingCohorts ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/50 backdrop-blur border-white/20">
                <CardHeader>
                  <Skeleton className="h-5 w-2/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))
          ) : cohorts ? (
            cohorts.map((cohort) => {
              const aData = analysis?.find(a => a.cohortId === cohort.id);
              return (
                <motion.div key={cohort.id} variants={itemVariants}>
                  <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm hover:shadow-md transition-all duration-300 h-full" data-testid={`cohort-${cohort.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{cohort.name}</CardTitle>
                          <CardDescription className="mt-1 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {cohort.citizenCount.toLocaleString()} members
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          {cohort.behaviorType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col bg-muted/30 p-2 rounded">
                            <span className="text-muted-foreground text-xs flex items-center"><Activity className="w-3 h-3 mr-1"/>Avg Trips</span>
                            <span className="font-semibold mt-1">{cohort.avgTripsPerDay.toFixed(1)}/day</span>
                          </div>
                          <div className="flex flex-col bg-muted/30 p-2 rounded">
                            <span className="text-muted-foreground text-xs flex items-center"><Navigation className="w-3 h-3 mr-1"/>Primary</span>
                            <span className="font-semibold mt-1 capitalize">{cohort.primaryTransport}</span>
                          </div>
                          <div className="flex flex-col bg-muted/30 p-2 rounded col-span-2">
                            <span className="text-muted-foreground text-xs flex items-center"><Clock className="w-3 h-3 mr-1"/>Peak Hour</span>
                            <span className="font-semibold mt-1">{cohort.peakHour}:00</span>
                          </div>
                        </div>

                        {aData && (
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Retention Score</span>
                              <span className="font-bold text-primary">{aData.retentionScore}/100</span>
                            </div>
                            <Progress value={aData.retentionScore} className="h-2" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">No cohorts found.</div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
