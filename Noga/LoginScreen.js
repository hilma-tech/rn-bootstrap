import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import consts from "../src/modules/tools/client/hooks/consts"
import hooksFactory from "../src/modules/tools/client/hooks/HooksFactory"
import Auth from "../src/modules/auth/Auth"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin@carmel6000.amitnet.org',
      password: 'E2PSzAmJ-5-ldKnl',
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
    const { username, password } = this.state;
    console.log('Credentials', `${username} + ${password}`);
    let res = null;
    try {
      res = await Auth.login(username, password, res => res.json());
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

  handleChange = (nativeEvent, value) => {
    console.log("valuee",value,  nativeEvent)
    // this.setState({ []: value })
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <TextInput
        name = "nameee"
          value={this.state.username}
          // onChangeText={(username) => this.setState({ username })}
          onChange={(nativeEvent, value) => this.handleChange(nativeEvent, value)}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          // onChangeText={(password) => this.setState({ password })}
          onChange={(nativeEvent) => this.handleChange(nativeEvent)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />

        <Button
          title={'register'}
          style={styles.input}
          onPress={() => navigate('Reg')} />
      </View>
    );
  }
}










const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
