
/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseController extends BaseClass {

        constructor() {
            super();

            this.init();
        }

        protected init() {
        }

        protected addEventListener(id: string, handler: Handler): void {
            Global.evtMgr.addEventListener(id, this, handler);
        }

        protected dispatch(id: string, evt?: BaseEvent): void {
            Global.evtMgr.dispatch(id, this, evt)
        }
    }
}