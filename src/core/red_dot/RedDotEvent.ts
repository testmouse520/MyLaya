


/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class RedDotEvent extends BaseEvent {
        /** 改变 */
        static CHANGED: string = Global.commonUtils.getGID();
        /** 重置 */
        static RESET: string = Global.commonUtils.getGID();
    }
}