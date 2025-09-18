import { Property } from '../types/property';

const API_BASE_URL = 'https://s3.us-central-1.wasabisys.com/mashvisor-cdn';

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task-fe-listings.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our Property interface if needed
    return Array.isArray(data) ? data : data.properties || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties. Please try again later.');
  }
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const properties = await fetchProperties();
    return properties.find(property => property.id === id) || null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw new Error('Failed to fetch property details. Please try again later.');
  }
};
