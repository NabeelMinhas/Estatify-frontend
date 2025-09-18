import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import Layout from '../components/Layout/Layout';
import EmptyState from '../components/EmptyState';
import './PropertyDetails.css';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    selectedProperty, 
    loading, 
    error, 
    fetchPropertyById, 
    clearError 
  } = usePropertyStore();

  useEffect(() => {
    if (id) {
      fetchPropertyById(id);
    }
  }, [id, fetchPropertyById]);

  const handleBackClick = () => {
    navigate('/');
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

  // Loading state
  if (loading) {
    return (
      <Layout title="Property Details">
        <div className="property-details">
          <button 
            className="property-details__back-button"
            onClick={handleBackClick}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </button>
          
          <div className="property-details__loading">
            <div className="property-details__skeleton">
              <div className="property-details__skeleton-image" />
              <div className="property-details__skeleton-content">
                <div className="property-details__skeleton-line property-details__skeleton-line--title" />
                <div className="property-details__skeleton-line property-details__skeleton-line--price" />
                <div className="property-details__skeleton-line property-details__skeleton-line--details" />
                <div className="property-details__skeleton-line property-details__skeleton-line--description" />
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
      <Layout title="Property Details">
        <div className="property-details">
          <button 
            className="property-details__back-button"
            onClick={handleBackClick}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </button>
          
          <EmptyState 
            type="error" 
            title="Property Not Found"
            message={error || "The property you're looking for doesn't exist or has been removed."}
            showClearButton={false}
          />
          
          <div className="property-details__error-actions">
            <button 
              className="property-details__retry-button"
              onClick={() => {
                clearError();
                if (id) fetchPropertyById(id);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // No property found
  if (!selectedProperty) {
    return (
      <Layout title="Property Details">
        <div className="property-details">
          <button 
            className="property-details__back-button"
            onClick={handleBackClick}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </button>
          
          <EmptyState 
            type="no-properties" 
            title="Property Not Found"
            message="The property you're looking for doesn't exist."
            showClearButton={false}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={selectedProperty.title}>
      <div className="property-details">
        <button 
          className="property-details__back-button"
          onClick={handleBackClick}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Properties
        </button>

        <div className="property-details__content">
          {/* Main Image */}
          <div className="property-details__image-section">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="property-details__main-image"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600/f0f0f0/666666?text=Property+Image';
              }}
            />
          </div>

          {/* Property Information */}
          <div className="property-details__info">
            <div className="property-details__header">
              <h1 className="property-details__title">
                {selectedProperty.title}
              </h1>
              <div className="property-details__price">
                {formatPrice(selectedProperty.price)}
              </div>
            </div>

            <div className="property-details__location">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span>
                {selectedProperty.location.address}, {selectedProperty.location.city}, {selectedProperty.location.state} {selectedProperty.location.zipCode}
              </span>
            </div>

            {/* Property Stats */}
            <div className="property-details__stats">
              <div className="property-details__stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" 
                  />
                </svg>
                <div>
                  <div className="property-details__stat-value">{selectedProperty.bedrooms}</div>
                  <div className="property-details__stat-label">
                    {selectedProperty.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </div>
                </div>
              </div>

              <div className="property-details__stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" 
                  />
                </svg>
                <div>
                  <div className="property-details__stat-value">{selectedProperty.bathrooms}</div>
                  <div className="property-details__stat-label">
                    {selectedProperty.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </div>
                </div>
              </div>

              <div className="property-details__stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" 
                  />
                </svg>
                <div>
                  <div className="property-details__stat-value">{formatArea(selectedProperty.area)}</div>
                  <div className="property-details__stat-label">Sq Ft</div>
                </div>
              </div>

              {selectedProperty.yearBuilt && (
                <div className="property-details__stat">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  <div>
                    <div className="property-details__stat-value">{selectedProperty.yearBuilt}</div>
                    <div className="property-details__stat-label">Year Built</div>
                  </div>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="property-details__type">
              <span className="property-details__type-badge">
                {selectedProperty.propertyType}
              </span>
            </div>

            {/* Description */}
            <div className="property-details__description">
              <h3>Description</h3>
              <p>{selectedProperty.description}</p>
            </div>

            {/* Features */}
            {selectedProperty.features && selectedProperty.features.length > 0 && (
              <div className="property-details__features">
                <h3>Features</h3>
                <ul className="property-details__features-list">
                  {selectedProperty.features.map((feature, index) => (
                    <li key={index} className="property-details__feature">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Agent Information */}
            {selectedProperty.agent && (
              <div className="property-details__agent">
                <h3>Contact Agent</h3>
                <div className="property-details__agent-info">
                  <div className="property-details__agent-name">
                    {selectedProperty.agent.name}
                  </div>
                  <div className="property-details__agent-contact">
                    <a href={`tel:${selectedProperty.agent.phone}`} className="property-details__agent-phone">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {selectedProperty.agent.phone}
                    </a>
                    <a href={`mailto:${selectedProperty.agent.email}`} className="property-details__agent-email">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {selectedProperty.agent.email}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetails;
