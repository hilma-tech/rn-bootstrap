'use strict';

import consts from "./consts"
 class HooksList {

    constructor(hooksRepository) {
        // super()
        console.log("hooksRepository", hooksRepository)

        this.hooksRepository = hooksRepository;

    }

    addHooks() {

        //hooksRepository.addHook(Consts.AUTH_MODULE,Consts.HOOK_AFTER_LOGIN,this.afterLogin);
        //hooksRepository.addHook(Consts.AUTH_MODULE,Consts.HOOK_AFTER_LOGIN,this.beforeLogin);

        // let platform = Tools.PlatformManager.getPlatform();
        // let hookKey = "";
        // if (consts.HOOK__AFTER_LOGIN) {
        //     hookKey = consts.HOOK__AFTER_LOGIN
        // }
        // else {
        //     hookKey = consts.HOOK__AFTER_LOGIN;

        // }
        this.hooksRepository.addHook("auth", consts.HOOK__BEFORE_LOGIN, this.beforeLogin);
        this.hooksRepository.addHook("auth", consts.HOOK__AFTER_LOGIN, this.afterLogin);



    }



    afterLoginForReactNative() {

    }

    afterLoginForCordova() {

    }

    afterLogin() {

        console.log("hhh afterLogin")

        // setItem("kl", res.kl);


    }
    beforeLogin() {
        console.log("hhh beforeLogin")
        // setItem("kl", res.kl);

    }
}
export default HooksList;
