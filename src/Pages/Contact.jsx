import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch("https://formsubmit.co/ajax/kaushikyerra11@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Portfolio Contact from " + formData.name
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#0055FF',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#0055FF'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%] relative z-10">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-4xl md:text-5xl font-bold text-center mx-auto"
          style={{ color: "var(--text-primary)" }}
        >
          Contact Me
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[var(--primary)]" />
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="max-w-2xl mx-auto text-sm md:text-lg font-medium mt-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0 relative z-10"
        id="Contact"
      >
        <div className="container px-[1%] w-full max-w-lg">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            className="bg-white rounded-3xl border p-6 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-xl"
            style={{ borderColor: "var(--border-color)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  Get in Touch
                </h2>
                <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 opacity-20" style={{ color: "var(--primary)" }} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-gray-50 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 disabled:opacity-50"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-gray-50 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 disabled:opacity-50"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-gray-50 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300 h-[9.9rem] disabled:opacity-50"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t flex justify-center space-x-6" style={{ borderColor: "var(--border-color)" }}>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;