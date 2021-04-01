

/**
 * 
 */
module h5game {

	/**
	 * 红点管理类
	 */
	export class RedDotMgr extends BaseClass {

		private _objChild2Parents: { [childKey: number]: Array<number> };
		private _objParent2Childs: { [parentKey: number]: Array<number> };
		private _objKeyValue: { [key: number]: number };

		/** 红点宽度 */
		private static RED_DOT_WIDTH: number = 30;
		/** 红点高度 */
		private static RED_DOT_HEGIHT: number = 30;

		constructor() {
			super();

			this._objChild2Parents = {};
			this._objParent2Childs = {};
			this._objKeyValue = {};
			// this.initAllRelevance();
		}

		// public static get instance(): RedDotModule {
		// 	return super.ins() as RedDotModule;
		// }

		/**
		 * 初始化键值关联
		 * @param parentKey 
		 * @param childKeys 
		 */
		initKeyRelevance(parentKey: number, childKeys: Array<number> = []): void {
			for (let i = 0; i < childKeys.length; i++) {
				let childKey = childKeys[i];
				this._objChild2Parents[childKey] = this._objChild2Parents[childKey] || [];
				if (this._objChild2Parents[childKey].indexOf(parentKey) < 0)
					this._objChild2Parents[childKey].push(parentKey);
			}
			this._objParent2Childs[parentKey] = childKeys;
		}

		/**
		 * 获取键值关联子节点
		 * @param key 
		 */
		getParentChilds(key: number) {
			return this._objParent2Childs[key]
		}

		/**
		 * @param key 
		 */
		getRedDotValue(key: number): number {
			return this._objKeyValue[key] || 0;
		}

		/**
		 * 注册红点
		 * @param key 
		 * @param targetNode
		 * @param args 
		 */
		registerRedDot(key: number, targetNode: any, args?: { showValue?: boolean, positionX?: number, positionY?: number }): void {

			let showValue: boolean = (args && args.showValue) ? args.showValue : false;

			let positionX: number = (args && args.positionX) ? args.positionX : targetNode.width - RedDotMgr.RED_DOT_WIDTH;
			let positionY: number = (args && args.positionY) ? args.positionY : RedDotMgr.RED_DOT_HEGIHT / 2;

			let redDot = targetNode.getChildByName("RedDot") as RedDotVo;
			if (!redDot) {
				redDot = new RedDotVo();
				redDot.x = positionX;
				redDot.y = positionY;
				targetNode.addChild(redDot);
			}
			// 注册事件
			(redDot as IRedDot).registerRedDot(key, showValue);
		}

		/**
		 * 注销红点
		 * @param pKey 
		 * @param targetNode 
		 */
		unregisterRedDot(targetNode: any): void {
			// 注销事件
			let redDot = targetNode.getChildByName("RedDot");
			if (redDot) {
				(redDot as IRedDot).unregisterRedDot();
			}
		}

		/**
		 * 设置红点值
		 * @param key
		 * @param value 
		 */
		setRedDotValue(key: number, value: number): void {
			if (key == null || value == null) {
				return;
			}
			value = Math.max(value, 0)
			let parentKeys = this._objChild2Parents[key];

			let oldValue = this.getRedDotValue(key);
			let newValue = value - oldValue;

			if (parentKeys && parentKeys.length > 0) {
				for (let i = 0, length = parentKeys.length; i < length; i++) {
					let parentKey = parentKeys[i];
					let oldPVal = this.getRedDotValue(parentKey);
					this.setRedDotValue(parentKey, oldPVal + newValue);
				}
			}

			this._objKeyValue[key] = value;
			let obj: IRedDotInfo = { key: key };
			// 发送事件
			Global.evtMgr.dispatch(RedDotEvent.CHANGED, this, new RedDotEvent(obj), true)
		}

		/**
		 * 重置红点
		 */
		resetRedDot(): void {
			this._objKeyValue = {};
			// 发送事件
			Global.evtMgr.dispatch(RedDotEvent.RESET, this, new RedDotEvent(), true);
		}

		// /**
		//  * 初始所有关联
		//  */
		// private initAllRelevance(): void {
		// 	this.initKeyRelevance(RedDotEnum.RED_DOT_MAIN_ICON_TEST, [
		// 		RedDotEnum.RED_DOT_UI_ICON_TEST_1,
		// 		RedDotEnum.RED_DOT_UI_ICON_TEST_2,
		// 		RedDotEnum.RED_DOT_UI_ICON_TEST_3,
		// 		RedDotEnum.RED_DOT_UI_ICON_TEST_4]);
		// }
	}
}