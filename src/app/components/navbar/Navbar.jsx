import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "হোম", href: "/" },
    { name: "সেবাসমূহ", href: "/services" },
    { name: "বাজার মূল্য", href: "/market-price" },
    { name: "আবহাওয়া", href: "/weather" },
    { name: "ব্লগ", href: "/blogs" },
    { name: "যোগাযোগ", href: "/contact" },
  ];

  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#127917] relative h-10 flex items-center">
          <div className="absolute -left-16 mb-2">
            <Image
              src="/logo.webp"
              width={70}
              height={70}
              alt="AgriSmart Logo"
            />
          </div>
          <div className="font-hind">অ্যাগ্রি স্মার্ট</div>
        </div>

        <div>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium font-hind">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-green-600">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
