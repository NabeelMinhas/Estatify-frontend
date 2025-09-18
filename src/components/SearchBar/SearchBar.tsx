import { useFilterStore } from '../../store/filterStore';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__icon">
          <svg 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search properties"
        />
        
        {searchQuery && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <svg 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
