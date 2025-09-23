import { IoStatsChart } from "react-icons/io5";
import { FaCalculator, FaSeedling } from "react-icons/fa";
import { MdOutlineQuestionAnswer, MdOutlineSchool } from "react-icons/md";
import { WiDayCloudyWindy } from "react-icons/wi";

function QuickAccess() {
  const tools = [
    {
      icon: <IoStatsChart className="text-primary" />,
      title: "বাজার দর",
      desc: "প্রতিদিনের আপডেটেড ফসলের দাম দেখে সঠিক দামে বিক্রি করুন",
    },
    {
      icon: <FaSeedling className="text-primary" />,
      title: "পোকা ব্যবস্থাপনা",
      desc: "ফসলের ছবির মাধ্যমে এআই-ভিত্তিক পোকা ও রোগ শনাক্তকরণ",
    },
    {
      icon: <MdOutlineQuestionAnswer className="text-primary" />,
      title: "এক্সপার্ট পরামর্শ",
      desc: "ব্যক্তিগত পরামর্শের জন্য কৃষি বিশেষজ্ঞদের সাথে যুক্ত হোন",
    },
    {
      icon: <WiDayCloudyWindy className="text-primary" />,
      title: "আবহাওয়া সতর্কতা",
      desc: "বৃষ্টি, ঝড়, খরা ইত্যাদি পূর্বাভাসের রিয়েল-টাইম নোটিফিকেশন",
    },
    {
      icon: <FaCalculator className="text-primary" />,
      title: "লাভ ক্যালকুলেটর",
      desc: "উৎপাদন খরচ ও লাভ/ক্ষতির হিসাব সহজে করুন",
    },
    {
      icon: <MdOutlineSchool className="text-primary" />,
      title: "চাষাবাদ টিউটোরিয়াল",
      desc: "আধুনিক কৃষি পদ্ধতি ও প্রযুক্তি শেখার সহজ উপায়",
    },
  ];

  return (
    <section className="font-hind py-12 bg-gradient-to-r from-green-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-start text-center lg:text-left">
          <img
            src="/smartFarmer.png"
            alt="Farmer Illustration"
            className="w-24 md:w-32 mx-auto lg:mx-0 mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 mx-auto lg:mx-0 lg:pl-3">
            অসাধারণ <span className="text-primary ">কৃষি টুলস</span>
          </h2>
          <p className="leading-relaxed text-gray-700 text-sm sm:text-base lg:pl-3 lg:w-sm mx-auto lg:mx-0">
            আধুনিক কৃষিকে আরও কার্যকর করতে আমরা এনেছি স্মার্ট টুলস — যেগুলো সহজ,
            কার্যকরী, আর বাংলায় সহজ ভাষায় উপস্থাপিত। এখানে প্রতিদিনের বাজার দর,
            আবহাওয়ার খবর, পোকামাকড় নিয়ন্ত্রণ, এবং আরও অনেক কৃষি সম্পর্কিত তথ্য
            একসাথে পাবেন।
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white border border-gray-100 p-6 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300"
            >
              <div>
                <div className="h-14 w-14 rounded-full flex items-center justify-center text-xl mb-4 bg-green-50 text-amber-700 mx-auto sm:mx-0">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary text-center sm:text-left">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center sm:text-left">
                  {item.desc}
                </p>
              </div>
              <button className="mt-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-2 lg:py-3 px-4 rounded-full hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                এখনই দেখুন →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickAccess;
