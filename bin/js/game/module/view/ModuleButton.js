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
var game;
(function (game) {
    /**
     *
     */
    var ModuleButton = /** @class */ (function (_super) {
        __extends(ModuleButton, _super);
        function ModuleButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModuleButton.prototype.onUpdate = function () {
        };
        return ModuleButton;
    }(Laya.Button));
    game.ModuleButton = ModuleButton;
})(game || (game = {}));
//# sourceMappingURL=ModuleButton.js.map