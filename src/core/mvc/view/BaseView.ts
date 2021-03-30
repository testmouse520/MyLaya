

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseView extends Laya.View {

        private _maskBg: Laya.Sprite;
        private _nMaskAlpha: number;
        private _isMaskBg: boolean;

        constructor() {
            super();
            this._maskBg = null;
            this._nMaskAlpha = 0.5;
            this._isMaskBg = false;

            this.initRes();
        }

        protected onOpen() {
            //resize尺寸变化监听事件
            if (this._isMaskBg)
                this.parent.addChildAt(this.maskBg, this.parent.getChildIndex(this));
            this.onResize();
            Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }

        protected onClose() {
            Global.stageUtils.stage.off(Laya.Event.RESIZE, this, this.onResize);
        }

        /**
         * 子类继承必须实现，赋值加载资源
         * @param [{url: , type: }]
         */
        protected initRes() {
        }

        /**
         * 对面板进行显示初始化，用于子类继承
         */
        protected initView() {
        }

        /**
         * 屏幕尺寸变化时调用
         */
        onResize() {
            this._onResize()
        }

        /**
         * 背景适配
         */
        private _onResize() {
            if (this._maskBg) {
                this.maskBg.pos(0, 0);
                this.maskBg.graphics.clear();
                this.maskBg.graphics.drawRect(0, 0, Global.stageUtils.stageW, Global.stageUtils.stageH, "#000000");
                this.maskBg.size(Global.stageUtils.stageW, Global.stageUtils.stageH);
            }
        }

        /**
         * 黑色背景底层
         */
        private get maskBg() {
            if (this._isMaskBg) {
                if (!this._maskBg) {
                    this._maskBg = new Laya.Sprite();
                    this._maskBg.graphics.drawRect(0, 0, Global.stageUtils.stageW, Global.stageUtils.stageH, "#000000");
                    this._maskBg.mouseEnabled = true;
                    this._maskBg.alpha = this._nMaskAlpha;
                }
            }
            return this._maskBg;
        }

        destroy(destroyChild: boolean = true) {
            if (this._maskBg) {
                this._maskBg.graphics.clear();
                this._maskBg.destroy(true);
                this._maskBg = null;
            }
            super.destroy(destroyChild)
        }
    }
}