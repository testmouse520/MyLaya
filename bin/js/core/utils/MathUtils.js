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
    var MathUtils = /** @class */ (function (_super) {
        __extends(MathUtils, _super);
        function MathUtils() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 角度转弧度。
         * @param   angle 角度值。
         * @return  返回弧度值。
         */
        MathUtils.prototype.toRadian = function (angle) {
            return angle * Math.PI / 180;
        };
        /**
         * 弧度转换为角度。
         * @param   radian 弧度值。
         * @return  返回角度值。
         */
        MathUtils.prototype.toAngle = function (radian) {
            return radian * 180 / Math.PI;
        };
        /**
         * 获取指定的两个点组成的线段的弧度值。
        * @param   x0 点一的 X 轴坐标值。
        * @param   y0 点一的 Y 轴坐标值。
        * @param   x1 点二的 X 轴坐标值。
        * @param   y1 点二的 Y 轴坐标值。
        * @return 弧度值。
        */
        MathUtils.prototype.getRotation = function (x0, y0, x1, y1) {
            return Math.atan2(y1 - y0, x1 - x0) / Math.PI * 180;
        };
        /**
         * 两点间距离
         * @param {*} x0
         * @param {*} y0
         * @param {*} x1
         * @param {*} y1
         */
        MathUtils.prototype.calcDist = function (x0, y0, x1, y1) {
            return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
        };
        return MathUtils;
    }(h5game.BaseClass));
    h5game.MathUtils = MathUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=MathUtils.js.map