/**
 *
 */
var game;
(function (game) {
    var ModuleConfig;
    (function (ModuleConfig) {
        /**
         *
         */
        // export const g_bagView = "BagView";
        // ModuleConfig[ModuleConfig[ModuleConfig.g_bagView] = 1] = BagView;
        /**
         * 获取模块视图
         * @param module
         */
        function getModuleView(module) {
            return ModuleConfig[ModuleConfig.getModuleID(module)] || null;
        }
        ModuleConfig.getModuleView = getModuleView;
        /**
         * 获取模块ID
         * @param module
         */
        function getModuleID(module) {
            var id = ModuleConfig[module];
            if (id == null) {
                console.error("模块未注册：" + module);
            }
            return id;
        }
        ModuleConfig.getModuleID = getModuleID;
    })(ModuleConfig = game.ModuleConfig || (game.ModuleConfig = {}));
})(game || (game = {}));
//# sourceMappingURL=ModuleConfig.js.map