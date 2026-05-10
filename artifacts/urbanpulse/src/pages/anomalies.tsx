import { Layout } from "@/components/layout";
import { useListAnomalies } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-rose-100 text-rose-700 border-rose-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200'
};

const RISK_GRADIENTS = {
  low: 'from-emerald-400 to-emerald-500',
  medium: 'from-amber-400 to-amber-500',
  high: 'from-orange-400 to-orange-500',
  critical: 'from-rose-500 to-rose-600'
};

export default function Anomalies() {
  const { data: anomalies, isLoading: loadingAnomalies } = useListAnomalies();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const getRiskGradient = (score: number, severity: string) => {
    if (score > 80 || severity === 'critical') return RISK_GRADIENTS.critical;
    if (score > 60 || severity === 'high') return RISK_GRADIENTS.high;
    if (score > 40 || severity === 'medium') return RISK_GRADIENTS.medium;
    return RISK_GRADIENTS.low;
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-sans text-foreground">Anomaly Detection</h1>
            <p className="text-muted-foreground mt-1">AI-driven detection of unusual mobility patterns and events.</p>
          </div>
          {anomalies && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 px-3 py-1">
              <ShieldAlert className="w-4 h-4 mr-2" />
              {anomalies.filter(a => !a.resolved).length} Active Alerts
            </Badge>
          )}
        </header>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loadingAnomalies ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/50 backdrop-blur border-white/20">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))
          ) : anomalies ? (
            anomalies.map((anomaly) => (
              <motion.div key={anomaly.id} variants={itemVariants}>
                <Card className={`backdrop-blur-md shadow-sm h-full flex flex-col transition-all duration-300 relative overflow-hidden ${
                  anomaly.resolved ? 'bg-white/40 border-white/30 opacity-70' : 'bg-white/70 border-white/60 hover:shadow-md'
                }`} data-testid={`anomaly-${anomaly.id}`}>
                  
                  {/* Risk Score Indicator line at top */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getRiskGradient(anomaly.riskScore, anomaly.severity)}`} />

                  <CardHeader className="pb-3 pt-5">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <CardTitle className="text-base leading-tight font-bold">{anomaly.anomalyType.replace('_', ' ')}</CardTitle>
                        <CardDescription className="flex items-center mt-1.5 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {anomaly.zoneName}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={`capitalize shrink-0 ${SEVERITY_COLORS[anomaly.severity]}`}>
                        {anomaly.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">
                      {anomaly.description}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="bg-muted/40 rounded-lg p-3 flex items-center justify-between border border-border/50">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold">Risk Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getRiskGradient(anomaly.riskScore, anomaly.severity)} rounded-full`} 
                              style={{ width: `${anomaly.riskScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold w-6 text-right">{anomaly.riskScore}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {format(new Date(anomaly.detectedAt), 'MMM d, HH:mm')}
                        </div>
                        {anomaly.resolved && (
                          <div className="flex items-center text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Resolved
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">No anomalies detected.</div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
