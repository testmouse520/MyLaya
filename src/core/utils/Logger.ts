

module h5game {

    export class Logger {

        constructor() { }

        static trace(...args) {
            // if (App.DebugUtils.isDebug) {
            console.log.apply(console, args);
            // }
        }
    }
}