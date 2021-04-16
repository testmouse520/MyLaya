
module h5game {

	export class FuncOpenEvent extends BaseEvent {

		/** 功能初始化 */
		static FUNC_OPEN_INIT: string = Global.getGID();
		/** 功能检查 */
		static FUNC_OPEN_CHECK: string = Global.getGID();
		/** 功能解锁 */
		static FUNC_OPEN_UNLOCK: string = Global.getGID();
		/** 功能关闭 */
		static FUNC_OPEN_CLOSE: string = Global.getGID();
	}
}