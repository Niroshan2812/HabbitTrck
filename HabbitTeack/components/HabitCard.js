// components/HabitCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HabitCard = ({ habit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.habitName}>{habit.name}</Text>
      <Text style={styles.streak}>Streak: {habit.streak} days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  streak: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default HabitCard;
