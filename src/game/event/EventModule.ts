
/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class EventModule extends BaseClass {

        private _dictEvtForm: { [id: number]: Laya.Dictionary };

        constructor() {
            super();
            this._dictEvtForm = {};
        }

        public static get instance(): EventModule {
            return super.ins() as EventModule;
        }

        addEventListener(id: string, target: any, handler: Handler): void {
            if (handler.once == false) {
            }
            // new Laya.Dictionary();
        }

        removeEventListener(id: string, target: any): void {
        }

        dispatch(id: string, target: any, event: BaseEvent, all: boolean): void {
        }
    }
}