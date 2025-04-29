
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  // In a real app, this data would be fetched based on the ID parameter
  const product = {
    id: 1,
    name: "Arduino Mega 2560",
    description:
      "The Arduino Mega 2560 is a microcontroller board based on the ATmega2560. It has 54 digital input/output pins (of which 14 can be used as PWM outputs), 16 analog inputs, 4 UARTs (hardware serial ports), a 16 MHz crystal oscillator, a USB connection, a power jack, an ICSP header, and a reset button.",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&h=600&q=60",
    ],
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.8,
    reviews: 120,
    category: "Controllers",
    inStock: true,
    sku: "ARD-2560-001",
    brand: "Arduino",
    specifications: [
      { name: "Microcontroller", value: "ATmega2560" },
      { name: "Operating Voltage", value: "5V" },
      { name: "Input Voltage", value: "7-12V" },
      { name: "Digital I/O Pins", value: "54 (of which 15 provide PWM output)" },
      { name: "Analog Input Pins", value: "16" },
      { name: "DC Current per I/O Pin", value: "20 mA" },
      { name: "Flash Memory", value: "256 KB" },
      { name: "SRAM", value: "8 KB" },
      { name: "EEPROM", value: "4 KB" },
      { name: "Clock Speed", value: "16 MHz" },
    ],
    features: [
      "54 digital input/output pins",
      "16 analog inputs",
      "4 UARTs (hardware serial ports)",
      "16 MHz crystal oscillator",
      "USB connection",
      "Power jack",
      "ICSP header",
      "Reset button",
    ],
    relatedProducts: [
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
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-robo-500">
          <Link to="/" className="hover:text-robo-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-robo-700">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-robo-700">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-robo-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  className={`border rounded-md overflow-hidden w-20 h-20 ${
                    selectedImage === image
                      ? "ring-2 ring-robo-600"
                      : "hover:ring-1 hover:ring-robo-300"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-robo-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
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
                <span className="text-sm text-robo-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-robo-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-robo-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-robo-100 text-robo-800 text-sm font-medium px-2 py-1 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-robo-700">{product.description}</p>

            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-robo-800 font-medium w-24">Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex items-center">
                <span className="text-robo-800 font-medium w-24">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-robo-800 font-medium w-24">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex items-center">
                <span className="text-robo-800 font-medium w-24">
                  Availability:
                </span>
                <span
                  className={
                    product.inStock
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="border-t border-b py-6 space-y-4">
              <div className="flex items-center">
                <span className="text-robo-800 font-medium w-24">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-robo-600 hover:text-robo-800"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-1 border-l border-r">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-robo-600 hover:text-robo-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-robo-600 hover:bg-robo-700 flex-1 sm:flex-none">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="bg-white border-robo-600 text-robo-600 hover:bg-robo-50 flex-1 sm:flex-none">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="pb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-2 border-b last:border-b-0"
                    >
                      <span className="font-medium text-robo-700">{spec.name}</span>
                      <span className="text-robo-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-robo-600 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button variant="outline" className="border-robo-600 text-robo-600 hover:bg-robo-50">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-robo-100 text-robo-800 rounded-full h-10 w-10 flex items-center justify-center font-medium">
                      JD
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">John Doe</h4>
                        <span className="text-sm text-robo-500">3 days ago</span>
                      </div>
                      <div className="flex my-1">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < 5 ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <p>
                        Great product! I'm using it for my robot project and it works
                        perfectly. Easy to program and very reliable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-robo-100 text-robo-800 rounded-full h-10 w-10 flex items-center justify-center font-medium">
                      AS
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Anna Smith</h4>
                        <span className="text-sm text-robo-500">1 week ago</span>
                      </div>
                      <div className="flex my-1">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <p>
                        Does everything I need it to do. The only reason I'm giving 4
                        stars instead of 5 is that the documentation could be better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-robo-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="product-card">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-robo-600">
                      {relatedProduct.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-robo-900">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-robo-800">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-robo-600 text-robo-600 hover:bg-robo-50"
                      asChild
                    >
                      <Link to={`/products/${relatedProduct.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
