import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type RoleOption = 'hire' | 'work' | 'both' | null;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'RoleSelection'>;

const RoleSelectionScreen = ({ route }: any) => {
  const { token, email } = route.params || {};
  const [selectedRole, setSelectedRole] = useState<RoleOption>(null);
  const navigation = useNavigation<NavProp>();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.subtitle}>How do you want to use WorkPay?</Text>

        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === 'hire' && styles.selectedOption
          ]}
          onPress={() => {
            setSelectedRole('hire');
            navigation.navigate('ClientProfile', { token, email });
          }}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👤</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>I want to hire</Text>
            <Text style={styles.optionSubtitle}>Find talented freelancers for your projects</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === 'work' && styles.selectedOption
          ]}
          onPress={() => {
            setSelectedRole('work');
            navigation.navigate('FreelancerOnboarding', { token, email });
          }}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💼</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>I want to work</Text>
            <Text style={styles.optionSubtitle}>Get hired for projects in your area</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === 'both' && styles.selectedOption
          ]}
          onPress={() => {
            setSelectedRole('both');
            navigation.navigate('Home');
          }}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👥</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Both</Text>
            <Text style={styles.optionSubtitle}>Hire and work on projects</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#1A2234',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
});

export default RoleSelectionScreen;
