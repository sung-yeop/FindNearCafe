import { memo } from "react";
import { useEffect } from "react";
import useNaverMap from "./hooks/useNaverMap";
import useCafeStore from "./stores/cafeStore";
import useMapStore from "./stores/mapStore";
import "./NaverMap.css";
import { useState } from "react";

const categories = {
  cafe: { name: "카페", filter: "음식점" },
  food: { name: "음식점", filter: "음식점" },
};

const NaverMap = ({ searchKeyword }) => {
  const { address, updateInitialLocation, updateAddressFromSearch } =
    useMapStore();
  const { cafes, selectedCafe, setSelectedCafe, updateCafes } = useCafeStore();
  const {
    naver,
    mapElement,
    initializeMap,
    addMarker,
    clearMarkers,
    updateCurrentPosition,
  } = useNaverMap();
  const [category, setCategory] = useState(categories["cafe"]);

  updateInitialLocation();

  useEffect(() => {
    if (searchKeyword) {
      updateAddressFromSearch(naver, searchKeyword);
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (address.x && address.y) {
      initializeMap(address);
      updateCafes({ x: address.x, y: address.y }, naver, category);
    }
  }, [address, category]);

  useEffect(() => {
    clearMarkers();
    cafes.forEach((cafe) => {
      addMarker({
        x: cafe.mapx,
        y: cafe.mapy,
        title: cafe.title,
      });
    });
  }, [cafes, addMarker, clearMarkers, setSelectedCafe]);

  return (
    <div className="mapWrapper">
      <div className="sidePanel">
        <div className="filterSection">
          <div className="filterTitle">카테고리</div>
          <div className="filterOptions">
            <button
              className={`filterChip ${
                category === categories.cafe ? "active" : ""
              }`}
              onClick={() => setCategory(categories.cafe)}
            >
              카페
            </button>
            <button
              className={`filterChip ${
                category === categories.food ? "active" : ""
              }`}
              onClick={() => setCategory(categories.food)}
            >
              식당
            </button>
          </div>
        </div>
        <div className="cafeList">
          {cafes.map((cafe, index) => (
            <div
              key={index}
              className="cafeItem"
              onClick={() => {
                setSelectedCafe(cafe);
                updateCurrentPosition(cafe.mapx, cafe.mapy);
              }}
            >
              <div className="cafeTitle">
                {cafe.title.replace(/<[^>]*>?/g, "")}
              </div>
              <div className="cafeInfo">
                <div>{cafe.category}</div>
                <div>{cafe.roadAddress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mapContainer">
        <div ref={mapElement} style={{ width: "100%", height: "100%" }} />
        {selectedCafe && (
          <div className="selectedCafeInfo">
            <h3 className="cafeTitle">
              {selectedCafe.title.replace(/<[^>]*>?/g, "")}
            </h3>
            <div className="cafeInfo">
              <p>카테고리: {selectedCafe.category}</p>
              <p>도로명: {selectedCafe.roadAddress}</p>
              <p>지번: {selectedCafe.address}</p>
              {selectedCafe.telephone && (
                <p>전화번호: {selectedCafe.telephone}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedCafe(null)}
              className="filterChip"
              style={{ marginTop: "10px" }}
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(NaverMap);
