
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      searchQuery ? `with search query: ${searchQuery}` : ''
    );
  }, [location.pathname, searchQuery]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
        {searchQuery ? (
          <>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">Product Not Found</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any products matching "{searchQuery}"
            </p>
          </>
        ) : (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
