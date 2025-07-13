import React, { useContext, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollContext } from "../utils/scroll-observer";

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (refContainer.current) {
      observer.observe(refContainer.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "Pintura Residencial Interior",
      subtitle: "Transformamos tu hogar desde adentro",
      description:
        "Renovamos y embellecemos cada rincón de tu hogar con técnicas profesionales y materiales de primera calidad.",
      features: [
        "Preparación completa de superficies",
        "Pinturas premium libres de VOC",
        "Técnicas especializadas para cada ambiente",
        "Protección completa de muebles y pisos",
        "Limpieza total post-trabajo",
      ],
      benefits: [
        "Ambientes más luminosos y acogedores",
        "Protección duradera de paredes",
        "Aumento del valor de tu propiedad",
        "Garantía de 3 años en mano de obra",
      ],
      image: "/assets/interior-painting.jpg",
      icon: "🏠",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Pintura Residencial Exterior",
      subtitle: "Protege y embellece tu fachada",
      description:
        "Especialistas en pintura exterior que protege tu inversión contra los elementos mientras mejora el aspecto de tu propiedad.",
      features: [
        "Tratamiento anti-humedad y sellado",
        "Pinturas resistentes a clima extremo",
        "Reparación de grietas y imperfecciones",
        "Sistemas de pintura multicapa",
        "Equipos de seguridad certificados",
      ],
      benefits: [
        "Protección contra lluvia y sol",
        "Resistencia a hongos y moho",
        "Incremento significativo del valor",
        "Garantía de 5 años contra decoloración",
      ],
      image: "/assets/exterior-painting.jpg",
      icon: "🏡",
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos servicios de pintura profesional con más de 15 años de
            experiencia, utilizando las mejores técnicas y materiales del
            mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={refContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Service Header */}
                <div
                  className={`bg-gradient-to-r ${service.color} p-8 text-white`}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{service.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-blue-100 text-lg">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Lo que incluye
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Beneficios
                    </h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <button
                      className={`w-full bg-gradient-to-r ${service.color} text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
                    >
                      Solicitar Cotización
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                15+ Años
              </h4>
              <p className="text-gray-600">de experiencia en el sector</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">500+</h4>
              <p className="text-gray-600">clientes satisfechos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">100%</h4>
              <p className="text-gray-600">garantía de satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
