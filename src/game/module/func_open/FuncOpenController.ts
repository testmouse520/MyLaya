

/**
 * 
 */
module h5game {

	/** 解锁类型 */
	export enum EFuncOpenType {
		/** 直接解锁 */
		DIRECT_UNLOCK,
		/** 本地解锁 */
		LOCAL_UNLOCK,
		/** 条件解锁 */
		CONDITION_UNLOCK
	}

	/** 解锁条件 */
	enum EFuncOpenCondition {
		/** 玩家等级 */
		playerLevel,
		/** VIP等级 */
		vipLevel,
	}

	export class FuncOpenController extends BaseController {

		// 所有模块
		private _objAllFuncOpenVo: { [key: string]: FuncOpenVo };
		// 初始化需要协议数据
		private _arrayInitMsgID: Array<number>;
		// 功能解锁检查
		private _objLocalUnlockCheck: { [key: number]: Handler };
		// 功能解锁回调
		private _objUnlockCallback: { [key: number]: Handler };
		private _isInit: boolean;

		constructor() {
			super();
			this._objAllFuncOpenVo = {};

			this._arrayInitMsgID = [
				EMsgID.ENTER_GAME
			];
			this._objLocalUnlockCheck = {};
			this._objUnlockCallback = {};
			this._isInit = false;
		}

		static getInstance(): FuncOpenController {
			return super.getInstance() as FuncOpenController;
		}

		init() {
			super.init();
			this.addEventListener(FuncOpenEvent.FUNC_OPEN_INIT, Handler.createPermanent(this, this.onFuncOpenInit));
			this.addEventListener(FuncOpenEvent.FUNC_OPEN_CHECK, Handler.createPermanent(this, this.onFuncOpenCheck));
			this.addEventListener(FuncOpenEvent.FUNC_OPEN_UNLOCK, Handler.createPermanent(this, this.onFuncOpenUnlock))
		}

		private onFuncOpenInit(evt: FuncOpenEvent) {
			let msgID: number = evt.data;
			let index: number = this._arrayInitMsgID.indexOf(msgID);
			if (index != -1) {
				this._arrayInitMsgID.splice(index, 1);
			}

			if (this._arrayInitMsgID.length > 0)
				return;
			// 配置表
			let objFuncOpen = {};

			let arrayOpen: Array<number> = [];

			for (let key in objFuncOpen) {
				let cfg = objFuncOpen[key];
				let vo = new FuncOpenVo(cfg);

				this._objAllFuncOpenVo[cfg.id] = vo;
				vo.unlock = this.isUnlock(vo);

				vo.reallyOpen && arrayOpen.push(vo.ID);
			}
			this.dispatch(FuncOpenEvent.FUNC_OPEN_UNLOCK, new FuncOpenEvent(arrayOpen));
			this._isInit = true;
		}

		private onFuncOpenCheck() {
			if (!this._isInit)
				return;
			let arrayOpen: Array<number> = [];

			for (let key in this._objAllFuncOpenVo) {
				let funcOpenVo: FuncOpenVo = this._objAllFuncOpenVo[key];

				// 长期开启，不再检查
				if (funcOpenVo.reallyOpen && funcOpenVo.openType == EFuncOpenType.CONDITION_UNLOCK)
					continue;

				let unlock: boolean = this.isUnlock(funcOpenVo);

				if (funcOpenVo.openType == EFuncOpenType.LOCAL_UNLOCK) { // 特殊类型，比如：活动（开、关）
					if (unlock != funcOpenVo.reallyOpen) {
						if (!unlock) { // 关闭
							funcOpenVo.unlock = unlock;
							this.dispatch(FuncOpenEvent.FUNC_OPEN_CLOSE, new FuncOpenEvent([funcOpenVo.ID]));
							continue;
						}
					}
				}
				funcOpenVo.unlock = unlock;
				unlock && arrayOpen.push(funcOpenVo.ID);
			}
			if (arrayOpen && arrayOpen.length > 0) {
				this.dispatch(FuncOpenEvent.FUNC_OPEN_UNLOCK, new FuncOpenEvent(arrayOpen));
			}
		}

		private onFuncOpenUnlock(evt: FuncOpenEvent) {
			let arrayUnlock = evt.data as Array<number>;
			for (let i = 0, len = arrayUnlock.length; i < len; i++) {
				let funcID: number = arrayUnlock[i];
				let callback: Handler = this._objUnlockCallback[funcID];
				callback.run();
			}
		}

		/**
		 * 添加检查事件
		 * 
		 * @param funcId 功能ID
		 * @param handler 
		 */
		addLocalUnlock(funcId: number, handler: Handler) {
			Global.assert(handler.once == false);
			let temp: Handler = this._objLocalUnlockCheck[funcId];
			temp && temp.recover();
			this._objLocalUnlockCheck[funcId] = handler;
		}

		/**
		 * 登记解锁需要回调
		 * 
		 * @param funcId 功能ID
		 * @param handler 
		 */
		registerUnlockFetch(funcId: number, handler: Handler) {
			let temp: Handler = this._objUnlockCallback[funcId];
			temp && temp.recover();
			this._objUnlockCallback[funcId] = handler;
		}

		/**
		 * 是否解锁功能
		 * 
		 * @param funcOpenVo 
		 */
		isUnlock(funcOpenVo: FuncOpenVo): boolean {
			let openType = funcOpenVo.openType;
			if (openType == EFuncOpenType.DIRECT_UNLOCK) {
				return true;
			} else if (openType == EFuncOpenType.CONDITION_UNLOCK) {
				let state = this.checkLimit(funcOpenVo);
				return state;
			} else if (openType == EFuncOpenType.LOCAL_UNLOCK) {
				let state = this.checkLimit(funcOpenVo);

				if (!state) {
					return false;
				}
				let handler = this._objLocalUnlockCheck[funcOpenVo.ID]
				if (handler != null) {
					state = handler.run();
				}
				return state;
			}

			return true;
		}



		/**
		 * 功能是否开启
		 * 
		 * @param id 
		 */
		hasOpen(funcId: number): boolean {
			let open = this._objAllFuncOpenVo[funcId] && this._objAllFuncOpenVo[funcId].reallyOpen || false;
			return open;
		}

		/**
		 * 检查条件
		 * 
		 * @param funcOpenVo 
		 */
		private checkLimit(funcOpenVo: FuncOpenVo): boolean {
			let limits = funcOpenVo.limits;
			for (let i = 0, len = limits.length; i < len; i++) {
				let obj = limits[i];
				switch (obj.type) {
					case EFuncOpenCondition.playerLevel:
						return true;
					case EFuncOpenCondition.vipLevel:
						return true;
				}
			}
			return true;
		}
	}
}