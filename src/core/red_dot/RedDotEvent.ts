


/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class RedDotEvent extends BaseEvent {
        /** 改变 */
        static CHANGED: string = Utils.getGID();
        /** 重置 */
        static RESET: string = Utils.getGID();
    }
}