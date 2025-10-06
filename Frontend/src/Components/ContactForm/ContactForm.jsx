import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <h5>CONTACT US</h5>
        <h2>Get A Call Back</h2>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="First Name" required />
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Phone Number" required />
            <select>
              <option>Choose Services</option>
              <option>Visa Application</option>
              <option>Consultation</option>
              <option>Legal Help</option>
            </select>
          </div>
          <textarea placeholder="Write Your Message" rows="4"></textarea>
          <button type="submit">Send Us Messages &rarr;</button>
        </form>
      </div>

      <div className="contact-right">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9556513153166!3d-37.817327979751675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1b0b17f%3A0x506f7a215f7b9a0!2sEnvato!5e0!3m2!1sen!2sau!4v1614312171243!5m2!1sen!2sau"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactForm;
