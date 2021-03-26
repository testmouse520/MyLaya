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
    var EventModule = /** @class */ (function (_super) {
        __extends(EventModule, _super);
        function EventModule() {
            var _this = _super.call(this) || this;
            _this._dictEvtForm = {};
            return _this;
        }
        Object.defineProperty(EventModule, "instance", {
            get: function () {
                return _super.ins.call(this);
            },
            enumerable: true,
            configurable: true
        });
        EventModule.prototype.addEventListener = function (id, target, handler) {
            if (handler.once == false) {
            }
            // new Laya.Dictionary();
        };
        EventModule.prototype.removeEventListener = function (id, target) {
        };
        EventModule.prototype.dispatch = function (id, target, event, all) {
        };
        return EventModule;
    }(h5game.BaseClass));
    h5game.EventModule = EventModule;
})(h5game || (h5game = {}));
//# sourceMappingURL=EventModule.js.map