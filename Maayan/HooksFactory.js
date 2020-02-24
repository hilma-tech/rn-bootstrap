'use strict';

import HooksRepository from './HooksRepository'
//import loadable from '@loadable/component';
// import HooksList from "./HooksList"
export default class HooksFactory {
    hooksRepository = null;
    constructor() {
        this.hooksRepository = new HooksRepository();
        let modulesList = ["auth", "fileshandler"];
        let m = null;
        modulesList.forEach((moduleName) => {

            let moduleInstance = null;

            try {

                moduleInstance = require(`./${moduleName}_HooksList`).default;
                console.log("moduleInstance", moduleInstance)
                 new moduleInstance(this.hooksRepository).addHooks()

            


            } catch (err) {
                console.log("err", err)
            }

        })



    }
    getRepository() {
        return this.hooksRepository;

    }
}