import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Main App component
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BookSphere</Text>
          <Text style={styles.subtitle}>AI-Powered E-Book Management</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome to BookSphere Mobile!
          </Text>
          <Text style={styles.description}>
            Read, collaborate, and learn with our AI-powered academic e-book platform.
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.feature}>📚 Group-Based Book Sharing</Text>
            <Text style={styles.feature}>🤖 Offline AI Learning Tools</Text>
            <Text style={styles.feature}>📊 Progress Tracking</Text>
            <Text style={styles.feature}>🔒 Secure In-App Reading</Text>
          </View>
          
          <Text style={styles.comingSoon}>
            Mobile app features coming soon!
          </Text>
        </View>
        
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#18bc9c',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  featureList: {
    width: '100%',
    marginBottom: 30,
  },
  feature: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  comingSoon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18bc9c',
    textAlign: 'center',
  },
});