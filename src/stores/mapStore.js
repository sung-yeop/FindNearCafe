import { create } from "zustand";

const onErrorGeolocation = () => {
  alert("위치 정보를 가져오는데 실패했습니다.");
};

const mapStore = create((set) => ({
  address: { x: 127.105399, y: 37.3595704 },
  updateInitialLocation: () => {
    navigator.geolocation.getCurrentPosition((position) => {
      set({
        address: {
          x: position.coords.longitude,
          y: position.coords.latitude,
        },
      });
    }, onErrorGeolocation);
  },
  setAddress: (address) => set({ address }),
  updateAddressFromSearch: (naver, query) => {
    if (!query) return;

    naver.maps.Service.geocode({ query }, function (status, res) {
      if (res.v2.addresses.length === 0) {
        alert("검색 결과가 없습니다.");
        return;
      }
      const resAddress = res.v2.addresses[0];
      set({
        address: {
          x: parseFloat(resAddress.x),
          y: parseFloat(resAddress.y),
        },
      });
    });
  },
  updateAddressFromLocation: (position) => {
    set({
      address: {
        x: position.coords.longitude,
        y: position.coords.latitude,
      },
    });
  },
}));

export default mapStore;
