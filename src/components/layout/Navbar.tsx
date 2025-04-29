
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = 0; // This will be dynamic in the future

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container-custom">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/e168059f-d7cb-44ef-bdd9-1b9839d3ae03.png"
                alt="YourRobotics Logo"
                className="h-16 md:h-20" /* Increased the size from h-12 md:h-14 to h-16 md:h-20 */
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/ai-assistant"
              className="text-sm font-medium text-robo-600 hover:text-robo-700 transition-colors"
            >
              AI Assistant
            </Link>
          </nav>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-2">
            {isSearchOpen ? (
              <div className="absolute inset-x-0 top-0 bg-background z-50 flex items-center h-16 px-4 md:px-6 lg:relative lg:inset-auto lg:bg-transparent">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="flex-1 max-w-md"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 bg-robo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-robo-100 text-robo-800">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">Account</p>
                  <p className="text-xs text-muted-foreground">
                    Manage your account
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="cursor-pointer w-full">
                    Sign in
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="cursor-pointer w-full">
                    Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="container-custom py-4">
            <div className="mb-4">
              <Input type="search" placeholder="Search products..." />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-robo-900 hover:text-robo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/ai-assistant"
                className="text-sm font-medium text-robo-600 hover:text-robo-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Assistant
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
