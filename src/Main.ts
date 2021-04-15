import WebGL = Laya.WebGL;


module h5game {

    // 程序入口
    export class Main {

        constructor() {
            // Laya.HWMiniAdapter.init();
            // Laya.TTMiniAdapter.init();
            // Laya.BLMiniAdapter.init();
            // Laya.ALIMiniAdapter.init();
            // Laya.VVMiniAdapter.init();
            // Laya.QGMiniAdapter.init();
            // Laya.KGMiniAdapter.init();
            // Laya.BMiniAdapter.init();
            // Laya.QQMiniAdapter.init();
            // Laya.MiniAdpter.init();

            // Laya.init(600, 400, WebGL);
            this.init();
        }

        init() {
            Global.debugUtils.isDebug = true;
            Global.stageUtils.init();
            Global.layerMgr.init();
            // //注册场景
            // App.SceneManager.register(SceneConst.HOME, new HomeScene());
        }

        start() {
            // App.SceneManager.runScene(SceneConst.HOME);
            console.log("11111111111111")
            // Global.stageUtils.stage.addChild(new MainCity());
            Global.layerMgr.openView(MainCity);
        }
    }
}

let main = new h5game.Main();
main.start();