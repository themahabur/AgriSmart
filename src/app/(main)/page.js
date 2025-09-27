import Banner from "../components/Banner/Banner";
import CallToAction from "../components/CallToAction/CallToAction";
import Consultation from "../components/consultation/Consultation";
import FarmerReview from "../components/farmerReview/FarmerReview";
import Feature from "../components/feature/Feature";
import Fqa from "../components/FQA/Fqa";
import KnowledgeHub from "../components/knowledgeHub/KnowledgeHub";
import QuickAccess from "../components/QuickAccess/QuickAccess";

export default function Home() {
  return (
    <div>
      <Banner />
      <CallToAction />
      <QuickAccess />
      {/* feature section */}
      <Feature />
      <Consultation />
      <KnowledgeHub />
      <FarmerReview />
      <Fqa />
    </div>
  );
}
