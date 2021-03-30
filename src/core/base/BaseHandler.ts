

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseHandler extends Laya.Handler {

        static createOnce(caller: any, method: Function, args?: Array<any>): Laya.Handler {
            return Laya.Handler.create(caller, method, args, true)
        }

        static createPermanent = function (caller: any, method: Function, args?: Array<any>) {
            return Laya.Handler.create(caller, method, args, false)
        }
    }
}