import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import { saveProxyAuthToken, saveUserEmail, saveToken } from '../utils/auth';

import { OTPVerification } from '@msg91comm/react-native-sendotp';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavProp>();
  
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  
  // State for OTP modal visibility
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  
  // Widget configuration
  const WIDGET_ID = "346766684b75303834353339";
  const TOKEN_AUTH = "424920T6pVvkrUk7BU66890206P1";
  const REFERENCE_ID = "1792141h175880220068d531188a2d8";


  // Handle OTP login button press
  const handleOtpLoginPress = () => {
    setOtpModalVisible(true);
  };
  
  // Handle OTP verification completion
  const handleOtpCompletion = async (dataInput: any) => {
    try {
      // Convert string input to object if needed
      let data = dataInput;
      if (typeof dataInput === 'string') {
        try {
          data = JSON.parse(dataInput);
        } catch (parseError) {
          // Continue with data as string if parsing fails
        }
      }
      
      // Extract JWT token and user email
      let token = null;
      let userEmail = '';
      let successDetected = false;
      
      // Check for JWT in message field (success response)
      if (data && 
          ((data.type === 'success' || data.status === 'success') && data.message && 
           typeof data.message === 'string' && data.message.startsWith('eyJ'))) {
        token = data.message;
        successDetected = true;
      }
      // Check standard token fields
      else if (data && (data.token || data.jwt || data.authToken || data.auth_token)) {
        token = data.token || data.jwt || data.authToken || data.auth_token;
        successDetected = true;
      }
      // Handle success with no token
      else if (data && data.type === 'success' && !token) {
        successDetected = true;
        token = `otp-auth-${Date.now()}`;
      }
      
      // Get email if available
      if (data) {
        userEmail = data.email || data.identifier || data.userIdentifier || '';
      }
      
      // Handle successful verification
      if (token && (successDetected || data?.type === 'success' || data?.status === 'success')) {
        // Save authentication data
        await Promise.all([
          saveProxyAuthToken(token),
          saveToken(token),
          userEmail ? saveUserEmail(userEmail) : Promise.resolve(),
          AsyncStorage.setItem('referenceId', REFERENCE_ID),
        ]);
        
        // Navigate to role selection screen
        setOtpModalVisible(false);
        navigation.navigate('RoleSelection', { token, email: userEmail });
        return;
      }
      
      // Handle error case
      
      Alert.alert(
        'Verification Failed', 
        'OTP verification failed. Please try again.',
        [
          { 
            text: 'Try Again', 
            onPress: () => {
              // Reset modal and try again
              setOtpModalVisible(false);
              setTimeout(() => setOtpModalVisible(true), 500);
            } 
          },
          { text: 'Cancel', onPress: () => setOtpModalVisible(false) }
        ]
      );
    } catch (error) {
      setOtpModalVisible(false); // Close the modal on error
      Alert.alert(
        'Error', 
        'Failed to complete authentication. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.contentContainer}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoIcon}>💼</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Welcome to Workpay</Text>
        <Text style={styles.subtitle}>Sign in to find work or hire freelancers</Text>
        
        {/* OTP Login Button */}
        <TouchableOpacity 
          style={styles.otpButton}
          onPress={handleOtpLoginPress}
        >
          <Text style={styles.buttonText}>Login with OTP</Text>
        </TouchableOpacity>
        
        {/* OTP Modal */}
        <Modal visible={otpModalVisible} animationType="slide">
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15 }}>
              <TouchableOpacity onPress={() => setOtpModalVisible(false)}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#666' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <OTPVerification 
              onVisible={otpModalVisible}
              onCompletion={handleOtpCompletion}
              widgetId={WIDGET_ID}
              authToken={TOKEN_AUTH}
              extraProps={{
                referenceId: REFERENCE_ID,
                appName: 'Workpay',
                debug: true
              }}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24, // Increased horizontal padding
    alignItems: 'center', // Center content horizontally
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoBackground: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF', // White text for dark theme
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40, // More spacing before button
    color: '#AAAAAA', // Light gray for subtitle in dark theme
  },
  otpButton: {
    backgroundColor: '#4285F4', // Keep blue button
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%', // Make button full width
    maxWidth: 340, // But limit maximum width
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700', // Make text slightly bolder
  },
  // These styles are kept for reference but no longer used after removing the alternative login options
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333', // Darker divider for dark theme
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#AAAAAA', // Light gray text for dark theme
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%', // Full width container
    maxWidth: 340, // But limit maximum width
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%', // Full width button
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700', // Bolder text
  },
});

export default LoginScreen;