




const SortFilterControls = ({
  sortBy,
  sortDir,
  category,
  search,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <div className="sort-filter-controls">
      <div className="sort-controls">
        <label>
          Sort by
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value, sortDir)}
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </label>

        <label>
          Direction
          <select
            value={sortDir}
            onChange={(e) => onSortChange(sortBy, e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
      </div>

      <div className="filter-controls">
        <label>
          Category
          <select
            value={category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </label>

        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
};

export default SortFilterControls;


