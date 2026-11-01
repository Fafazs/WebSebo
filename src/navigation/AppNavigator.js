import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DevFirebaseTestScreen from '../screens/DevFirebaseTestScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import HomeScreen from '../screens/main/HomeScreen';
import BookDetailsScreen from '../screens/main/BookDetailsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import KycVerificationScreen from '../screens/main/KycVerificationScreen';
import MyAdsScreen from '../screens/main/MyAdsScreen';
import AddBookScreen from '../screens/main/AddBookScreen';
import ChatHistoryScreen from '../screens/main/ChatHistoryScreen';

import SearchFilterModal from '../screens/modals/SearchFilterModal';
import GeminiSynopsisModal from '../screens/modals/GeminiSynopsisModal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Início', tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text> }} />
      <Tab.Screen name="ChatHistoryTab" component={ChatHistoryScreen} options={{ title: 'Conversas', tabBarIcon: () => <Text style={{ fontSize: 18 }}>💬</Text> }} />
      <Tab.Screen name="MyAdsTab" component={MyAdsScreen} options={{ title: 'Anúncios', tabBarIcon: () => <Text style={{ fontSize: 18 }}>📚</Text> }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil', tabBarIcon: () => <Text style={{ fontSize: 18 }}>👤</Text> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DevTest" component={DevFirebaseTestScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="KycVerification" component={KycVerificationScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="SearchFilterModal" component={SearchFilterModal} />
          <Stack.Screen name="GeminiSynopsisModal" component={GeminiSynopsisModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}