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
            // 是否加载资源
            _this._isLoadRes = false;
            _this._maskBg = null;
            _this.arrayRes = [];
            _this.nMaskAlpha = 0.5;
            _this.isMaskBg = false;
            return _this;
        }
        BaseView.prototype.createView = function (uiView) {
            this._uiView = uiView;
        };
        /**
         * 打开
         */
        BaseView.prototype.onOpen = function () {
            // resize尺寸变化监听事件
            if (this.isMaskBg)
                this.root.addChild(this.maskBg);
            this.root.addChild(this);
            this.closeTime = -1;
            this.onResize();
            h5game.Global.stageUtils.stage.on(Laya.Event.RESIZE, this, this.onResize);
        };
        /**
         * 关闭
         */
        BaseView.prototype.onClose = function () {
            h5game.Global.stageUtils.stage.off(Laya.Event.RESIZE, this, this.onResize);
            this.removeAllEvent();
            this.args = null;
            this.layerName = null;
            this.root = null;
            this.closeTime = Date.now();
            this.removeSelf();
        };
        /**
         * 监听事件
         * @param id
         * @param handler
         */
        BaseView.prototype.addEventListener = function (id, handler) {
            (this._eventArray = this._eventArray || []) && this._eventArray.push(id);
            h5game.Global.evtMgr.addEventListener(id, this, handler);
        };
        /**
         * 注销事件
         * @param id
         */
        BaseView.prototype.removeEventListener = function (id) {
            h5game.Global.evtMgr.removeEventListener(id, this);
        };
        /**
         * 删除所有事件
         */
        BaseView.prototype.removeAllEvent = function () {
            if (this._eventArray && this._eventArray.length) {
                for (var i = 0, len = this._eventArray.length; i < len; i++) {
                    this.removeEventListener(this._eventArray[i]);
                }
            }
            this._eventArray && (this._eventArray.length = 0);
        };
        /**
         * 触发事件
         * @param id
         * @param evt
         */
        BaseView.prototype.dispatch = function (id, evt) {
            h5game.Global.evtMgr.dispatch(id, this, evt);
        };
        Object.defineProperty(BaseView.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (p) {
                this._root = p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "layerName", {
            get: function () {
                return this._layerName;
            },
            set: function (name) {
                this._layerName = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "closeTime", {
            get: function () {
                return this._closeTime;
            },
            set: function (number) {
                this._closeTime = number;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "args", {
            get: function () {
                return this._args;
            },
            set: function (args) {
                this._args = args;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "isLoadRes", {
            /**
             * 是否正在加载
             *
             * @return boolean
             */
            get: function () {
                return this._isLoadRes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "isResComplete", {
            /**
             * 是否资源完成
             *
             * @return boolean
             */
            get: function () {
                if (this.arrayRes && this.arrayRes.length > 0) {
                    for (var i = 0, len = this.arrayRes.length; i < len; i++) {
                        var url = this.arrayRes[i].url;
                        if (Laya.loader.getRes(url) == undefined) {
                            return false;
                        }
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载资源
         */
        BaseView.prototype.loadRes = function () {
            if (this.arrayRes && this.arrayRes.length > 0) {
                this._isLoadRes = true;
                Laya.loader.load(this.arrayRes, h5game.Handler.createOnce(this, this.onLoadComplete), null, Laya.Loader.ATLAS, 1);
            }
            else {
                this.onCreate();
            }
        };
        /**
         * 资源加载完毕
         *
         * @param complete
         */
        BaseView.prototype.onLoadComplete = function (complete) {
            this._isLoadRes = false;
            if (!complete) {
                h5game.Logger.trace("图片资源加载失败!");
            }
            this.onCreate();
        };
        /**
         * 创建界面
         */
        BaseView.prototype.onCreate = function () {
            _super.prototype.createView.call(this, this._uiView);
            this.onOpen();
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
                if (this.isMaskBg) {
                    if (!this._maskBg) {
                        this._maskBg = new Laya.Sprite();
                        this._maskBg.graphics.drawRect(0, 0, h5game.Global.stageUtils.stageW, h5game.Global.stageUtils.stageH, "#000000");
                        this._maskBg.mouseEnabled = true;
                        this._maskBg.alpha = this.nMaskAlpha;
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