import { FaSearch } from "react-icons/fa";
import "../style/SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search by product, brand or category..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;