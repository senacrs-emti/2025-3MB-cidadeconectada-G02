import { Location } from '@/types/location';

const STORAGE_KEY = 'inkluimap_locations';

export const storage = {
  getLocations: (): Location[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveLocation: (location: Location): void => {
    const locations = storage.getLocations();
    locations.push(location);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  },

  updateLocation: (id: string, updates: Partial<Location>): void => {
    const locations = storage.getLocations();
    const index = locations.findIndex(l => l.id === id);
    if (index !== -1) {
      locations[index] = { ...locations[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    }
  },

  deleteLocation: (id: string): void => {
    const locations = storage.getLocations().filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  },
};
