import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Property } from '../types/property';
import { fetchProperties, fetchPropertyById } from '../utils/api';

interface PropertyStore {
  // State
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProperties: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  setSelectedProperty: (property: Property | null) => void;
  clearError: () => void;
}

export const usePropertyStore = create<PropertyStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      properties: [],
      selectedProperty: null,
      loading: false,
      error: null,

      // Actions
      fetchProperties: async () => {
        set({ loading: true, error: null });
        try {
          const properties = await fetchProperties();
          set({ properties, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            loading: false 
          });
        }
      },

      fetchPropertyById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const property = await fetchPropertyById(id);
          set({ selectedProperty: property, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            loading: false 
          });
        }
      },

      setSelectedProperty: (property: Property | null) => {
        set({ selectedProperty: property });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'property-store',
    }
  )
);
