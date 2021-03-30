
/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseEventDispatcher extends BaseClass {

        private _dictEvtForm: { [id: string]: Laya.Dictionary };

        constructor() {
            super();
            this._dictEvtForm = {};
        }

        // public static get instance(): EventDispatcher {
        //     return super.ins() as EventDispatcher;
        // }

        ifStageEvent(id: string): boolean {
            return false;
        }

        /**
         * 添加事件
         * @param id 
         * @param target 
         * @param handler 
         */
        addEventListener(id: string, target: any, handler: Laya.Handler): void {
            Global.assert(handler.once == false)
            if (target == undefined || this.ifStageEvent(id)) {
                target = Laya.stage;
            }
            if (this._dictEvtForm[id] = undefined) {
                this._dictEvtForm[id] = new Laya.Dictionary();
            }
            this._dictEvtForm[id].set(target, handler);
        }

        /**
         * 删除事件
         * @param id 
         * @param target 
         */
        removeEventListener(id: string, target: any): void {
            if (this._dictEvtForm[id] != undefined) {
                var form = this._dictEvtForm[id];
                if (target == undefined || this.ifStageEvent(id)) {
                    target = Laya.stage
                }
                var handler = form.get(target);
                form.remove(target);
                if (handler && handler.once == false) {
                    handler.recover()
                }
                // if (Dict.count(form) == 0) {
                delete this._dictEvtForm[id]
                // }
            }
        }

        /**
         * 触发事件
         * @param id 
         * @param target 
         * @param evt 
         * @param all 
         */
        dispatch(id: string, target: any, evt: BaseEvent, all: boolean = false): void {
            if (this._dictEvtForm[id] != undefined) {
                if (target == null) {
                    target = Laya.stage;
                }
                if (all) {
                    var from = this._dictEvtForm[id];
                    var keys: Array<string> = [];
                    for (var i = 0; i < from.keys.length; i++) {
                        keys.push(from.keys[i])
                    }
                    for (var i = 0; i < keys.length; i++) {
                        var handler = from.get(keys[i]);
                        if (handler != null) {
                            handler.runWith(evt)
                        }
                    }
                    keys.length = 0
                } else {
                    var handler = this._dictEvtForm[id].get(target);
                    if (handler != null) {
                        handler.runWith(evt)
                    }
                }
            }
        }

    }
}