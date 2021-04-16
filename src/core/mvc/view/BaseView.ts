

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class BaseView extends Laya.View {

        private _maskBg: Laya.Sprite;
        // 事件监听集合
        private _eventArray: Array<string>;
        // 是否加载资源
        private _isLoadRes: boolean = false;
        // 资源图集集合
        protected arrayRes: Array<{ url: string, type: string }>;
        // 遮罩的透明度
        protected nMaskAlpha: number;
        // 是否显示遮罩
        protected isMaskBg: boolean;

        private _uiView: any;
        // 界面关闭时间
        private _closeTime: number;
        // 父节点层名称
        private _layerName: string;
        // 父节点
        private _root: Laya.Box;
        private _args: any;

        constructor() {
            super();
            this._maskBg = null;
            this.arrayRes = [];
            this.nMaskAlpha = 0.5;
            this.isMaskBg = false;
        }

        protected createView(uiView: any): void {
            this._uiView = uiView;
        }

        /**
         * 打开
         */
        onOpen() {
            this.root.addChild(this);
            // resize尺寸变化监听事件
            if (this.isMaskBg)
                this.parent.addChildAt(this.maskBg, 0);
            this.closeTime = -1;
            this.onResize();
            Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }

        /**
         * 关闭
         */
        onClose() {
            Global.stageUtils.stage.off(Laya.Event.RESIZE, this, this.onResize);
            this.removeAllEvent();

            this.args = null;
            this.layerName = null;
            this.root = null;

            this.closeTime = Date.now();
            this.removeSelf();
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
         * 删除所有事件
         */
        private removeAllEvent(): void {
            if (this._eventArray && this._eventArray.length) {
                for (let i = 0, len = this._eventArray.length; i < len; i++) {
                    this.removeEventListener(this._eventArray[i]);
                }
            }
            this._eventArray && (this._eventArray.length = 0);
        }

        /**
         * 触发事件
         * @param id 
         * @param evt 
         */
        protected dispatch(id: string, evt: BaseEvent) {
            Global.evtMgr.dispatch(id, this, evt)
        }

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

        set closeTime(number) {
            this._closeTime = number;
        }

        get closeTime(): number {
            return this._closeTime;
        }

        set args(args) {
            this._args = args;
        }

        get args(): any {
            return this._args;
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

        /**
         * 加载资源
         */
        loadRes() {
            if (this.arrayRes && this.arrayRes.length > 0) {
                this._isLoadRes = true;
                Laya.loader.load(this.arrayRes, Handler.createOnce(this, this.onLoadComplete), null, Laya.Loader.ATLAS, 1);
            } else {
                this.onCreate();
            }
        }

        /**
         * 资源加载完毕
         * 
         * @param complete 
         */
        private onLoadComplete(complete: boolean): void {
            this._isLoadRes = false;
            if (!complete) {
                Logger.trace("图片资源加载失败!")
            }
            this.onCreate();
        }

        /**
         * 创建界面
         */
        protected onCreate() {
            super.createView(this._uiView);
            this.onOpen();
        }

        /**
         * 屏幕尺寸变化时调用
         */
        protected onResize() {
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