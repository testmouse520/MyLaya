

/**
 * 
 */
module h5game {

    /**
     * 
     */
    export class CommonUtils extends BaseClass {
       
        /**
         * 万字的显示
         * @param {Laya.Label|Laya.Text} label
         * @param {number} num
         */
        labelIsOverLenght(label: Laya.Label | Laya.Text, num: number): void {
            let str = null;
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

        /**
         * int64转number
         * @param {any} obj
         * @return {number}
         */
        int64ToNumber(obj) {
            return parseInt(obj.toString());
        }

        /**
         * 深度复制
         * @param {any} obj
         * @return {any}
         */
        copy(obj) {
            let newObj;
            if (obj instanceof Array) {
                newObj = [];
            }
            else if (obj instanceof Object) {
                newObj = {};
            }
            else {
                return obj;
            }
            let keys = Object.keys(obj);
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                newObj[key] = this.copy(obj[key]);
            }
            return newObj;
        }

        /**
         * 数字转换大写
         * @param {*} value 
         */
        number2Chinese(value: number): string {
            let valueStr: string = value + '';
            let len: number = valueStr.length - 1;
            let idxs: Array<string> = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
            let num: Array<string> = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

            return valueStr.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
                let pos = 0;
                if ($1[0] != '0') {
                    pos = len - idx;
                    if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
                        return idxs[len - idx];
                    }
                    return num[$1[0]] + idxs[len - idx];
                } else {
                    let left = len - idx;
                    let right = len - idx + $1.length;
                    if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                        pos = left - left % 4;
                    }
                    if (pos) {
                        return idxs[pos] + num[$1[0]];
                    } else if (idx + $1.length >= len) {
                        return '';
                    } else {
                        return num[$1[0]]
                    }
                }
            });
        }

        /**
         * 获取本周星期几日期
         * @param {*} num 
         */
        getWeekByNum(num: number, date?: Date): Date {
            var date = date || new Date();
            date.setHours(0, 0, 0, 0)
            date.setDate(date.getDate() + (num - date.getDay()));
            return date;
        }

        private _rollList: { [key: string]: number } = {};

        /**
         * 开始滚动数字效果
         * @param type
         * @param newNumber
         * @param oldNumber
         * @param txt
         */
        startRollNumberEffect(type: string, newNumber: number, oldNumber: number, txt: Laya.Label): void {
            let self = this;
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
            let nDiffNumber = newNumber - oldNumber;
            // 开始时间。
            let startTime = new Date().getTime();
            // 结束时间。
            let stopTime = startTime + 1500; // 一秒钟时间：确保不超过2秒钟。

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
        }
    }
}