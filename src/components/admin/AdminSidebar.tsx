
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
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="flex items-center px-2">
          <img 
            src="/lovable-uploads/e168059f-d7cb-44ef-bdd9-1b9839d3ae03.png" 
            alt="YourRobotics Logo" 
            className="h-8 w-auto dark:invert" 
          />
          {state === 'expanded' && (
            <span className="ml-2 text-xl font-bold">Admin</span>
          )}
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
      
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <div className="p-2">
          <SidebarMenuButton
            asChild
            variant="outline"
            tooltip={state === 'collapsed' ? 'Logout' : undefined}
          >
            <NavLink to="/logout" className="flex items-center text-muted-foreground hover:text-destructive">
              <LogOut className="h-5 w-5 mr-3" />
              {state === 'expanded' && <span>Logout</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
