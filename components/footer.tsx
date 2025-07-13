import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    "Pintura Interior Residencial",
    "Pintura Exterior Residencial",
    "Pintura Comercial",
    "Restauración de Fachadas",
    "Tratamiento Anti-Humedad",
    "Consultoría en Colores",
  ];

  const quickLinks = [
    { label: "Inicio", id: "home" },
    { label: "Servicios", id: "services" },
    { label: "Nosotros", id: "about" },
    { label: "Portafolio", id: "portfolio" },
    { label: "Contacto", id: "contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "https://facebook.com/empresapintura",
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "https://instagram.com/empresapintura",
    },
    {
      name: "WhatsApp",
      icon: "💬",
      url: "https://wa.me/591XXXXXXXX",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/company/empresapintura",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/assets/logopannel.png"
                width={160}
                height={60}
                alt="Logo Empresa de Pintura"
                className="h-12 w-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-white mb-4">
                Pannel Painting Services
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Más de 15 años transformando espacios con pintura de calidad
                superior. Especialistas en pintura residencial y comercial con
                garantía de satisfacción.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="text-gray-300">
                    Av. Principal 123, La Paz, Bolivia
                  </p>
                  <p className="text-gray-400 text-sm">Zona Centro</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <p className="text-gray-300">+591 2 123-4567</p>
                  <p className="text-gray-400 text-sm">
                    Lun - Vie: 8:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="text-gray-300">info@pannelpainting.com</p>
                  <p className="text-gray-400 text-sm">Respuesta en 24 horas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                Síguenos
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Pannel Painting Services. Todos los derechos
              reservados.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Privacidad
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                Términos de Servicio
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                Garantías
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => scrollToSection("contact")}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Contactar por WhatsApp"
        >
          <span className="text-2xl">💬</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
