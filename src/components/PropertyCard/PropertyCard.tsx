import { useNavigate } from 'react-router-dom';
import { Property } from '@/types/property';
import './PropertyCard.css';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatBedrooms = (bedrooms: number) => {
    return bedrooms === 1 ? '1 Bedroom' : `${bedrooms} Bedrooms`;
  };

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
            // Fallback to a placeholder if image fails to load
            e.currentTarget.src = 'https://via.placeholder.com/400x300/f0f0f0/666666?text=Property+Image';
          }}
        />
        <div className="property-card__price-badge">
          {formatPrice(property.price)}
        </div>
      </div>
      
      <div className="property-card__content">
        <h3 className="property-card__title">
          {property.title}
        </h3>
        
        <div className="property-card__details">
          <div className="property-card__bedrooms">
            <svg 
              className="property-card__icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
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
            {formatBedrooms(property.bedrooms)}
          </div>
          
          {property.bathrooms && (
            <div className="property-card__bathrooms">
              <svg 
                className="property-card__icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" 
                />
              </svg>
              {property.bathrooms === 1 ? '1 Bath' : `${property.bathrooms} Baths`}
            </div>
          )}
        </div>
        
        <div className="property-card__location">
          <svg 
            className="property-card__icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
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
          <span className="property-card__location-text">
            {property.location.city}, {property.location.state}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
