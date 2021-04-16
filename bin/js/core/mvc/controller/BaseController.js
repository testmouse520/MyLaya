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
    var BaseController = /** @class */ (function (_super) {
        __extends(BaseController, _super);
        function BaseController() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        BaseController.prototype.init = function () {
        };
        BaseController.prototype.addEventListener = function (id, handler) {
            h5game.Global.evtMgr.addEventListener(id, this, handler);
        };
        BaseController.prototype.dispatch = function (id, evt) {
            h5game.Global.evtMgr.dispatch(id, this, evt);
        };
        return BaseController;
    }(h5game.BaseClass));
    h5game.BaseController = BaseController;
})(h5game || (h5game = {}));
//# sourceMappingURL=BaseController.js.map