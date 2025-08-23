import React, { useRef, useState } from "react";
import gsap from "gsap";

function DirectorMsg() {
  const msgRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleMouseEnter = () => {
    if (!hasAnimated) {
      gsap.fromTo(
        msgRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 3,
          ease: "power2.out",
        }
      );
      setHasAnimated(true); // prevent future triggers
    }
  };

  return (
    <section
      ref={msgRef}
      onMouseEnter={handleMouseEnter}
      className="bg-white text-gray-800 py-10 px-6 md:px-16 lg:px-32 font-sans"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title + Image */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/principal.jpg"
            alt="Principal"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#734af6] shadow-md"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-[#734af6] border-b-2 border-yellow-400 pb-2">
            📝 Principal's Message
          </h2>
        </div>

        {/* Message Content */}
        <div>
          <p className="mb-4">Dear Students, Parents, and Visitors,</p>
          <p className="mb-4">
            It is with great pride and pleasure that I welcome you to{" "}
            <span className="font-semibold text-[#734af6]">
              PK Memorial School
            </span>{" "}
            — a place where learning is celebrated, values are honored, and
            futures are shaped.
          </p>
          <p className="mb-4">
            At PK Memorial, we believe that education is not merely about
            academic excellence, but about nurturing character, creativity, and
            a sense of responsibility in every student. Our mission is to
            empower young minds with the knowledge, skills, and confidence they
            need to face a rapidly changing world.
          </p>
          <p className="mb-4">
            We strive to create a learning environment that is inclusive, safe,
            and inspiring — where every child feels valued and encouraged to
            discover their true potential. Our dedicated faculty and staff are
            not only educators but also mentors who guide students with patience
            and care.
          </p>
          <p className="mb-4">
            We emphasize the importance of discipline, critical thinking, and
            compassion. Our goal is to develop not just successful students, but
            responsible citizens and lifelong learners.
          </p>
          <p className="mb-4">
            I invite you to explore our website to learn more about our
            programs, values, and vision. Together, let us continue to build a
            strong and vibrant community where education leads to
            transformation.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8">
          <p className="font-bold text-lg">Warm regards,</p>
          <p className="font-semibold">Tanmoy Kauri</p>
          <p className="italic text-gray-600">
            Principal, PK Memorial School
          </p>
        </div>
      </div>
    </section>
  );
}

export default DirectorMsg;
