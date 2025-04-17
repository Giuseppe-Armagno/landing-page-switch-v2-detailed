
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "IT">("EN");

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "IT" : "EN");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-mobility-border py-4 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-mobility-red">Urban<span className="text-mobility-dark">Mobility</span></span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-mobility-dark hover:text-mobility-red"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:justify-center flex-grow">
          <div className="flex space-x-6 mx-auto">
            <Link to="#" className="text-mobility-dark hover:text-mobility-red font-medium">About Us</Link>
            <Link to="#" className="text-mobility-dark hover:text-mobility-red font-medium">Products</Link>
            <Link to="#" className="text-mobility-dark hover:text-mobility-red font-medium">Solutions</Link>
            <Link to="#" className="text-mobility-dark hover:text-mobility-red font-medium">Resources</Link>
            <Link to="#" className="text-mobility-dark hover:text-mobility-red font-medium">Contacts</Link>
          </div>
        </div>

        {/* Right side controls */}
        <div className="hidden md:flex md:items-center space-x-4">
          <Button className="bg-mobility-red hover:bg-mobility-redHover text-white font-medium rounded-md">
            Book a Call
          </Button>
          <button 
            onClick={toggleLanguage}
            className="text-mobility-dark border border-mobility-border rounded-md px-3 py-1.5"
          >
            {language}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-mobility-border z-50 wizard-fade-in">
            <div className="flex flex-col py-4 px-4">
              <Link to="#" className="py-2 text-mobility-dark hover:text-mobility-red font-medium">About Us</Link>
              <Link to="#" className="py-2 text-mobility-dark hover:text-mobility-red font-medium">Products</Link>
              <Link to="#" className="py-2 text-mobility-dark hover:text-mobility-red font-medium">Solutions</Link>
              <Link to="#" className="py-2 text-mobility-dark hover:text-mobility-red font-medium">Resources</Link>
              <Link to="#" className="py-2 text-mobility-dark hover:text-mobility-red font-medium">Contacts</Link>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-mobility-border">
                <Button className="bg-mobility-red hover:bg-mobility-redHover text-white font-medium rounded-md">
                  Book a Call
                </Button>
                <button 
                  onClick={toggleLanguage}
                  className="text-mobility-dark border border-mobility-border rounded-md px-3 py-1.5"
                >
                  {language}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
