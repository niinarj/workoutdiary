import { createContext, useState } from "react";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([ //Pari valmiina näkyvää treeniä kun sovelluksen avaa
        { id: 0, value: 'walk', distance: '5', duration: '30', date: '2023-09-01' },
        { id: 1, value: 'bike', distance: '10', duration: '45', date: '2023-09-02' },
    ]);
    const [unit, setUnit] = useState('km'); // Uusi tila yksikön tallentamiseen

    return (
        <WorkoutContext.Provider value={{ workouts, setWorkouts, unit, setUnit }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutContext;