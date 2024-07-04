import * as Location from "expo-location";
import React, { useState, useEffect } from "react";

export function calcDist(remoteLat, remoteLong) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  dist = 0;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
    console.log(location.coords.latitude, location.coords.longitude);
    console.log(remoteLat, remoteLong);

    //  dist =
    //  Math.acos(
    //    Math.sin(location.coords.latitude) * Math.sin(remoteLat) +
    //    Math.cos(location.coords.latitude) *
    //    Math.cos(remoteLat) *
    //  Math.cos(remoteLong - location.coords.longitude),
    //  ) * 6371;

    const R = 6371e3; // metres
    const φ1 = (remoteLat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (location.coords.latitude * Math.PI) / 180;
    const Δφ = ((location.coords.latitude - remoteLat) * Math.PI) / 180;
    const Δλ = ((location.coords.longitude - remoteLat) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const dist = R * c; // in metres

    if (dist > 1000) {
      text = (dist / 1000).toFixed(1) + "km";
    } else {
      text = dist.toFixed(0) + "m";
    }
  }
  //console.log(dist);

  return text;
}
