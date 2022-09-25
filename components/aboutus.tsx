import React from "react";
import Member from "./member";

const AboutUs: React.FC = () => {
  return (
    <section className={`flex flex-col bg-white py-20 text-3xl md:text-4xl`}>
      <div className="container mx-auto px-11">
        <p className=" leading-tight max-w-5xl mx-auto text-4xl lg:text-4xl tracking-tight ">
          <strong>
            Ayudamos a empresas a posicionarse en el mercado digital, con el
            mejor expertice en Marketing Digital, Diseño Gráfico, Desarrolo Web
            / Mobil.
          </strong>
        </p>
      </div>
      <div className="container mx-auto px-11 text-center mt-28">
        <h2>Nuestros servicios:</h2>
        <div>the &ldquo;spec-ops&rdquo;</div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20">
          <Member
            id="socialmedia"
            name="Social Media"
            service="RRSS"
            link="#"
          />
          <Member
            id="graphicdesign"
            name="Graphic Design"
            service="Content Creation, Branding"
            link="#"
          />
          <Member
            id="webdevelopment"
            name="Web Development"
            service="Web Development, UI/UX Design"
            link="#"
          />
          <div>member</div>
          <div>member</div>
          <div>member</div>
          <div>member</div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
