import { observable, decorate, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
class ExampleStore {
    text = "this is an example text";
    userName = "";
    at = "wait"

    async setUserName(userName) {
        let index = userName.indexOf("@");
        this.userName = userName.slice(0, index)
        await AsyncStorage.setItem("userName", userName)
        // props.ExampleStore.userName
    }
    async getUserName() {
        this.userName = await AsyncStorage.getItem("userName")
        if (this.userName) {
            let index = this.userName.indexOf("@");
            this.userName = this.userName.slice(0, index)
        }


    }

}

// another way to decorate variables with observable
decorate(ExampleStore, {
    at: observable,
    text: observable,
    userName: observable,
    getUserName: action,
    setUserName: action
});

// export class
export default new ExampleStore