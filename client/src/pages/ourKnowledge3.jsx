import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  Lightbulb,
  TrendingUp,
  Users,
  Code,
  Cloud,
  ChevronRight,
  Database,
  Coffee,
  Smartphone,
  Server,
  Wifi,
  FlaskConical,
  BrainCircuit,
} from "lucide-react"; 

gsap.registerPlugin(ScrollTrigger);

const OurKnowledge3 = () => {
  const heroRef = useRef(null);
  const sectionRefs = useRef([]); 
  const taskRefs = useRef([]); 
  const [activeBox, setActiveBox] = useState(null);
  const boxRefs = useRef([]);
  const tasks = [
    {
      id: 0,
      icon: <Database size={60} className="text-emerald-400" />,
      title: "MERN Stack Development",
      description:
        "Building robust, scalable, and high-performance web applications using MongoDB, Express.js, React, and Node.js.",
      full_description:
        "<strong>At PCS GLOBAL we specialize in MERN stack development—leveraging <span class='font-semibold text-blue-600'>MongoDB, Express.js, React, and Node.js</span> to build modern, futuristic high-performance web applications.</strong> Our solutions are developed to evolve with your business, offering <span class='font-semibold text-blue-600'>flexibility, security, and rapid deployment</span>. From dynamic user interfaces to cloud-integrated infrastructure, we engineer full-stack applications that are both technically resilient and intuitively designed. Empower your business with <span class='font-semibold text-blue-600'>seamless, end-to-end web development</span>. Harness the full potential of JavaScript—across front-end and back-end. Achieve <span class='font-semibold text-blue-600'>speed, scalability, and real-time performance</span> in one unified stack. Future-proof your digital products with intelligent, modular architecture. Deliver <span class='font-semibold text-blue-600'>exceptional user experiences</span> backed by robust engineering.",
      image: "https://placehold.co/600x400/064e3b/ffffff?text=MERN",
      buttonLabel: "Learn about MERN",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
      boxClass:
        "bg-emerald-100 border-emerald-400 text-emerald-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 1,
      icon: <Coffee size={60} className="text-red-400" />,
      title: "Java Development",
      description:
        "Expertise in enterprise-grade Java applications, from backend services to complex system integrations and microservices.",
      full_description:
        "<strong>Build with the language that powers the backbone of enterprise technology. <span class='font-semibold text-blue-600'>Java drives mission-critical systems worldwide</span>, ranging from fintech to healthcare.</strong> Secure, stable, and scalable. Java is engineered for <span class='font-semibold text-blue-600'>performance at scale</span>. Write once, run anywhere deploy across platforms with unmatched consistency. When reliability is non-negotiable, <span class='font-semibold text-blue-600'>Java proves a gold standard</span>. At PCS GLOBAL, we offer sharp Java development services tailored for complex, high-load applications. Our engineering teams specialize in building <span class='font-semibold text-blue-600'>secure backend systems, scalable APIs, enterprise-grade software, and microservices architectures</span> using the Java ecosystem. Regardless of what you are, developing a core banking platform, an e-learning suite, or a supply chain solution, we bring depth, precision, and performance to every layer. With deep integration capabilities, JVM-based scalability, and a mature tooling landscape, our Java solutions are built to last and evolve.",
      image: "https://placehold.co/600x400/991b1b/ffffff?text=Java",
      buttonLabel: "Explore Java",
      buttonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      boxClass:
        "bg-red-100 border-red-400 text-red-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 2,
      icon: <Smartphone size={60} className="text-indigo-400" />,
      title: "React Native Development",
      description:
        "Crafting beautiful and performant cross-platform mobile applications for iOS and Android with a native feel.",
      full_description:
        "<strong>Why build two apps when one intelligent codebase can rule them both? <span class='font-semibold text-blue-600'>React Native isn’t just cross-platform but it is cross-era</span>. Deploy faster, scale smarter, and look native while doing it.</strong> It’s not just development, it’s engineering with vision. At PCS GLOBAL we craft <span class='font-semibold text-blue-600'>high-performance mobile applications using React Native</span>—delivering seamless experiences across iOS and Android with a <span class='font-semibold text-blue-600'>single codebase</span>. By leveraging JavaScript and native modules, we ensure the speed of the web with the fluidity of native apps. From UI precision to backend integration, our solutions are <span class='font-semibold text-blue-600'>scalable, secure, and future-ready</span>. From MVP or transforming an enterprise workflow, React Native offers the <span class='font-semibold text-blue-600'>agility and power</span> to meet evolving user expectations. In a world where time is code and experience is everything, we help you launch once, and land everywhere.",
      image: "https://placehold.co/600x400/3730a3/ffffff?text=ReactNative",
      buttonLabel: "Mobile Solutions",
      buttonClass: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
      boxClass:
        "bg-indigo-100 border-indigo-400 text-indigo-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 3,
      icon: <Wifi size={60} className="text-orange-400" />,
      title: "Internet of Things (IoT)",
      description:
        "Developing smart, connected solutions for various industries, integrating hardware, software, and cloud platforms.",
      full_description:
        "<strong>When your devices start talking, your business starts listening. The Internet of Things isn’t just the future, but it’s the <span class='font-semibold text-blue-600'>firmware of now</span>. From factories to fridges, connectivity is the new currency.</strong> Smart is no longer a feature, it’s an expectation. Here in PCS GLOBAL, we architect and orchestrate <span class='font-semibold text-blue-600'>intelligent IoT solutions</span> that bridge the physical and digital worlds. From <span class='font-semibold text-blue-600'>smart sensors and edge devices to cloud platforms and real-time analytics</span>, we engineer ecosystems that respond, learn, and adapt. Be it predictive maintenance in manufacturing, real-time monitoring in healthcare, or home automation at scale—our infrastructure ensures <span class='font-semibold text-blue-600'>seamless, secure, and intelligent data exchange</span> across every node. We specialize in <span class='font-semibold text-blue-600'>full-stack IoT development</span>—hardware integration, connectivity protocols, cloud storage. With us, your products don’t just connect—they communicate, compute, and evolve.",
      image: "https://placehold.co/600x400/9a3412/ffffff?text=IoT",
      buttonLabel: "IoT Innovations",
      buttonClass: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500",
      boxClass:
        "bg-orange-100 border-orange-400 text-orange-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 4, // Added missing ID
      icon: <Server size={60} className="text-blue-400" />,
      title: "Python Development",
      description:
        "Versatile Python solutions for web development, automation, scripting, and backend systems, ensuring efficiency and reliability.",
      full_description:
        "<strong>Code less, build more. <span class='font-semibold text-blue-600'>Python is logic at the speed of thought</span>. From automation to AI, Python speaks every digital dialect.</strong> Clean, readable, and ridiculously powerful. Python is engineering meeting elegance. In a world of syntax-heavy chaos, Python keeps it Zen. In PCS GLOBAL we harness the power of Python to build <span class='font-semibold text-blue-600'>scalable, efficient, and future-ready solutions</span> across diverse domains. We craft backends that scale, pipelines that learn, and scripts that think. With <span class='font-semibold text-blue-600'>rapid development cycles and strong integration capabilities</span>, Python empowers us to turn complex ideas into elegant digital systems. If you’re looking for <span class='font-semibold text-blue-600'>speed, stability, and sophistication</span>. Python delivers, and we make it exceptionally possible.",
      image: "https://placehold.co/600x400/1e40af/ffffff?text=Python",
      buttonLabel: "Python Power",
      buttonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      boxClass:
        "bg-blue-100 border-blue-400 text-blue-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 5,
      icon: <FlaskConical size={60} className="text-purple-400" />,
      title: "Data Science & Analytics",
      description:
        "Unlocking insights from complex datasets, building predictive models, and implementing data-driven strategies for informed decision-making.",
      full_description:
        "<strong>Just numbers? No. <span class='font-semibold text-blue-600'>Your data is untapped intelligence</span>. In the right hands, patterns become predictions.</strong> Data speaks volumes. We make it articulate. From chaos to clarity, <span class='font-semibold text-blue-600'>analytics is the new compass</span>. In PCS GLOBAL, we transform raw data into <span class='font-semibold text-blue-600'>strategic insight</span> through advanced data science and analytics solutions. From <span class='font-semibold text-blue-600'>predictive modeling and machine learning to real-time dashboards and business intelligence</span>, we craft systems that not only analyze the past but anticipate the future. Our expertise spans Python, to cloud platforms, delivering tailored solutions for every data-driven challenge. Whether you're optimizing operations, decoding customer behavior, or forecasting market trends, our analytics engines are built to empower <span class='font-semibold text-blue-600'>smarter, faster decisions</span>. In a data-saturated world, we don’t just crunch numbers, we uncover strategies, and signals pushing business forward.",
      image: "https://placehold.co/600x400/6b21a8/ffffff?text=DataScience",
      buttonLabel: "Data Insights",
      buttonClass: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
      boxClass:
        "bg-purple-100 border-purple-400 text-purple-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 6,
      icon: <BrainCircuit size={60} className="text-pink-400" />,
      title: "Machine Learning & Deep Learning",
      description:
        "Designing and deploying intelligent systems, leveraging advanced ML/DL algorithms for automation, pattern recognition, and AI-driven solutions.",
      full_description:
        "<strong>Machines that learn aren’t fiction! They’re your next advantage. From patterns to predictions, <span class='font-semibold text-blue-600'>algorithms drive intelligence</span>. Deep Learning sees what humans might miss out, at scale, in seconds.</strong> The future isn’t coded, it’s trained. PCS GLOBAL builds <span class='font-semibold text-blue-600'>intelligent systems using Machine Learning and Deep Learning models</span> that adapt, evolve, and deliver <span class='font-semibold text-blue-600'>real-time value</span>. From recommendation engines to computer vision, NLP to predictive analytics, our solutions are designed to process complex data and uncover <span class='font-semibold text-blue-600'>actionable insights</span>. Whether it’s anomaly detection or neural network-driven applications, we bring <span class='font-semibold text-blue-600'>precision and performance</span> to every layer of the solution. Intelligence isn’t optional anymore. It’s engineered.",
      image: "https://placehold.co/600x400/be185d/ffffff?text=ML+DL",
      buttonLabel: "AI Solutions",
      buttonClass: "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
      boxClass:
        "bg-pink-100 border-pink-400 text-pink-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 7,
      icon: <Briefcase size={60} className="text-blue-400" />,
      title: "Strategic Consulting",
      description:
        "We partner with leaders to develop robust strategies, optimize operations, and unlock new avenues for sustainable growth in dynamic markets.",
      full_description:
        "<strong>Technology is only powerful when guided by vision. <span class='font-semibold text-blue-600'>Strategy bridges the gap between innovation and impact</span>. In a world driven by disruption, direction is everything.</strong> We don’t just solve problems but we anticipate them. In PCS GLOBAL, our <span class='font-semibold text-blue-600'>Strategic IT Consulting services</span> align your business goals with <span class='font-semibold text-blue-600'>future-ready digital solutions</span>. We analyze your current systems, identify technological gaps, and architect <span class='font-semibold text-blue-600'>transformation roadmaps</span> that reduce risk and maximize ROI. Whether you’re scaling infrastructure, transitioning to the cloud, or planning a full digital overhaul, our experts offer <span class='font-semibold text-blue-600'>data-backed guidance</span> rooted in industry best practices. With a balance of deep technical knowledge and sharp business insight, we ensure your IT investments don’t just support growth—they thrive in it. Because in today’s landscape, strategy isn’t mere optional, it’s your <span class='font-semibold text-blue-600'>competitive edge</span>.",
      image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Strategy",
      buttonLabel: "Strategic Growth",
      buttonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      boxClass:
        "bg-blue-100 border-blue-400 text-blue-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 8,
      icon: <Lightbulb size={60} className="text-yellow-400" />,
      title: "Product Innovation",
      description:
        "From concept to launch, we design and build innovative products that resonate with users and deliver exceptional value, leveraging agile methodologies.",
      full_description:
        "<strong>Ideas don’t change the world, <span class='font-semibold text-blue-600'>INNOVATION does</span>. From concept to code, we turn vision into velocity. Without intelligent execution, innovation isn’t just invention.</strong> Disruptive thinking. Scalable solutions. Market-ready impact. We in PCS GLOBAL, specialize in <span class='font-semibold text-blue-600'>Product Innovation that merges technology with strategy</span> to bring transformative digital products to life. Whether you’re developing a breakthrough app, reimagining an existing platform, or exploring untapped market opportunities, we guide you from <span class='font-semibold text-blue-600'>ideation to launch</span>. Our cross-functional teams blend <span class='font-semibold text-blue-600'>design thinking, agile development, and deep tech expertise</span> to rapidly prototype, validate, and scale solutions that matter. We don’t just build products, we build <span class='font-semibold text-blue-600'>relevance, usability, and future market fit</span>. In a digital-first world, innovation isn’t a department, it’s a discipline.",
      image: "https://placehold.co/600x400/4d4d00/ffffff?text=Innovation",
      buttonLabel: "Innovate Products",
      buttonClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      boxClass:
        "bg-yellow-100 border-yellow-400 text-yellow-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 9,
      icon: <TrendingUp size={60} className="text-green-400" />,
      title: "Digital Transformation",
      description:
        "Guiding organizations through their digital journey, implementing cutting-edge technologies to enhance efficiency, customer experience, and competitive advantage.",
      full_description:
        "<strong>Digital transformation isn’t an upgrade, it’s a reinvention. Business as usual no longer works in a world that moves in code.</strong> We don’t just digitize systems—we rewire how your business thinks. From static to smart, from manual to intelligent, this is the shift. PCS GLOBAL, leads organizations through <span class='font-semibold text-blue-600'>holistic digital transformation</span>, modernizing operations, enhancing customer experiences, and unlocking data-driven growth. Whether it’s <span class='font-semibold text-blue-600'>automating workflows, integrating cloud-native platforms, or embedding AI</span> into your core processes, we deliver solutions that are <span class='font-semibold text-blue-600'>agile, scalable, and future-ready</span>. Our approach blends strategic vision with technical execution, ensuring transformation is not just tech-deep, but business-wide. We work across industries to turn complexity into clarity, silos into synergy, and legacy into leverage. The result? A digital foundation built to <span class='font-semibold text-blue-600'>adapt, accelerate, and lead</span>.",
      image: "https://placehold.co/600x400/065f46/ffffff?text=Digital",
      buttonLabel: "Digital Future",
      buttonClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      boxClass:
        "bg-green-100 border-green-400 text-green-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 10,
      icon: <Users size={60} className="text-purple-400" />,
      title: "Talent Solutions",
      description:
        "Building high-performing teams is crucial. We offer comprehensive talent acquisition, development, and retention strategies to empower your workforce.",
      full_description:
        "<strong>Great tech needs greater minds, we find both. Code is easy. <span class='font-semibold text-blue-600'>Talent is rare. We deliver the latter</span>. From niche skills to full-stack squads, we build your dream team.</strong> You focus on growth, we’ll handle the brains behind it. In PCS GLOBAL, our <span class='font-semibold text-blue-600'>Talent Solutions connect you with top-tier tech professionals</span> on-demand, on-site, or offshore. Whether you’re scaling fast or filling critical gaps, we match expertise to ambition. <span class='font-semibold text-blue-600'>Agile teams, vetted developers, and specialists</span> who hit the ground coding, we provide talent that delivers from day one.",
      image: "https://placehold.co/600x400/5b21b6/ffffff?text=Talent",
      buttonLabel: "Talent Empowerment",
      buttonClass: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
      boxClass:
        "bg-purple-100 border-purple-400 text-purple-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 11,
      icon: <Code size={60} className="text-cyan-400" />,
      title: "Custom Software Development",
      description:
        "Crafting bespoke software solutions that perfectly align with your business processes, ensuring scalability, security, and seamless integration.",
      full_description:
        "<strong>Off-the-shelf won’t cut it when your vision is one of a kind. Your business is unique, shouldn't your software be too? We don’t deliver codes for crafting <span class='font-semibold text-blue-600'>digital precision</span>.</strong> Built to fit. Designed to scale. Engineered to outperform. PCS GLOBAL, specialises in <span class='font-semibold text-blue-600'>Custom Software Development tailored to your specific workflows, goals, and growth trajectory</span>. Whether you need a robust enterprise platform, an intelligent automation tool, or a scalable SaaS solution, we design and build software that aligns perfectly with your business logic. Our end-to-end process, from discovery to deployment it is agile, collaborative, and focused on <span class='font-semibold text-blue-600'>long-term value</span>. With deep expertise in <span class='font-semibold text-blue-600'>cloud-native technologies, modern frameworks, and system integrations</span>, we ensure your software is not only functional but <span class='font-semibold text-blue-600'>future-ready</span>. Because in a digital world, custom isn’t a luxury, it’s your <span class='font-semibold text-blue-600'>competitive edge</span>.",
      image: "https://placehold.co/600x400/0891b2/ffffff?text=Software",
      buttonLabel: "Bespoke Software",
      buttonClass: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500",
      boxClass:
        "bg-cyan-100 border-cyan-400 text-cyan-800 shadow-xl rounded-xl px-8 py-6",
    },
    {
      id: 12,
      icon: <Cloud size={60} className="text-teal-400" />,
      title: "Cloud Infrastructure & DevOps",
      description:
        "Designing, deploying, and managing robust cloud infrastructures and implementing DevOps practices for continuous delivery and operational excellence.",
      full_description:
        "<strong>Optimize your operations with our <span class='font-semibold text-blue-600'>cloud and DevOps expertise</span>. We design and implement scalable cloud infrastructures (AWS, Azure, GCP) and integrate robust DevOps practices for continuous integration, delivery, and automated deployments, ensuring operational efficiency.</strong> We provide end-to-end solutions, from initial architecture planning to ongoing management and optimization. Our focus is on building resilient, high-performing, and cost-effective cloud environments that support your business growth. Leverage our expertise for seamless migration, enhanced security, and streamlined development workflows, accelerating your time to market and reducing operational overhead.", // Expanded this one slightly to give more room for highlights.
      image: "https://placehold.co/600x400/0f766e/ffffff?text=Cloud",
      buttonLabel: "Cloud & DevOps",
      buttonClass: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
      boxClass:
        "bg-teal-100 border-teal-400 text-teal-800 shadow-xl rounded-xl px-8 py-6",
    },
  ];

  if (boxRefs.current.length !== 0 && boxRefs.current.length !== tasks.length) {
    boxRefs.current = Array(tasks.length)
      .fill(null)
      .map((_, i) => boxRefs.current[i] || React.createRef());
  } else if (boxRefs.current.length === 0) {
    boxRefs.current = Array(tasks.length)
      .fill(null)
      .map(() => React.createRef());
  }


  useEffect(() => {

    boxRefs.current.forEach((ref, index) => {
      const boxElement = ref.current;
      if (boxElement) {

        if (activeBox === index) {
          gsap.to(boxElement, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2, 
            ease: "power2.out",
            pointerEvents: "auto", 
          });
        } else {
  
          gsap.to(boxElement, {
            opacity: 0,
            y: 20,
            scale: 0.75,
            duration: 0.90,
            ease: "power2.in",
            pointerEvents: "none", 
          });
        }
      }
    });
  }, [activeBox]);

  useEffect(() => {
  
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );
    gsap.fromTo(
      heroRef.current.children[0].children[0],
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.5, delay: 0.5, ease: "power4.out" }
    );
    gsap.fromTo(
      heroRef.current.children[0].children[1],
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.5, delay: 0.7, ease: "power4.out" }
    );
    gsap.fromTo(
      heroRef.current.children[0].children[2], 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.9, ease: "power3.out" }
    );

   
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
    
          },
        }
      );
    });

    
    taskRefs.current.forEach((task, index) => {
      gsap.fromTo(
        task,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: task,
            start: "top 75%",
            toggleActions: "play none none none",
            delay: 0.1, 
          
          },
        }
      );
    });
  }, []);

  return (
    <div className="font-inter antialiased text-gray-200 bg-gray-900 min-h-screen">

      <script src="https://cdn.tailwindcss.com"></script>

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />


      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/000000/ffffff?text=Background+Pattern')",
          }}
        ></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Future-Proof Your Business.
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-80 max-w-3xl mx-auto">
            Empowering innovation and accelerating growth with bespoke digital
            solutions.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center mx-auto">
            Explore Our Vision <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 px-6 bg-gray-800 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-10">
            Our Philosophy
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We are a team of dedicated experts committed to pushing the
            boundaries of what's possible. Our approach combines deep industry
            knowledge with agile methodologies to deliver solutions that are not
            just effective, but truly transformative. We believe in
            collaboration, transparency, and continuous improvement.
          </p>
        </div>
      </section>

     
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-white mb-16">
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 gap-12">
            {tasks.map((task, index) => (
              <div
                key={task.id} 
                ref={(el) => (taskRefs.current[index] = el)}
                className={`flex flex-col md:flex-row items-center gap-12 mb-20 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 flex justify-center p-4">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="rounded-xl shadow-2xl w-full max-w-md object-cover h-64 md:h-80"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/4b5563/ffffff?text=${task.title.replace(
                        /\s/g,
                        "+"
                      )}`;
                    }}
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left p-4">
                  <div className="mb-6 flex justify-center md:justify-start">
                    {task.icon}
                  </div>
                  <h3 className="text-4xl font-semibold text-white mb-6">
                    {task.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {task.description}
                  </p>

                 
                  <div
                    className="relative group inline-flex flex-col items-center"
                    onMouseEnter={() => setActiveBox(index)}
                    onMouseLeave={() => setActiveBox(null)}
                  >
              
                    <button
                      className={`
                        px-8 py-4 rounded-xl text-white font-semibold text-lg
                        transition-all duration-300 ease-in-out
                        transform hover:scale-105 focus:outline-none focus:ring-4
                        focus:ring-opacity-75 focus:ring-offset-2
                        ${task.buttonClass}
                        ${activeBox === index ? "shadow-xl" : "shadow-md"}
                      `}
                    >
                      {task.buttonLabel}
                    </button>

                    <div
                      ref={boxRefs.current[index]}
                      className={`
    absolute bottom-full mb-4 p-5 border-2
    w-80 md:w-96 lg:w-[36rem] xl:w-[48rem] max-w-lg
    opacity-0 scale-95 translate-y-5
    pointer-events-none transform origin-bottom
    ${task.boxClass}
`}
                      style={{ zIndex: activeBox === index ? 10 : 1 }}
                    >
                     
                      <p
                        className="text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: task.full_description }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 px-6 bg-gradient-to-r from-blue-700 to-purple-700 text-white text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Build Something Great?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            We're eager to hear about your vision and discuss how our expertise
            can bring it to life.
          </p>
          <button className="bg-white text-blue-700 px-10 py-5 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-bold text-lg">
            Start a Conversation
          </button>
        </div>
      </section>


    </div>
  );
};

export default OurKnowledge3;