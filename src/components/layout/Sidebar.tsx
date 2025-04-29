
import { useState } from "react";
import { 
  Slider,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox
} from "@/components/ui";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    { id: "controllers", label: "Controllers" },
    { id: "motors", label: "Motors & Actuators" },
    { id: "sensors", label: "Sensors" },
    { id: "dev-kits", label: "Development Kits" },
    { id: "accessories", label: "Accessories" },
  ];

  const brands = [
    { id: "arduino", label: "Arduino" },
    { id: "raspberry-pi", label: "Raspberry Pi" },
    { id: "adafruit", label: "Adafruit" },
    { id: "sparkfun", label: "SparkFun" },
    { id: "seeed", label: "Seeed Studio" },
  ];

  return (
    <div
      className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r w-64 z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:top-0 md:h-auto
      `}
    >
      <div className="p-4 h-full overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg text-robo-900">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden text-robo-600 hover:text-robo-800"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3 text-robo-900">Price Range</h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Categories */}
          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.id}`} />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Brands */}
          <Accordion type="single" collapsible defaultValue="brands">
            <AccordionItem value="brands">
              <AccordionTrigger>Brands</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox id={`brand-${brand.id}`} />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Rating */}
          <Accordion type="single" collapsible>
            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm font-medium leading-none flex items-center"
                      >
                        {Array(rating)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Availability */}
          <div>
            <h3 className="font-medium mb-3 text-robo-900">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <label
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In Stock
                </label>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full">Apply Filters</button>
          <button className="btn-secondary w-full">Clear Filters</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
