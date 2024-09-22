import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SegmentedButtons, Button, Modal, Portal, TextInput, Snackbar } from 'react-native-paper';
import WorkoutContext from './WorkoutContext';

let nextId = 2; //Valmiina näkyvillä treeneillä id 0 ja 1. Tämän vuoksi käyttäjän lisäämät alkaa id:stä 2

const MyComponent = () => {
  const [value, setValue] = React.useState('');
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [date, setDate] = React.useState('Select a date');
  const { workouts, setWorkouts } = React.useContext(WorkoutContext);
  const { unit } = React.useContext(WorkoutContext);
  const [errors, setErrors] = React.useState({ value: false, distance: false, duration: false, date: false });
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const handleDistanceChange = (text) => {
    setDistance(text);
    if (text === '' || parseFloat(text) <= 0) {
      setErrors(prevErrors => ({ ...prevErrors, distance: true }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, distance: false }));
    }
  };

  const handleDurationChange = (text) => {
    setDuration(text);
    if (text === '' || parseFloat(text) <= 0) {
      setErrors(prevErrors => ({ ...prevErrors, duration: true }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, duration: false }));
    }
  };

  const handleAddWorkout = () => {
    const newErrors = {
      value: value === '', // Tarkistaa, että jokin laji on valittu
      distance: distance === '' || parseFloat(distance) <= 0,
      duration: duration === '' || parseFloat(duration) <= 0,
      date: date === 'Select a date',
    };
    setErrors(newErrors);

    if (!newErrors.value && !newErrors.distance && !newErrors.duration && !newErrors.date) {
      const workoutId = nextId++;
      const newWorkout = { id: workoutId, value, distance, duration, date };
      setWorkouts([...workouts, newWorkout]);
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add exercise</Text>
      <SegmentedButtons
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          setErrors(prevErrors => ({ ...prevErrors, value: false }));
        }}
      
        buttons={[
          { value: 'walk', label: 'Walking', icon: 'walk' },
          { value: 'swim', label: 'Swimming', icon: 'swim' },
          { value: 'bike', label: 'Biking', icon: 'bike' },
        ]}
      />
      {errors.value && <Text style={styles.errorText}>Please select an exercise type</Text>}
      <TextInput
        label={`Distance (${unit})`}
        value={distance}
        onChangeText={handleDistanceChange}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
        error={errors.distance}
      />
      {errors.distance && <Text style={styles.errorText}>Distance is required and it cannot be negative</Text>}
      <TextInput
        label="Duration (min)"
        value={duration}
        onChangeText={handleDurationChange}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
        error={errors.duration}
      />
      {errors.duration && <Text style={styles.errorText}>Duration is required and it cannot be negative</Text>}
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={() => setShowCalendar(true)}>
          {date}
        </Button>
      </View>
      {errors.date && <Text style={styles.errorText}>Date is required</Text>}
      <Portal>
        <Modal
          visible={showCalendar}
          onDismiss={() => setShowCalendar(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Calendar
            onDayPress={day => {
              setShowCalendar(false);
              setDate(day.dateString);
              setErrors(prevErrors => ({ ...prevErrors, date: false }));
            }}
          />
        </Modal>
      </Portal>
      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleAddWorkout}>
        Add workout
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => { },
        }}
      >
        Workout added successfully!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MyComponent;
