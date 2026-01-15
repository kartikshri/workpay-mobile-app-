import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ClientProfile'>;

const ClientProfileScreen = ({ route }: any) => {
  const { token, email } = route.params || {};
  const navigation = useNavigation<NavProp>();
  
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [cityArea, setCityArea] = useState('');

  const freelancerServices = [
    'Assignment Writing',
    'Content Writing',
    'Graphic Design',
    
    'Data Entry',
   
    'Video Editing',
    'Logo Design',
   
   
  ];


  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleCompleteProfile = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (selectedServices.length === 0) {
      Alert.alert('Error', 'Please select at least one service');
      return;
    }
    if (!cityArea.trim()) {
      Alert.alert('Error', 'Please enter your city or area');
      return;
    }

    // Navigate to Home or appropriate screen after profile completion
    navigation.navigate('Home');
  };

  const useCurrentLocation = () => {
    // This would integrate with location services
    setCityArea('Current Location');
    Alert.alert('Location', 'Using current location feature would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Client Profile</Text>
            <Text style={styles.subtitle}>Complete your profile to hire freelancers</Text>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              placeholderTextColor="#666666"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your phone number"
              placeholderTextColor="#666666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Services Needed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services You Need *</Text>
          <Text style={styles.sectionSubtitle}>Select services you're interested in hiring for</Text>
          
          <View style={styles.servicesGrid}>
            {freelancerServices.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.serviceChip,
                  selectedServices.includes(service) && styles.selectedServiceChip
                ]}
                onPress={() => toggleService(service)}
              >
                <Text style={[
                  styles.serviceText,
                  selectedServices.includes(service) && styles.selectedServiceText
                ]}>
                  {service}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details *</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City/Area</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your city or area"
              placeholderTextColor="#666666"
              value={cityArea}
              onChangeText={setCityArea}
            />
          </View>

          <TouchableOpacity 
            style={styles.locationButton}
            onPress={useCurrentLocation}
          >
            <Text style={styles.locationButtonText}>📍 Use Current Location</Text>
          </TouchableOpacity>

        </View>


        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteProfile}
        >
          <Text style={styles.completeButtonText}>Complete Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  backIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceChip: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedServiceChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  serviceText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedServiceText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  locationButton: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  locationButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClientProfileScreen;
