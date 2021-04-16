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
    /** 解锁类型 */
    var EFuncOpenType;
    (function (EFuncOpenType) {
        /** 直接解锁 */
        EFuncOpenType[EFuncOpenType["DIRECT_UNLOCK"] = 0] = "DIRECT_UNLOCK";
        /** 本地解锁 */
        EFuncOpenType[EFuncOpenType["LOCAL_UNLOCK"] = 1] = "LOCAL_UNLOCK";
        /** 条件解锁 */
        EFuncOpenType[EFuncOpenType["CONDITION_UNLOCK"] = 2] = "CONDITION_UNLOCK";
    })(EFuncOpenType = h5game.EFuncOpenType || (h5game.EFuncOpenType = {}));
    /** 解锁条件 */
    var EFuncOpenCondition;
    (function (EFuncOpenCondition) {
        /** 玩家等级 */
        EFuncOpenCondition[EFuncOpenCondition["playerLevel"] = 0] = "playerLevel";
        /** VIP等级 */
        EFuncOpenCondition[EFuncOpenCondition["vipLevel"] = 1] = "vipLevel";
    })(EFuncOpenCondition || (EFuncOpenCondition = {}));
    var FuncOpenController = /** @class */ (function (_super) {
        __extends(FuncOpenController, _super);
        function FuncOpenController() {
            var _this = _super.call(this) || this;
            _this._objAllFuncOpenVo = {};
            _this._arrayInitMsgID = [
                h5game.EMsgID.ENTER_GAME
            ];
            _this._objLocalUnlockCheck = {};
            _this._objUnlockCallback = {};
            _this._isInit = false;
            return _this;
        }
        FuncOpenController.getInstance = function () {
            return _super.getInstance.call(this);
        };
        FuncOpenController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.addEventListener(h5game.FuncOpenEvent.FUNC_OPEN_INIT, h5game.Handler.createPermanent(this, this.onFuncOpenInit));
            this.addEventListener(h5game.FuncOpenEvent.FUNC_OPEN_CHECK, h5game.Handler.createPermanent(this, this.onFuncOpenCheck));
            this.addEventListener(h5game.FuncOpenEvent.FUNC_OPEN_UNLOCK, h5game.Handler.createPermanent(this, this.onFuncOpenUnlock));
        };
        FuncOpenController.prototype.onFuncOpenInit = function (evt) {
            var msgID = evt.data;
            var index = this._arrayInitMsgID.indexOf(msgID);
            if (index != -1) {
                this._arrayInitMsgID.splice(index, 1);
            }
            if (this._arrayInitMsgID.length > 0)
                return;
            // 配置表
            var objFuncOpen = {};
            var arrayOpen = [];
            for (var key in objFuncOpen) {
                var cfg = objFuncOpen[key];
                var vo = new h5game.FuncOpenVo(cfg);
                this._objAllFuncOpenVo[cfg.id] = vo;
                vo.unlock = this.isUnlock(vo);
                vo.reallyOpen && arrayOpen.push(vo.ID);
            }
            this.dispatch(h5game.FuncOpenEvent.FUNC_OPEN_UNLOCK, new h5game.FuncOpenEvent(arrayOpen));
            this._isInit = true;
        };
        FuncOpenController.prototype.onFuncOpenCheck = function () {
            if (!this._isInit)
                return;
            var arrayOpen = [];
            for (var key in this._objAllFuncOpenVo) {
                var funcOpenVo = this._objAllFuncOpenVo[key];
                // 长期开启，不再检查
                if (funcOpenVo.reallyOpen && funcOpenVo.openType == EFuncOpenType.CONDITION_UNLOCK)
                    continue;
                var unlock = this.isUnlock(funcOpenVo);
                if (funcOpenVo.openType == EFuncOpenType.LOCAL_UNLOCK) { // 特殊类型，比如：活动（开、关）
                    if (unlock != funcOpenVo.reallyOpen) {
                        if (!unlock) { // 关闭
                            funcOpenVo.unlock = unlock;
                            this.dispatch(h5game.FuncOpenEvent.FUNC_OPEN_CLOSE, new h5game.FuncOpenEvent([funcOpenVo.ID]));
                            continue;
                        }
                    }
                }
                funcOpenVo.unlock = unlock;
                unlock && arrayOpen.push(funcOpenVo.ID);
                if (arrayOpen && arrayOpen.length > 0) {
                    this.dispatch(h5game.FuncOpenEvent.FUNC_OPEN_UNLOCK, new h5game.FuncOpenEvent(arrayOpen));
                }
            }
        };
        FuncOpenController.prototype.onFuncOpenUnlock = function (evt) {
            var arrayUnlock = evt.data;
            for (var i = 0, len = arrayUnlock.length; i < len; i++) {
                var funcID = arrayUnlock[i];
                var callback = this._objUnlockCallback[funcID];
                callback.run();
            }
        };
        /**
         * 添加检查事件
         *
         * @param funcId 功能ID
         * @param handler
         */
        FuncOpenController.prototype.addLocalUnlock = function (funcId, handler) {
            h5game.Global.assert(handler.once == false);
            var temp = this._objLocalUnlockCheck[funcId];
            temp && temp.recover();
            this._objLocalUnlockCheck[funcId] = handler;
        };
        /**
         * 登记解锁需要回调
         *
         * @param funcId 功能ID
         * @param handler
         */
        FuncOpenController.prototype.registerUnlockFetch = function (funcId, handler) {
            var temp = this._objUnlockCallback[funcId];
            temp && temp.recover();
            this._objUnlockCallback[funcId] = handler;
        };
        /**
         * 是否解锁功能
         *
         * @param funcOpenVo
         */
        FuncOpenController.prototype.isUnlock = function (funcOpenVo) {
            var openType = funcOpenVo.openType;
            if (openType == EFuncOpenType.DIRECT_UNLOCK) {
                return true;
            }
            else if (openType == EFuncOpenType.CONDITION_UNLOCK) {
                var state = this.checkLimit(funcOpenVo);
                return state;
            }
            else if (openType == EFuncOpenType.LOCAL_UNLOCK) {
                var state = this.checkLimit(funcOpenVo);
                if (!state) {
                    return false;
                }
                var handler = this._objLocalUnlockCheck[funcOpenVo.ID];
                if (handler != null) {
                    state = handler.run();
                }
                return state;
            }
            return true;
        };
        /**
         * 功能是否开启
         *
         * @param id
         */
        FuncOpenController.prototype.hasOpen = function (funcId) {
            var open = this._objAllFuncOpenVo[funcId] && this._objAllFuncOpenVo[funcId].reallyOpen || false;
            return open;
        };
        /**
         * 检查条件
         *
         * @param funcOpenVo
         */
        FuncOpenController.prototype.checkLimit = function (funcOpenVo) {
            var limits = funcOpenVo.limits;
            for (var i = 0, len = limits.length; i < len; i++) {
                var obj = limits[i];
                switch (obj.type) {
                    case EFuncOpenCondition.playerLevel:
                        return true;
                    case EFuncOpenCondition.vipLevel:
                        return true;
                }
            }
            return true;
        };
        return FuncOpenController;
    }(h5game.BaseController));
    h5game.FuncOpenController = FuncOpenController;
})(h5game || (h5game = {}));
//# sourceMappingURL=FuncOpenController.js.map