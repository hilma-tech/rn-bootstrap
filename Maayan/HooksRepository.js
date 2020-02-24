
export default class HooksRepository {
    constructor() {
        this._hooksRepositoryArr = [{
            auth: {
                BEFORE_LOGIN: [() => { console.log("Im before login") }],
                AFTER_LOGIN: [() => { console.log("Im after login") }]
            }
        },
        {
            fileshandler: {
                BEFORE_LOGIN: [() => { }]
            }
        }];
    }
    getHooksByKeys(MODULE_NAME, HOOK_NAME) {

        // let hooksOfModule = this._hooksRepositoryArr.find(
        //     elem => { Object.keys(elem).includes(MODULE_NAME) }
        // );
        let hooksOfModule;
        this._hooksRepositoryArr.forEach(elem => {
            if (Object.keys(elem).includes(MODULE_NAME)) {
                hooksOfModule = elem[MODULE_NAME];
                // break;
            }
        })

        // let hook = hooksOfModule[MODULE_NAME];


        return hooksOfModule[HOOK_NAME];

        // ...find hooks by keys.....


    }

    applyHook(MODULE_NAME, HOOK_NAME, args) {
        console.log("applyHook", MODULE_NAME, HOOK_NAME, args)

        let hooks = this.getHooksByKeys(MODULE_NAME, HOOK_NAME);

        hooks.forEach((hook) => {

            if (typeof hook === "function") {

                hook(args)
                //apply
            }

        })


    }
    addHook(MODULE_NAME, HOOK_NAME, fn) {
        console.log("at add hook", MODULE_NAME, HOOK_NAME, fn)
        let moduleKey = [];
        let hooksKey = [];
        let moduleHooks = [];
        let moduleHooksIdx = -1;
        let moduleObj = {};
        let hooksObj = {};

        moduleHooksIdx = this._hooksRepositoryArr.findIndex(elem => Object.keys(elem).includes(MODULE_NAME))
        if (moduleHooksIdx >= 0) {
            //if include module name
            moduleHooks = this._hooksRepositoryArr[moduleHooksIdx]
            hooksKey = Object.keys(moduleHooks[MODULE_NAME])
            moduleKey = moduleHooks[MODULE_NAME]
            console.log("moduleKey", moduleKey, typeof moduleKey)
            if (hooksKey.includes(HOOK_NAME)) {
                //if include hook name
                moduleKey[HOOK_NAME].push(fn);
            }
            else {
                //if not include hook name
                moduleKey[HOOK_NAME] = [fn]
            }
        }
        else {
            //if not include module name
            hooksObj[HOOK_NAME] = [fn];
            moduleObj[MODULE_NAME] = hooksObj;
            this._hooksRepositoryArr.push(moduleObj)


        }




    }

}