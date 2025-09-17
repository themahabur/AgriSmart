import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#127917] relative h-10 flex items-center">
          <div className="absolute -left-14 mb-2">
            <Image src="/logo.webp" width={70} height={70} alt="AgriSmart Logo"/>
          </div>
          <div className="font-hind">
            অ্যাগ্রি স্মার্ট
          </div>
        </div>

        <div></div>
      </div>
    </nav>
  );
}
