import { observable, decorate, action, computed } from 'mobx';

class ExampleStore {
    text = "this is an example text";
    userName = "";

    setUserName(userName){
        let index =userName.indexOf("@");
        this.userName = userName.slice(0, index)
        console.log("kkk",this.userName)

    }

}

// another way to decorate variables with observable
decorate(ExampleStore, {
    text: observable,
    userName:observable,
    setUserName:action
});

// export class
export default new ExampleStore