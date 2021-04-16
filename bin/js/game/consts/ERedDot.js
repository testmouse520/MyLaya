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
    var ERedDot = /** @class */ (function (_super) {
        __extends(ERedDot, _super);
        function ERedDot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ERedDot.BAG_ICON = h5game.Global.getGID();
        return ERedDot;
    }(h5game.BaseClass));
    h5game.ERedDot = ERedDot;
})(h5game || (h5game = {}));
//# sourceMappingURL=ERedDot.js.map