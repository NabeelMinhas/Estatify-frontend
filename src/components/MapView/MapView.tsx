import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '../../types/property';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom property marker icon
const propertyIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0zIDlsOS03IDkgN3YxMWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjxwb2x5bGluZSBwb2ludHM9IjksMjIgOSwxMiAxNSwxMiAxNSwyMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo8L3N2Zz4K',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapViewProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ properties, onPropertyClick, className = '' }) => {
  // Generate mock coordinates for properties (in a real app, these would come from the API)
  const getPropertyCoordinates = (property: Property) => {
    // Use property ID to generate consistent coordinates
    const id = property.id || 'default';
    const idString = String(id);
    const seed = idString.length > 0 ? 
      idString.charCodeAt(0) + idString.charCodeAt(Math.max(0, idString.length - 1)) :
      Math.random() * 100;
    
    // Center around a realistic city area (using NYC as example)
    const baseLat = 40.7128;
    const baseLng = -74.0060;
    
    // Generate coordinates within a reasonable area
    const latOffset = (Math.sin(seed) * 0.05); // ~5km radius
    const lngOffset = (Math.cos(seed) * 0.05);
    
    return {
      lat: baseLat + latOffset,
      lng: baseLng + lngOffset,
    };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate center of all properties
  const centerLat = properties.length > 0 ? 
    properties.reduce((sum, prop) => sum + getPropertyCoordinates(prop).lat, 0) / properties.length :
    40.7128;
  
  const centerLng = properties.length > 0 ?
    properties.reduce((sum, prop) => sum + getPropertyCoordinates(prop).lng, 0) / properties.length :
    -74.0060;

  return (
    <div className={`map-view ${className}`}>
      <div className="map-view__header">
        <h3 className="map-view__title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Property Locations
        </h3>
        <div className="map-view__count">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </div>
      </div>
      
      <div className="map-view__container">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={12}
          className="map-view__map"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {properties.map((property) => {
            const coords = getPropertyCoordinates(property);
            return (
              <Marker
                key={property.id}
                position={[coords.lat, coords.lng]}
                icon={propertyIcon}
                eventHandlers={{
                  click: () => {
                    if (onPropertyClick) {
                      onPropertyClick(property);
                    }
                  },
                }}
              >
                <Popup className="map-popup">
                  <div className="map-popup__content">
                    <div className="map-popup__image">
                      <img
                        src={property.image}
                        alt={property.title}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x120/f0f0f0/666666?text=Property';
                        }}
                      />
                    </div>
                    <div className="map-popup__info">
                      <h4 className="map-popup__title">{property.title}</h4>
                      <div className="map-popup__price">{formatPrice(property.price)}</div>
                      <div className="map-popup__location">
                        {property.location.city}{property.location.state ? `, ${property.location.state}` : ''}
                      </div>
                      <div className="map-popup__details">
                        {property.bedrooms} beds • {property.bathrooms} baths
                        {property.area && !isNaN(property.area) && ` • ${property.area.toLocaleString()} sqft`}
                      </div>
                      {onPropertyClick && (
                        <button
                          className="map-popup__button"
                          onClick={() => onPropertyClick(property)}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      {properties.length === 0 && (
        <div className="map-view__empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>No properties to display on map</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
