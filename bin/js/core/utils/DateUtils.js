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
    var DateUtils = /** @class */ (function (_super) {
        __extends(DateUtils, _super);
        function DateUtils() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 1 格式化时间获取 00:00:00
         * @param {number} 时间戳差
         */
        DateUtils.prototype.formatTime = function (time) {
            var str = "";
            var h = time / 3600;
            h = parseInt(h + "");
            var m = (time - h * 3600) / 60;
            m = parseInt(m + "");
            var s = time - h * 3600 - m * 60;
            s = parseInt(s + "");
            if (h > 0) {
                str += h + ":";
            }
            if (m > 9) {
                str += m + ":";
            }
            else {
                str += "0" + m + ":";
            }
            if (s > 9) {
                str += s + "";
            }
            else {
                str += "0" + s;
            }
            return str;
        };
        ;
        /**
         * 2 使用时间返回所需要的字符串格式"2016年06月12日"
         * @param {number} 时间戳
         * @param {string} 返回格式 "yyyy年MM月dd日"
         * @return {string} 返回指点格式字符串
         * */
        DateUtils.prototype.millisecondsToDate = function (time, fmt) {
            var d = new Date(time);
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "H+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds() //毫秒
            };
            var week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[d.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        };
        ;
        return DateUtils;
    }(h5game.BaseClass));
    h5game.DateUtils = DateUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=DateUtils.js.map