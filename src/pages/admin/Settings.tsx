
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

// Define the schema for store settings
const storeSettingsSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeEmail: z.string().email("Invalid email address"),
  storePhone: z.string().optional(),
  storeAddress: z.string().optional(),
  currency: z.string().min(1, "Currency symbol is required"),
  logo: z.string().optional(),
});

// Define the schema for account settings
const accountSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Define the schema for notification settings
const notificationSettingsSchema = z.object({
  newOrders: z.boolean().default(true),
  lowStock: z.boolean().default(true),
  customerMessages: z.boolean().default(true),
});

interface UserSettings {
  _id: string;
  userId: string;
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  logo: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    newOrders: boolean;
    lowStock: boolean;
    customerMessages: boolean;
  };
}

const Settings: React.FC = () => {
  const queryClient = useQueryClient();

  // Query for fetching user settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['userSettings'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/settings');
        return response.data as UserSettings;
      } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
      }
    },
  });

  // Mutation for updating store settings
  const updateStoreSettingsMutation = useMutation({
    mutationFn: async (data: z.infer<typeof storeSettingsSchema>) => {
      return await axios.put('/api/settings', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
      toast.success('Store settings updated successfully');
    },
    onError: () => {
      toast.error('Failed to update store settings');
    },
  });

  // Mutation for updating notification settings
  const updateNotificationSettingsMutation = useMutation({
    mutationFn: async (data: z.infer<typeof notificationSettingsSchema>) => {
      return await axios.put('/api/settings', { notifications: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
      toast.success('Notification preferences updated successfully');
    },
    onError: () => {
      toast.error('Failed to update notification preferences');
    },
  });

  // Create form for store settings
  const storeForm = useForm<z.infer<typeof storeSettingsSchema>>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      storeName: settings?.storeName || 'YourRobotics Store',
      storeEmail: settings?.storeEmail || '',
      storePhone: settings?.storePhone || '',
      storeAddress: settings?.storeAddress || '',
      currency: settings?.currency || '৳',
      logo: settings?.logo || '',
    },
  });

  // Create form for account settings
  const accountForm = useForm<z.infer<typeof accountSettingsSchema>>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      name: localStorage.getItem('firstName') || 'Admin User',
      email: localStorage.getItem('email') || 'admin@yourrobotics.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Create form for notification settings
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      newOrders: settings?.notifications?.newOrders || true,
      lowStock: settings?.notifications?.lowStock || true,
      customerMessages: settings?.notifications?.customerMessages || true,
    },
  });

  // Set default values when settings are loaded
  React.useEffect(() => {
    if (settings) {
      storeForm.reset({
        storeName: settings.storeName || 'YourRobotics Store',
        storeEmail: settings.storeEmail || '',
        storePhone: settings.storePhone || '',
        storeAddress: settings.storeAddress || '',
        currency: settings.currency || '৳',
        logo: settings.logo || '',
      });

      notificationForm.reset({
        newOrders: settings.notifications?.newOrders || true,
        lowStock: settings.notifications?.lowStock || true,
        customerMessages: settings.notifications?.customerMessages || true,
      });
    }
  }, [settings, storeForm, notificationForm]);

  const handleStoreSettingsSubmit = (data: z.infer<typeof storeSettingsSchema>) => {
    updateStoreSettingsMutation.mutate(data);
  };

  const handleAccountSubmit = (data: z.infer<typeof accountSettingsSchema>) => {
    // In a real application, this would update the user account via API
    console.log('Account data to update:', data);
    toast.success('Account settings updated successfully');
  };

  const handleNotificationSubmit = (data: z.infer<typeof notificationSettingsSchema>) => {
    updateNotificationSettingsMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings</p>
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-[200px]" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...storeForm}>
                <form onSubmit={storeForm.handleSubmit(handleStoreSettingsSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={storeForm.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={storeForm.control}
                      name="storeEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={storeForm.control}
                      name="storePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={storeForm.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency Symbol</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={storeForm.control}
                    name="storeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com/logo.png" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={updateStoreSettingsMutation.isPending}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={accountForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={accountForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Update Account
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="newOrders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div>
                          <FormLabel className="text-base">New Order Notifications</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when new orders are placed
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="lowStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div>
                          <FormLabel className="text-base">Low Stock Alerts</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Get notified when product inventory is running low
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="customerMessages"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div>
                          <FormLabel className="text-base">Customer Messages</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for new customer inquiries
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={updateNotificationSettingsMutation.isPending}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
