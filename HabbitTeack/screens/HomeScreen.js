// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HabitCard from '../components/HabitCard';

const HomeScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);

  // Load habits from AsyncStorage when the app starts
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const storedHabits = await AsyncStorage.getItem('habits');
        if (storedHabits !== null) {
          setHabits(JSON.parse(storedHabits));
        }
      } catch (error) {
        console.error("Failed to load habits", error);
      }
    };

    loadHabits();
  }, []);

  // Function to render each habit in a HabitCard
  const renderHabit = ({ item }) => <HabitCard habit={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>
      {/* List of habits */}
      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id}
      />

      {/* Button to add a new habit */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddHabitScreen')}
      >
        <Text style={styles.addButtonText}>+ Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#008CBA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
