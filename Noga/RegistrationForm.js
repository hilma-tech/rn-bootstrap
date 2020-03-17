import React, { Component } from 'react';
import consts from "./../src/modules/tools/client/hooks/consts"
import { inject, observer } from "mobx-react";
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import FloatingLabelInput from '../components/FloatingLabelInput.js';
import { AsyncStorage } from 'react-native';
import hooksFactory from '../src/modules/tools/client/hooks/HooksFactory';
import Auth from '../src/modules/auth/Auth'
import exampleStore from '../src/stores/example.store';
import ValidateFields from '../src/modules/tools/ValidateFields'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'spongebob',
      email: 'imspongebob@gmail.com',
      password: 'spongeBob1234',
      confirmPassword: 'spongeBob1234',

      emailOutput: '',
      passwordOutput: '',
      confirmPasswordOutput: ''
    }
    this.hooksRepository = hooksFactory.getRepository();
    this.hooksRepository.addHook(consts.AUTH, consts.AFTER_REGISTER, this.setUserDataInASyncStorage);
  }

  // onClickListener = (viewId) => {
  //   this.onRegister()
  // }
  validateFields = () => {
    const { username, email, password, confirmPassword } = this.state;

    let emailOutput = ValidateFields.validateEmailInput(email, true)
    let passwordOutput = ValidateFields.validatePasswordInput(password, true);
    let confirmPasswordOutput = ValidateFields.validateConfirmPasswordInput(password, true, confirmPassword)

    if (emailOutput !== this.state.emailOutput) {
      this.setState({ emailOutput });
    }
    if (passwordOutput !== this.state.passwordOutput) {
      this.setState({ passwordOutput });
    }
    if (confirmPasswordOutput !== this.state.confirmPasswordOutput) {
      this.setState({ confirmPasswordOutput });
    }
    if (passwordOutput !== '' || emailOutput !== '' || confirmPasswordOutput !== '') return false;
    return true
  }

  onRegister = async () => {
    const { username, email, password, confirmPassword } = this.state;

    let isValid = this.validateFields()
    if (!isValid) return;

    console.log('Credentials', `${username} + ${password}`);
    let userData = {
      realm: username,
      username: username,
      email: email,
      emailVerified: true,
      password: password
    }

    const [res, err] = await Auth.superAuthFetch('https://pumba.carmel6000.com/api/CustomUsers/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    if (res) {
      console.log("login res?", res);
      console.log("document.cookie?", document.cookie);
      // this.hooksRepository.applyHook("auth", "AFTER_REGISTER", res);
    }
    if (err) console.log("login err?", err);
  }

  setUserDataInASyncStorage = async (res) => {
    await AsyncStorage.setItem('user_res', JSON.stringify(res));
  }

  handleChange = (name, value) => {
    console.log("valuee", name)
    this.setState({ [name]: value })
  }

  render() {
    const { navigate } = this.props.navigation;
    // console.log("ExampleStore", this.props.ExampleStore)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Sign Up</Text>

        <FloatingLabelInput
          label="Username"
          keyName="username"
          value={this.state.username}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
        />
        <View style={{ height: 10 }}></View>

        <FloatingLabelInput
          label="Email"
          keyName="email"
          value={this.state.email}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
        />

        <Text style={{ fontSize: 10, height: 10 }}>{this.state.emailOutput ? this.state.emailOutput : ''}</Text>

        <FloatingLabelInput
          label="Password"
          keyName="password"
          value={this.state.password}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
          secureTextEntry={true}
        />
        <Text style={{ fontSize: 10, height: 10 }}>{this.state.passwordOutput ? this.state.passwordOutput : ''}</Text>

        <FloatingLabelInput
          label="Confirm Password"
          keyName="confirmPassword"
          value={this.state.confirmPassword}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
          secureTextEntry={true}
        />

        <Text style={{ fontSize: 10, height: 10 }}>{this.state.confirmPasswordOutput ? this.state.confirmPasswordOutput : ''}</Text>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onRegister('sign_up')}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>

        <Text style={{ color: '#1976d2', marginTop: 10 }} onPress={() => navigate('Login')}>Already have an account?</Text>

      </View>
    );
  }
}













const styles = StyleSheet.create({
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
    width: 300,
  },
  signupButton: {
    backgroundColor: "#1976d2",
  },
  signUpText: {
    color: 'white',
  }
});

export default inject("ExampleStore")(observer(RegistrationForm));
