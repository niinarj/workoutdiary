import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { BottomNavigation, MD3DarkTheme, PaperProvider } from 'react-native-paper';



import Add from './components/Add';
import History from './components/History';
import Settings from './components/Settings';
import { WorkoutProvider } from './components/WorkoutContext';
import { customTheme } from './components/Themes';




const routes = [
  { key: 'add', title: 'Add exercise', focusedIcon: 'plus' },
  { key: 'history', title: 'History', focusedIcon: 'view-list' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog' }
];

const renderScene = BottomNavigation.SceneMap({
  add: Add,
  history: History,
  settings: Settings
});

export default function App() {



  const [workouts, setWorkouts] = useState([]);
  const [index, setIndex] = useState(0);


  return (
    <WorkoutProvider>
      <PaperProvider theme={customTheme}>

        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ backgroundColor: '#d0c2f3da' }}  // Taustaväri
          activeColor="#000000"   // Aktiivinen ikoni ja teksti 
          inactiveColor="#000000" // Inaktiivinen ikoni ja teksti 
        />
      </PaperProvider>
    </WorkoutProvider>
  );
}
