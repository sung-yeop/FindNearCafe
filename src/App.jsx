import { useState } from "react";
import NaverMap from "./NaverMap";
import "./App.css";
import { Search } from "lucide-react";

export default function App() {
  const [input, setInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchKeyword(input);
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="inputContainer">
        <input
          className="inputBox"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="장소를 검색해보세요"
        />
        <button type="submit" className="searchBtn" aria-label="검색">
          <Search size={20} color="#666666" />
        </button>
      </form>
      <div className="mapContainer">
        <NaverMap searchKeyword={searchKeyword} />
      </div>
    </div>
  );
}
