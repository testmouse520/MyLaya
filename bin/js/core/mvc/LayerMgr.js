var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 */
var h5game;
(function (h5game) {
    var LayerMgr = /** @class */ (function (_super) {
        __extends(LayerMgr, _super);
        function LayerMgr() {
            var _this = _super.call(this) || this;
            _this._arrayLayer = [
                LayerMgr.LAYER_GAME,
                LayerMgr.LAYER_MAIN,
                LayerMgr.LAYER_WINDOW,
                LayerMgr.LAYER_TIP,
                LayerMgr.LAYER_TOP
            ];
            _this._objLayer = {};
            _this._objUIClass = {};
            _this._objUICache = {};
            _this._objUIOpen = {};
            return _this;
        }
        LayerMgr.prototype.init = function () {
            this._allLayer = new Laya.Box();
            this._allLayer.mouseEnabled = this._allLayer.mouseThrough = true;
            this._allLayer.name = "allLayer";
            this._allLayer.left = this._allLayer.right = this._allLayer.top = this._allLayer.bottom = 0;
            h5game.Global.stageUtils.stage.addChild(this._allLayer);
            this.initLayer();
            h5game.Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
            this.onStageResize();
            Laya.timer.frameLoop(300, this, this.onTick);
        };
        LayerMgr.prototype.initLayer = function () {
            for (var i = 0, len = this._arrayLayer.length; i < len; i++) {
                var layerName = this._arrayLayer[i];
                var layer = new Laya.Box();
                layer.mouseEnabled = layer.mouseThrough = true;
                layer.name = layerName;
                layer.left = layer.right = layer.top = layer.bottom = 0;
                this._allLayer.addChild(layer);
                this._objLayer[layerName] = layer;
                this._objUIOpen[layerName] = [];
            }
        };
        LayerMgr.prototype.getUIName = function (uiClass) {
            if (uiClass.hasOwnProperty("name")) {
                this._objUIClass[uiClass.name] = uiClass;
                return uiClass.name;
            }
            else {
                return uiClass;
            }
        };
        LayerMgr.prototype.createUI = function (uiName) {
            var uiClass = this._objUIClass[uiName];
            var view = new uiClass();
            view.name = uiName;
            this._objUICache[uiName] = view;
            return view;
        };
        /**
         * 是否打开
         *
         * @param uiName
         */
        LayerMgr.prototype.isOpening = function (uiName) {
            var view = this._objUICache[uiName];
            var layerName = view.layerName;
            var arryaOpen = this._objUIOpen[layerName];
            return arryaOpen.indexOf(view) > -1;
        };
        /**
         * 打开UI
         *
         * @param uiClass
         * @param layerName
         * @param args
         */
        LayerMgr.prototype.openView = function (uiClass, layerName, args) {
            if (layerName === void 0) { layerName = LayerMgr.LAYER_WINDOW; }
            if (args === void 0) { args = null; }
            var uiName = this.getUIName(uiClass);
            var layerRoot = this._objLayer[layerName];
            var view = this._objUICache[uiName];
            var isCreate = false;
            if (view == undefined) {
                isCreate = true;
                view = this.createUI(uiName);
            }
            view.root = layerRoot;
            view.layerName = layerName;
            if (!view.isResComplete && !view.isLoadRes || isCreate) {
                view.loadRes();
            }
            else {
                view.onOpen();
            }
            if (!this.isOpening(uiName)) {
                this._objUIOpen[layerName].push(view);
            }
        };
        /**
         * 关闭UI
         * @param uiClass
         */
        LayerMgr.prototype.colseView = function (uiClass) {
            var uiName = this.getUIName(uiClass);
            var view = this._objUICache[uiName];
            if (view == undefined || view == null)
                return null;
            if (view.closeTime != -1)
                return view;
            var layerName = view.layerName;
            var arrayOpen = this._objUIOpen[layerName];
            var uiIndex = arrayOpen.indexOf(view);
            if (uiIndex != -1) {
                arrayOpen.splice(uiIndex, 1);
                view.onClose();
            }
            return view;
        };
        LayerMgr.prototype.destroyUI = function (view) {
            this.colseView(view);
            delete this._objUICache[view.name];
            view.destroy(true);
        };
        LayerMgr.prototype.onTick = function () {
            for (var key in this._objUICache) {
                var view = this._objUICache[key];
                if (view && view.closeTime != -1 && (Date.now() - view.closeTime) >= LayerMgr.DESTROY_TIME) {
                    this.destroyUI(view);
                }
            }
        };
        LayerMgr.prototype.onStageResize = function () {
            var scale = Math.min(h5game.Global.stageUtils.stage.width / h5game.Global.stageUtils.stage.designWidth, h5game.Global.stageUtils.stage.height / h5game.Global.stageUtils.stage.designHeight);
            for (var key in this._objLayer) {
                var layer = this._objLayer[key];
                layer.scale(scale, scale);
            }
        };
        // 最底层
        LayerMgr.LAYER_GAME = "LAYER_GAME";
        // 主UI层
        LayerMgr.LAYER_MAIN = "LAYER_MAIN";
        // 窗口层
        LayerMgr.LAYER_WINDOW = "LAYER_WINDOW";
        // 提示层
        LayerMgr.LAYER_TIP = "LAYER_TIP";
        // 最顶层
        LayerMgr.LAYER_TOP = "LAYER_TOP";
        // 定时销毁时间
        LayerMgr.DESTROY_TIME = 1 * 60 * 1000;
        return LayerMgr;
    }(h5game.BaseClass));
    h5game.LayerMgr = LayerMgr;
})(h5game || (h5game = {}));
//# sourceMappingURL=LayerMgr.js.map