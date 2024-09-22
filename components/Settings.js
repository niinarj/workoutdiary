import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useContext } from 'react';
import WorkoutContext from './WorkoutContext';

const MyComponent = () => {
  const { unit, setUnit } = useContext(WorkoutContext);


  return (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.outerContainer}>
        <Text style={styles.title}>Units</Text>
        <RadioButton.Group onValueChange={value => setUnit(value)} value={unit}>
          <View style={styles.radioButton}>
            <RadioButton value="km" />
            <Text>Kilometers</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="mi" />
            <Text>Miles</Text>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 75, // Lisää tilaa yläreunaan
    alignItems: 'center', // Keskittää otsikon vaakasuunnassa
  },
  header: {
    fontSize: 28, // Suuri fonttikoko "Settings"-otsikolle
    fontWeight: 'bold', // Lihavoi otsikon
    marginBottom: 10, // Lisää marginaalia otsikon ja sisällön väliin
  },
  outerContainer: {
    flex: 0,
    justifyContent: 'center', // Keskittää sisältö pystysuunnassa
    alignItems: 'center', // Keskittää sisältö vaakasuunnassa
    marginTop: 150, // Lisää marginaalia yläreunaan
    padding: 60,          // Lisää tilaa sisällön ympärille
    borderWidth: 2,       // Kehyksen paksuus
    borderColor: '#340643',  // Kehyksen väri
    borderRadius: 10,     // Pyöristetyt kulmat
    backgroundColor: '#be55ec14',
  },
  title: {
    fontSize: 24, // Suurennettu fonttikoko otsikolle
    fontWeight: 'bold', // Lihavoi tekstiä
    marginBottom: 40, // Lisää marginaalia otsikon ja radiopainikkeiden väliin
  },
  radioButton: {
    flexDirection: 'row', // Näyttää RadioButton ja tekstin rivinä
    alignItems: 'center',
    marginBottom: 20, // Lisää marginaalia RadioButtonien väliin
  },
});

export default MyComponent;