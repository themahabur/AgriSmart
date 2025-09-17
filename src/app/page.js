import Image from 'next/image';
import './globals.css';
import QuickAccess from './components/QuickAccess/QuickAccess';
import Feature from './components/feature/Feature';
import Consultation from './components/consultation/Consultation';
import Banner from './components/Banner/Banner';
import CallToAction from './components/CallToAction/CallToAction';
import FarmerReview from './components/farmerReview/FarmerReview';

export default function Home() {
  return (
    <div>
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
