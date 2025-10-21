import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LibraryScreen from './screens/LibraryScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import ReaderScreen from './screens/ReaderScreen';
import GroupsScreen from './screens/GroupsScreen';
import AIToolsScreen from './screens/AIToolsScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab bar icons
const tabBarIcon = (icon, focused) => {
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      {icon}
    </Text>
  );
};

// Main tab navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#18bc9c',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon('🏠', focused),
        }}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon('📚', focused),
        }}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon('👥', focused),
        }}
      />
      <Tab.Screen 
        name="AI Tools" 
        component={AIToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => tabBarIcon('🤖', focused),
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigation component
const Navigation = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitleStyle: styles.headerTitle,
        }}
      >
        {user ? (
          // Authenticated user screens
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="BookDetail" 
              component={BookDetailScreen}
              options={{ title: 'Book Details' }}
            />
            <Stack.Screen 
              name="Reader" 
              component={ReaderScreen}
              options={{ title: 'Reading' }}
            />
          </>
        ) : (
          // Unauthenticated user screens
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ title: 'Register' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2c3e50',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabIcon: {
    fontSize: 24,
  },
  tabIconFocused: {
    color: '#18bc9c',
  },
});

export default Navigation;