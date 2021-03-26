/**
 *
 */
var game;
(function (game) {
    /**
     *
     */
    var ModuleVo = /** @class */ (function () {
        function ModuleVo() {
            /** 本地开启 */
            this._localOpen = true;
            /** 图片开启 */
            this._iconOpen = false;
        }
        Object.defineProperty(ModuleVo.prototype, "isShowFlyIcon", {
            /**
             * 是否飞图标
             */
            get: function () {
                return this.hasOpen && this._iconOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModuleVo.prototype, "hasOpen", {
            /**
             * 是否开启
             */
            get: function () {
                return this._configOpen && this._localOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModuleVo.prototype, "group", {
            /**
             * 组
             */
            get: function () {
                return this._group;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModuleVo.prototype, "sort", {
            /**
             * 顺序
             */
            get: function () {
                return this._sort;
            },
            enumerable: true,
            configurable: true
        });
        return ModuleVo;
    }());
    game.ModuleVo = ModuleVo;
})(game || (game = {}));
//# sourceMappingURL=ModuleVo.js.map