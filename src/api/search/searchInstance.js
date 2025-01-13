import axios from "axios";

const searchInstance = axios.create({
  baseURL: "",
  headers: {
    "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
  },
});

export default searchInstance;
