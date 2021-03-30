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
var h5game;
(function (h5game) {
    /**
     *
     */
    var RedDotVo = /** @class */ (function (_super) {
        __extends(RedDotVo, _super);
        function RedDotVo() {
            var _this = _super.call(this) || this;
            _this._bShowValue = false;
            _this._nKey = -1;
            return _this;
        }
        RedDotVo.prototype.createView = function (uiView) {
            _super.prototype.createView.call(this, uiView);
            this.visible = this.ui_labelNumber.visible = false;
        };
        RedDotVo.prototype.setShowValue = function (showValue) {
            this._bShowValue = showValue;
            this.ui_labelNumber.visible = this._bShowValue;
        };
        RedDotVo.prototype.registerRedDot = function (key, showValue) {
            this.setShowValue(showValue);
            this._nKey = key;
            h5game.Global.evtMgr.addEventListener(h5game.RedDotEvent.CHANGED, this, h5game.Global.handler.createPermanent(this, this.onGameRedDot));
        };
        RedDotVo.prototype.unregisterRedDot = function () {
            h5game.Global.evtMgr.removeEventListener(h5game.RedDotEvent.CHANGED, this);
        };
        RedDotVo.prototype.onGameRedDot = function (obj) {
            if (obj.key == this._nKey) {
                var value = h5game.Global.redDotMgr.getRedDotValue(this._nKey);
                this.ui_labelNumber.text = String(value);
                this.visible = (value > 0);
            }
        };
        return RedDotVo;
    }(ui.common.RedDotUI));
    h5game.RedDotVo = RedDotVo;
})(h5game || (h5game = {}));
//# sourceMappingURL=RedDotVo.js.map