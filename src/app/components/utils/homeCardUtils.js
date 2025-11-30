export const getQuickStats = async (userEmail) => {
  if (!userEmail) return { farmCount: "০", taskCount: "০" };

  const [farmsRes, tasksRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/farms/${userEmail}`, {
      cache: "force-cache", // build-time cache
      next: { revalidate: 60 } // প্রতি ৬০ সেকেন্ড পর cache refresh
    }),
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/farm-tasks/${userEmail}`, {
      cache: "force-cache",
      next: { revalidate: 60 }
    }),
  ]);

  const farmsData = await farmsRes.json();
  const tasksData = await tasksRes.json();

  const farmCount = farmsData?.data?.farms?.length || farmsData?.data?.length || 0;
  const taskCount = tasksData?.tasks?.length || 0;

  const formatter = new Intl.NumberFormat('bn-BD');
  return {
    farmCount: formatter.format(farmCount),
    taskCount: formatter.format(taskCount),
  };
};
