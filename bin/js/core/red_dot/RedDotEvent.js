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
    var RedDotEvent = /** @class */ (function (_super) {
        __extends(RedDotEvent, _super);
        function RedDotEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 改变 */
        RedDotEvent.CHANGED = h5game.Global.getGID();
        /** 重置 */
        RedDotEvent.RESET = h5game.Global.getGID();
        return RedDotEvent;
    }(h5game.BaseEvent));
    h5game.RedDotEvent = RedDotEvent;
})(h5game || (h5game = {}));
//# sourceMappingURL=RedDotEvent.js.map