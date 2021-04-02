module h5game {

    export class StringUtils extends BaseClass {

        constructor() {
            super();
        }

        /**
         * 去掉前后空格
         * @param {string} str
         * @returns {string}
         */
        trimSpace(str: string): string {
            return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
        }

        /**
         * 获取字符串长度，中文为2
         * @param {string} str
         * @returns {number}
         */
        getLength(str: string): number {
            let strArr = str.split("");
            let length = 0;
            for (let i = 0; i < strArr.length; i++) {
                let s = strArr[i];
                if (this.isChinese(s)) {
                    length += 2;
                }
                else {
                    length += 1;
                }
            }
            return length;
        }

        /**
         * 判断一个字符串是否包含中文
         * @param {string} str
         * @returns {boolean}
         */
        isChinese(str: string): boolean {
            let reg = /^.*[\u4E00-\u9FA5]+.*$/;
            return reg.test(str);
        }

        /**
         * 将字符串（emoji表情）转换成16进制，Unicode编码存储是4个字节，两个2个字节组合
         *
         * @param {string} str
         */
        stringToCode16(str: string) {
            const len = str.length;
            let codes = '';
            for (let i = 0; i < len; i++) {
                let code = str.charCodeAt(i).toString(16);
                codes += ';' + code;
            }
            return codes;
        }

        /**
         * 字节码，转换成unicode显示
         *
         * @param {string} str
         */
        code16ToString(str: string) {
            let uCodeStr = '';
            const strArr = str.split(';');
            for (let i = 0, len = strArr.length; i < len; i++) {
                let code = strArr[i];
                // ASCII补充高位
                let fillNum = 0;
                if (code.length < 4) {
                    fillNum = 4 - code.length;
                }
                for (let k = 0; k < fillNum; k++) {
                    code = '0' + code;
                }
                uCodeStr += '\\u' + code;
            }
            return uCodeStr;
        }

        /**
         * 指定截取字符长度，返回截取后的显示字符
         *
         * @param {string} str
         * @param {number} cutNum
         * @returns {string}
         */
        cutOutStr(str, cutNum) {
            const reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            let len = 0;
            let index = 0;
            for (let i = 0; i < str.length; i++) {
                const code = str.charCodeAt(i).toString(16);
                let oldLen = len;
                let oldIndex = index;
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

            let retStr = str.substr(0, index);
            if (index < str.length) {
                retStr = retStr + '...';
            }

            return retStr;
        }

        /**
         * 字符串格式化
         * @param str 
         * @param params 
         * @returns 
         */
        stringFormat(str: string, ...params: any[]): string {
            if (params.length == 0)
                return null;
            for (var i = 0; i < params.length; i++) {
                var re = new RegExp('\\{' + i + '\\}', 'gm');
                str = str.replace(re, params[i]);
            }
            return str;
        }
    }
}