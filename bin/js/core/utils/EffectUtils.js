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
var h5game;
(function (h5game) {
    var EffectUtils = /** @class */ (function (_super) {
        __extends(EffectUtils, _super);
        function EffectUtils() {
            return _super.call(this) || this;
        }
        /**
         * 类似mac上图标上下抖动的效果
         * @param {Sprite} obj 抖动对象
         * @param {number} initY 要抖动的对象的初始Y值，原始位置
         * @param {Function} callback 抖动动画完成回调函数
         * @param {any} thisObj 回调函数this对象
         */
        EffectUtils.prototype.macIconShake = function (obj, initY, callback, thisObj) {
            //抖动频率[时间，移动距离]，可修改
            var arr = [
                [20, 300],
                [15, 300],
                [10, 300],
                [5, 300]
            ];
            var index = 0;
            toShake();
            function toShake() {
                if (index >= arr.length) {
                    (callback) && (callback.apply(thisObj, []));
                }
                else {
                    Laya.Tween.to(obj, { "y": initY - arr[index][0] }, arr[index][1], null, Laya.Handler.create(null, function () {
                        Laya.Tween.to(obj, { "y": initY }, arr[index][1], null, Laya.Handler.create(null, function () {
                            ++index;
                            toShake();
                        }));
                    }));
                }
            }
        };
        /**
         * 向上移动淡出（弹出框）
         * @param {Sprite} obj 淡出对象
         * @param {number} time 淡出时间
         * @param {Function} ease 淡出函数
         * @param {Function} callback 淡出完成回调函数
         * @param {any} thisObj 回调函数this对象
         * @param {Array} arrData 回调传参
         */
        EffectUtils.prototype.flowOut = function (obj, time, ease, callback, thisObj, arrData) {
            if (time === void 0) { time = 500; }
            if (ease === void 0) { ease = null; }
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (arrData === void 0) { arrData = null; }
            if (callback) {
                Laya.Tween.to(obj, { y: obj.y - 150, alpha: 0 }, time, ease, Laya.Handler.create(thisObj, callback, arrData));
            }
            else {
                Laya.Tween.to(obj, { y: obj.y - 150, alpha: 0 }, time, ease, Laya.Handler.create(obj, obj.removeSelf, arrData));
            }
        };
        /**
         * 文本数字增减效果
         * @param {number} startNum 开始数值
         * @param {number} endNum 渐变到的数值
         * @param {Function} callback 淡出完成回调函数
         * @param {any} thisObj 回调函数this对象
         */
        EffectUtils.prototype.flowNum = function (startNum, endNum, callback, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var change = Math.abs(endNum - startNum);
            if (change <= 0)
                return;
            var everyChange = change / (endNum - startNum);
            var currNum = startNum;
            var timer = new Laya.Timer();
            timer.loop(30, this, changeFun);
            function changeFun() {
                currNum += everyChange;
                --change;
                if (change < 0) {
                    timer.clearAll(this);
                    timer = null;
                }
                else {
                    callback && callback.apply(thisObj, [currNum]);
                }
            }
        };
        /**
         * 开始闪烁
         * @param {Sprite} obj
         * @param {number} alphaTime 闪烁频率
         */
        EffectUtils.prototype.startFlicker = function (obj, alphaTime) {
            if (alphaTime === void 0) { alphaTime = 700; }
            obj.alpha = 1;
            Laya.Tween.to(obj, { "alpha": 0 }, alphaTime, null, Laya.Handler.create(null, function () {
                Laya.Tween.to(obj, { "alpha": 1 }, alphaTime, null, Laya.Handler.create(this, this.startFlicker, [obj]));
            }.bind(this)));
        };
        /**
         * 停止动画所有动画后容器位置初始化到原位，否则可能出现位置改变的bug
         * @param {Sprite} obj
         * @param {number} xPos
         * @param {number} yPos
         */
        EffectUtils.prototype.stopEffect = function (obj, xPos, yPos) {
            if (xPos === void 0) { xPos = null; }
            if (yPos === void 0) { yPos = null; }
            Laya.Tween.clearAll(obj);
            if (xPos !== null && yPos !== null) {
                obj.pos(xPos, yPos);
            }
        };
        /**
         * 点击放大缩小效果
         * @param {Laya.Sprite}
         * @param {boolean} isChangeXY 如果中心点是锚点不需要修改位置
         */
        EffectUtils.prototype.clickEffect = function (sp, isChangeXY) {
            if (isChangeXY === void 0) { isChangeXY = true; }
            if (!sp)
                return;
            sp.off(Laya.Event.MOUSE_DOWN, this, this.cubicInOutEffect);
            sp.on(Laya.Event.MOUSE_DOWN, this, this.cubicInOutEffect, [sp, isChangeXY]);
        };
        EffectUtils.prototype.clearClickEffect = function (sp) {
            if (!sp)
                return;
            sp.off(Laya.Event.MOUSE_DOWN, this, this.cubicInOutEffect);
        };
        EffectUtils.prototype.cubicInOutEffect = function (sp, isChangeXY) {
            var _this = this;
            if (sp._aniButtonEffect)
                return;
            sp._aniButtonEffect = true;
            var _x = sp.x;
            var _y = sp.y;
            var _scaX = sp.scaleX;
            var _scaY = sp.scaleY;
            var _bigX, _bigY;
            if (!isChangeXY) {
                _bigX = _x - ((sp.width * 0.1) >> 1);
                _bigY = _y - ((sp.height * 0.1) >> 1);
            }
            else {
                _bigX = _x;
                _bigY = _y;
            }
            Laya.Tween.to(sp, { x: _bigX, y: _bigY, scaleX: 1.1 * _scaX, scaleY: 1.1 * _scaY }, 100, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(sp, { x: _x, y: _y, scaleX: _scaX, scaleY: _scaY }, 100, null, Laya.Handler.create(_this, function () {
                    if (!sp.destroyed) {
                        sp._aniButtonEffect = false;
                    }
                }));
            }));
        };
        return EffectUtils;
    }(h5game.BaseClass));
    h5game.EffectUtils = EffectUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=EffectUtils.js.map