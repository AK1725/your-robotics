
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, X, AlertCircle, Package } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

// Define the product data structure
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  path: string;
}

// Define the category data structure
interface Category {
  id: string;
  name: string;
  path: string;
}

// Sample data for products
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Arduino Mega 2560",
    category: "Controllers",
    price: 45.99,
    path: "/products/1",
  },
  {
    id: 2,
    name: "Raspberry Pi 4 Model B",
    category: "Development Kits",
    price: 59.99,
    path: "/products/2",
  },
  {
    id: 3,
    name: "Servo Motor Kit",
    category: "Motors & Actuators",
    price: 28.50,
    path: "/products/3",
  },
  {
    id: 4,
    name: "Ultrasonic Distance Sensor",
    category: "Sensors",
    price: 14.99,
    path: "/products/4",
  },
  {
    id: 5,
    name: "Arduino Uno",
    category: "Controllers",
    price: 24.99,
    path: "/products/5",
  },
  {
    id: 6,
    name: "DC Motor",
    category: "Motors & Actuators",
    price: 8.99,
    path: "/products/6",
  },
  {
    id: 7,
    name: "Infrared Sensor",
    category: "Sensors",
    price: 5.99,
    path: "/products/7",
  },
  {
    id: 8,
    name: "LED Matrix",
    category: "Components",
    price: 12.99,
    path: "/products/8",
  },
];

// Sample categories
const categories: Category[] = [
  { id: "controllers", name: "Controllers", path: "/products/controllers" },
  { id: "motors", name: "Motors & Actuators", path: "/products/motors" },
  { id: "sensors", name: "Sensors", path: "/products/sensors" },
  { id: "development-kits", name: "Development Kits", path: "/products/development-kits" },
  { id: "components", name: "Components", path: "/products/components" },
];

// The main search command component
export function SearchCommand({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? sampleProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handle selecting a product
  const handleSelectProduct = (product: Product) => {
    addToRecentSearches(product.name);
    navigate(product.path);
    setIsOpen(false);
  };

  // Handle selecting a category
  const handleSelectCategory = (category: Category) => {
    addToRecentSearches(category.name);
    navigate(category.path);
    setIsOpen(false);
  };

  // Add to recent searches
  const addToRecentSearches = (term: string) => {
    // Don't add if it's empty or just whitespace
    if (!term.trim()) return;
    
    // Remove if already exists and add to beginning
    const newRecentSearches = [
      term,
      ...recentSearches.filter((search) => search !== term),
    ].slice(0, 5); // Only keep last 5 searches
    
    setRecentSearches(newRecentSearches);
  };

  // Handle submitting a search
  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <div className="flex items-center border-b px-3">
        <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput 
          placeholder="Search for products, categories..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitSearch();
            }
          }}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <CommandList className="max-h-[300px] overflow-y-auto p-2">
        {searchQuery === "" && recentSearches.length > 0 && (
          <>
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((search, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setSearchQuery(search);
                    navigate(`/products?search=${encodeURIComponent(search)}`);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{search}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newSearches = [...recentSearches];
                      newSearches.splice(index, 1);
                      setRecentSearches(newSearches);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </CommandItem>
              ))}
              <CommandItem
                onSelect={clearRecentSearches}
                className="justify-center text-sm text-muted-foreground hover:text-foreground"
              >
                Clear recent searches
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {searchQuery && filteredProducts.length === 0 && filteredCategories.length === 0 ? (
          <CommandEmpty className="py-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
              <p>No results found for "{searchQuery}"</p>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleSubmitSearch}
                className="mt-2"
              >
                Search all products
              </Button>
            </div>
          </CommandEmpty>
        ) : (
          <>
            {filteredCategories.length > 0 && (
              <CommandGroup heading="Categories">
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => handleSelectCategory(category)}
                    className="flex items-center"
                  >
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{category.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {filteredProducts.length > 0 && (
              <CommandGroup heading="Products">
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelectProduct(product)}
                    className="flex justify-between"
                  >
                    <div className="flex items-center">
                      <span>{product.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        in {product.category}
                      </span>
                    </div>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {searchQuery && (
              <CommandGroup>
                <CommandItem
                  onSelect={handleSubmitSearch}
                  className="justify-center text-sm text-primary hover:text-primary"
                >
                  Search for "{searchQuery}" in all products
                </CommandItem>
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
