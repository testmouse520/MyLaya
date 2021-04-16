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
    var FuncOpenEvent = /** @class */ (function (_super) {
        __extends(FuncOpenEvent, _super);
        function FuncOpenEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 功能初始化 */
        FuncOpenEvent.FUNC_OPEN_INIT = h5game.Global.getGID();
        /** 功能检查 */
        FuncOpenEvent.FUNC_OPEN_CHECK = h5game.Global.getGID();
        /** 功能解锁 */
        FuncOpenEvent.FUNC_OPEN_UNLOCK = h5game.Global.getGID();
        /** 功能关闭 */
        FuncOpenEvent.FUNC_OPEN_CLOSE = h5game.Global.getGID();
        return FuncOpenEvent;
    }(h5game.BaseEvent));
    h5game.FuncOpenEvent = FuncOpenEvent;
})(h5game || (h5game = {}));
//# sourceMappingURL=FuncOpenEvent.js.map