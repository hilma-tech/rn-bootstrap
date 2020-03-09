import { observable, decorate, action, computed } from 'mobx';

class ExampleStore {
    text = "this is an example text"
}

// another way to decorate variables with observable
decorate(ExampleStore, {
    text: observable
});

// export class
export default new ExampleStore