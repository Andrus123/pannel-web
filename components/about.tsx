import React, { useContext, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollContext } from "../utils/scroll-observer";

type TabKey = "historia" | "mision" | "proceso";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("historia");
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

  const values = [
    {
      icon: "🎯",
      title: "Precisión",
      description:
        "Cada trazo cuenta. Trabajamos con exactitud milimétrica para garantizar acabados perfectos.",
    },
    {
      icon: "🤝",
      title: "Confianza",
      description:
        "Construimos relaciones duraderas basadas en la transparencia y el cumplimiento de nuestras promesas.",
    },
    {
      icon: "🌟",
      title: "Excelencia",
      description:
        "No nos conformamos con lo bueno. Buscamos la perfección en cada proyecto que emprendemos.",
    },
    {
      icon: "♻️",
      title: "Sostenibilidad",
      description:
        "Utilizamos materiales ecológicos y procesos responsables con el medio ambiente.",
    },
  ];

  const team = [
    {
      name: "Carlos Mendoza",
      role: "Fundador y Director",
      experience: "20 años de experiencia",
      image: "/assets/team-carlos.jpg",
      description:
        "Especialista en técnicas de pintura decorativa y restauración de fachadas históricas.",
    },
    {
      name: "Ana Patricia López",
      role: "Supervisora de Calidad",
      experience: "15 años de experiencia",
      image: "/assets/team-ana.jpg",
      description:
        "Experta en control de calidad y coordinación de proyectos residenciales de gran escala.",
    },
    {
      name: "Miguel Rodríguez",
      role: "Especialista en Exteriores",
      experience: "18 años de experiencia",
      image: "/assets/team-miguel.jpg",
      description:
        "Maestro en tratamientos anti-humedad y sistemas de pintura para climas extremos.",
    },
  ];

  const certifications = [
    { name: "ISO 9001", description: "Gestión de Calidad" },
    { name: "OSHA", description: "Seguridad Laboral" },
    { name: "EPA", description: "Protección Ambiental" },
    { name: "PDCA", description: "Asociación de Pintores" },
  ];

  const tabContent: Record<TabKey, { title: string; content: JSX.Element }> = {
    historia: {
      title: "Nuestra Historia",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Fundada en 2008 por Carlos Mendoza, nuestra empresa nació de la
            pasión por transformar espacios y la búsqueda constante de la
            excelencia en cada proyecto. Lo que comenzó como un emprendimiento
            familiar se ha convertido en una de las empresas de pintura más
            confiables de la región.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Durante estos 15 años, hemos perfeccionado nuestras técnicas,
            ampliado nuestro equipo y mantenido siempre el mismo compromiso:
            brindar servicios de pintura de la más alta calidad, utilizando
            materiales premium y técnicas innovadoras.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">2008</div>
              <p className="text-sm text-gray-600">Año de fundación</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-sm text-gray-600">Proyectos completados</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <p className="text-sm text-gray-600">Profesionales en equipo</p>
            </div>
          </div>
        </div>
      ),
    },
    mision: {
      title: "Misión y Visión",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h4 className="text-2xl font-bold text-blue-900 mb-4">
              Nuestra Misión
            </h4>
            <p className="text-lg text-blue-800 leading-relaxed">
              Transformar espacios a través de servicios de pintura de calidad
              superior, utilizando técnicas innovadoras y materiales premium,
              mientras construimos relaciones duraderas con nuestros clientes
              basadas en la confianza y la excelencia.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h4 className="text-2xl font-bold text-green-900 mb-4">
              Nuestra Visión
            </h4>
            <p className="text-lg text-green-800 leading-relaxed">
              Ser la empresa de pintura líder en la región, reconocida por
              nuestra innovación, compromiso con la sostenibilidad y la
              satisfacción total de nuestros clientes, estableciendo nuevos
              estándares de calidad en la industria.
            </p>
          </div>
        </div>
      ),
    },
    proceso: {
      title: "Nuestro Proceso",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Consulta Inicial
                  </h5>
                  <p className="text-gray-600">
                    Evaluamos tu proyecto y necesidades específicas
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Inspección Técnica
                  </h5>
                  <p className="text-gray-600">
                    Análisis detallado de superficies y condiciones
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Propuesta Personalizada
                  </h5>
                  <p className="text-gray-600">
                    Cotización detallada con materiales y tiempos
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Preparación</h5>
                  <p className="text-gray-600">
                    Protección de espacios y tratamiento de superficies
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Ejecución</h5>
                  <p className="text-gray-600">
                    Aplicación profesional con técnicas especializadas
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Control de Calidad
                  </h5>
                  <p className="text-gray-600">
                    Revisión exhaustiva y corrección de detalles
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  7
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Limpieza Final
                  </h5>
                  <p className="text-gray-600">
                    Limpieza completa y entrega del proyecto
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  8
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Seguimiento</h5>
                  <p className="text-gray-600">
                    Garantía y servicio post-venta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más que una empresa de pintura, somos artesanos dedicados a
            transformar espacios con pasión, experiencia y compromiso con la
            excelencia.
          </p>
        </div>

        {/* Main Content */}
        <div
          ref={refContainer}
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              {(Object.keys(tabContent) as TabKey[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {tabContent[activeTab].title}
            </h3>
            {tabContent[activeTab].content}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestro Equipo
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-blue-600">👨‍🎨</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {member.experience}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Certificaciones y Reconocimientos
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h4>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
