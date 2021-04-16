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

        init(): void {
            Global.debugUtils.isDebug = true;
            Global.stageUtils.init();
            Global.layerMgr.init();
        }

        start(setings: any): void {
            Global.layerMgr.openView(MainCity);

            // FuncOpenController.getInstance().addLocalUnlock(1, Handler.createOnce(this, this.onSS))
            // let obj = {};
            // obj["bg"] = Handler.createPermanent(this, this.onSS);

            // let c = (obj["bg"] as Handler).run();
            // console.log("c = " + c);
            // let c1 = (obj["bg"] as Handler).run();
            // console.log("c1 = " + c1);

        }

        onSS() {
            return false;
        }
    }
}

let main = new h5game.Main();
main.start(this["setings"]);