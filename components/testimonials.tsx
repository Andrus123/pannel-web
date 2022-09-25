import React from "react";
import Carousel from "./carousel";
import CarouselItem from "./carousel-item";
import Review from "./review";

const Testimonials: React.FC = () => (
  <Carousel className="bg-black text-white py-10 lg:py-20">
    <CarouselItem index={0}>
      <Review by="Axel (Showtime)">
        Pannel y BNB ambos comparten el amor por la alta calidad en gráficas
      </Review>
    </CarouselItem>
    <CarouselItem index={1}>
      <Review by="Axel (Showtime)">
        Pannel y BNB ambos comparten el amor por la alta calidad en gráficas
      </Review>
    </CarouselItem>
    <CarouselItem index={2}>
      <Review by="Axel (Showtime)">
        Pannel y BNB ambos comparten el amor por la alta calidad en gráficas
      </Review>
    </CarouselItem>
  </Carousel>
);

export default Testimonials;
