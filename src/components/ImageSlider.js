import { useState, useEffect } from "react";
import FarmWorker from "../ImageSlider/Farm-Worker.jpg"
import PainterImage from "../ImageSlider/Painter-image.jpeg"
import TruckDriver from "../ImageSlider/Truck-Driver-image.jpg";
import "./ImageSlider.css";

const images = [FarmWorker, PainterImage, TruckDriver];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // ✅ Runs only once on mount

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <div className="slider-container">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`} // ✅ Fixed alt syntax
            className={index === current ? "active" : ""}
          />
        ))}
      </div>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}
