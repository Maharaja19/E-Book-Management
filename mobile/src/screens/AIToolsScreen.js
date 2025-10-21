import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';

const AIToolsScreen = ({ navigation }) => {
  const aiTools = [
    {
      id: 'summarize',
      title: 'Summarize',
      description: 'Get a concise summary of book chapters',
      icon: '📝',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Create study cards with key concepts',
      icon: '🗂️',
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Generate self-assessment questions',
      icon: '❓',
    },
    {
      id: 'chat',
      title: 'Chat with Book',
      description: 'Ask questions about book content',
      icon: '💬',
    },
    {
      id: 'recommend',
      title: 'Reading Path',
      description: 'Get recommendations for continued learning',
      icon: '📚',
    },
  ];

  const handleToolPress = (toolId) => {
    Alert.alert('AI Tool', `Selected tool: ${toolId}. This feature will be implemented in the full version.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Learning Tools</Text>
        <Text style={styles.subtitle}>Smart assistance for your studies</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.introText}>
          BookSphere's AI-powered tools help you learn more effectively. 
          Select a tool below to get started.
        </Text>
        
        <View style={styles.toolsGrid}>
          {aiTools.map((tool) => (
            <TouchableOpacity 
              key={tool.id}
              style={styles.toolCard}
              onPress={() => handleToolPress(tool.id)}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolDescription}>{tool.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Offline AI Capabilities</Text>
          <Text style={styles.infoText}>
            All AI tools work offline using locally installed language models. 
            No internet connection required for smart learning assistance.
          </Text>
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
    padding: 20,
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
  introText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toolIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  toolDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#e8f6f3',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18bc9c',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default AIToolsScreen;