import Image from "next/image";
import "./globals.css";
import QuickAccess from "./components/QuickAccess/QuickAccess";
import Feature from "./components/feature/Feature";


export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Welcome to Next.js!</h1>
      <p className="text-lg text-hind">অসাধারণ টিউটোরিয়ালস</p>
      <QuickAccess />

      {/* feature section */}
      <Feature />
    </div>
  );
}
