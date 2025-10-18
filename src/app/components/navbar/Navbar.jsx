// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { signOut, useSession } from "next-auth/react";
// import Logo from "../Logo/Logo";
// // import useUser from "@/app/hooks/useUser";

// export default function Navbar() {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [language, setLanguage] = useState("EN");
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const { data: session } = useSession();
//   const toggleDropdown = (menu) => {
//     setActiveDropdown(activeDropdown === menu ? null : menu);
//   };

  

//   const links = [
//     { name: "হোম", href: "/" },
    

//     { name: "ব্লগ", href: "/blogs" },
//     { name: "আমাদের সম্পর্কে", href: "/about" },
//     { name: "যোগাযোগ", href: "/contact" },
//     { name: "ড্যাশবোর্ড", href: "/dashboard" },
//   ];

  

//   return (
//     <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
//       <div className="container flex justify-between items-center mx-auto">
//         {/* Logo */}
//         <Logo />

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex gap-6 text-gray-700 font-medium font-hind items-center ">
//           {links.map((link) =>
//             link.name === "সেবাসমূহ" ? (
//               <li key={link.name} className="relative">
//                 <button
//                   onClick={() => toggleDropdown("services")}
//                   className="flex items-center gap-1 hover:text-green-600"
//                 >
//                   {link.name} <IoMdArrowDropdown />
//                 </button>
//                 {activeDropdown === "services" && (
//                   <ul className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
//                     {services.map((service) => (
//                       <li key={service.name}>
//                         <Link
//                           href={service.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         >
//                           {service.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ) : (
//               <li key={link.name}>
//                 <Link href={link.href} className="hover:text-green-600">
//                   {link.name}
//                 </Link>
//               </li>
//             )
//           )}
//           {/* Language & Login */}
//           <li className="flex items-center gap-3">
         
//             {session?.user?.email ? (
//               <button
//                 onClick={() => signOut()}
//                 className="px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:bg-[#259e2f] transition font-hind"
//               >
//                 লগআউট
//               </button>
//             ) : (
//               <Link
//                 href={"auth/login"}
//                 className="px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:bg-[#259e2f] transition font-hind"
//               >
//                 লগইন
//               </Link>
//             )}
//           </li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden text-gray-700"
//           onClick={() => setMobileMenu(!mobileMenu)}
//         >
//           {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenu && (
//         <div className="lg:hidden mt-2 px-4 pb-4 space-y-2">
//           {links.map((link) =>
//             link.name === "সেবাসমূহ" ? (
//               <div key={link.name} className="relative">
//                 <button
//                   onClick={() => toggleDropdown("services")}
//                   className="flex justify-between w-full items-center px-2 py-2 text-gray-700 hover:text-green-600"
//                 >
//                   {link.name} <IoMdArrowDropdown />
//                 </button>
//                 {activeDropdown === "services" && (
//                   <ul className="pl-4 mt-1 space-y-1">
//                     {services.map((service) => (
//                       <li key={service.name}>
//                         <Link
//                           href={service.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
//                         >
//                           {service.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="block px-2 py-2 text-gray-700 hover:text-green-600 rounded"
//               >
//                 {link.name}
//               </Link>
//             )
//           )}

//           {/* Language & Login */}
//           <div className="flex gap-3 mt-2">
           
//             {session?.user?.email ? (
//               <button
//                 onClick={() => signOut()}
//                 className="px-4 py-1 rounded-full bg-[#33ac3d] text-white hover:bg-[#259e2f] transition font-hind"
//               >
//                 লগআউট
//               </button>
//             ) : (
//               <Link
//                 href={"login"}
//                 className="px-4 py-1 rounded-full bg-[#33ac3d] text-white hover:bg-[#259e2f] transition font-hind"
//               >
//                 লগইন
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  IoMdHome, 
  IoMdDocument, 
  IoMdInformationCircle, 
  IoMdCall, 
  IoMdGrid,
  IoMdLogOut,
  IoMdLogIn,
  IoMdMenu,
  IoMdClose
} from "react-icons/io";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBlog, 
  FaInfoCircle, 
  FaPhone, 
  FaTachometerAlt,
  FaSignOutAlt,
  FaSignInAlt
} from "react-icons/fa";
import { 
  HiMenuAlt3, 
  HiX, 
  HiHome, 
  HiDocumentText, 
  HiInformationCircle, 
  HiPhone, 
  HiLogout,
  HiLogin,
  HiTemplate
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo/Logo";
// import useUser from "@/app/hooks/useUser";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  

  const links = [
    { name: "হোম", href: "/", icon: HiHome },
    { name: "ব্লগ", href: "/blogs", icon: HiDocumentText },
    { name: "আমাদের সম্পর্কে", href: "/about", icon: HiInformationCircle },
    { name: "যোগাযোগ", href: "/contact", icon: HiPhone },
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: HiTemplate },
  ];


  

  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-gray-700 font-medium font-hind items-center">
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  {link.name}
                </Link>
              </li>
            );
          })}
          
          {/* Language & Login */}
          <li className="flex items-center gap-3">
            {session?.user?.email ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <HiLogout className="w-4 h-4" />
                লগআউট
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <HiLogin className="w-4 h-4" />
                লগইন
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenu ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden mt-4 px-4 pb-6 bg-white/95 backdrop-blur-sm rounded-b-xl shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-1">
            {links.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 group"
                  onClick={() => setMobileMenu(false)}
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  {link.name}
                </Link>
              );
            })}
            
          </div>

          {/* Mobile Login/Logout */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            {session?.user?.email ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105 flex-1 justify-center"
              >
                <HiLogout className="w-4 h-4" />
                লগআউট
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105 flex-1 justify-center"
                onClick={() => setMobileMenu(false)}
              >
                <HiLogin className="w-4 h-4" />
                লগইন
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
