import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import { AsyncStorage } from 'react-native';
import hooksFactory from '../src/modules/tools/client/hooks/HooksFactory';
import Auth from '../src/modules/auth/Auth'

export default class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: 'spongebob',
      email: 'imspongebob@gmail.com',
      password: 'spongeBob1234',
    }
    this.hooksRepository = hooksFactory.getRepository();
    this.hooksRepository.addHook("auth", "AFTER_REGISTER", this.setUserDataInASyncStorage);

    // this.hooksRepository = hooksFactory.getRepository();
    // hooksRepository.addHook("auth", "AFTER_REGISTER", this.setUserDataInASyncStorage);
  }

  onClickListener = (viewId) => {
    console.log("Alert", "Button pressed " + viewId);
    this.onLogin()
  }

  onLogin = async () => {
    const { fullName, password, email } = this.state;

    //Alert.alert('Credentials', `${username} + ${password}`);
    console.log('Credentials', `${fullName} + ${password}`);
    let userData = {
      realm: fullName,
      username: fullName,
      email: email,
      emailVerified: true,
      password: password
    }

    // let res = null;
    const [res, err] = await Auth.superAuthFetch('https://pumba.carmel6000.com/api/CustomUsers/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    if (res) {
      console.log("login res?", res);
      console.log("document.cookie?", document.cookie);
      // verboseAsyncStorage();
      this.hooksRepository.applyHook("auth", "AFTER_REGISTER", res);
    }
    if (err) console.log("login err?", err);
  }

  setUserDataInASyncStorage = async (res) => {
    await AsyncStorage.setItem('user_res', JSON.stringify(res));

  }

  render() {
    console.log("egeger")
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
            placeholder="Full name"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            value={this.state.fullName}
            onChangeText={(fullName) => this.setState({ fullName })} />
        </View>

        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#717D93',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#939BA9',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#3C444F",
  },
  signUpText: {
    color: 'white',
  }
});

