
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const Index = () => {
  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Arduino Mega 2560",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=300&h=300",
      price: 45.99,
      category: "Controllers",
    },
    {
      id: 2,
      name: "Raspberry Pi 4 Model B",
      image: "https://images.unsplash.com/photo-1563452634878-c49928f474b2?auto=format&fit=crop&w=300&h=300",
      price: 59.99,
      category: "Development Kits",
    },
    {
      id: 3,
      name: "Servo Motor Kit",
      image: "https://images.unsplash.com/photo-1568209865332-a15790aed756?auto=format&fit=crop&w=300&h=300",
      price: 28.50,
      category: "Motors & Actuators",
    },
    {
      id: 4,
      name: "Ultrasonic Distance Sensor",
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=300&h=300",
      price: 14.99,
      category: "Sensors",
    },
  ];

  // Sample categories
  const categories = [
    {
      id: "controllers",
      name: "Controllers",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=300&h=300",
      count: 42,
    },
    {
      id: "motors",
      name: "Motors & Actuators",
      image: "https://images.unsplash.com/photo-1568209865332-a15790aed756?auto=format&fit=crop&w=300&h=300",
      count: 36,
    },
    {
      id: "sensors",
      name: "Sensors",
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=300&h=300",
      count: 28,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-robo-800 to-robo-950 text-white">
        <div className="container-custom py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Build the Future with Cutting-Edge Robotics
              </h1>
              <p className="text-lg text-robo-100 md:text-xl">
                Premium robotics components for hobbyists, professionals, and everyone in between.
                Discover our extensive selection to bring your projects to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-robo-500 hover:bg-robo-600 text-white rounded-md"
                  asChild
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/ai-assistant">Ask Our AI Assistant</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=500"
                alt="Robot arm"
                className="rounded-lg shadow-xl transform rotate-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-robo-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-robo-900 mb-4">Shop By Category</h2>
            <p className="text-robo-600 max-w-2xl mx-auto">
              Explore our wide range of robotics components categorized for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm text-robo-100">{category.count} products</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="text-robo-700 border-robo-700 hover:bg-robo-50">
              <Link to="/products">
                View All Categories
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-robo-900 mb-4">Featured Products</h2>
            <p className="text-robo-600 max-w-2xl mx-auto">
              Our top picks for your next robotics project
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="product-card overflow-hidden h-full"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-robo-600">{product.category}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-robo-900">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-robo-800">${product.price.toFixed(2)}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-robo-600 border-robo-600 hover:bg-robo-50"
                      asChild
                    >
                      <Link to={`/products/${product.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/products">
                Browse All Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-robo-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose YourRobotics</h2>
            <p className="text-robo-200 max-w-2xl mx-auto">
              We stand out from the competition with our quality products and excellent service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-robo-800/50 p-6 rounded-lg">
              <div className="mb-4 text-robo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-robo-300">
                All products are rigorously tested and come with a warranty to ensure your satisfaction.
              </p>
            </div>

            <div className="bg-robo-800/50 p-6 rounded-lg">
              <div className="mb-4 text-robo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
              <p className="text-robo-300">
                Quick processing and efficient shipping to get your robotics components to you on time.
              </p>
            </div>

            <div className="bg-robo-800/50 p-6 rounded-lg">
              <div className="mb-4 text-robo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-robo-300">
                Our knowledgeable team is ready to assist you with technical questions and advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-16 bg-robo-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-robo-700 to-robo-900 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-4">
                <h2 className="text-3xl font-bold">Stay Updated</h2>
                <p className="text-robo-100">
                  Subscribe to our newsletter for the latest products, tutorials, and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-robo-500"
                />
                <Button className="bg-robo-500 hover:bg-robo-600 text-white whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
