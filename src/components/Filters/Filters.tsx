import { useFilterStore } from '../../store/filterStore';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Home,
  ArrowUpDown,
} from 'lucide-react';
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
        {/* Filter Header */}
        <div className="filters__header">
          <div className="filters__title-section">
            <div className="filters__icon-wrapper">
              <SlidersHorizontal className="filters__icon" />
            </div>
            <h3 className="filters__title">Search Filters</h3>
          </div>
          
          <div className="filters__actions">
            {hasActiveFilters && (
              <button
                type="button"
                className="filters__reset-btn"
                onClick={clearFilters}
                aria-label="Clear all filters"
              >
                <X className="filters__reset-icon" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Content */}
        <div className={`filters__content filters__content--expanded`}>
          <div className="filters__grid">
            {/* Bedrooms Filter */}
            <div className="filters__group">
              <label htmlFor="bedrooms-filter" className="filters__label">
                <Home className="filters__label-icon" />
                Min Bedrooms
              </label>
              <div className="filters__select-wrapper">
                <select
                  id="bedrooms-filter"
                  className="filters__select"
                  value={minBedrooms || ''}
                  onChange={handleBedroomsChange}
                >
                  <option value="">Any</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
                <ChevronDown className="filters__select-icon" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="filters__group">
              <label htmlFor="sort-filter" className="filters__label">
                <ArrowUpDown className="filters__label-icon" />
                Sort by Price
              </label>
              <div className="filters__select-wrapper">
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
                <ChevronDown className="filters__select-icon" />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="filters__summary">
              <div className="filters__summary-title">Active Filters:</div>
              <div className="filters__tags">
                {minBedrooms && (
                  <span className="filters__tag">
                    {minBedrooms}+ Bedrooms
                    <button
                      onClick={() => setMinBedrooms(null)}
                      className="filters__tag-remove"
                      aria-label="Remove bedroom filter"
                    >
                      <X className="filters__tag-icon" />
                    </button>
                  </span>
                )}
                {sortBy && (
                  <span className="filters__tag">
                    {sortBy === 'price-asc' ? 'Price: Low to High' : 
                     sortBy === 'price-desc' ? 'Price: High to Low' : 'Default Sort'}
                    <button
                      onClick={() => setSortBy(null)}
                      className="filters__tag-remove"
                      aria-label="Remove sort filter"
                    >
                      <X className="filters__tag-icon" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
