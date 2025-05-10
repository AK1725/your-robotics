
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

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@yourrobotics.com');

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
    localStorage.removeItem('lastName');
    localStorage.removeItem('userRole');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Admin Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
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
