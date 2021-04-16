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
    var MainCityController = /** @class */ (function (_super) {
        __extends(MainCityController, _super);
        function MainCityController() {
            return _super.call(this) || this;
        }
        MainCityController.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        return MainCityController;
    }(h5game.BaseController));
    h5game.MainCityController = MainCityController;
})(h5game || (h5game = {}));
//# sourceMappingURL=MainCityController.js.map