import Driver from "../model/user.model"
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  

  export const matchRiderWithDriver = async(riderLocation: { latitude: number; longitude: number }): Promise<{ driverId: string; distance: number } | null> =>{
    const drivers = await Driver.find({ isAvailable: true });
    let nearestDriver = null;
    let minDistance = Infinity;
  
    for (const driver of drivers) {
      const distance = haversineDistance(
        riderLocation.latitude,
        riderLocation.longitude,
        driver.latitude,
        driver.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    }
    return nearestDriver ? { driverId: nearestDriver._id.toString(), distance: minDistance } : null;
  }
  