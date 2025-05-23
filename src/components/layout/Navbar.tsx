import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SearchCommand } from "./SearchCommand";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const cartItemsCount = 0; // This will be dynamic in the future
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInitial, setUserInitial] = useState("U");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const userRole = localStorage.getItem("userRole");
    
    if (email) {
      setIsLoggedIn(true);
      setIsAdmin(userRole === "admin");
      
      if (firstName) {
        setUserInitial(firstName.charAt(0).toUpperCase());
        setUserName(firstName);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [location.pathname]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search on '/' or Ctrl+K/Command+K
      if (
        (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "k")) &&
        !e.defaultPrevented
      ) {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    // UI auto-updates via the effect on pathname
  };

  // Define the navigation links with their paths
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "AI Assistant", path: "/ai-assistant" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container-custom">
        <div className="relative flex h-20 items-center justify-between">
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

          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/e168059f-d7cb-44ef-bdd9-1b9839d3ae03.png"
                alt="YourRobotics Logo"
                className="h-[200px] w-auto transform translate-y-4 dark:invert"
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-[-4px] h-[2px] bg-primary transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Search, Cart, User, Theme Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCommandOpen(true)}
              className="relative"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* SearchCommand dialog */}
            <SearchCommand
              isOpen={isCommandOpen}
              setIsOpen={setIsCommandOpen}
            />

            {/* Theme Toggle */}
            <ThemeToggle />

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {localStorage.getItem("email")}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile"
                          className="cursor-pointer w-full"
                        >
                          <span className="font-medium">Account</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            Manage your account
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile"
                          className="cursor-pointer w-full"
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link
                            to="/admin"
                            className="cursor-pointer w-full"
                          >
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Account</p>
                        <p className="text-xs text-muted-foreground">
                          Sign in to access your account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/login"
                        className="cursor-pointer w-full"
                      >
                        Sign in
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/register"
                        className="cursor-pointer w-full"
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
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
              <Input
                type="search"
                placeholder="Search products..."
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCommandOpen(true);
                }}
              />
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium relative ${
                    location.pathname === link.path
                      ? "text-primary border-l-2 border-primary pl-2"
                      : "text-foreground hover:text-primary hover:border-l-2 hover:border-primary hover:pl-2 transition-all duration-300"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-lg font-medium relative ${
                    location.pathname.startsWith('/admin')
                      ? "text-primary border-l-2 border-primary pl-2"
                      : "text-foreground hover:text-primary hover:border-l-2 hover:border-primary hover:pl-2 transition-all duration-300"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
