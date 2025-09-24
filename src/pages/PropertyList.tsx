import { useEffect, useState } from 'react';
import { usePropertyStore } from '../store/propertyStore';
import { useFilterStore } from '../store/filterStore';
import { Property } from '../types/property';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import MapView from '../components/MapView';
import './PropertyList.css';

const PropertyList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Get filtered properties
  const filteredProperties = getFilteredProperties(properties);

  // PropertyListItem component for list view
  const PropertyListItem: React.FC<{ property: any }> = ({ property }) => {
    const handleDetailsClick = () => {
      handlePropertyClick(property);
    };

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    const formatArea = (area: number) => {
      return new Intl.NumberFormat('en-US').format(area);
    };

    return (
      <div 
        className="property-list-item"
        onClick={handleDetailsClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDetailsClick();
          }
        }}
      >
        <div className="property-list-item__image">
          <img
            src={property.image}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/200x150/f0f0f0/666666?text=Property+Image';
            }}
          />
        </div>
        <div className="property-list-item__content">
          <div className="property-list-item__header">
            <h3 className="property-list-item__title">{property.title}</h3>
          </div>
          <div className="property-list-item__location">
            {property.location.city}{property.location.state ? `, ${property.location.state}` : ''}
          </div>
          <div className="property-list-item__details">
            <span className="property-list-item__detail">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {property.bedrooms} Beds
            </span>
            {property.area && !isNaN(property.area) && (
              <span className="property-list-item__detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3" y="3" width="18" height="18" rx="2" ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {formatArea(property.area)} sqft
              </span>
            )}
          </div>
        </div>
        <div className="property-list-item__actions">
          <div className="property-list-item__price">{formatPrice(property.price)}</div>
          <button 
            className="property-list-item__btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Layout title="Estatify">
        <Hero />
        <div className="property-list">
          <div className="property-list__container">
            <div className="property-list__filters">
              <div className="property-list__filters-header">
                <h3 className="property-list__filters-title">Search Filters</h3>
              </div>
              <Filters />
            </div>
            <div className="property-list__content">
              <div className="property-list__loading">
                <div className="property-list__loading-grid">
                  {Array.from({ length: 6 }).map((_, index) => (
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
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout title="Estatify">
        <Hero />
        <div className="property-list">
          <div className="property-list__container">
            <div className="property-list__content">
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
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Estatify">
      <Hero />
      
      <div className="property-list">
        <div className="property-list__container">
          <Filters />
          <div className="property-list__content">
            <div className="property-list__header">
              <div className="property-list__results-info">
                <span className="property-list__count">
                  {filteredProperties.length} properties found
                </span>
              </div>
              
              <div className="property-list__view-controls">
                <button 
                  className={`property-list__view-btn ${viewMode === 'grid' ? 'property-list__view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Grid
                </button>
                <button 
                  className={`property-list__view-btn ${viewMode === 'list' ? 'property-list__view-btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  List
                </button>
                <button 
                  className={`property-list__view-btn ${viewMode === 'map' ? 'property-list__view-btn--active' : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Map
                </button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="property-list__grid">
                  {filteredProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property}
                      onPropertyClick={handlePropertyClick}
                    />
                  ))}
                </div>
              ) : viewMode === 'list' ? (
                <div className="property-list__list">
                  {filteredProperties.map((property) => (
                    <PropertyListItem 
                      key={property.id} 
                      property={property} 
                    />
                  ))}
                </div>
              ) : (
                <MapView 
                  properties={filteredProperties}
                  onPropertyClick={handlePropertyClick}
                />
              )
            ) : (
              <EmptyState 
                type="no-results"
                onClearFilters={clearFilters}
              />
            )}
          </div>
        </div>
      </div>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default PropertyList;
