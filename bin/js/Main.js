var WebGL = Laya.WebGL;
var h5game;
(function (h5game) {
    // 程序入口
    var Main = /** @class */ (function () {
        function Main() {
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
        Main.prototype.init = function () {
            h5game.Global.debugUtils.isDebug = true;
            h5game.Global.stageUtils.init();
            h5game.Global.layerMgr.init();
        };
        Main.prototype.start = function (setings) {
            h5game.Global.layerMgr.openView(h5game.MainCity);
            // FuncOpenController.getInstance().addLocalUnlock(1, Handler.createOnce(this, this.onSS))
            // let obj = {};
            // obj["bg"] = Handler.createPermanent(this, this.onSS);
            // let c = (obj["bg"] as Handler).run();
            // console.log("c = " + c);
            // let c1 = (obj["bg"] as Handler).run();
            // console.log("c1 = " + c1);
        };
        Main.prototype.onSS = function () {
            return false;
        };
        return Main;
    }());
    h5game.Main = Main;
})(h5game || (h5game = {}));
var main = new h5game.Main();
main.start(this["setings"]);
//# sourceMappingURL=Main.js.map