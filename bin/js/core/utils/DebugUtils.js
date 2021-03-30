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
    var DebugUtils = /** @class */ (function (_super) {
        __extends(DebugUtils, _super);
        function DebugUtils() {
            var _this = _super.call(this) || this;
            _this._isDebug = true;
            return _this;
        }
        Object.defineProperty(DebugUtils.prototype, "isDebug", {
            get: function () {
                return !!this._isDebug;
            },
            set: function (value) {
                this._isDebug = value;
            },
            enumerable: true,
            configurable: true
        });
        return DebugUtils;
    }(h5game.BaseClass));
    h5game.DebugUtils = DebugUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=DebugUtils.js.map