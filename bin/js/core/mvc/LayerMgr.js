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
            _this._objBaseView = {};
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
            var ui = new uiClass();
            ui.name = uiName;
            this._objBaseView[uiName] = ui;
            return ui;
        };
        LayerMgr.prototype.openView = function (uiClass, layerName, args) {
            if (layerName === void 0) { layerName = LayerMgr.LAYER_WINDOW; }
            if (args === void 0) { args = null; }
            var uiName = this.getUIName(uiClass);
            var layerRoot = this._objLayer[layerName];
            var ui = this._objBaseView[uiName];
            if (ui == undefined) {
                ui = this.createUI(uiName);
            }
            ui.root = layerRoot;
            ui.layerName = layerName;
            if (!ui.isResComplete && !ui.isLoadRes) {
                ui.loadRes();
            }
            else {
                ui.onOpen();
            }
        };
        LayerMgr.prototype.colseView = function (uiClass) {
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
        return LayerMgr;
    }(h5game.BaseClass));
    h5game.LayerMgr = LayerMgr;
})(h5game || (h5game = {}));
//# sourceMappingURL=LayerMgr.js.map