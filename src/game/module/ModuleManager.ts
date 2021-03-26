
/**
 * 
 */
module game {


    /**
     * 
     */
    export class ModuleManager {

        createMenu(): Laya.Node {
            let menuButton: ModuleButton = new ModuleButton();
            menuButton.onUpdate();

            return menuButton;
        }

        public static getInstance(): ModuleManager {
            let Class: any = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        }
    }
}