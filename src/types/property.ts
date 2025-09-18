export interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  image: string;
  images?: string[];
  description: string;
  propertyType: string;
  yearBuilt?: number;
  features?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
}
