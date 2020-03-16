import React, { useState } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';

function HomeScreen(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        //    <Text>HomeScreen</Text>
        <View>
            <Text>Hello! please
            <Text style={{ color: 'blue' }}
                    onPress={() => props.navigation.navigate('Login')} >
                     Login
            </Text>
            </Text>
        </View >
    );
}
export default HomeScreen;