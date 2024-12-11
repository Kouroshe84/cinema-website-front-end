import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; // Make sure to create a corresponding CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About CinematicHub</h1>
      </header>

      {/* Introduction Section */}
      <section className="about-us-intro">
        <p>
          Welcome to CinematicHub, your go-to platform for booking movie tickets online. We aim to provide a seamless and delightful experience for movie lovers, ensuring that every movie ticket purchase is just a click away.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-us-mission">
        <h2>Our Mission</h2>
        <p>
          At CinematicHub, our mission is to revolutionize the way people experience cinema. We aim to make movie booking easier, faster, and more accessible by leveraging modern technology to provide a user-friendly platform that caters to movie-goers' needs. Whether you're booking for a solo movie night or planning a group outing, we've got you covered.
        </p>
      </section>

      {/* Vision Section */}
      <section className="about-us-vision">
        <h2>Our Vision</h2>
        <p>
          Our vision is to become the number one online movie ticket booking platform, known for providing a hassle-free and enjoyable experience. We want to connect cinema lovers worldwide, making sure that everyone has access to the best movie deals, showtimes, and seats at the click of a button.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="about-us-story">
        <h2>Our Story</h2>
        <p>
          CinematicHub was born out of a passion for movies and the frustration of long queues and complicated booking processes. Our founders, who were avid moviegoers themselves, saw an opportunity to simplify the way people book their tickets and provide them with a one-stop-shop for all their movie needs. Since its inception, CinematicHub has grown into a trusted platform where movie lovers can easily find movies, check showtimes, and book tickets – all from the comfort of their homes.
        </p>
        <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="CinematicHub" className="about-us-image" />
      </section>

      {/* Contact Section */}
      <section className="about-us-contact">
        <h2>Get in Touch</h2>
        <p>
          We love to hear from our users! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at <strong>support@cinematichub.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
