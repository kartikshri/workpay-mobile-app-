// HomeScreen.tsx
// HomeScreen.tsx
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// ← This type definition fixes the error
type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  // ← Explicitly type the navigation hook
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Digital Services</Text>
        <Text style={styles.subtitle}>Your marketplace for professional services</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <Text style={styles.buttonText}>Browse Services</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.profileButton]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>My Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.ordersButton]}
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.buttonText}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: '#10b981',
  },
  ordersButton: {
    backgroundColor: '#f59e0b',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;