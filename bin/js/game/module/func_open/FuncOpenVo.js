/**
 *
 */
var h5game;
(function (h5game) {
    var FuncOpenVo = /** @class */ (function () {
        function FuncOpenVo(cfg) {
            this._cfg = cfg;
            this.unlock = false;
        }
        Object.defineProperty(FuncOpenVo.prototype, "unlock", {
            get: function () {
                return this._unlock;
            },
            set: function (b) {
                this._unlock = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncOpenVo.prototype, "ID", {
            /** ID */
            get: function () {
                return this._cfg.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncOpenVo.prototype, "limits", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncOpenVo.prototype, "openType", {
            /**
             * 开其类型
             */
            get: function () {
                return h5game.EFuncOpenType.CONDITION_UNLOCK;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FuncOpenVo.prototype, "reallyOpen", {
            /**
             * 真正开启
             *
             * @return boolean
             */
            get: function () {
                return this._unlock;
            },
            enumerable: true,
            configurable: true
        });
        return FuncOpenVo;
    }());
    h5game.FuncOpenVo = FuncOpenVo;
})(h5game || (h5game = {}));
//# sourceMappingURL=FuncOpenVo.js.map