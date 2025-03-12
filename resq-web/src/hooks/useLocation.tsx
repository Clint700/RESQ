import { useState, useEffect } from 'react';
import { getLocation } from '../services/location';
import { LocationObjectCoords } from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getLocation();
        setLocation(loc);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  return location;
};

export default useLocation;