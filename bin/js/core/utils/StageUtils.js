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
    var StageUtils = /** @class */ (function (_super) {
        __extends(StageUtils, _super);
        function StageUtils() {
            return _super.call(this) || this;
        }
        /**
         * 初始化舞台
         * @param {boolean} isWebGL
         * @param {boolean} isDebug
         * @param {number} width
         * @param {number} height
         * @param {string} color
         */
        StageUtils.prototype.init = function (isWebGL, isDebug, width, height, color) {
            if (isWebGL === void 0) { isWebGL = true; }
            if (isDebug === void 0) { isDebug = h5game.Global.debugUtils.isDebug; }
            if (width === void 0) { width = 1334; }
            if (height === void 0) { height = 750; }
            if (color === void 0) { color = "#808080"; }
            //游戏舞台初始化渲染方式：WebGL和canvas（默认canvas）
            if (isWebGL) {
                Laya.init(width, height, Laya.WebGL);
            }
            else {
                Laya.init(width, height);
            }
            //debug显示
            isDebug && Laya.Stat.show();
            // isDebug && Laya.DebugTool.init();
            //自动计算计算量较大，对性能有一定影响,默认为false
            Laya.stage.autoSize = false;
            //帧率类型，支持三种模式：fast-60帧(默认)，slow-30帧，mouse-30帧，但鼠标活动后会自动加速到60，鼠标不动2秒后降低为30帧，以节省消耗
            Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
            //游戏舞台区域对齐方式
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            //"none"：不更改屏幕  "horizontal"：自动横屏  "vertical"：自动竖屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            //游戏舞台颜色
            Laya.stage.bgColor = color;
            //适配方式，完美适配(支持版本1.7.5)
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        };
        Object.defineProperty(StageUtils.prototype, "stage", {
            /**
             * get stage
             */
            get: function () {
                return Laya.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtils.prototype, "stageW", {
            /**
             * get stage width
             */
            get: function () {
                return Laya.stage.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtils.prototype, "stageH", {
            /**
             * get stage height
             */
            get: function () {
                return Laya.stage.height;
            },
            enumerable: true,
            configurable: true
        });
        return StageUtils;
    }(h5game.BaseClass));
    h5game.StageUtils = StageUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=StageUtils.js.map