import React from 'react';
import { Property } from '../../types/property';
import { X } from 'lucide-react';
import PriceChart from '../PriceChart';
import './PropertyDetailsModal.css';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, isOpen, onClose }) => {
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

  if (!isOpen || !property) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Property Details</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Property Image */}
          <div className="modal-image-section">
            <img
              src={property.image}
              alt={property.title}
              className="modal-property-image"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/600x400/f0f0f0/666666?text=Property+Image';
              }}
            />
          </div>

          {/* Property Information */}
          <div className="modal-property-info">
            {/* Title and Price */}
            <div className="modal-property-header">
              <h1 className="modal-property-title">{property.title}</h1>
              <div className="modal-property-price">{formatPrice(property.price)}</div>
            </div>

            {/* Location */}
            <div className="modal-property-location">
              <span>
                {property.location.address && `${property.location.address}, `}
                {property.location.city}{property.location.state ? `, ${property.location.state}` : ''} {property.location.zipCode}
              </span>
            </div>

            {/* Property Stats */}
            <div className="modal-property-stats">
              <div className="modal-stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <div>
                  <div className="modal-stat-value">{property.bedrooms}</div>
                  <div className="modal-stat-label">{property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
                </div>
              </div>

              <div className="modal-stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"></path>
                  <path d="M19 11h-4a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"></path>
                  <path d="M10 11V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5"></path>
                </svg>
                <div>
                  <div className="modal-stat-value">{property.bathrooms}</div>
                  <div className="modal-stat-label">{property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>
                </div>
              </div>

              {property.area && !isNaN(property.area) && (
                <div className="modal-stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                  <div>
                    <div className="modal-stat-value">{formatArea(property.area)}</div>
                    <div className="modal-stat-label">Sq Ft</div>
                  </div>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="modal-property-type">
              <span className="modal-type-badge">{property.propertyType}</span>
            </div>

            {/* Price Chart */}
            <PriceChart currentPrice={property.price} propertyTitle={property.title} />

            {/* Description */}
            <div className="modal-property-description">
              <h3>Description</h3>
              <p>{property.description || "No description available for this property."}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="modal-property-features">
                <h3>Features</h3>
                <ul className="modal-features-list">
                  {property.features.map((feature, index) => (
                    <li key={index} className="modal-feature">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Section */}
            <div className="modal-contact-section">
              <h3>Interested in this property?</h3>
              <div className="modal-contact-buttons">
                <button className="modal-contact-btn modal-contact-btn--primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Call Agent
                </button>
                <button className="modal-contact-btn modal-contact-btn--secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
