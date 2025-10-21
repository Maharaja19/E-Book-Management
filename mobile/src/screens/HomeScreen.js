import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>BookSphere</Text>
          <Text style={styles.subtitle}>AI-Powered E-Book Management</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome, {user ? user.name : 'Guest'}!
          </Text>
          <Text style={styles.description}>
            Read, collaborate, and learn with our AI-powered academic e-book platform.
          </Text>
          
          <View style={styles.featureList}>
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => navigation.navigate('Library')}
            >
              <Text style={styles.featureIcon}>📚</Text>
              <Text style={styles.featureTitle}>My Library</Text>
              <Text style={styles.featureDescription}>Browse your books</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => navigation.navigate('Groups')}
            >
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureTitle}>Groups</Text>
              <Text style={styles.featureDescription}>Join reading groups</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => navigation.navigate('Reader')}
            >
              <Text style={styles.featureIcon}>📖</Text>
              <Text style={styles.featureTitle}>Read</Text>
              <Text style={styles.featureDescription}>Continue reading</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => navigation.navigate('AI Tools')}
            >
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI Tools</Text>
              <Text style={styles.featureDescription}>Smart learning aids</Text>
            </TouchableOpacity>
          </View>
          
          {!user && (
            <View style={styles.authButtons}>
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
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
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#18bc9c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;