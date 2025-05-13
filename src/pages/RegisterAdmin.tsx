
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const RegisterAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Check password match when confirmPassword is being typed
    if (name === "confirmPassword" || name === "password") {
      if (
        (name === "confirmPassword" && value !== formData.password) ||
        (name === "password" && value !== formData.confirmPassword && formData.confirmPassword)
      ) {
        setPasswordError("Passwords don't match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send admin registration request to API
      const response = await axios.post('/api/auth/register-admin', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminCode: formData.adminCode
      });
      
      toast({
        title: "Admin Registration Successful",
        description: "Your admin account has been created.",
      });
      
      // Redirect to admin login
      navigate("/login");
    } catch (error: any) {
      // Handle specific error cases
      const errorMessage = error.response?.data?.message || "Registration failed";
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-12 max-w-md">
      <Card className="border-robo-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Admin Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to register as an admin
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminCode">Admin Secret Code</Label>
              <Input
                id="adminCode"
                name="adminCode"
                type="password"
                placeholder="Enter the admin secret code"
                value={formData.adminCode}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-robo-600 hover:bg-robo-700"
              disabled={isSubmitting || !!passwordError}
            >
              {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
            </Button>
            <div className="text-center text-sm">
              Want to register as a regular user?{" "}
              <a
                href="/register"
                className="text-robo-600 hover:text-robo-800 font-semibold"
              >
                Register here
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterAdmin;
