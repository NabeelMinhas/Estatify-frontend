import { Property } from '../../types/property';
import './PropertyCard.css';

interface PropertyCardProps {
  property: Property;
  onPropertyClick?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPropertyClick }) => {
  const handleCardClick = () => {
    if (onPropertyClick) {
      onPropertyClick(property);
    }
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

  const getStatusBadge = () => {
    // Random status for demo - you could add this to your property interface
    const statuses = ['New', 'Featured', 'Reduced'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return Math.random() > 0.7 ? randomStatus : null;
  };

  const status = getStatusBadge();

  return (
    <div 
      className="property-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="property-card__image-container">
        <img
          src={property.image}
          alt={property.title}
          className="property-card__image"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/f0f0f0/666666?text=Property+Image';
          }}
        />
        
        {/* Status Badge */}
        {status && (
          <div className={`property-card__status property-card__status--${status.toLowerCase()}`}>
            {status}
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="property-card__favorite" aria-label="Add to favorites">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__title">
            {property.title}
          </h3>
          <div className="property-card__price">
            {formatPrice(property.price)}
          </div>
        </div>
        
        <div className="property-card__location">
          <span className="property-card__location-text">
            {property.location.city}{property.location.state ? `, ${property.location.state}` : ''}
          </span>
        </div>
        
        <div className="property-card__details">
          <div className="property-card__detail-item">
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
            <span>{property.bedrooms} Beds</span>
          </div>
          
          {property.area && !isNaN(property.area) && (
            <div className="property-card__detail-item">
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
              <span>{formatArea(property.area)} sqft</span>
            </div>
          )}
        </div>
        
        <div className="property-card__footer">
          <button className="property-card__details-btn">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
