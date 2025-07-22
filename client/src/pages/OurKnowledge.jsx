
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Lightbulb, TrendingUp, Users, Code, Cloud } from 'lucide-react'; // Using lucide-react for icons

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurKnowledge = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const tasksRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[0],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[1],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(heroRef.current.children[2],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.7, ease: "power3.out" }
    );

    // About Section Animation
    gsap.fromTo(aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%", // When top of element hits 80% of viewport
          toggleActions: "play none none none",
        }
      }
    );

    // Tasks Section Animations
    tasksRef.current.forEach((task, index) => {
      gsap.fromTo(task,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: task,
            start: "top 85%",
            toggleActions: "play none none none",
            delay: index * 0.1 // Stagger animation
          }
        }
      );
    });

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

  const tasks = [
    {
      icon: <Briefcase size={48} className="text-indigo-600 mb-4" />,
      title: "Strategic Consulting",
      description: "We provide expert strategic guidance to help businesses navigate complex challenges and achieve their long-term objectives."
    },
    {
      icon: <Lightbulb size={48} className="text-yellow-500 mb-4" />,
      title: "Innovative Solutions",
      description: "Our team crafts cutting-edge, custom solutions that drive efficiency, foster growth, and enhance user experience."
    },
    {
      icon: <TrendingUp size={48} className="text-green-600 mb-4" />,
      title: "Market Expansion",
      description: "We assist companies in identifying new market opportunities and developing robust strategies for successful expansion."
    },
    {
      icon: <Users size={48} className="text-purple-600 mb-4" />,
      title: "Team Development",
      description: "Empowering your workforce through comprehensive training programs and leadership development initiatives."
    },
    {
      icon: <Code size={48} className="text-blue-600 mb-4" />,
      title: "Software Engineering",
      description: "Building scalable, secure, and high-performance software applications tailored to your specific business needs."
    },
    {
      icon: <Cloud size={48} className="text-teal-600 mb-4" />,
      title: "Cloud Integration",
      description: "Seamlessly integrating cloud services to optimize your infrastructure, improve data accessibility, and reduce operational costs."
    }
  ];

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font Inter CDN */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Innovate. Create. Elevate.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Driving transformation through strategic insights and cutting-edge solutions.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-semibold text-lg">
            Discover Our Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            At **[Your Company Name]**, we are a collective of passionate innovators, strategists, and technologists dedicated to empowering businesses to thrive in a rapidly evolving landscape. We believe in building lasting partnerships and delivering measurable impact through our expertise and commitment to excellence.
          </p>
        </div>
      </section>

      {/* Tasks/Services Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tasks.map((task, index) => (
              <div
                key={index}
                ref={el => tasksRef.current[index] = el}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center"
              >
                {task.icon}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{task.title}</h3>
                <p className="text-gray-700 leading-relaxed">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section (Optional) */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our tailored solutions can help you achieve your goals.
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-semibold text-lg">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className="py-10 px-6 bg-gray-800 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
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

export default OurKnowledge;
