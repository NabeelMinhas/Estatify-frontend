import { useEffect } from 'react';
import { usePropertyStore } from '../store/propertyStore';
import { useFilterStore } from '../store/filterStore';
import Layout from '../components/Layout/Layout';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import './PropertyList.css';

const PropertyList: React.FC = () => {
  const { 
    properties, 
    loading, 
    error, 
    fetchProperties, 
    clearError 
  } = usePropertyStore();
  
  const { 
    getFilteredProperties, 
    clearFilters 
  } = useFilterStore();

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Get filtered properties
  const filteredProperties = getFilteredProperties(properties);

  // Loading state
  if (loading) {
    return (
      <Layout title="Real Estate Dashboard">
        <div className="property-list">
          <div className="property-list__header">
            <div className="property-list__search-filters">
              <SearchBar />
              <Filters />
            </div>
          </div>
          <div className="property-list__loading">
            <div className="property-list__loading-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="property-card-skeleton">
                  <div className="property-card-skeleton__image" />
                  <div className="property-card-skeleton__content">
                    <div className="property-card-skeleton__line property-card-skeleton__line--title" />
                    <div className="property-card-skeleton__line property-card-skeleton__line--details" />
                    <div className="property-card-skeleton__line property-card-skeleton__line--location" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout title="Real Estate Dashboard">
        <div className="property-list">
          <div className="property-list__header">
            <div className="property-list__search-filters">
              <SearchBar />
              <Filters />
            </div>
          </div>
          <EmptyState 
            type="error" 
            message={error}
            showClearButton={false}
          />
          <div className="property-list__error-actions">
            <button 
              className="property-list__retry-button"
              onClick={() => {
                clearError();
                fetchProperties();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Real Estate Dashboard">
      <div className="property-list">
        <div className="property-list__header">
          <div className="property-list__title-section">
            <h2 className="property-list__title">
              Properties
            </h2>
            <p className="property-list__count">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          
          <div className="property-list__search-filters">
            <SearchBar />
            <Filters />
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="property-list__grid">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="no-results"
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </Layout>
  );
};

export default PropertyList;
