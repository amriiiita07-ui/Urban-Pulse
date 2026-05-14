import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
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
import Login from "@/pages/login";

const queryClient = new QueryClient();

function isAuthenticated() {
  return localStorage.getItem("urbanpulse_auth") === "true";
}

function Protected({ component: Component }: { component: React.ComponentType }) {
  if (!isAuthenticated()) return <Redirect to="/login" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/"               component={() => <Protected component={Dashboard} />} />
      <Route path="/zones"          component={() => <Protected component={Zones} />} />
      <Route path="/mobility"       component={() => <Protected component={Mobility} />} />
      <Route path="/cohorts"        component={() => <Protected component={Cohorts} />} />
      <Route path="/experience"     component={() => <Protected component={Experience} />} />
      <Route path="/infrastructure" component={() => <Protected component={Infrastructure} />} />
      <Route path="/anomalies"      component={() => <Protected component={Anomalies} />} />
      <Route path="/city-events"    component={() => <Protected component={CityEvents} />} />
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
