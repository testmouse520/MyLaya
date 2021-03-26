
/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class RedDot extends ui.common.RedDotUI implements IRedDot {

        private _bShowValue: boolean = false;
        private _nKey: number = -1;

        constructor() {
            super();
        }

        protected createView(uiView: any): void {
            super.createView(uiView);
            this.visible = this.ui_labelNumber.visible = false;
        }

        private setShowValue(showValue: boolean) {
            this._bShowValue = showValue;
            this.ui_labelNumber.visible = this._bShowValue;
        }

        registerRedDot(key: number, showValue: boolean): void {
            this.setShowValue(showValue);
            this._nKey = key;
            EventModule.instance.addEventListener(RedDotEvent.CHANGED, this, Handler.createPermanent(this, this.onGameRedDot));
        }

        unregisterRedDot(): void {
            EventModule.instance.removeEventListener(RedDotEvent.CHANGED, this);
        }

        private onGameRedDot(obj: IRedDotInfo) {
            if (obj.key == this._nKey) {
                let value: number = RedDotModule.instance.getRedDotValue(this._nKey);
                this.ui_labelNumber.text = String(value);
                this.visible = (value > 0);
            }
        }
    }
}