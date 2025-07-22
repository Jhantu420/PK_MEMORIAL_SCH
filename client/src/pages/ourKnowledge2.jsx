import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code, Database, Coffee, Smartphone, Wifi, Server, FlaskConical, BrainCircuit,
  ArrowRight, Users, Lightbulb, TrendingUp
} from 'lucide-react'; // Reusing and adding relevant icons

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurKnowledge2 = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesGridRef = useRef(null);
  const serviceRefs = useRef([]); // For individual service card animations
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[0].children[0], // Title
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[0].children[1], // Subtitle
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[0].children[2], // Button
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power3.out" }
    );

    // About Section Animation
    gsap.fromTo(aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // Services Grid Animation (staggered cards)
    gsap.fromTo(serviceRefs.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)",
        stagger: 0.1, // Stagger the animation of each card
        scrollTrigger: {
          trigger: servicesGridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      }
    );

    // CTA Section Animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // Footer Animation
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        }
      }
    );

  }, []);

  const services = [
    {
      icon: <Database size={40} className="text-blue-600" />,
      title: "MERN Stack Development",
      description: "Crafting dynamic and scalable web OurKnowledge2lications with MongoDB, Express.js, React, and Node.js."
    },
    {
      icon: <Coffee size={40} className="text-red-600" />,
      title: "Java Enterprise Solutions",
      description: "Developing robust, secure, and high-performance enterprise OurKnowledge2lications using Java technologies."
    },
    {
      icon: <Smartphone size={40} className="text-indigo-600" />,
      title: "React Native Mobile OurKnowledge2s",
      description: "Building intuitive and cross-platform mobile experiences for iOS and Android with React Native."
    },
    {
      icon: <Wifi size={40} className="text-orange-600" />,
      title: "Internet of Things (IoT)",
      description: "Designing and implementing smart, connected IoT solutions for automation and data collection."
    },
    {
      icon: <Server size={40} className="text-teal-600" />,
      title: "Python Development",
      description: "Delivering versatile Python solutions for web, automation, data processing, and backend systems."
    },
    {
      icon: <FlaskConical size={40} className="text-purple-600" />,
      title: "Data Science & Analytics",
      description: "Extracting actionable insights from data, building predictive models, and driving data-driven strategies."
    },
    {
      icon: <BrainCircuit size={40} className="text-pink-600" />,
      title: "Machine Learning & Deep Learning",
      description: "Developing intelligent AI systems and models for advanced automation and pattern recognition."
    },
    {
      icon: <Users size={40} className="text-green-600" />,
      title: "Strategic Consulting",
      description: "Providing expert guidance to define digital strategies and optimize technology roadmaps."
    },
    {
      icon: <Lightbulb size={40} className="text-yellow-600" />,
      title: "Product Innovation",
      description: "From concept to market, we help innovate and bring new digital products to life."
    },
    {
      icon: <TrendingUp size={40} className="text-cyan-600" />,
      title: "Digital Transformation",
      description: "Guiding businesses through their digital evolution with modern technology adoption."
    },
  ];

  return (
    <div className="font-inter antialiased text-gray-800 bg-white min-h-screen">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font Inter CDN */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-cover bg-center p-6 text-center overflow-hidden"
        style={{ backgroundImage: "url('https://e0.pxfuel.com/wallpapers/760/185/desktop-wallpaper-computer-engineering-science-tech-background-modern-technology.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div> {/* Overlay for better text readability */}
        <div className="relative z-10 max-w-4xl mx-auto text-white"> {/* Text color changed to white for contrast */}
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Innovate with Precision. Deliver with Impact.
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Your trusted partner for cutting-edge software development and digital solutions.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-semibold text-lg flex items-center justify-center mx-auto">
            Our Solutions <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We are a dedicated team of technology enthusiasts and problem-solvers, passionate about crafting innovative digital experiences. With a focus on excellence and client success, we leverage the latest technologies to build robust, scalable, and user-centric OurKnowledge2lications that drive real business value.
          </p>
        </div>
      </section>

      {/* Services/Expertise Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Expertise</h2>
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={el => serviceRefs.current[index] = el}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border border-gray-100"
              >
                <div className="mb-6 p-4 rounded-full bg-blue-50">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="py-20 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's collaborate to bring your next big idea to life. Contact us today for a consultation.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-semibold text-lg">
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className="py-10 px-6 bg-gray-800 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OurKnowledge2;
