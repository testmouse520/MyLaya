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
    var StringUtils = /** @class */ (function (_super) {
        __extends(StringUtils, _super);
        function StringUtils() {
            return _super.call(this) || this;
        }
        /**
         * 去掉前后空格
         * @param {string} str
         * @returns {string}
         */
        StringUtils.prototype.trimSpace = function (str) {
            return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
        };
        /**
         * 获取字符串长度，中文为2
         * @param {string} str
         * @returns {number}
         */
        StringUtils.prototype.getLength = function (str) {
            var strArr = str.split("");
            var length = 0;
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i];
                if (this.isChinese(s)) {
                    length += 2;
                }
                else {
                    length += 1;
                }
            }
            return length;
        };
        /**
         * 判断一个字符串是否包含中文
         * @param {string} str
         * @returns {boolean}
         */
        StringUtils.prototype.isChinese = function (str) {
            var reg = /^.*[\u4E00-\u9FA5]+.*$/;
            return reg.test(str);
        };
        /**
         * 将字符串（emoji表情）转换成16进制，Unicode编码存储是4个字节，两个2个字节组合
         *
         * @param {string} str
         */
        StringUtils.prototype.stringToCode16 = function (str) {
            var len = str.length;
            var codes = '';
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i).toString(16);
                codes += ';' + code;
            }
            return codes;
        };
        /**
         * 字节码，转换成unicode显示
         *
         * @param {string} str
         */
        StringUtils.prototype.code16ToString = function (str) {
            var uCodeStr = '';
            var strArr = str.split(';');
            for (var i = 0, len = strArr.length; i < len; i++) {
                var code = strArr[i];
                // ASCII补充高位
                var fillNum = 0;
                if (code.length < 4) {
                    fillNum = 4 - code.length;
                }
                for (var k = 0; k < fillNum; k++) {
                    code = '0' + code;
                }
                uCodeStr += '\\u' + code;
            }
            return uCodeStr;
        };
        /**
         * 指定截取字符长度，返回截取后的显示字符
         *
         * @param {string} str
         * @param {number} cutNum
         * @returns {string}
         */
        StringUtils.prototype.cutOutStr = function (str, cutNum) {
            var reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            var len = 0;
            var index = 0;
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i).toString(16);
                var oldLen = len;
                var oldIndex = index;
                // 计算长度和当前字符串下标
                if (code.length > 2) {
                    len += 2;
                }
                else {
                    len += 1;
                }
                ++index;
                // 判断emoji表情，一个emoji表现显示空间当做2个（实际是4个字符）
                if (reg.test(str.substr(i, 2))) {
                    ++i;
                    ++index;
                }
                // 和截取长度判断
                if (len > cutNum) {
                    index = oldIndex;
                    len = oldLen;
                    break;
                }
                else if (len == cutNum) {
                    break;
                }
            }
            var retStr = str.substr(0, index);
            if (index < str.length) {
                retStr = retStr + '...';
            }
            return retStr;
        };
        return StringUtils;
    }(h5game.BaseClass));
    h5game.StringUtils = StringUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=StringUtils.js.map