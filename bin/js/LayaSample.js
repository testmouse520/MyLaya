var WebGL = Laya.WebGL;
var h5game;
(function (h5game) {
    // 程序入口
    var GameMain = /** @class */ (function () {
        function GameMain() {
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
            Laya.init(600, 400, WebGL);
            // Laya.DebugTool.init();
        }
        return GameMain;
    }());
    h5game.GameMain = GameMain;
    function assert(expr) {
        if ( /** Conf.DEBUG && */!expr) {
            throw new Error("ASSERT FAILED");
        }
    }
    h5game.assert = assert;
})(h5game || (h5game = {}));
new h5game.GameMain();
//# sourceMappingURL=LayaSample.js.map