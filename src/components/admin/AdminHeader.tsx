
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define notification type
type Notification = {
  id: string;
  message: string;
  type: 'order' | 'stock' | 'system';
  isRead: boolean;
  createdAt: string;
};

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@yourrobotics.com');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'New order received',
      type: 'order',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      message: 'Low stock alert: Arduino Uno',
      type: 'stock',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '3',
      message: 'System update completed',
      type: 'system',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    // Get user info from localStorage
    const firstName = localStorage.getItem('firstName');
    const email = localStorage.getItem('email');
    
    if (firstName) {
      setAdminName(firstName);
    }
    
    if (email) {
      setAdminEmail(email);
    }
  }, []);

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('isAdmin');
    
    // Redirect to login page
    navigate('/login');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Admin Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 flex items-center justify-center bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs h-8"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[300px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b flex items-start gap-2 ${!notification.isRead ? 'bg-muted/30' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className={`p-1 rounded-full ${
                        notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'stock' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  ))
                )}
              </ScrollArea>
              <div className="p-2 border-t text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/admin/notifications')}
                  className="w-full text-xs h-8"
                >
                  View all
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{adminName}</p>
                  <p className="text-xs text-muted-foreground">{adminEmail}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
