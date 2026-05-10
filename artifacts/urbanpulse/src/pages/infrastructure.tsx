import { Layout } from "@/components/layout";
import { useListInfrastructureReports, useGetInfraReportsByType } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Hammer, CheckCircle2 } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { format } from "date-fns";

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-rose-100 text-rose-700 border-rose-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200'
};

const STATUS_ICONS: Record<string, any> = {
  open: AlertTriangle,
  'in-progress': Hammer,
  resolved: CheckCircle2
};

export default function Infrastructure() {
  const { data: reports, isLoading: loadingReports } = useListInfrastructureReports();
  const { data: reportStats, isLoading: loadingStats } = useGetInfraReportsByType();

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

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-sans text-foreground">Infrastructure Reports</h1>
          <p className="text-muted-foreground mt-1">City-wide maintenance and structural issues tracking.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm col-span-2">
            <CardHeader>
              <CardTitle>Issues by Type & Status</CardTitle>
              <CardDescription>Current pipeline of reported infrastructure problems</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <Skeleton className="w-full h-[300px]" />
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="issueType" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                      />
                      <Legend iconType="circle" />
                      <Bar dataKey="open" name="Open" stackId="a" fill="hsl(var(--destructive))" opacity={0.8} radius={[0, 0, 0, 0]} />
                      <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="hsl(var(--chart-4))" opacity={0.8} />
                      <Bar dataKey="resolved" name="Resolved" stackId="a" fill="hsl(var(--chart-3))" opacity={0.8} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/60 backdrop-blur border-white/40 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest infrastructure issues submitted</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingReports ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid gap-4 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {reports?.map((report) => {
                  const StatusIcon = STATUS_ICONS[report.status] || AlertTriangle;
                  return (
                    <motion.div key={report.id} variants={itemVariants} className="flex flex-col p-4 rounded-xl border bg-card/60 gap-3 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm capitalize">{report.issueType.replace('_', ' ')}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {report.zoneName}
                          </div>
                        </div>
                        <Badge variant="outline" className={`${SEVERITY_COLORS[report.severity] || 'bg-gray-100'} capitalize`}>
                          {report.severity}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={`w-4 h-4 ${
                            report.status === 'open' ? 'text-rose-500' : 
                            report.status === 'in-progress' ? 'text-amber-500' : 'text-emerald-500'
                          }`} />
                          <span className="text-xs font-medium capitalize">{report.status.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {format(new Date(report.reportedAt), 'MMM d, HH:mm')}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
