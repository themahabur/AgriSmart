"use client";
import TeamSection from "./TeamSection";
import FutureGoals from "./FutureGoals";
import WhyStarted from "./WhyStarted";
import MissionAndVision from "./MissionAndVision";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AgriSmart সম্পর্কে
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            বাংলাদেশের কৃষকদের জন্য প্রযুক্তি নির্ভর সমাধান নিয়ে আমরা শুরু
            করেছি নতুন একটি যাত্রা
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <MissionAndVision />

      {/* Why Started Section */}
      <WhyStarted />

      {/* Future Goals Section */}

      <FutureGoals />

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}
