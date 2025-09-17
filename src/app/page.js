<<<<<<< HEAD
import Image from "next/image";
import "./globals.css";
import QuickAccess from "./components/QuickAccess/QuickAccess";
=======
import Feature from "./components/feature/Feature";
>>>>>>> 66a9fd2dd61ffa06fea3521ad9e5344e0f58026e

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Welcome to Next.js!</h1>
      <p className="text-lg text-secondary">This is the home page.</p>
<<<<<<< HEAD
      <QuickAccess />
=======

      {/* feature section */}
      <Feature />
>>>>>>> 66a9fd2dd61ffa06fea3521ad9e5344e0f58026e
    </div>
  );
}
