
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    email: localStorage.getItem("email") || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Simulating fetching user data
  useEffect(() => {
    // In a real app, would fetch user data from API
    const storedEmail = localStorage.getItem("email");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    
    if (storedEmail) {
      setUser({
        firstName: storedFirstName || "",
        lastName: storedLastName || "",
        email: storedEmail,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save to localStorage (in a real app, would save to backend)
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="container-custom py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  disabled
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleLogout}>
                    Log Out
                  </Button>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No orders yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Account Preferences</h3>
                <Button variant="outline">Manage Preferences</Button>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-3 text-destructive">Danger Zone</h3>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
