
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  Image,
  PenTool
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Image, label: 'Media', path: '/admin/media' },
    { icon: PenTool, label: 'Website Content', path: '/admin/website-content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return cn(
      'flex items-center w-full',
      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
    );
  };

  return (
    <Sidebar 
      collapsible="icon" 
      variant="sidebar"
      className="border-r border-border"
      side="left"
    >
      <SidebarHeader className="py-4">
        <div className={cn(
          "flex items-center justify-center",
          state === "collapsed" ? "px-2" : "px-4"
        )}>
          <img 
            src="/lovable-uploads/e168059f-d7cb-44ef-bdd9-1b9839d3ae03.png" 
            alt="YourRobotics Logo" 
            className={cn(
              "h-auto dark:invert", 
              state === "collapsed" ? "w-10" : "w-full max-w-[160px]"
            )}
          />
        </div>
        <SidebarTrigger className="absolute right-2 top-4" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={state === 'collapsed' ? item.label : undefined}
                  >
                    <NavLink to={item.path} className={getLinkClasses}>
                      <item.icon className="h-5 w-5 mr-3" />
                      {state === 'expanded' && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto p-2">
        <SidebarSeparator />
        <div className="flex items-center justify-between py-2">
          <ThemeToggle />
          <SidebarMenuButton
            asChild
            variant="outline"
            tooltip={state === 'collapsed' ? 'Logout' : undefined}
          >
            <NavLink to="/logout" className="flex items-center text-muted-foreground hover:text-destructive">
              <LogOut className="h-5 w-5" />
              {state === 'expanded' && <span className="ml-3">Logout</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
