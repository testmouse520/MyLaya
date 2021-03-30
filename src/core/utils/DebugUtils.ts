


module h5game {


    export class DebugUtils extends BaseClass {

        private _isDebug: boolean;

        constructor() {
            super();
            this._isDebug = true;
        }

        get isDebug() {
            return !!this._isDebug
        }

        set isDebug(value) {
            this._isDebug = value;
        }

    }
}