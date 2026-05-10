import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Map as MapIcon,
  Navigation,
  Users,
  Star,
  AlertTriangle,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

const NAV_ITEMS = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Zones", url: "/zones", icon: MapIcon },
  { title: "Mobility", url: "/mobility", icon: Navigation },
  { title: "Cohorts", url: "/cohorts", icon: Users },
  { title: "Experience", url: "/experience", icon: Star },
  { title: "Infrastructure", url: "/infrastructure", icon: AlertTriangle },
  { title: "Anomalies", url: "/anomalies", icon: ShieldAlert },
  { title: "City Events", url: "/city-events", icon: Calendar },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="UrbanPulse" className="w-10 h-10 object-contain flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold font-sans leading-tight" style={{ color: '#C2185B' }}>
              UrbanPulse
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
              City Intelligence
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(" ", "-")}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-secondary/20 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
