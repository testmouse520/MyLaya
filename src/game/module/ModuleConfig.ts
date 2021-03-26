

/**
 * 
 */
module game.ModuleConfig {

    /**
     * 
     */
    // export const g_bagView = "BagView";
    // ModuleConfig[ModuleConfig[ModuleConfig.g_bagView] = 1] = BagView;
    
    /**
     * 获取模块视图
     * @param module
     */
    export function getModuleView(module: string): any {
        return ModuleConfig[ModuleConfig.getModuleID(module)] || null;
    }

    /**
     * 获取模块ID
     * @param module
     */
    export function getModuleID(module: string): number {
        let id = ModuleConfig[module];
        if (id == null) {
            console.error("模块未注册：" + module);
        }
        return id;
    }
}