
/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class EventModule extends Laya.EventDispatcher {

        constructor() {
            super();
        }

        static get instance(): EventModule {
            let Class: any = this;
            return Class._instance = Class._instance || new Class();
        }

        static addEventListener() {
        }

        static removeEventListener() {
        }

        static dispatch() {
        }

    }
}