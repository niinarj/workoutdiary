import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import WorkoutContext from "./WorkoutContext";
import { Card, Avatar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function History() {
    const { workouts, unit } = useContext(WorkoutContext);

    //yhteismäärien laskeminen
    const swimTotal = workouts
        .filter(workout => workout.value === 'swim')
        .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);

    const walkTotal = workouts
        .filter(workout => workout.value === 'walk')
        .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);

    const bikeTotal = workouts
        .filter(workout => workout.value === 'bike')
        .reduce((sum, workout) => sum + parseFloat(workout.distance), 0);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 150, marginTop: 30, marginBottom: 20 }}>Workouts</Text>
            {/* Yhteismäärän näyttäminen*/}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                <Card>
                    <Card.Title
                        titleVariant="titleMedium"
                        title={<Text style={{ paddingRight: 1 }}>{`${swimTotal} ${unit}`}</Text>}
                        left={() => <Avatar.Icon icon="swim" size={40} />}
                        style={{ backgroundColor: '#e4d0fb', height: 70, width: 130, borderRadius: 10 }}

                    />

                </Card>
                <Card>
                    <Card.Title
                        titleVariant="titleMedium"
                        title={<Text style={{ paddingRight: 1 }}>{`${walkTotal} ${unit}`}</Text>}
                        left={() => <Avatar.Icon icon="walk" size={40} />}
                        style={{ backgroundColor: '#e4d0fb', height: 70, width: 130, borderRadius: 10 }}
                    />
                </Card>
                <Card>
                    <Card.Title
                        titleVariant="titleMedium"
                        title={<Text style={{ paddingRight: 1 }}>{`${bikeTotal} ${unit}`}</Text>}
                        left={() => <Avatar.Icon icon="bike" size={40} />}
                        style={{ backgroundColor: '#e4d0fb', height: 70, width: 130, borderRadius: 10 }}
                    />
                </Card>
            </View>

            {/* Urheilusuoritusten näyttäminen*/}
            <FlatList
                data={[...workouts].reverse()}  // Käännetään lista niin, että uusin on ylhäällä 
                renderItem={({ item }) => <Item item={item} unit={unit} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 50 }}  // Lisää tilaa alaosaan 
            />
        </SafeAreaView>
    );
}

function Item({ item, unit }) {
    return (
        <Card>

            <Card.Title
                titleVariant="titleMedium"
                title={item.date}
                left={props => <Avatar.Icon icon={item.value} size={40} />}
            />
            <Card.Content>
                <Text>{` Distance: ${item.distance} ${unit} Duration: ${item.duration} min`}</Text>
            </Card.Content>
        </Card>
    );
}