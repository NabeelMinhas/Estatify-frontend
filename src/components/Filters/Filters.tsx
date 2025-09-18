import { useFilterStore } from '@/store/filterStore';
import './Filters.css';

const Filters: React.FC = () => {
  const { 
    minBedrooms, 
    sortBy, 
    setMinBedrooms, 
    setSortBy, 
    clearFilters 
  } = useFilterStore();

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);
    setMinBedrooms(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'price-asc' | 'price-desc' | '';
    setSortBy(value === '' ? null : value);
  };

  const hasActiveFilters = minBedrooms !== null || sortBy !== null;

  return (
    <div className="filters">
      <div className="filters__container">
        <div className="filters__group">
          <label htmlFor="bedrooms-filter" className="filters__label">
            Min Bedrooms
          </label>
          <select
            id="bedrooms-filter"
            className="filters__select"
            value={minBedrooms || ''}
            onChange={handleBedroomsChange}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="filters__group">
          <label htmlFor="sort-filter" className="filters__label">
            Sort by Price
          </label>
          <select
            id="sort-filter"
            className="filters__select"
            value={sortBy || ''}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="filters__clear"
            onClick={clearFilters}
            aria-label="Clear all filters"
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
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
