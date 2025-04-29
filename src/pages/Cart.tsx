
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Arduino Mega 2560",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=300&h=300",
      price: 45.99,
      quantity: 2,
      stock: 10,
    },
    {
      id: 2,
      name: "Raspberry Pi 4 Model B",
      image: "https://images.unsplash.com/photo-1563452634878-c49928f474b2?auto=format&fit=crop&w=300&h=300",
      price: 59.99,
      quantity: 1,
      stock: 5,
    },
    {
      id: 3,
      name: "Servo Motor Kit",
      image: "https://images.unsplash.com/photo-1568209865332-a15790aed756?auto=format&fit=crop&w=300&h=300",
      price: 28.50,
      quantity: 1,
      stock: 8,
    },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Calculate cart totals
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingEstimate = cartSubtotal > 100 ? 0 : 9.99;
  const taxEstimate = cartSubtotal * 0.07; // 7% tax rate
  const orderTotal = cartSubtotal + shippingEstimate + taxEstimate;

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    // Check stock limit
    if (newQuantity > item.stock) {
      toast({
        title: "Quantity limit",
        description: `Sorry, only ${item.stock} units available.`,
        variant: "destructive",
      });
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      });
      setIsApplyingCoupon(false);
    }, 1000);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-robo-900 mb-2">Your Cart</h1>
          <div className="flex items-center text-sm text-robo-500">
            <Link to="/" className="hover:text-robo-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-robo-900">Cart</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-robo-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-robo-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-robo-600 mb-6 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
            </p>
            <Button className="bg-robo-600 hover:bg-robo-700" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="hidden sm:grid sm:grid-cols-5 text-sm font-semibold text-robo-700 pb-2 border-b">
                <div className="sm:col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-4 py-4 border-b"
                >
                  <div className="sm:col-span-2 flex items-center space-x-4">
                    <Link to={`/products/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/products/${item.id}`}
                        className="font-medium text-robo-900 hover:text-robo-700"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center text-sm text-red-600 hover:text-red-800 mt-1"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-center">
                    <span className="sm:hidden font-medium mr-2">Price:</span>
                    <span className="text-robo-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-robo-600 hover:text-robo-800"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 text-center min-w-[40px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-robo-600 hover:text-robo-800"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <span className="sm:hidden font-medium mr-2">Subtotal:</span>
                    <span className="font-medium text-robo-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-robo-600 text-robo-600 hover:bg-robo-50"
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  onClick={() => {
                    setCartItems([]);
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart.",
                    });
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-robo-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-robo-700">Subtotal</span>
                      <span className="font-medium text-robo-900">
                        ${cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-robo-700">Shipping estimate</span>
                      <span className="font-medium text-robo-900">
                        {shippingEstimate ===  0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shippingEstimate.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-robo-700">Tax estimate (7%)</span>
                      <span className="font-medium text-robo-900">
                        ${taxEstimate.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-robo-900">
                          Order total
                        </span>
                        <span className="font-bold text-lg text-robo-900">
                          ${orderTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col p-6 pt-0 space-y-4">
                  <div className="flex space-x-2 w-full">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      className="border-robo-600 text-robo-600 hover:bg-robo-50"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-robo-600 hover:bg-robo-700"
                    size="lg"
                    asChild
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <div className="text-center text-sm text-robo-600">
                    Shipping, taxes, and discounts calculated at checkout
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
