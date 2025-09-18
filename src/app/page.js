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
      <Navbar/>
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
