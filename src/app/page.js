import "./globals.css";
import QuickAccess from "./components/QuickAccess/QuickAccess";
import Feature from "./components/feature/Feature";
import Consultation from "./components/consultation/Consultation";
import Banner from "./components/Banner/Banner";
import CallToAction from "./components/CallToAction/CallToAction";
import FarmerReview from "./components/farmerReview/FarmerReview";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-primary">Welcome to Next.js!</h1>
      <p className="text-lg text-hind">অসাধারণ টিউটোরিয়ালস</p>
      <h1 className="text-3xl mx-auto font-bold text-primary">
        Welcome to Next.js!
      </h1>
      <Banner></Banner>
      <CallToAction></CallToAction>
      <QuickAccess />

      {/* feature section */}
      <Feature />
      <Consultation />
      <FarmerReview />
    </div>
  );
}
