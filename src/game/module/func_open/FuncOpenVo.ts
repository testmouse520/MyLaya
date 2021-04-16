

/**
 * 
 */
module h5game {


	export class FuncOpenVo {

		private _unlock: boolean;
		private _flyIcon: boolean;
		private _cfg: any;

		constructor(cfg: any) {
			this._cfg = cfg;
			this.unlock = false;
		}

		set unlock(b) {
			this._unlock = b;
		}

		get unlock(): boolean {
			return this._unlock;
		}

		/** ID */
		get ID(): number {
			return this._cfg.id;
		}

		get limits(): Array<{ type: number, condition: Array<number> }> {
			return [];
		}

		/**
		 * 开其类型
		 */
		get openType(): EFuncOpenType {
			return EFuncOpenType.CONDITION_UNLOCK;
		}

		/**
		 * 真正开启
		 * 
		 * @return boolean
		 */
		get reallyOpen(): boolean {
			return this._unlock;
		}
	}
}