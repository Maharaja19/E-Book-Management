import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, updateProgress } from '../features/progress/progressSlice';

const ReaderScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { progress } = useSelector((state) => state.progress);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(100); // This would come from the book data in a real app

  useEffect(() => {
    if (bookId && user) {
      dispatch(getProgress({ userId: user.id, bookId }));
    }
  }, [bookId, user, dispatch]);

  useEffect(() => {
    if (progress) {
      setCurrentPage(progress.currentPage || 1);
    }
  }, [progress]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Update progress
      if (user) {
        dispatch(updateProgress({
          userId: user.id,
          bookId,
          currentPage: newPage,
          totalPages
        }));
      }
    }
  };

  const addBookmark = () => {
    Alert.alert('Bookmark Added', `Bookmark added at page ${currentPage}`);
    // In a real app, you would save this to the backend
  };

  const addNote = () => {
    Alert.alert('Note Added', `Note added at page ${currentPage}`);
    // In a real app, you would save this to the backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reading Book</Text>
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.readerContent}>
        <View style={styles.pageContent}>
          <Text style={styles.pageTitle}>Chapter {Math.ceil(currentPage / 10)}</Text>
          <Text style={styles.pageText}>
            This is a sample page content. In a real application, this would display the actual PDF content of the book.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Text>
          <Text style={styles.pageText}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={addBookmark}>
          <Text style={styles.toolbarText}>🔖</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolbarButton} onPress={addNote}>
          <Text style={styles.toolbarText}>📝</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <Text style={[styles.navButtonText, currentPage <= 1 && styles.disabledButton]}>Prev</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <Text style={[styles.navButtonText, currentPage >= totalPages && styles.disabledButton]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
  },
  backButtonText: {
    color: '#18bc9c',
    fontSize: 16,
  },
  title: {
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pageInfo: {
    flex: 1,
    fontSize: 14,
    color: '#18bc9c',
    textAlign: 'right',
  },
  readerContent: {
    flexGrow: 1,
    padding: 20,
  },
  pageContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  pageText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 15,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  toolbarButton: {
    padding: 10,
  },
  toolbarText: {
    fontSize: 24,
  },
  navButton: {
    padding: 10,
    minWidth: 60,
  },
  navButtonText: {
    fontSize: 16,
    color: '#18bc9c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    color: '#bdc3c7',
  },
});

export default ReaderScreen;