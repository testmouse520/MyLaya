/**
 *
 */
var h5game;
(function (h5game) {
    /**
     *
     */
    var Global = /** @class */ (function () {
        function Global() {
        }
        Object.defineProperty(Global, "ClassManager", {
            /**
             * 生成获取类
             */
            get: function () {
                return h5game.ClassManager.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "evtMgr", {
            /**
             * 事件触发
             */
            get: function () {
                return h5game.BaseEventDispatcher.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "redDotMgr", {
            /**
             * 红点模块
             */
            get: function () {
                return h5game.RedDotMgr.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "commonUtils", {
            /**
             * 单例获取其他工具类
             */
            get: function () {
                return h5game.CommonUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "dateUtils", {
            /**
             * 单例获取时间工具类
             */
            get: function () {
                return h5game.DateUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "arrayUtils", {
            /**
             * 单例获取数组工具类
             */
            get: function () {
                return h5game.ArrayUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "randomUtils", {
            /**
             * 单例获取随机工具类
             */
            get: function () {
                return h5game.RandomUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "debugUtils", {
            /**
             * 单例获取调试工具类
             */
            get: function () {
                return h5game.DebugUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "stringUtils", {
            /**
             * 单例获取字符串工具类
             */
            get: function () {
                return h5game.StringUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "md5", {
            /**
             * 单例获取md5加密工具类
             */
            get: function () {
                return h5game.MD5.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "sha1", {
            /**
             * 单例获取sha1加密工具类
             */
            get: function () {
                return h5game.SHA1.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "stageUtils", {
            /**
             * 单例获取舞台工具类（包含：舞台初始化、舞台宽高获取等）
             */
            get: function () {
                return h5game.StageUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "handler", {
            get: function () {
                return h5game.BaseHandler;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 全局唯一值生成器：每次调用的值都不一样。
         */
        Global.getGID = function () {
            return (Global._gid++).toString();
        };
        Global.assert = function (expr) {
            if (Global.debugUtils.isDebug && !expr) {
                throw new Error("ASSERT FAILED");
            }
        };
        Global._gid = 10000;
        return Global;
    }());
    h5game.Global = Global;
})(h5game || (h5game = {}));
//# sourceMappingURL=Global.js.map