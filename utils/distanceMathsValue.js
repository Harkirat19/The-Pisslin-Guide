import * as Location from "expo-location";

export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({});
  return location.coords;
}
export function calcDist(userLat, userLong, remoteLat, remoteLong) {
  const R = 6371e3; // metres
  const φ1 = (remoteLat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (userLat * Math.PI) / 180;
  const Δφ = ((userLat - remoteLat) * Math.PI) / 180;
  const Δλ = ((userLong - remoteLong) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const dist = R * c; // in metres
  return dist;
}
