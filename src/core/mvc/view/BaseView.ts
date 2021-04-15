

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseView extends Laya.View {

        private _maskBg: Laya.Sprite;
        private _eventArray: Array<string>;

        private _isLoadRes: boolean = false;

        protected arrayRes: Array<{ url: string, type: string }>;
        protected nMaskAlpha: number;
        protected isMaskBg: boolean;

        private _uiView: any;
        private _layerName: string;
        private _root: Laya.Box;

        set root(p: Laya.Box) {
            this._root = p;
        }

        get root(): Laya.Box {
            return this._root;
        }

        set layerName(name: string) {
            this._layerName = name;
        }

        get layerName(): string {
            return this._layerName;
        }

        constructor() {
            super();
            this._maskBg = null;
            this.arrayRes = [];
            this.nMaskAlpha = 0.5;
            this.isMaskBg = false;
            this.initRes();
        }

        protected createView(uiView: any): void {
            this._uiView = uiView;
        }

        onOpen() {
            this.root.addChild(this);
            //resize尺寸变化监听事件
            if (this.isMaskBg)
                this.parent.addChildAt(this.maskBg, 0);
            this.onResize();
            Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }

        onClose() {
            this.removeSelf();

            Global.stageUtils.stage.off(Laya.Event.RESIZE, this, this.onResize);

            if (this._eventArray && this._eventArray.length) {
                for (let i = 0, length = this._eventArray.length; i < length; i++) {
                    this.removeEventListener(this._eventArray[i]);
                }
            }
            this._eventArray.length = 0;
        }

        /**
         * 监听事件
         * @param id 
         * @param handler 
         */
        protected addEventListener(id: string, handler: Laya.Handler): void {
            (this._eventArray = this._eventArray || []) && this._eventArray.push(id);
            Global.evtMgr.addEventListener(id, this, handler);
        }

        /**
         * 注销事件
         * @param id 
         */
        protected removeEventListener(id): void {
            Global.evtMgr.removeEventListener(id, this);
        }

        /**
         * 触发事件
         * @param id 
         * @param evt 
         */
        protected dispatch(id: string, evt: BaseEvent) {
            Global.evtMgr.dispatch(id, this, evt)
        }

        /**
         * 子类继承必须实现，赋值加载资源
         * @param [{url: , type: }]
         */
        protected initRes() {
        }

        /**
         * 是否正在加载
         * 
         * @return boolean
         */
        get isLoadRes(): boolean {
            return this._isLoadRes;
        }

        /**
         * 是否资源完成
         * 
         * @return boolean
         */
        get isResComplete(): boolean {
            if (this.arrayRes && this.arrayRes.length > 0) {
                for (let i = 0, len = this.arrayRes.length; i < len; i++) {
                    let url = this.arrayRes[i].url;
                    if (Laya.loader.getRes(url) == undefined) {
                        return false;
                    }
                }
            }
            return true;
        }

        // private _loadComplete: Handler = null;
        // private _loadProgress: Handler = null;

        loadRes() {
            // this._loadComplete = complete || Handler.createOnce(this, this.onLoadComplete);
            // this._loadProgress = progress;
            this._isLoadRes = true;
            Laya.loader.load(this.arrayRes, Handler.createOnce(this, this.onLoadComplete), null, Laya.Loader.ATLAS, 1);
        }

        onLoadComplete(complete: boolean): void {
            this._isLoadRes = false;
            if (complete) {
            } else {
            }
            super.createView(this._uiView);
            this.onOpen();
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
            if (this.isMaskBg) {
                if (!this._maskBg) {
                    this._maskBg = new Laya.Sprite();
                    this._maskBg.graphics.drawRect(0, 0, Global.stageUtils.stageW, Global.stageUtils.stageH, "#000000");
                    this._maskBg.mouseEnabled = true;
                    this._maskBg.alpha = this.nMaskAlpha;
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