import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileContextType {
  profile: Profile | null;
  saveProfile: (newProfile: Profile) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

type Profile = {
  // Define the structure of the Profile object here
  name: string;
  email: string;
  phone: string;
  // Add other fields as needed
};

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem('profile');
      if (stored) setProfile(JSON.parse(stored));
    };
    loadProfile();
  }, []);

const saveProfile = async (newProfile: Profile) => {
    await AsyncStorage.setItem('profile', JSON.stringify(newProfile));
    setProfile(newProfile);
};

  return (
    <ProfileContext.Provider value={{ profile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};