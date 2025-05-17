import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-arena-blue text-white py-2.5 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+91 99999 99999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>info@arenafaridabad.in</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} />
            <span>Sector 7, Faridabad, Haryana</span>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav
        className={cn(
          "py-4 w-full transition-all duration-300",
          isScrolled ? "bg-white shadow-md fixed top-0 z-50" : "bg-white"
        )}
      >
        <div className="container flex justify-between items-center">
          <a href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-arena-blue">ARENA ANIMATION</span>
            <img 
              src="/images/arena-logo.jpg" 
              alt="Arena Animation Logo" 
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Home</a>
            <a href="#whychooseus" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">About Us</a>
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium text-arena-blue hover:text-arena-orange transition-colors">
                <span>Courses</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#courses" className="block px-4 py-2 text-arena-blue hover:bg-arena-orange hover:text-white">Animation Courses</a>
                <a href="#courses" className="block px-4 py-2 text-arena-blue hover:bg-arena-orange hover:text-white">VFX Courses</a>
                <a href="#courses" className="block px-4 py-2 text-arena-blue hover:bg-arena-orange hover:text-white">Web Design Courses</a>
              </div>
            </div>
            <a href="#placements" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Placements</a>
            <a href="#gallery" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Gallery</a>
            <a href="#contact" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Contact</a>
            <Button className="bg-arena-orange hover:bg-arena-blue text-white">Enquire Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-arena-blue">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg absolute w-full z-50">
            <div className="flex flex-col space-y-4">
              <a href="#" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Home</a>
              <a href="#whychooseus" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">About Us</a>
              <a href="#courses" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Courses</a>
              <a href="#placements" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Placements</a>
              <a href="#gallery" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Gallery</a>
              <a href="#contact" className="font-medium text-arena-blue hover:text-arena-orange transition-colors">Contact</a>
              <Button className="bg-arena-orange hover:bg-arena-blue text-white w-full">Enquire Now</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
