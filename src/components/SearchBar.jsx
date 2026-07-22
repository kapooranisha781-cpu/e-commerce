function SearchBar({ value, onChange }) {
    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={onChange}
        />
    );
}

export default SearchBar;