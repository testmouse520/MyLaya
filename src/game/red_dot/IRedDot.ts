




/**
 * 
 */
module h5game {

    /**
     * 
     */
    export interface IRedDot {
        registerRedDot: (key: number, showValue: boolean) => void;
        unregisterRedDot: () => void;
    }

    /**
     * 
     */
    export interface IRedDotInfo {
        key: number;
    }
}