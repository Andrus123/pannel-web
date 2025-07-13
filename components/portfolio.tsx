import React, { useContext, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollContext } from "../utils/scroll-observer";

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
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

  const projects = [
    {
      id: 1,
      title: "Casa Residencial Moderna",
      category: "interior",
      location: "Zona Norte",
      duration: "5 días",
      description:
        "Transformación completa de interiores con colores neutros y técnicas modernas de pintura.",
      beforeImage: "/assets/portfolio/casa1-before.jpg",
      afterImage: "/assets/portfolio/casa1-after.jpg",
      details: [
        "Aplicación de pintura premium libre de VOC",
        "Técnica de degradado en sala principal",
        "Pintura especializada en cocina y baños",
        "Acabados satinados y semi-brillantes",
      ],
      client: "Familia Rodríguez",
      year: "2024",
    },
    {
      id: 2,
      title: "Edificio Comercial Downtown",
      category: "exterior",
      location: "Centro Comercial",
      duration: "15 días",
      description:
        "Renovación completa de fachada con sistema anti-humedad y pintura resistente al clima.",
      beforeImage: "/assets/portfolio/edificio1-before.jpg",
      afterImage: "/assets/portfolio/edificio1-after.jpg",
      details: [
        "Tratamiento anti-humedad completo",
        "Pintura elastomérica de alta resistencia",
        "Sistema multicapa con imprimante",
        "Sellado de grietas y fisuras",
      ],
      client: "Corporación ABC",
      year: "2024",
    },
    {
      id: 3,
      title: "Residencia Familiar Clásica",
      category: "interior",
      location: "Zona Sur",
      duration: "8 días",
      description:
        "Pintura interior con técnicas decorativas y restauración de molduras originales.",
      beforeImage: "/assets/portfolio/casa2-before.jpg",
      afterImage: "/assets/portfolio/casa2-after.jpg",
      details: [
        "Restauración de molduras decorativas",
        "Técnica de texturizado en paredes",
        "Colores cálidos y acogedores",
        "Pintura especial para madera",
      ],
      client: "Familia Morales",
      year: "2023",
    },
    {
      id: 4,
      title: "Complejo Residencial Las Flores",
      category: "exterior",
      location: "Zona Oeste",
      duration: "30 días",
      description:
        "Pintura exterior de complejo habitacional con 12 edificios y áreas comunes.",
      beforeImage: "/assets/portfolio/complejo1-before.jpg",
      afterImage: "/assets/portfolio/complejo1-after.jpg",
      details: [
        "Coordinación de trabajo en 12 edificios",
        "Pintura resistente a condiciones extremas",
        "Esquema de colores coordinado",
        "Garantía extendida de 7 años",
      ],
      client: "Inmobiliaria Vista Hermosa",
      year: "2023",
    },
    {
      id: 5,
      title: "Casa de Campo Rústica",
      category: "interior",
      location: "Afueras",
      duration: "10 días",
      description:
        "Pintura interior con técnicas rústicas y conservación del estilo original.",
      beforeImage: "/assets/portfolio/casa3-before.jpg",
      afterImage: "/assets/portfolio/casa3-after.jpg",
      details: [
        "Técnicas de pintura rústica",
        "Conservación de vigas de madera",
        "Colores tierra y naturales",
        "Acabados mate y texturizados",
      ],
      client: "Familia García",
      year: "2023",
    },
    {
      id: 6,
      title: "Oficinas Corporativas",
      category: "exterior",
      location: "Distrito Financiero",
      duration: "20 días",
      description:
        "Fachada corporativa con colores institucionales y acabados profesionales.",
      beforeImage: "/assets/portfolio/oficina1-before.jpg",
      afterImage: "/assets/portfolio/oficina1-after.jpg",
      details: [
        "Colores corporativos personalizados",
        "Pintura de alta durabilidad",
        "Trabajo nocturno para no interrumpir operaciones",
        "Certificación de calidad ISO",
      ],
      client: "Empresa Tecnológica XYZ",
      year: "2024",
    },
  ];

  const filters = [
    { key: "todos", label: "Todos los Proyectos" },
    { key: "interior", label: "Pintura Interior" },
    { key: "exterior", label: "Pintura Exterior" },
  ];

  const filteredProjects =
    activeFilter === "todos"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const openModal = (projectId: number) => {
    setSelectedProject(projectId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Portafolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de nuestros proyectos más destacados. Cada trabajo
            refleja nuestro compromiso con la calidad y la satisfacción del
            cliente.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-lg shadow-md">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={refContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openModal(project.id)}
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                <div className="absolute inset-0 bg-blue-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-blue-600 font-medium">Antes / Después</p>
                  </div>
                </div>
                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === "interior"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {project.category === "interior" ? "Interior" : "Exterior"}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.location}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.duration}
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Proyectos Completados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Clientes Satisfechos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-600">Años de Experiencia</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Soporte Post-Venta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && selectedProjectData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProjectData.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedProjectData.description}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Información del Proyecto
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cliente:</span>
                      <span className="font-medium">
                        {selectedProjectData.client}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-medium">
                        {selectedProjectData.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">
                        {selectedProjectData.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Año:</span>
                      <span className="font-medium">
                        {selectedProjectData.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Detalles del Trabajo
                  </h4>
                  <ul className="space-y-2">
                    {selectedProjectData.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Before/After Images Placeholder */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Antes
                  </h4>
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-gray-500">Foto Antes</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Después
                  </h4>
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="text-blue-600 font-medium">
                        Resultado Final
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
