/**
 *
 */
var h5game;
(function (h5game) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**
         * 全局唯一值生成器：每次调用的值都不一样。
         */
        Utils.getGID = function () {
            return (Utils._gid++).toString();
        };
        /**
         * 字符串格式化
         * @param str
         * @param params
         * @returns
         */
        Utils.stringFormat = function (str) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (params.length == 0)
                return null;
            for (var i = 0; i < params.length; i++) {
                var re = new RegExp('\\{' + i + '\\}', 'gm');
                str = str.replace(re, params[i]);
            }
            return str;
        };
        /**
         * 格式化时间
         * @param {*} date
         * @param {*} format
         */
        Utils.formatDate = function (date, format) {
            var o = {
                // 月 
                "M+": date.getMonth() + 1,
                // 日 
                "d+": date.getDate(),
                // 时 
                "H+": date.getHours(),
                // 分 
                "m+": date.getMinutes(),
                // 秒 
                "s+": date.getSeconds(),
                // 季度 
                "q+": Math.floor((date.getMonth() + 3) / 3),
                // 毫秒 
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        };
        /**
         * 角度转弧度。
         * @param   angle 角度值。
         * @return  返回弧度值。
         */
        Utils.toRadian = function (angle) {
            return angle * Math.PI / 180;
        };
        /**
         * 弧度转换为角度。
         * @param   radian 弧度值。
         * @return  返回角度值。
         */
        Utils.toAngle = function (radian) {
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
        Utils.getRotation = function (x0, y0, x1, y1) {
            return Math.atan2(y1 - y0, x1 - x0) / Math.PI * 180;
        };
        /**
         * 两点间距离
         * @param {*} x0
         * @param {*} y0
         * @param {*} x1
         * @param {*} y1
         */
        Utils.calcDist = function (x0, y0, x1, y1) {
            return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
        };
        /**
         * 数字转换大写
         * @param {*} value
         */
        Utils.number2Chinese = function (value) {
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
        Utils.getWeekByNum = function (num) {
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + (num - date.getDay()));
            return date;
        };
        /**
         * 开始滚动数字效果
         *
         * @param p_type
         * @param p_nNumber
         * @param p_nOldNumber
         * @param p_labelNode
         */
        Utils.startRollNumberEffect = function (p_type, p_nNumber, p_nOldNumber, p_labelNode) {
            var nDiffNumber = 0; // 数字差。
            var nOldNumber; // 原来的数字。
            var nNewNumber; // 现在要变更的数字。
            var startTime; // 开始时间。
            var stopTime; // 结束时间。
            // 先停止旧的：
            // 上次滚动效果没结束，直接停止，设置最新值。
            if (Utils.rollList[p_type]) {
                clearInterval(Utils.rollList[p_type]);
                Utils.rollList[p_type] = null;
            }
            // 值没有变化或者节点不存在
            if (p_nNumber == p_nOldNumber || !p_labelNode) {
                return;
            }
            nNewNumber = p_nNumber;
            nOldNumber = p_nOldNumber;
            nDiffNumber = nNewNumber - nOldNumber;
            startTime = new Date().getTime();
            stopTime = startTime + 1500; // 一秒钟时间：确保不超过2秒钟。
            Utils.rollList[p_type] = setInterval(function () {
                nOldNumber += nDiffNumber / 100;
                p_labelNode.text = Math.floor(nOldNumber);
                // 条件满足时，停止效果：
                if (nNewNumber >= nOldNumber && nDiffNumber < 0 || nNewNumber <= nOldNumber && nDiffNumber > 0 || stopTime < new Date().getTime()) {
                    p_labelNode.text = nNewNumber;
                    clearInterval(Utils.rollList[p_type]);
                    Utils.rollList[p_type] = null;
                }
            }, 10);
        };
        Utils._gid = 10000;
        Utils.rollList = [];
        return Utils;
    }());
    h5game.Utils = Utils;
})(h5game || (h5game = {}));
//# sourceMappingURL=Utils.js.map