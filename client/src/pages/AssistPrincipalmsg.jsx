import React, { useRef, useState } from "react";
import gsap from "gsap";

function AssistPrincipalmsg() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#734af6] border-b-2 border-yellow-400 pb-2">
            🎓 Assistant Principal's Message
          </h2>
          <img
            src="/principal.jpg"
            alt="Assistant Principal"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#734af6] shadow-md"
          />
        </div>

        {/* Message Content */}
        <div>
          <p className="mb-4">Dear Students, Parents, and Visitors,</p>
          <p className="mb-4">
            Welcome to{" "}
            <span className="font-semibold text-[#734af6]">
              PK Memorial School
            </span>{" "}
            — a hub of knowledge, innovation, and holistic development.
          </p>
          <p className="mb-4">
            As the Assistant Principal, I take immense pride in supporting our
            mission of fostering an environment that blends academic rigor with
            creativity, discipline, and compassion. Our focus is not only on
            scholastic achievements but also on shaping young individuals who
            embody strong values and leadership qualities.
          </p>
          <p className="mb-4">
            We believe in collaborative growth — where teachers, parents, and
            students work together to create a nurturing and empowering
            educational experience. By encouraging curiosity, resilience, and
            respect, we prepare our students to face the opportunities and
            challenges of the future with confidence.
          </p>
          <p className="mb-4">
            At PK Memorial, every child matters. It is our constant endeavor to
            provide a safe and inspiring atmosphere where students can dream
            big, discover their strengths, and achieve excellence.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8">
          <p className="font-bold text-lg">Sincerely,</p>
          <p className="font-semibold">[Assistant Principal’s Name]</p>
          <p className="italic text-gray-600">
            Assistant Principal, PK Memorial School
          </p>
        </div>
      </div>
    </section>
  );
}

export default AssistPrincipalmsg;
