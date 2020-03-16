import React, { Component } from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { AsyncStorage } from 'react-native';
import consts from "../src/modules/tools/client/hooks/consts"
import hooksFactory from "../src/modules/tools/client/hooks/HooksFactory"
import Auth from "../src/modules/auth/Auth"
import ValidateFields from '../src/modules/tools/ValidateFields'
import FloatingLabelInput from '../components/FloatingLabelInput.js'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@carmel6000.amitnet.org',
      password: 'E2PSzAmJ-5-ldKnl',
      emailOutput: '',
      passwordOutput: ''
    };
    this.hooksRepository = hooksFactory.getRepository();
    this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_LOGIN, (x) => { console.log("hiiii from home screen", x) });
    this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_LOGIN, () => { console.log("hiiii shalva") });
  }

  // async showUsersList() {
  //   let res = null;
  //   try {
  //     let at = await AsyncStorage.getItem('access_token');
  //     at = "?access_token=" + at;
  //     res = await fetch('https://pumba.carmel6000.com/api/CustomUsers' + at, {
  //       //credentials: "same-origin" //or "include" both doesn't work
  //     }).then(res => res.json());
  //     console.log("USERS list res", res);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // }

  async onLogin() {
    const { email, password } = this.state;

    // let emailOutput = ValidateFields.validateEmailInput(email, true)
    // let passwordOutput = ValidateFields.validatePasswordInput(password, true);

    // console.log("emailOutput", emailOutput, "passwordOutput", passwordOutput)

    // if (emailOutput !== this.state.emailOutput) {
    //   this.setState({ emailOutput });
    // }
    // if (passwordOutput !== this.state.passwordOutput) {
    //   this.setState({ passwordOutput });
    // }
    // if (passwordOutput !== '' || emailOutput !== '') return;

    console.log('Credentials', `${email} + ${password}`);
    let res = null;
    try {
      res = await Auth.login(email, password, res => res.json());
      // console.log("login res?", res);
      // console.log("document.cookie?", document.cookie);
      // await AsyncStorage.setItem('klo', res.klo);
      // await AsyncStorage.setItem('kl', res.kl);
      // await AsyncStorage.setItem('kloo', res.kloo);
      // await AsyncStorage.setItem('klk', res.klk);
      // await AsyncStorage.setItem('access_token', res.id);
      // verboseAsyncStorage();
    } catch (err) {
      console.log("login err?", err);
    }
  }

  handleChange = (name, value) => {
    console.log("valuee", name)
    this.setState({ [name]: value })
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Sign In</Text>

        {/* <TextInput
          value={this.state.email}
          onChangeText={(value) => this.handleChange("email", value)}
          placeholder={'Email'}
          style={styles.input}
        /> */}

        <FloatingLabelInput
          label="Email"
          keyName="email"
          value={this.state.email}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
        />


        {/* <Text style={{ fontSize: 10, height: 10 }}>{this.state.emailOutput ? this.state.emailOutput : ''}</Text> */}

        {/* <TextInput
          value={this.state.password}
          onChangeText={(value) => this.handleChange("password", value)}
          placeholder={'Password'}
          style={styles.input}
          secureTextEntry={true}
        /> */}

        <FloatingLabelInput
          label="Password"
          keyName="password"
          value={this.state.password}
          onChangeText={(keyName, value) => this.handleChange(keyName, value)}
          style={styles.input}
          secureTextEntry={true}
        />

        {/* <Text style={{ fontSize: 10, height: 10 }}>{this.state.passwordOutput ? this.state.passwordOutput : ''}</Text> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.onLogin.bind(this)}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>

        <Text style={{ color: '#1976d2', marginTop: 10 }} onPress={() => navigate('Registeration')}>Not registered?</Text>
        {/* <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />

        <Button
          title={'register'}
          style={styles.input}
          onPress={() => navigate('Reg')} /> */}
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
    width: 300,
  },
  signupButton: {
    backgroundColor: "#1976d2",
  },
  signUpText: {
    color: 'white',
  }
});
