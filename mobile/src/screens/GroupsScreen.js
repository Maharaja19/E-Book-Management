import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroups } from '../features/groups/groupSlice';

const GroupsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { groups, isLoading } = useSelector((state) => state.groups);

  useEffect(() => {
    if (user) {
      dispatch(getUserGroups(user.id));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text>Loading groups...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Groups</Text>
        <Text style={styles.subtitle}>Collaborate with others</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <TouchableOpacity 
              key={group._id}
              style={styles.groupCard}
              onPress={() => navigation.navigate('GroupDetail', { groupId: group._id })}
            >
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupInfo}>
                {group.members.length} members • {group.books.length} books
              </Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <View style={styles.groupFooter}>
                <Text style={styles.createdBy}>Created by: {group.createdBy.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>You haven't joined any groups yet</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => Alert.alert('Create Group', 'Feature coming soon!')}
            >
              <Text style={styles.buttonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => Alert.alert('Create Group', 'Feature coming soon!')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#18bc9c',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  groupInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  groupDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 15,
  },
  groupFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  createdBy: {
    fontSize: 14,
    color: '#3498db',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#18bc9c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GroupsScreen;