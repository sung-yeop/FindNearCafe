import { create } from "zustand";
import { searchLocal } from "../api/search/searchAPI";

const cafeStore = create((set) => ({
  cafes: [],
  selectedCafe: null,
  setCafes: (cafes) => set({ cafes }),
  setSelectedCafe: (cafe) => set({ selectedCafe: cafe }),
  updateCafes: async ({ x, y }, naver, category) => {
    try {
      const locationResult = await new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode(
          {
            location: new naver.maps.LatLng(y, x),
          },
          function (status, res) {
            if (status === naver.maps.Service.Status.ERROR) {
              reject(new Error("주소를 찾을 수 없습니다"));
              return;
            }
            resolve(res);
          }
        );
      });

      if (locationResult.result.items.length > 0) {
        const item = locationResult.result.items[0];
        const address = item.address;
        const roadAddress = item.roadAddress;

        const res = await searchLocal(
          `${roadAddress || address} ${category.name}`
        );
        const filteredCafe = res.items
          // .filter((item) => item.category.includes(`${category.filter}`))
          .map((item) => {
            const point = new naver.maps.Point(
              parseFloat(item.mapx) / 10000000,
              parseFloat(item.mapy) / 10000000
            );
            return { ...item, mapx: point.x, mapy: point.y };
          });
        set({ cafes: filteredCafe });
      }
    } catch (error) {
      alert(error.message);
    }
  },
}));

export default cafeStore;
