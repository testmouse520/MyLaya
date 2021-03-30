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
    var ArrayUtils = /** @class */ (function (_super) {
        __extends(ArrayUtils, _super);
        function ArrayUtils() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 遍历操作，目前浏览器基本上支持es6 数组自带forEach方法
         * @param {Array} arr
         * @param {Function} callback
         * @param {any} thisObj
         */
        ArrayUtils.prototype.forEach = function (arr, callback, thisObj) {
            for (var i = 0, len = arr.length; i < len; i++) {
                callback.apply(thisObj, [arr[i], i]);
            }
        };
        /**
         * 打乱数组中的元素
         * @param {Array} arr
         */
        ArrayUtils.prototype.upset = function (arr) {
            var len = arr.length;
            var index;
            var tmp;
            for (var i = len - 1; i >= 0; i--) {
                index = (Math.random() * i) | 0;
                tmp = arr[i];
                arr[i] = arr[index];
                arr[index] = tmp;
            }
        };
        return ArrayUtils;
    }(h5game.BaseClass));
    h5game.ArrayUtils = ArrayUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=ArrayUtils.js.map