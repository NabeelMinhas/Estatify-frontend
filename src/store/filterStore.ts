import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Property } from '../types/property';

interface FilterStore {
  // State
  searchQuery: string;
  minBedrooms: number | null;
  sortBy: 'price-asc' | 'price-desc' | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setMinBedrooms: (bedrooms: number | null) => void;
  setSortBy: (sort: 'price-asc' | 'price-desc' | null) => void;
  clearFilters: () => void;

  // Computed
  getFilteredProperties: (properties: Property[]) => Property[];
}

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      searchQuery: '',
      minBedrooms: null,
      sortBy: null,

      // Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setMinBedrooms: (bedrooms: number | null) => {
        set({ minBedrooms: bedrooms });
      },

      setSortBy: (sort: 'price-asc' | 'price-desc' | null) => {
        set({ sortBy: sort });
      },

      clearFilters: () => {
        set({ 
          searchQuery: '', 
          minBedrooms: null, 
          sortBy: null 
        });
      },

      // Computed property for filtered and sorted properties
      getFilteredProperties: (properties: Property[]) => {
        const { searchQuery, minBedrooms, sortBy } = get();
        
        let filtered = [...properties];

        // Filter by search query (case-insensitive title search)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(property =>
            property.title.toLowerCase().includes(query) ||
            property.location.address.toLowerCase().includes(query) ||
            property.location.city.toLowerCase().includes(query)
          );
        }

        // Filter by minimum bedrooms
        if (minBedrooms !== null) {
          filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
        }

        // Sort by price
        if (sortBy) {
          filtered.sort((a, b) => {
            return sortBy === 'price-asc' ? a.price - b.price : b.price - a.price;
          });
        }

        return filtered;
      },
    }),
    {
      name: 'filter-store',
    }
  )
);
