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
    var BaseHandler = /** @class */ (function (_super) {
        __extends(BaseHandler, _super);
        function BaseHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseHandler.createOnce = function (caller, method, args) {
            return Laya.Handler.create(caller, method, args, true);
        };
        BaseHandler.createPermanent = function (caller, method, args) {
            return Laya.Handler.create(caller, method, args, false);
        };
        return BaseHandler;
    }(Laya.Handler));
    h5game.BaseHandler = BaseHandler;
})(h5game || (h5game = {}));
//# sourceMappingURL=BaseHandler.js.map