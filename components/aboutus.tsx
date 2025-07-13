import React from "react";
import Member from "./member";

const AboutUs: React.FC = () => {
  return (
    <section className={`flex flex-col bg-white py-20 text-3xl md:text-4xl`}>
      <div className="container mx-auto px-11">
        <p className=" leading-tight max-w-5xl mx-auto text-4xl lg:text-4xl tracking-tight ">
          <strong>
            Mejoramos el Aspecto Visual de la Ciudad a través de la Pintura
            Efectiva
          </strong>
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
