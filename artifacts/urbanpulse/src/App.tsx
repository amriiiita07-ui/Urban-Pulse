import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Zones from "@/pages/zones";
import Mobility from "@/pages/mobility";
import Cohorts from "@/pages/cohorts";
import Experience from "@/pages/experience";
import Infrastructure from "@/pages/infrastructure";
import Anomalies from "@/pages/anomalies";
import CityEvents from "@/pages/city-events";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/zones" component={Zones} />
      <Route path="/mobility" component={Mobility} />
      <Route path="/cohorts" component={Cohorts} />
      <Route path="/experience" component={Experience} />
      <Route path="/infrastructure" component={Infrastructure} />
      <Route path="/anomalies" component={Anomalies} />
      <Route path="/city-events" component={CityEvents} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
