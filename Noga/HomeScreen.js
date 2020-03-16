import React, { useState,useEffect } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

function HomeScreen(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        (async()=>{
            let accessToken = await AsyncStorage.getItem("access_token");
            setAccessToken(accessToken)
        })()
        
         
    }, []);
    return (
        //    <Text>HomeScreen</Text>
        <View>
            <Text>{accessToken?`Hello! ${"userName"} `:"please"}
            {!accessToken?<Text style={{ color: 'blue' }}
                    onPress={() => props.navigation.navigate('Login')} >
                     Login
            </Text>:null}
            </Text>
        </View >
    );
}
export default HomeScreen;