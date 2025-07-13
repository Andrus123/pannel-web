import React, { useState, useEffect, useRef, useContext } from "react";
import { ScrollContext } from "../utils/scroll-observer";

interface QuoteData {
  projectType: "interior" | "exterior";
  area: number;
  finish: "basico" | "premium" | "lujo";
  rooms: number;
  wallCondition: "bueno" | "regular" | "malo";
  urgency: "normal" | "urgente";
  name: string;
  phone: string;
}

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"cotizar" | "contacto">("cotizar");
  const [quote, setQuote] = useState<QuoteData>({
    projectType: "interior",
    area: 0,
    finish: "basico",
    rooms: 1,
    wallCondition: "bueno",
    urgency: "normal",
    name: "",
    phone: "",
  });
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  // Precios base por metro cuadrado en Bolivianos
  const basePrices = {
    interior: {
      basico: 35, // Bs/m²
      premium: 65, // Bs/m²
      lujo: 95, // Bs/m²
    },
    exterior: {
      basico: 45, // Bs/m²
      premium: 75, // Bs/m²
      lujo: 105, // Bs/m²
    },
  };

  // Multiplicadores adicionales
  const multipliers = {
    wallCondition: {
      bueno: 1.0,
      regular: 1.2,
      malo: 1.5,
    },
    urgency: {
      normal: 1.0,
      urgente: 1.3,
    },
    roomComplexity: {
      1: 1.0,
      2: 1.1,
      3: 1.15,
      4: 1.2,
      5: 1.25,
    },
  };

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

  // Calcular precio automáticamente
  useEffect(() => {
    if (quote.area > 0) {
      const basePrice = basePrices[quote.projectType][quote.finish];
      const roomMultiplier =
        multipliers.roomComplexity[
          Math.min(quote.rooms, 5) as keyof typeof multipliers.roomComplexity
        ];
      const conditionMultiplier =
        multipliers.wallCondition[quote.wallCondition];
      const urgencyMultiplier = multipliers.urgency[quote.urgency];

      const totalPrice =
        quote.area *
        basePrice *
        roomMultiplier *
        conditionMultiplier *
        urgencyMultiplier;
      setCalculatedPrice(Math.round(totalPrice));
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [quote]);

  const handleQuoteChange = (field: keyof QuoteData, value: any) => {
    setQuote((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    const message = `¡Hola! Me interesa solicitar una cotización de pintura.

*Detalles del proyecto:*
• Tipo: ${
      quote.projectType === "interior" ? "Pintura Interior" : "Pintura Exterior"
    }
• Área: ${quote.area} m²
• Habitaciones: ${quote.rooms}
• Acabado: ${quote.finish.charAt(0).toUpperCase() + quote.finish.slice(1)}
• Estado actual: ${
      quote.wallCondition.charAt(0).toUpperCase() + quote.wallCondition.slice(1)
    }
• Urgencia: ${quote.urgency.charAt(0).toUpperCase() + quote.urgency.slice(1)}

*Cotización estimada:* Bs. ${calculatedPrice.toLocaleString()}

*Datos de contacto:*
• Nombre: ${quote.name}
• Teléfono: ${quote.phone}

Me gustaría coordinar una visita técnica para confirmar los detalles.`;

    return encodeURIComponent(message);
  };

  const sendWhatsAppQuote = () => {
    if (!quote.name || !quote.phone) {
      alert("Por favor completa tu nombre y teléfono");
      return;
    }

    const whatsappNumber = "59177204408"; // Número de Bolivia
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const contactWhatsApp = () => {
    const whatsappNumber = "59177204408"; // Número de Bolivia
    const message = encodeURIComponent(
      "¡Hola! Me interesa conocer más sobre sus servicios de pintura."
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cotiza Tu Proyecto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtén una cotización instantánea y personalizada para tu proyecto de
            pintura
          </p>
        </div>

        <div
          ref={refContainer}
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-lg shadow-md">
              <button
                onClick={() => setActiveTab("cotizar")}
                className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeTab === "cotizar"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cotizador Automático
              </button>
              <button
                onClick={() => setActiveTab("contacto")}
                className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeTab === "contacto"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contacto Directo
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {activeTab === "cotizar" ? (
              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Form */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Detalles del Proyecto
                    </h3>

                    <div className="space-y-6">
                      {/* Project Type */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Tipo de Proyecto
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() =>
                              handleQuoteChange("projectType", "interior")
                            }
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              quote.projectType === "interior"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-2xl mb-2">🏠</div>
                            <div className="font-medium">Interior</div>
                          </button>
                          <button
                            onClick={() =>
                              handleQuoteChange("projectType", "exterior")
                            }
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              quote.projectType === "exterior"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-2xl mb-2">🏡</div>
                            <div className="font-medium">Exterior</div>
                          </button>
                        </div>
                      </div>

                      {/* Area */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Área a Pintar (m²)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={quote.area || ""}
                          onChange={(e) =>
                            handleQuoteChange("area", Number(e.target.value))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Ejemplo: 120"
                        />
                      </div>

                      {/* Rooms */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Número de Habitaciones
                        </label>
                        <select
                          value={quote.rooms}
                          onChange={(e) =>
                            handleQuoteChange("rooms", Number(e.target.value))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num} habitación{num > 1 ? "es" : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Finish Type */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Tipo de Acabado
                        </label>
                        <div className="space-y-3">
                          {[
                            {
                              value: "basico",
                              label: "Básico",
                              desc: "Pintura estándar, 1 mano",
                            },
                            {
                              value: "premium",
                              label: "Premium",
                              desc: "Pintura de calidad, 2 manos",
                            },
                            {
                              value: "lujo",
                              label: "Lujo",
                              desc: "Pintura premium, técnicas especiales",
                            },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="finish"
                                value={option.value}
                                checked={quote.finish === option.value}
                                onChange={(e) =>
                                  handleQuoteChange("finish", e.target.value)
                                }
                                className="mr-3 text-blue-600"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {option.label}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {option.desc}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Wall Condition */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Estado Actual de las Paredes
                        </label>
                        <select
                          value={quote.wallCondition}
                          onChange={(e) =>
                            handleQuoteChange("wallCondition", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="bueno">Buen estado</option>
                          <option value="regular">Estado regular</option>
                          <option value="malo">Necesita reparación</option>
                        </select>
                      </div>

                      {/* Urgency */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Urgencia del Proyecto
                        </label>
                        <select
                          value={quote.urgency}
                          onChange={(e) =>
                            handleQuoteChange("urgency", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="normal">Normal (1-2 semanas)</option>
                          <option value="urgente">
                            Urgente (menos de 1 semana)
                          </option>
                        </select>
                      </div>

                      {/* Contact Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            value={quote.name}
                            onChange={(e) =>
                              handleQuoteChange("name", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={quote.phone}
                            onChange={(e) =>
                              handleQuoteChange("phone", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="70123456"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Cotización Estimada
                    </h3>

                    {showResult && calculatedPrice > 0 ? (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-2">
                            Bs. {calculatedPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            Precio estimado para {quote.area} m²
                          </div>
                          <div className="text-xs text-gray-500">
                            *Precio referencial sujeto a visita técnica
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
                        <div className="text-gray-500 mb-2">
                          Ingresa el área para ver la cotización
                        </div>
                        <div className="text-4xl">📏</div>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    {showResult && (
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-gray-900">
                          Desglose del Presupuesto:
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Precio base ({quote.finish}):</span>
                            <span>
                              Bs. {basePrices[quote.projectType][quote.finish]}
                              /m²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Área total:</span>
                            <span>{quote.area} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Complejidad ({quote.rooms} hab.):</span>
                            <span>
                              +
                              {Math.round(
                                (multipliers.roomComplexity[
                                  Math.min(
                                    quote.rooms,
                                    5
                                  ) as keyof typeof multipliers.roomComplexity
                                ] -
                                  1) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Estado paredes:</span>
                            <span>
                              +
                              {Math.round(
                                (multipliers.wallCondition[
                                  quote.wallCondition
                                ] -
                                  1) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Urgencia:</span>
                            <span>
                              +
                              {Math.round(
                                (multipliers.urgency[quote.urgency] - 1) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* What's Included */}
                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-green-900 mb-3">
                        ✅ Incluye:
                      </h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li>• Materiales de primera calidad</li>
                        <li>• Mano de obra especializada</li>
                        <li>• Preparación de superficies</li>
                        <li>• Limpieza final</li>
                        <li>
                          • Garantía de{" "}
                          {quote.projectType === "interior" ? "3" : "5"} años
                        </li>
                      </ul>
                    </div>

                    {/* WhatsApp Button */}
                    <button
                      onClick={sendWhatsAppQuote}
                      className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      <span>Enviar Cotización por WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Tab */
              <div className="p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    ¡Hablemos de tu proyecto!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Contacta directamente con nuestro equipo para consultas
                    personalizadas, preguntas técnicas o para coordinar una
                    visita gratuita.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="text-3xl mb-3">📞</div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Llámanos
                      </h4>
                      <p className="text-gray-600">+591 781 23456</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="text-3xl mb-3">📧</div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Email
                      </h4>
                      <p className="text-gray-600">info@pannelpintura.com</p>
                    </div>
                  </div>

                  <button
                    onClick={contactWhatsApp}
                    className="bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span>Contactar por WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
