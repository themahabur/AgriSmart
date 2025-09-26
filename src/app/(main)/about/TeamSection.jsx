import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mahabur Rahman",
      role: "ফুলস্ট্যাক ডেভেলপার",
      img: "https://img.freepik.com/premium-photo/realistic-3d-cartoon-character-xu-glasses-brown-hair-beard_899449-58460.jpg",
    },
    {
      name: "Anayet",
      role: "ব্যাকএন্ড ডেভেলপার",
      img: "https://www.imagella.com/cdn/shop/files/fec5e9f79ee323f367b0fec5d7177663.jpg?v=1741125831",
    },
    {
      name: "Afrin",
      role: "ফ্রন্টএন্ড ডেভেলপার",
      img: "https://img.freepik.com/premium-photo/joyful-cartoon-girl-with-short-brown-hair-crafted-super-realism_1283595-28633.jpg",
    },
    {
      name: "Md Meherab Hossen",
      role: "ব্যাকএন্ড ডেভেলপার",
      img: "https://pics.craiyon.com/2024-01-23/HDin1jOmTFi6KmsTpPRncQ.webp",
    },
    {
      name: "Arifuzzaman Rakib",
      role: "ফ্রন্টএন্ড ডেভেলপার",
      img: "https://imgcdn.stablediffusionweb.com/2024/4/6/b2854190-3e29-4bab-ab6f-629fab2a262d.jpg",
    },
    {
      name: "Sakib ul Nasib",
      role: "ফ্রন্টএন্ড ডেভেলপার",
      img: "https://img.freepik.com/premium-photo/3d-rendering-cartoon-like-boy_855618-32776.jpg?w=360",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="container mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
          আমাদের টিম
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto animate-fade-in-up">
          AgriSmart-এর দক্ষ ডেভেলপমেন্ট টিম যারা নিবেদিতভাবে কাজ করে যাচ্ছে কৃষি
          খাতকে ডিজিটাল করার জন্য
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative w-full mx-auto perspective-1000"
            >
              <div className="relative w-full h-96 transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-200">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    AgriSmart-এর ডেভেলপমেন্ট টিমের সদস্য
                  </p>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 rotate-y-180">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-white font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="text-white hover:text-green-200 transition-colors duration-200"
                    >
                      <FaFacebookF className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-green-200 transition-colors duration-200"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-green-200 transition-colors duration-200"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
