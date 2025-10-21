export const getLocation = async () => {
  try {
    // Try GPS location first
    const position = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });

    const { latitude, longitude } = position.coords;
    console.log("✅ GPS Location:", latitude, longitude);
    return { latitude, longitude };

  } catch (error) {
    console.warn("⚠️ GPS failed, fallback to IP:", error);

    try {
      // fallback to IP-based location
      const ipRes = await fetch("https://ipinfo.io/json");
      const ipData = await ipRes.json();
      const [latitude, longitude] = ipData.loc.split(",");
      console.log("✅ IP Location:", latitude, longitude);
      return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    } catch (err) {
      console.error("❌ Both GPS and IP location failed:", err);
      return null;
    }
  }
};
