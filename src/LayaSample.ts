import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
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

        Laya.init(600, 400, WebGL);
        Laya.DebugTool.init();
    }
}
new GameMain();