

/**
 * 
 */
module h5game {

    export class LayerMgr extends BaseClass {

        // 最底层
        static LAYER_GAME: string = "LAYER_GAME";
        // 主UI层
        static LAYER_MAIN: string = "LAYER_MAIN";
        // 窗口层
        static LAYER_WINDOW: string = "LAYER_WINDOW";
        // 提示层
        static LAYER_TIP: string = "LAYER_TIP";
        // 最顶层
        static LAYER_TOP: string = "LAYER_TOP";

        private _allLayer: Laya.Box;
        private _arrayLayer: Array<string>;
        private _objLayer: { [key: string]: Laya.Box };

        private _objUIClass: { [key: string]: any };
        // UI缓存集合
        private _objUICache: { [key: string]: BaseView };
        // UI打开集合
        private _objUIOpen: { [key: string]: Array<BaseView> };

        // 定时销毁时间
        private static DESTROY_TIME: number = 1 * 60 * 1000;

        constructor() {
            super();
            this._arrayLayer = [
                LayerMgr.LAYER_GAME,
                LayerMgr.LAYER_MAIN,
                LayerMgr.LAYER_WINDOW,
                LayerMgr.LAYER_TIP,
                LayerMgr.LAYER_TOP
            ];
            this._objLayer = {};
            this._objUIClass = {};
            this._objUICache = {};
            this._objUIOpen = {};
        }

        init() {
            this._allLayer = new Laya.Box();
            this._allLayer.mouseEnabled = this._allLayer.mouseThrough = true;
            this._allLayer.name = "allLayer";
            this._allLayer.left = this._allLayer.right = this._allLayer.top = this._allLayer.bottom = 0;

            Global.stageUtils.stage.addChild(this._allLayer);

            this.initLayer();

            Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
            this.onStageResize();
            Laya.timer.frameLoop(300, this, this.onTick);
        }

        private initLayer() {
            for (let i = 0, len = this._arrayLayer.length; i < len; i++) {
                let layerName: string = this._arrayLayer[i]
                let layer = new Laya.Box();
                layer.mouseEnabled = layer.mouseThrough = true;
                layer.name = layerName;
                layer.left = layer.right = layer.top = layer.bottom = 0;
                this._allLayer.addChild(layer);
                this._objLayer[layerName] = layer;
                this._objUIOpen[layerName] = [];
            }
        }
        
        private getUIName(uiClass: any): string {
            if (uiClass.hasOwnProperty("name")) {
                this._objUIClass[uiClass.name] = uiClass;
                return uiClass.name;
            } else {
                return uiClass as string;
            }
        }

        private createUI(uiName: string): BaseView {
            let uiClass: any = this._objUIClass[uiName];
            let view: BaseView = new uiClass() as BaseView;
            view.name = uiName;
            this._objUICache[uiName] = view;
            return view;
        }

        /**
         * 是否打开
         * 
         * @param uiName 
         */
        private isOpening(uiName: string) {
            let view: BaseView = this._objUICache[uiName];
            let layerName: string = view.layerName;
            let arryaOpen: Array<BaseView> = this._objUIOpen[layerName];
            return arryaOpen.indexOf(view) > -1;
        }

        /**
         * 打开UI
         * 
         * @param uiClass 
         * @param layerName 
         * @param args 
         */
        openView(uiClass: any, layerName: string = LayerMgr.LAYER_WINDOW, args: any = null): void {
            let uiName: string = this.getUIName(uiClass);
            let layerRoot: Laya.Box = this._objLayer[layerName];

            let view: BaseView = this._objUICache[uiName];
            let isCreate: boolean = false;
            if (view == undefined) {
                isCreate = true;
                view = this.createUI(uiName);
            }

            view.root = layerRoot;
            view.layerName = layerName;

            if (!view.isResComplete && !view.isLoadRes || isCreate) {
                view.loadRes();
            } else {
                view.onOpen();
            }

            if (!this.isOpening(uiName)) {
                this._objUIOpen[layerName].push(view);
            }
        }

        /**
         * 关闭UI
         * @param uiClass 
         */
        colseView(uiClass: any): BaseView {
            let uiName: string = this.getUIName(uiClass);
            let view: BaseView = this._objUICache[uiName];

            if (view == undefined || view == null)
                return null;
            if (view.closeTime != -1)
                return view;

            let layerName = view.layerName;
            let arrayOpen: Array<BaseView> = this._objUIOpen[layerName];
            let uiIndex: number = arrayOpen.indexOf(view);
            if (uiIndex != -1) {
                arrayOpen.splice(uiIndex, 1);
                view.onClose();
            }

            return view;
        }

        private destroyUI(view: BaseView) {
            this.colseView(view);
            delete this._objUICache[view.name];
            view.destroy(true);
        }

        private onTick() {
            for (let key in this._objUICache) {
                let view = this._objUICache[key] as BaseView;
                if (view && view.closeTime != -1 && (Date.now() - view.closeTime) >= LayerMgr.DESTROY_TIME) {
                    this.destroyUI(view);
                }
            }
        }

        private onStageResize() {
            let scale: number = Math.min(Global.stageUtils.stage.width / Global.stageUtils.stage.designWidth, Global.stageUtils.stage.height / Global.stageUtils.stage.designHeight);

            for (let key in this._objLayer) {
                let layer: Laya.Box = this._objLayer[key] as Laya.Box;
                layer.scale(scale, scale);
            }
        }
    }
}