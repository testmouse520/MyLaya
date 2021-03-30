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
    var RandomUtils = /** @class */ (function (_super) {
        __extends(RandomUtils, _super);
        function RandomUtils() {
            return _super.call(this) || this;
        }
        /**
         * 获取一个区间的随机数 (from, end)
         * @param {number} from 最小值
         * @param {number} end 最大值
         * @returns {number}
         */
        RandomUtils.prototype.limit = function (from, end) {
            var min = Math.min(from, end);
            var max = Math.max(from, end);
            var range = max - min;
            return min + Math.random() * range;
        };
        /**
         * 在一个数组中随机获取一个元素
         * @param {Array} arr 数组
         * @returns 随机出来的结果
         */
        RandomUtils.prototype.randomArray = function (arr) {
            var index = (Math.random() * arr.length) | 0;
            return arr[index];
        };
        return RandomUtils;
    }(h5game.BaseClass));
    h5game.RandomUtils = RandomUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=RandomUtils.js.map