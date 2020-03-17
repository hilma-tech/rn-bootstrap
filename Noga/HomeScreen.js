import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";

import { Alert, Button, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
// import { Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
// import exampleStore from '../src/stores/example.store';

import { AsyncStorage } from 'react-native';
const styles = StyleSheet.create({
    textWelcome: {

        fontSize: 25
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
    },
    input: {
        // width: 200,
        // height: 44,
        // padding: 10,
        // borderWidth: 1,
        // borderColor: 'black',
        // marginBottom: 10,
    },
    buttonContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 200,
        borderRadius: 16,
    },
    signupButton: {
        backgroundColor: "#1976d2",
    },
    signUpText: {
        color: 'white',
    },
    loginButton: {
        backgroundColor: "white",
    },
    loginText: {
        color: '#1976d2',
    }
});
function HomeScreen(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [accessToken, setAccessToken] = useState("wait");

    const [userName, setUserName] = useState("spongebob");

    useEffect(() => {
        (async () => {
            let accessToken = await AsyncStorage.getItem("access_token") ? "true" : "false";
            setAccessToken(accessToken)
            console.log("exampleStore", props.ExampleStore)
            console.log("accessToken",accessToken)

        })()


    });

    const onClickLogin = () => {
        props.navigation.navigate("Login")
    }
    const onClickRegister = () => {
        props.navigation.navigate("registration")

    }


    return (
        <View style={styles.container}>
            {/* <Text>HomeScreen</Text> */}
            {accessToken === "wait" ?
                <Text >
                    loading...
            </Text> :
                <View style={styles.container}>
                    <Text style={styles.textWelcome}>Welcome!</Text>

                    {accessToken === "true" ?
                        <Text>{props.ExampleStore.userName}</Text>
                        :

                        <View>
                            <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={onClickRegister}>
                                <Text style={styles.signUpText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={onClickLogin}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View >
            }

        </View>
    );

}
export default inject('ExampleStore')(observer(HomeScreen));

// ))


// export default inject('ExampleStore')(observer(HomeScreen));
// // export default HomeScreen;
// import  React,{ useState } from 'react';
// import { Alert, Button, Text, View, StyleSheet } from 'react-native';
// import { inject, observer } from "mobx-react";

// function HomeScreen(props) {
//     // Declare a new state variable, which we'll call "count"
//     const [count, setCount] = useState(0);

//     return (

//         //    <Text>HomeScreen</Text>
//         <View>
//             {console.log("try mobx", props.ExampleStore.text)}
//             <Text>Hello! please
//             <Text style={{ color: 'blue' }}
//                     onPress={() => props.navigation.navigate('Login')} >
//                      Login
//             </Text>
//             </Text>
//         </View >
//     );
// }
// export default HomeScreen;