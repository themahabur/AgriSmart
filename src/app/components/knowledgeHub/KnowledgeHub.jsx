"use client";
import LayoutBox from "../shared/layoutBox/LayoutBox";

const KnowledgeHub = () => {
  return (
    <LayoutBox>
      <section id="knowledge-hub">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-hind text-gray-800">
            জ্ঞানই শক্তি:{" "}
            <span className="text-primary">আধুনিক চাষাবাদ শিখুন</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-hind max-w-3xl mx-auto">
            আমাদের ভিডিও টিউটোরিয়াল এবং ব্লগ থেকে কৃষি বিষয়ক সর্বশেষ তথ্য ও কৌশল
            জানুন।
          </p>
        </div>
      </section>
    </LayoutBox>
  );
};

export default KnowledgeHub;
