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
    var EventDispatcher = /** @class */ (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            var _this = _super.call(this) || this;
            _this._dictEvtForm = {};
            return _this;
        }
        // public static get instance(): EventDispatcher {
        //     return super.ins() as EventDispatcher;
        // }
        EventDispatcher.prototype.ifStageEvent = function (id) {
            return false;
        };
        /**
         * 添加事件
         * @param id
         * @param target
         * @param handler
         */
        EventDispatcher.prototype.addEventListener = function (id, target, handler) {
            h5game.Global.assert(handler.once == false);
            if (target == undefined || this.ifStageEvent(id)) {
                target = Laya.stage;
            }
            if (this._dictEvtForm[id] = undefined) {
                this._dictEvtForm[id] = new Laya.Dictionary();
            }
            this._dictEvtForm[id].set(target, h5game.Handler);
        };
        /**
         * 删除事件
         * @param id
         * @param target
         */
        EventDispatcher.prototype.removeEventListener = function (id, target) {
            if (this._dictEvtForm[id] != undefined) {
                var form = this._dictEvtForm[id];
                if (target == undefined || this.ifStageEvent(id)) {
                    target = Laya.stage;
                }
                var handler = form.get(target);
                form.remove(target);
                if (handler && handler.once == false) {
                    handler.recover();
                }
                // if (Dict.count(form) == 0) {
                delete this._dictEvtForm[id];
                // }
            }
        };
        /**
         * 触发事件
         * @param id
         * @param target
         * @param evt
         * @param all
         */
        EventDispatcher.prototype.dispatch = function (id, target, evt, all) {
            if (all === void 0) { all = false; }
            if (this._dictEvtForm[id] != undefined) {
                if (target == null) {
                    target = Laya.stage;
                }
                if (all) {
                    var from = this._dictEvtForm[id];
                    var keys = [];
                    for (var i = 0; i < from.keys.length; i++) {
                        keys.push(from.keys[i]);
                    }
                    for (var i = 0; i < keys.length; i++) {
                        var handler = from.get(keys[i]);
                        if (handler != null) {
                            handler.runWith(evt);
                        }
                    }
                    keys.length = 0;
                }
                else {
                    var handler = this._dictEvtForm[id].get(target);
                    if (handler != null) {
                        handler.runWith(evt);
                    }
                }
            }
        };
        return EventDispatcher;
    }(h5game.BaseClass));
    h5game.EventDispatcher = EventDispatcher;
})(h5game || (h5game = {}));
//# sourceMappingURL=EventDispatcher.js.map