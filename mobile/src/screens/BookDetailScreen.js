import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBook } from '../features/books/bookSlice';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const dispatch = useDispatch();
  const { book, isLoading } = useSelector((state) => state.books);

  useEffect(() => {
    if (bookId) {
      dispatch(getBook(bookId));
    }
  }, [bookId, dispatch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text>Loading book details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text>Book not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{book.title}</Text>
        </View>
        
        <View style={styles.bookContent}>
          <Image 
            source={{ uri: book.coverImage || 'https://via.placeholder.com/300x450' }}
            style={styles.bookCover}
          />
          
          <View style={styles.bookInfo}>
            <Text style={styles.bookAuthor}>by {book.author}</Text>
            <Text style={styles.bookDescription}>{book.description}</Text>
            
            <View style={styles.bookDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Genre:</Text>
                <Text style={styles.detailValue}>{book.genre}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pages:</Text>
                <Text style={styles.detailValue}>{book.pages || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Language:</Text>
                <Text style={styles.detailValue}>{book.language || 'English'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={[styles.detailValue, book.accessType === 'premium' ? styles.premiumText : styles.freeText]}>
                  {book.accessType}
                </Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.readButton}
                onPress={() => navigation.navigate('Reader', { bookId: book._id })}
              >
                <Text style={styles.buttonText}>Read Book</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.aiButton}>
                <Text style={styles.buttonText}>AI Tools</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  backButtonText: {
    color: '#18bc9c',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bookContent: {
    padding: 20,
  },
  bookCover: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 20,
  },
  bookInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
  },
  bookDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  bookDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  detailValue: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  premiumText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  freeText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readButton: {
    backgroundColor: '#18bc9c',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  aiButton: {
    backgroundColor: '#3498db',
    padding: 15,
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookDetailScreen;