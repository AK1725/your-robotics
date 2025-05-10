
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage customer accounts</p>
      </div>
      
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Users className="h-6 w-6" />
          </div>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            This feature will be available in the next update
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground">
            The customer management system is currently under development.
            <br />
            You'll be able to view and manage all customer accounts here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
