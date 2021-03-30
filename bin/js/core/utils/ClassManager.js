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
    var ClassManager = /** @class */ (function (_super) {
        __extends(ClassManager, _super);
        function ClassManager() {
            var _this = _super.call(this) || this;
            //所有缓存类数组
            _this._cache = null;
            return _this;
        }
        /**
         * 触发本模块消息
         * @param {any} Class 唯一标识
         * @param ...param:any[]
         */
        ClassManager.prototype.getClass = function (Class) {
            if (!this._cache) {
                this._cache = [];
            }
            for (var i in this._cache) {
                if (this._cache[i] instanceof Class) {
                    return this._cache[i];
                }
            }
            var _cla = this._getClass(arguments);
            this._cache.push(_cla);
            return _cla;
        };
        /**
         * 删除指定类单例
         * @param {any} Class
         */
        ClassManager.prototype.clear = function (Class) {
            if (!this._cache) {
                return;
            }
            for (var i in this._cache) {
                if (this._cache[i] instanceof Class) {
                    this._cache.splice(parseInt(i + ""), 1);
                    break;
                }
            }
        };
        ClassManager.prototype.clearAll = function () {
            this._cache = null;
        };
        /**
         * 获取类实类对象，传入类实参
         * @param {Array} args ...args
         */
        ClassManager.prototype._getClass = function (args) {
            var params = [];
            for (var i = 1; i < args.length; i++) {
                params[i - 1] = args[i];
            }
            var len = params.length;
            var Class = args[0];
            var _cla = null;
            switch (len) {
                case 0:
                    _cla = new Class();
                    break;
                case 1:
                    _cla = new Class(params[0]);
                    break;
                case 2:
                    _cla = new Class(params[0], params[1]);
                    break;
                case 3:
                    _cla = new Class(params[0], params[1], params[2]);
                    break;
                case 4:
                    _cla = new Class(params[0], params[1], params[2], params[3]);
                    break;
                case 5:
                    _cla = new Class(params[0], params[1], params[2], params[3], params[4]);
                    break;
                case 6:
                    _cla = new Class(params[0], params[1], params[2], params[3], params[4], params[5]);
                    break;
            }
            return _cla;
        };
        return ClassManager;
    }(h5game.BaseClass));
    h5game.ClassManager = ClassManager;
})(h5game || (h5game = {}));
//# sourceMappingURL=ClassManager.js.map