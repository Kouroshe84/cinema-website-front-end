import React, { useState } from 'react';
import './ContactUs.css'; // Make sure you create the corresponding CSS file for styling
import { FaFacebook, FaInstagram, FaTwitter, FaStar } from 'react-icons/fa'; // Social media icons

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // Track the rating value
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission for message
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      alert('Your message has been successfully sent!');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  // Handle rating submission
  const handleRating = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
    } else {
      alert(`Thank you for your rating of ${rating} stars!`);
    }
  };

  return (
    <div className="contact-us-container">
      {/* Page Title */}
      <header className="contact-us-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Drop us a message, and we’ll get back to you as soon as possible.</p>
      </header>

      {/* Feedback and Rating Section */}
      <section className="contact-us-feedback">
        <div className="feedback-box">
          <h2>Customer Feedback</h2>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                className={star <= rating ? "star selected" : "star"}
                onClick={() => setRating(star)}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <p>"Great experience! Will definitely book again. The site is very user-friendly. Please give us your feedback. It will be very helpful."</p>
          <button className="submit-rating-btn" onClick={handleRating}>Submit Rating</button>
        </div>
        <div className="offers-box">
          <h2>Our Offers</h2>
          <div className="offer-images">
            <img src="https://plus.unsplash.com/premium_photo-1681487557151-d15812c252ed?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Offer 1" />
            {/* <img src="../images/img2.png" alt="Offer 2" />
            <img src="../images/img3.png" alt="Offer 3" /> */}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-us-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmitMessage}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit" disabled={isSubmitting} className="send-btn">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Social Media Links */}
      <section className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
