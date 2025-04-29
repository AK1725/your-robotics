
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, CreditCard, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Checkout = () => {
  const { toast } = useToast();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  // Sample cart items (in a real app, this would be from a cart state/context)
  const cartItems = [
    {
      id: 1,
      name: "Arduino Mega 2560",
      price: 45.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Raspberry Pi 4 Model B",
      price: 59.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Servo Motor Kit",
      price: 28.50,
      quantity: 1,
    },
  ];

  // Calculate order totals
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = cartSubtotal > 100 ? 0 : 9.99;
  const taxAmount = cartSubtotal * 0.07; // 7% tax rate
  const orderTotal = cartSubtotal + shippingCost + taxAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      setIsProcessingOrder(false);
      // In a real app, you would redirect to an order confirmation page
    }, 2000);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-robo-900 mb-2">Checkout</h1>
          <div className="flex items-center text-sm text-robo-500">
            <Link to="/" className="hover:text-robo-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/cart" className="hover:text-robo-700">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-robo-900">Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-robo-900 flex items-center mb-4">
                    <Package className="mr-2 h-5 w-5" /> Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="San Francisco" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select required>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input id="zipCode" placeholder="94103" required />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-robo-900 mb-4">
                    Shipping Method
                  </h2>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-robo-600">
                          3-5 business days
                        </div>
                      </Label>
                      <div className="font-semibold text-robo-900">
                        {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-robo-600">
                          1-2 business days
                        </div>
                      </Label>
                      <div className="font-semibold text-robo-900">$14.99</div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-robo-900 flex items-center mb-4">
                    <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                  </h2>
                  
                  <Tabs defaultValue="credit-card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="credit-card" className="pt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiration (MM/YY)</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="pt-4">
                      <div className="text-center py-8">
                        <div className="text-robo-600 mb-4">
                          You will be redirected to PayPal to complete your purchase.
                        </div>
                        <Button
                          type="button"
                          className="bg-[#0070BA] hover:bg-[#005ea6]"
                        >
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="apple-pay" className="pt-4">
                      <div className="text-center py-8">
                        <div className="text-robo-600 mb-4">
                          Complete your purchase with Apple Pay.
                        </div>
                        <Button
                          type="button"
                          className="bg-black hover:bg-black/80 text-white"
                        >
                          Pay with Apple Pay
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-20">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-robo-900 mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <span className="font-medium text-robo-800">
                                {item.name}
                              </span>
                              <span className="text-robo-600 ml-2">
                                x{item.quantity}
                              </span>
                            </div>
                            <span className="font-medium text-robo-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-robo-700">Subtotal</span>
                          <span className="font-medium text-robo-900">
                            ${cartSubtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-robo-700">Shipping</span>
                          <span className="font-medium text-robo-900">
                            {shippingCost === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              `$${shippingCost.toFixed(2)}`
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-robo-700">Tax (7%)</span>
                          <span className="font-medium text-robo-900">
                            ${taxAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-robo-900">
                            Total
                          </span>
                          <span className="font-bold text-xl text-robo-900">
                            ${orderTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-robo-600 hover:bg-robo-700"
                        size="lg"
                        disabled={isProcessingOrder}
                      >
                        {isProcessingOrder ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-4 text-center text-sm text-robo-600">
                  By placing your order, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="text-robo-700 hover:text-robo-900 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-robo-700 hover:text-robo-900 underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
