var h5game;
(function (h5game) {
    /**
     *
     */
    var BaseClass = /** @class */ (function () {
        function BaseClass() {
        }
        /**
         * 获取单例
         */
        BaseClass.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var Class = this;
            if (!Class._instance) {
                var argsLen = args.length;
                if (argsLen == 0) {
                    Class._instance = new Class();
                }
                else if (argsLen == 1) {
                    Class._instance = new Class(args[0]);
                }
                else if (argsLen == 2) {
                    Class._instance = new Class(args[0], args[1]);
                }
                else if (argsLen == 3) {
                    Class._instance = new Class(args[0], args[1], args[2]);
                }
                else if (argsLen == 4) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3]);
                }
                else if (argsLen == 5) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3], args[4]);
                }
                else if (argsLen == 6) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3], args[4], args[5]);
                }
            }
            return Class._instance;
        };
        return BaseClass;
    }());
    h5game.BaseClass = BaseClass;
})(h5game || (h5game = {}));
//# sourceMappingURL=BaseClass.js.map