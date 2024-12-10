import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import movie1Image from '../images/movie1.png'; // Path to the Vue image
import reactImage from '../images/react.png'; // Path to the React image
import angularImage from '../images/angular.png'; // Path to the Angular image

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };

  // Hardcoded array of images and captions
  const slides = [
    { id: 1, image: movie1Image, title: 'Vue.js', description: 'A progressive JavaScript framework' },
    { id: 2, image: reactImage, title: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 3, image: angularImage, title: 'Angular', description: 'A platform for building mobile and desktop web applications' },
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
