// components/HabitCard.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const HabitCard = ({ habit }) => {

  const [completed, setCompleted] = useState(false);


  //
const getLast7Days =()=>{
  const days =[];
  for (let i = 6; i >=0; i--) {
    days.push(moment().subtract(i,'days').format('DD MMM'));
  }
  return days;
}

  //function for mark habbitComplete 
  const completeHabit = async ()=>{
    try {
      const updateHabbit  = {...habit, streak:habit.streak + 1};


      //load existing habbit 
      const storeHabbit = await AsyncStorage.getItem('habits');
      const parseHabits = JSON.parse(storeHabbit);

      // update habbit in list 
      const updateHabbits = parseHabits.map(h => 
        h.id === habit.id ? updateHabbit : h
      );

      //save updated habits to AsyncStore 
      await AsyncStorage.setItem('habits', JSON.stringify(updateHabbits));

      setCompleted(true);
    } catch (error) {
      consile.error("Error updating Habit ", error)
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.habitName}>{habit.name}</Text>
      <Text style={styles.streak}>Streak: {habit.streak} days</Text>


      {/* Display last 7 days progress*/}
      <View style={styles.progress}>
        {getLast7Days().map ((day, index)=>(
          <View key={index} style={styles.dayBox}> 
            <Text>{day}</Text>
            <Text>{completed ? "✔" :"✘" }</Text>
          </View>
        ))}
      


      </View>
      <TouchableOpacity style={completed ? styles.completeButton : styles.completeButton}
      onPress={completeHabit}
      disabled={completed}
      > 
      <Text style={styles.buttonText}>
        {completed ? 'Completed' : 'Mark as Complete'}
      </Text>
      </TouchableOpacity>
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
  completeButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dayBox:{
    alignItems:'center'
  },
});

export default HabitCard;
