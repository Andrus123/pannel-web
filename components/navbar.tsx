import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollContext } from "../utils/scroll-observer";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useContext(ScrollContext);

  // Mostrar navbar después de cierto scroll
  useEffect(() => {
    setIsVisible(scrollY > 100);
  }, [scrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? "bg-white/95 backdrop-blur-md shadow-lg translate-y-0"
          : "bg-transparent -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <Image
              src="/assets/logopannel.png"
              width={120}
              height={40}
              alt="Logo Empresa de Pintura"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection("Masthead")}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
              >
                Portafolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
              >
                Contacto
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
              >
                Cotizar
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
          >
            Portafolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
          >
            Contacto
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-700 transition-colors duration-200 mt-2"
          >
            Cotizar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
