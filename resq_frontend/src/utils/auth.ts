import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Function to retrieve the authentication token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Get from AsyncStorage
    return token;
  } catch (error) {
    console.error('Error retrieving authentication token:', error);
    return null; // Or you might want to throw an error, depending on your error handling strategy
  }
};

// Function to save the authentication token
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving authentication token:', error);
    throw error;
  }
};

// Function to remove the authentication token
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing authentication token:', error);
    throw error;
  }
};
