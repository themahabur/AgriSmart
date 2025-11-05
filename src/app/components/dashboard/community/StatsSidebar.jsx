const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-bold text-gray-900">{value}</span>
  </div>
);

const StatsSidebar = () => {
  // Dummy data for now
  const topContributors = [
    { name: "Abul Kashem", avatar: "/faq.png", posts: 120 },
    { name: "Fatima Begum", avatar: "/faq.png", posts: 95 },
    { name: "Rahim Sheikh", avatar: "/faq.png", posts: 88 },
  ];

  return (
    <div className="sticky top-5 space-y-6">
      {/* Community Stats Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 mb-2">Community Stats</h3>
        <div className="space-y-1">
          <StatItem label="Total Members" value="12,452" />
          <StatItem label="Posts Today" value="124" />
          <StatItem label="Solutions Provided" value="8,921" />
        </div>
      </div>

      {/* Top Contributors Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 mb-4">Top Contributors</h3>
        <ul className="space-y-4">
          {topContributors.map((user) => (
            <li key={user.name} className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.posts} posts</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsSidebar;
