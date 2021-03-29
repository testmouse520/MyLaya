

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class Handler extends Laya.Handler {

        static createOnce(caller: any, method: Function, args?: Array<any>): Handler {
            return Laya.Handler.create(caller, method, args, true)
        }

        static createPermanent = function (caller: any, method: Function, args?: Array<any>) {
            return Laya.Handler.create(caller, method, args, false)
        }
    }
}