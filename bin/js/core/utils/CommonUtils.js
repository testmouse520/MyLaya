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
    var CommonUtils = /** @class */ (function (_super) {
        __extends(CommonUtils, _super);
        function CommonUtils() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rollList = {};
            return _this;
        }
        /**
         * 万字的显示
         * @param {Laya.Label|Laya.Text} label
         * @param {number} num
         */
        CommonUtils.prototype.labelIsOverLenght = function (label, num) {
            var str = null;
            if (num < 10000) {
                str = num + "";
            }
            else if (num < 10000 * 1000) {
                str = Math.floor(num / 10000).toString() + "万";
            }
            else {
                str = Math.floor(num / 10000000).toString() + "千万";
            }
            label.text = str;
        };
        ;
        /**
         * int64转number
         * @param {any} obj
         * @return {number}
         */
        CommonUtils.prototype.int64ToNumber = function (obj) {
            return parseInt(obj.toString());
        };
        /**
         * 深度复制
         * @param {any} obj
         * @return {any}
         */
        CommonUtils.prototype.copy = function (obj) {
            var newObj;
            if (obj instanceof Array) {
                newObj = [];
            }
            else if (obj instanceof Object) {
                newObj = {};
            }
            else {
                return obj;
            }
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                newObj[key] = this.copy(obj[key]);
            }
            return newObj;
        };
        /**
         * 数字转换大写
         * @param {*} value
         */
        CommonUtils.prototype.number2Chinese = function (value) {
            var valueStr = value + '';
            var len = valueStr.length - 1;
            var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
            var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            return valueStr.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
                var pos = 0;
                if ($1[0] != '0') {
                    pos = len - idx;
                    if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
                        return idxs[len - idx];
                    }
                    return num[$1[0]] + idxs[len - idx];
                }
                else {
                    var left = len - idx;
                    var right = len - idx + $1.length;
                    if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                        pos = left - left % 4;
                    }
                    if (pos) {
                        return idxs[pos] + num[$1[0]];
                    }
                    else if (idx + $1.length >= len) {
                        return '';
                    }
                    else {
                        return num[$1[0]];
                    }
                }
            });
        };
        /**
         * 获取本周星期几日期
         * @param {*} num
         */
        CommonUtils.prototype.getWeekByNum = function (num, date) {
            var date = date || new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + (num - date.getDay()));
            return date;
        };
        /**
         * 开始滚动数字效果
         * @param type
         * @param newNumber
         * @param oldNumber
         * @param txt
         */
        CommonUtils.prototype.startRollNumberEffect = function (type, newNumber, oldNumber, txt) {
            var self = this;
            // 先停止旧的：
            // 上次滚动效果没结束，直接停止，设置最新值。
            if (self._rollList[type]) {
                clearInterval(self._rollList[type]);
                self._rollList[type] = null;
            }
            // 值没有变化或者节点不存在
            if (newNumber == oldNumber || !txt) {
                return;
            }
            // 数字差。
            var nDiffNumber = newNumber - oldNumber;
            // 开始时间。
            var startTime = new Date().getTime();
            // 结束时间。
            var stopTime = startTime + 1500; // 一秒钟时间：确保不超过2秒钟。
            self._rollList[type] = setInterval(function () {
                oldNumber += nDiffNumber / 100;
                txt.text = '' + Math.floor(oldNumber);
                // 条件满足时，停止效果：
                if (newNumber >= oldNumber && nDiffNumber < 0 || newNumber <= oldNumber && nDiffNumber > 0 || stopTime < new Date().getTime()) {
                    txt.text = '' + newNumber;
                    clearInterval(self._rollList[type]);
                    self._rollList[type] = null;
                }
            }, 10);
        };
        return CommonUtils;
    }(h5game.BaseClass));
    h5game.CommonUtils = CommonUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=CommonUtils.js.map