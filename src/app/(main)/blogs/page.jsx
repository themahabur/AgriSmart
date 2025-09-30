export default function Home() {
  const featured = {
    title: "সাফল্যের গল্প: পুনর্জীবনশীল কৃষিতে রূপান্তর",
    date: "২৮ আগস্ট, ২০২৩",
    readTime: "৬ মিনিট",
    desc: "পাঁচ বছর আগে, জন অ্যান্ডারসনের খামার কম ফসল ফলন ও বাড়তে থাকা খরচে সমস্যায় ছিল। আজ তার খামার উন্নত মুনাফা এবং সুস্থ মাটির সাথে সফল। এই কেস স্টাডিতে দেখা যাবে কিভাবে জন প্রচলিত কৃষি থেকে পুনর্জীবনশীল কৃষি পদ্ধতিতে রূপান্তরিত হয়েছেন, কী কী চ্যালেঞ্জের সম্মুখীন হয়েছেন এবং কী শিক্ষা পেয়েছেন...",
    tag: "জলবায়ু সহনশীল",
    image: "https://www.farmaid.org/wp-content/uploads/2024/11/farmers_in_field_with_greens-scott_streble-20240805_denison_0062-1400x900.jpg",
    button: "পুরো আর্টিকেল পড়ুন",
    author: "রিজেনারেটিভ ফার্মিং নেটওয়ার্ক",
  };

  const resources = [
    {
      id: 1,
      type: "ভিডিও",
      duration: "২৫:১৫",
      title: "সেন্টার পিভট সেচ ব্যবস্থা: স্থাপন ও রক্ষণাবেক্ষণ",
      desc: "কার্যকর সেন্টার পিভট সেচ ব্যবস্থা সেটআপ ও রক্ষণাবেক্ষণের ধাপে ধাপে ভিডিও গাইড...",
      date: "২২ অক্টোবর, ২০২৩",
      author: "জেমস কার্টার",
      image: "https://www.farmaid.org/wp-content/uploads/2024/11/farmers_in_field_with_greens-scott_streble-20240805_denison_0062-1400x900.jpg",
      badge: "জনপ্রিয়",
    },
    {
      id: 2,
      type: "ইনফোগ্রাফিক",
      title: "সয়াবিন রোগ চিহ্নিতকরণ ও ব্যবস্থাপনা",
      desc: "সয়াবিনের সাধারণ রোগ ও এর জৈব ও প্রচলিত চিকিৎসার ভিজ্যুয়াল গাইড...",
      date: "২১ আগস্ট, ২০২৩",
      author: "প্লান্ট প্যাথলজি বিভাগ, ইউনিভার্সিটি অব ইলিনয়",
      image: "https://b3075642.smushcdn.com/3075642/wp-content/uploads/Canva-Farmer-in-sugar-beet-field-1-scaled.jpg?lossy=1&strip=1&webp=1",
      badge: "জনপ্রিয়",
    },
    {
      id: 3,
      type: "টুল",
      title: "মিডওয়েস্ট কৃষকদের জন্য মৌসুমি ফসল ক্যালেন্ডার",
      desc: "সেরা বপন ও কাটার সময় দেখানো ইন্টারেক্টিভ ক্যালেন্ডার...",
      date: "৯ সেপ্টেম্বর, ২০২৩",
      author: "",
      image: "https://www.farmaid.org/wp-content/uploads/2024/11/farmers_in_field_with_greens-scott_streble-20240805_denison_0062-1400x900.jpg",
      badge: "বাছাইকৃত",
    },
    {
      id: 4,
      type: "প্রবন্ধ",
      readTime: "৬ মিনিট",
      title: "ভুট্টা ফসলে সমন্বিত পোকা ব্যবস্থাপনা",
      desc: "ভুট্টা ফসলে পোকা দমন করার সম্পূর্ণ কৌশল যা রাসায়নিক ব্যবহারের পরিমাণ কমায়...",
      date: "২৫ সেপ্টেম্বর, ২০২৩",
      author: "ড. লরা বেনেট",
      image: "https://www.farmaid.org/wp-content/uploads/2024/11/farmers_in_field_with_greens-scott_streble-20240805_denison_0062-1400x900.jpg",
    },
  ];

  return (
    <main className="px-6 py-10 container mx-auto md:px-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-700">জ্ঞানভান্ডার</h1>
      <p className="text-gray-600 mb-6">
        আপনার কৃষি কার্যক্রম উন্নত করতে সহায়ক শিক্ষামূলক রিসোর্স
      </p>

      {/* Featured Section */}
      <div className="rounded-2xl overflow-hidden flex mb-12 bg-gray-50 flex-col md:flex-row">
        <img src={featured.image} alt="" className="w-full md:w-[40%] object-cover" />
        <div className="p-6 flex flex-col justify-between">
          <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full w-fit">
            {featured.tag}
          </span>
          <h2 className="text-xl font-bold mt-2">{featured.title}</h2>
          <p className="text-gray-500 text-md mt-2">{featured.desc}</p>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>{featured.date} • {featured.readTime}</span>
            <span>{featured.author}</span>
          </div>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-40">
            {featured.button}
          </button>
        </div>
      </div>

      {/* All Resources */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">সব রিসোর্স</h2>
        <button className="text-green-600 font-medium hover:underline">
          সব দেখুন
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img src={res.image} alt="" className="w-full h-52 object-cover" />
              {res.badge && (
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-lg 
                  ${res.badge === "বাছাইকৃত" ? "bg-green-600 text-white" : "bg-orange-500 text-white"}`}>
                  {res.badge}
                </span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs text-gray-500">{res.type} {res.duration || res.readTime}</span>
              <h3 className="font-semibold mt-1 text-xl">{res.title}</h3>
              <p className="text-gray-600 text-md mt-2 flex-1">{res.desc}</p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>{res.date}</span>
                <span>{res.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
