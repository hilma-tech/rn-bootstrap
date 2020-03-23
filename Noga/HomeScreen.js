import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Auth from '../src/modules/auth/Auth';

function HomeScreen(props) {
    // Declare a new state variable, which we'll call "count"
    const [accessToken, setAccessToken] = useState("wait");

    useEffect(() => {
        (async () => {
            if (accessToken == "wait") {
                let accessToken = await AsyncStorage.getItem("access_token") ? "true" : "false";
                setAccessToken(accessToken)
            }
            console.log("exampleStore", props.ExampleStore)
            console.log("accessToken", accessToken)
            props.ExampleStore.getUserName()
        })()
    }, []);

    const goToLogin = () => {
        props.navigation.navigate("Login")
    }

    const goToRegistration = () => {
        props.navigation.navigate("registration")
    }

    const logout = () => {
        Auth.logout(goToLogin)
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
                        <View style={{textAlign: "center"}}>
                            <Text>{props.ExampleStore.userName}</Text>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={logout}>
                                <Text style={styles.loginText}>Logout</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        <View>
                            <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={goToRegistration}>
                                <Text style={styles.signUpText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={goToLogin}>
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