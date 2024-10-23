// screens/AddHabitScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddHabitScreen = ({ navigation }) => {
  const [habitName, setHabitName] = useState('');

  // Function to save a new habit
  const saveHabit = async () => {
    if (habitName.length > 0) {
      try {
        const existingHabits = await AsyncStorage.getItem('habits');
        const parsedHabits = existingHabits ? JSON.parse(existingHabits) : [];
        const newHabit = {
           id: Date.now().toString(), 
           name: habitName, //get from textinput
           streak: 0 
          };

        parsedHabits.push(newHabit);
        await AsyncStorage.setItem('habits', JSON.stringify(parsedHabits));

        navigation.goBack(); // Go back to HomeScreen after adding the habit
      } catch (error) {
        console.error('Failed to save habit', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter habit name"
        value={habitName}
        onChangeText={setHabitName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveHabit}>
        <Text style={styles.saveButtonText}>Save Habit</Text>
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
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddHabitScreen;
