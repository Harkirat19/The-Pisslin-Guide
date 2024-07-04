export function calcDist(remotePos){
  //acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371

  

  dist = Math.acos(Math.sin(localPos[0])*Math.sin(remotePos[0])+Math.cos(localPos[0])*Math.cos(remotePos[0])*Math.cos(remotePos[1]-localPos[1]))*6371;

  return dist
}
