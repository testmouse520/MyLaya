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
    /**
     *
     */
    var BaseView = /** @class */ (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            var _this = _super.call(this) || this;
            _this._maskBg = null;
            _this._nMaskAlpha = 0.5;
            _this._isMaskBg = false;
            _this.initRes();
            return _this;
        }
        BaseView.prototype.onOpen = function () {
            //resize尺寸变化监听事件
            if (this._isMaskBg)
                this.parent.addChildAt(this.maskBg, this.parent.getChildIndex(this));
            this.onResize();
            h5game.Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onResize);
        };
        BaseView.prototype.onClose = function () {
            h5game.Global.stageUtils.stage.off(Laya.Event.RESIZE, this, this.onResize);
        };
        /**
         * 子类继承必须实现，赋值加载资源
         * @param [{url: , type: }]
         */
        BaseView.prototype.initRes = function () {
        };
        /**
         * 对面板进行显示初始化，用于子类继承
         */
        BaseView.prototype.initView = function () {
        };
        /**
         * 屏幕尺寸变化时调用
         */
        BaseView.prototype.onResize = function () {
            this._onResize();
        };
        /**
         * 背景适配
         */
        BaseView.prototype._onResize = function () {
            if (this._maskBg) {
                this.maskBg.pos(0, 0);
                this.maskBg.graphics.clear();
                this.maskBg.graphics.drawRect(0, 0, h5game.Global.stageUtils.stageW, h5game.Global.stageUtils.stageH, "#000000");
                this.maskBg.size(h5game.Global.stageUtils.stageW, h5game.Global.stageUtils.stageH);
            }
        };
        Object.defineProperty(BaseView.prototype, "maskBg", {
            /**
             * 黑色背景底层
             */
            get: function () {
                if (this._isMaskBg) {
                    if (!this._maskBg) {
                        this._maskBg = new Laya.Sprite();
                        this._maskBg.graphics.drawRect(0, 0, h5game.Global.stageUtils.stageW, h5game.Global.stageUtils.stageH, "#000000");
                        this._maskBg.mouseEnabled = true;
                        this._maskBg.alpha = this._nMaskAlpha;
                    }
                }
                return this._maskBg;
            },
            enumerable: true,
            configurable: true
        });
        BaseView.prototype.destroy = function (destroyChild) {
            if (destroyChild === void 0) { destroyChild = true; }
            if (this._maskBg) {
                this._maskBg.graphics.clear();
                this._maskBg.destroy(true);
                this._maskBg = null;
            }
            _super.prototype.destroy.call(this, destroyChild);
        };
        return BaseView;
    }(Laya.View));
    h5game.BaseView = BaseView;
})(h5game || (h5game = {}));
//# sourceMappingURL=BaseView.js.map