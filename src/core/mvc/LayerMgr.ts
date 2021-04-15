

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
        private _objBaseView: { [key: string]: BaseView };

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
            this._objBaseView = {};
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
            let ui: BaseView = new uiClass() as BaseView;
            ui.name = uiName;
            this._objBaseView[uiName] = ui;
            return ui;
        }

        openView(uiClass: any, layerName: string = LayerMgr.LAYER_WINDOW, args: any = null): void {
            let uiName: string = this.getUIName(uiClass);
            let layerRoot: Laya.Box = this._objLayer[layerName];

            let ui: BaseView = this._objBaseView[uiName];
            if (ui == undefined) {
                ui = this.createUI(uiName);
            }

            ui.root = layerRoot;
            ui.layerName = layerName;

            if (!ui.isResComplete && !ui.isLoadRes) {
                ui.loadRes();
            } else {
                ui.onOpen();
            }
        }

        colseView(uiClass: any): void {
            
        }

        onStageResize() {
            let scale: number = Math.min(Global.stageUtils.stage.width / Global.stageUtils.stage.designWidth, Global.stageUtils.stage.height / Global.stageUtils.stage.designHeight);

            for (let key in this._objLayer) {
                let layer: Laya.Box = this._objLayer[key] as Laya.Box;
                layer.scale(scale, scale);
            }
        }
    }
}