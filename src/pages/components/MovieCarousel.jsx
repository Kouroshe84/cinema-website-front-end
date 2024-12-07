import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import movie1 from "./images/movie1.png";
import movie2 from "./images/react.png";
import movie3 from "./images/vue.png";

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };

  // Hardcoded array of images and captions
  const slides = [
    { id: 1, image: movie1, title: 'Movie1', description: 'Movie1_description' },
    { id: 2, image: movie2, title: 'Movie2', description: 'Movie2_description' },
    { id: 3, image: movie3, title: 'Movie3', description: 'Movie3_description' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Technology Carousel</h2>
      <Carousel activeIndex={currentIndex} onSelect={handleSelect} indicators={true} controls={true}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={`Slide ${slide.id}`}
            />
            <Carousel.Caption>
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
