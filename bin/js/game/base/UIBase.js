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
    var UIBase = /** @class */ (function (_super) {
        __extends(UIBase, _super);
        function UIBase() {
            return _super.call(this) || this;
        }
        UIBase.prototype.createView = function (uiView) {
            _super.prototype.createView.call(this, uiView);
        };
        UIBase.prototype.onOpen = function () {
        };
        UIBase.prototype.onClose = function () {
        };
        return UIBase;
    }(Laya.View));
    h5game.UIBase = UIBase;
})(h5game || (h5game = {}));
//# sourceMappingURL=UIBase.js.map