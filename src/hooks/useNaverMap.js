import { useRef } from "react";

const useNaverMap = () => {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);

  const { naver } = window;

  const initializeMap = (center) => {
    if (!mapElement.current) return;

    if (mapInstance.current) {
      mapInstance.current.destroy();
    }

    mapInstance.current = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(center.y, center.x),
      zoom: 16,
    });
  };

  const addMarker = (markerInfo) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerInfo.y, markerInfo.x),
      map: mapInstance.current,
      title: markerInfo.title,
      clickable: true,
    });
    markers.current.push(marker);
    return marker;
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
  };

  const updateCurrentPosition = (x, y) => {
    if (!mapInstance.current) return;
    mapInstance.current.panTo(new naver.maps.LatLng(y, x));
  };

  return {
    naver,
    mapElement,
    initializeMap,
    addMarker,
    clearMarkers,
    updateCurrentPosition,
  };
};

export default useNaverMap;
