import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProxyAuthToken = async (token: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('proxy_auth_token', token);
    return true;
  } catch (error) {
    console.error('Error saving proxy auth token:', error);
    return false;
  }
};

export const saveToken = async (token: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('auth_token', token);
    return true;
  } catch (error) {
    console.error('Error saving auth token:', error);
    return false;
  }
};

export const saveUserEmail = async (email: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('user_email', email);
    return true;
  } catch (error) {
    console.error('Error saving user email:', error);
    return false;
  }
};

export const getProxyAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('proxy_auth_token');
  } catch (error) {
    console.error('Error getting proxy auth token:', error);
    return null;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('user_email');
  } catch (error) {
    console.error('Error getting user email:', error);
    return null;
  }
};

export const clearAuthData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove(['proxy_auth_token', 'auth_token', 'user_email']);
    return true;
  } catch (error) {
    console.error('Error clearing auth data:', error);
    return false;
  }
};
