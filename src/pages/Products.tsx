
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sample products data - in a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: "Arduino Mega 2560",
      description:
        "The Arduino Mega 2560 is a microcontroller board based on the ATmega2560. It has 54 digital input/output pins, 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator.",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=300&h=300",
      price: 45.99,
      rating: 4.8,
      reviews: 120,
      category: "Controllers",
    },
    {
      id: 2,
      name: "Raspberry Pi 4 Model B",
      description:
        "The Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity.",
      image: "https://images.unsplash.com/photo-1563452634878-c49928f474b2?auto=format&fit=crop&w=300&h=300",
      price: 59.99,
      rating: 4.9,
      reviews: 245,
      category: "Development Kits",
    },
    {
      id: 3,
      name: "Servo Motor Kit",
      description:
        "This servo motor kit includes 5 micro servo motors ideal for robotics projects. They provide precise control and are compatible with Arduino, Raspberry Pi, and other microcontrollers.",
      image: "https://images.unsplash.com/photo-1568209865332-a15790aed756?auto=format&fit=crop&w=300&h=300",
      price: 28.50,
      rating: 4.5,
      reviews: 87,
      category: "Motors & Actuators",
    },
    {
      id: 4,
      name: "Ultrasonic Distance Sensor",
      description:
        "HC-SR04 ultrasonic sensor module for Arduino, measures distances between 2cm and 400cm with high accuracy and stable readings.",
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=300&h=300",
      price: 14.99,
      rating: 4.3,
      reviews: 56,
      category: "Sensors",
    },
    {
      id: 5,
      name: "Robot Chassis Kit",
      description:
        "This robot chassis kit includes a sturdy aluminum frame, wheels, and mounting hardware. Perfect for building your own robot platform.",
      image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?auto=format&fit=crop&w=300&h=300",
      price: 39.99,
      rating: 4.7,
      reviews: 32,
      category: "Accessories",
    },
    {
      id: 6,
      name: "IR Sensor Module",
      description:
        "Infrared obstacle avoidance sensor module for Arduino and other microcontrollers. Ideal for line-following robots and obstacle detection.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=300",
      price: 8.99,
      rating: 4.2,
      reviews: 45,
      category: "Sensors",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-robo-900">All Products</h1>
          <div className="flex items-center text-sm text-robo-500 mt-2">
            <Link to="/" className="hover:text-robo-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-robo-900">Products</span>
          </div>
        </div>

        {/* Filters & Products Container */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - will be positioned off-canvas on mobile */}
          <div className="md:w-64 md:flex-shrink-0">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSidebar}
                  className="mr-2 md:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <span className="text-sm text-robo-600">
                  Showing <strong>{products.length}</strong> results
                </span>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-none ${
                      viewMode === "grid" ? "bg-robo-100" : ""
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`rounded-none ${
                      viewMode === "list" ? "bg-robo-100" : ""
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === "grid" ? "grid-view" : "list-view"}>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="product-card">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-xs font-medium text-robo-600">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-robo-900">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-3">
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                          </div>
                          <span className="text-xs text-robo-600 ml-2">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-robo-800">
                            ${product.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            className="bg-robo-600 hover:bg-robo-700"
                            asChild
                          >
                            <Link to={`/products/${product.id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-48 md:h-auto">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6 flex-1">
                          <div className="mb-2">
                            <span className="text-xs font-medium text-robo-600">
                              {product.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-xl mb-2 text-robo-900">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-3">
                            <div className="flex">
                              {Array(5)
                                .fill(null)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                            </div>
                            <span className="text-xs text-robo-600 ml-2">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                          <p className="text-robo-700 mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-robo-800">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-robo-600 text-robo-600 hover:bg-robo-50"
                                asChild
                              >
                                <Link to={`/products/${product.id}`}>View Details</Link>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-robo-600 hover:bg-robo-700"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-robo-600 text-white border-robo-600 hover:bg-robo-700"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="text-robo-600">...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
