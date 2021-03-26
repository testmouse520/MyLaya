/**
 *
 */
var game;
(function (game) {
    /**
     *
     */
    var ModuleManager = /** @class */ (function () {
        function ModuleManager() {
        }
        ModuleManager.prototype.createMenu = function () {
            var menuButton = new game.ModuleButton();
            menuButton.onUpdate();
            return menuButton;
        };
        ModuleManager.getInstance = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        return ModuleManager;
    }());
    game.ModuleManager = ModuleManager;
})(game || (game = {}));
//# sourceMappingURL=ModuleManager.js.map