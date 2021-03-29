

/**
 * 
 */
module h5game {

	/**
	 * 
	 */
	export class Global {

		/**
		 * 事件触发
		 */
		static get evtMgr(): EventDispatcher {
			return EventDispatcher.getInstance() as EventDispatcher;
		}

		/**
		 * 红点模块
		 */
		static get redDotMgr(): RedDotMgr {
			return RedDotMgr.getInstance() as RedDotMgr;
		}

		/**
		 * 单例获取其他工具类
		 */
		static get commonUtils(): CommonUtils {
			return CommonUtils.getInstance() as CommonUtils
		}

		/**
		 * 单例获取时间工具类
		 */
		static get dateUtils(): DateUtils {
			return DateUtils.getInstance() as DateUtils;
		}

		/**
		 * 单例获取数组工具类
		 */
		static get arrayUtils(): ArrayUtils {
			return ArrayUtils.getInstance() as ArrayUtils;
		}

		/**
		 * 单例获取随机工具类
		 */
		static get randomUtils() {
			return RandomUtils.getInstance();
		}

		static assert(expr) {
			if (Conf.DEBUG && !expr) {
				throw new Error("ASSERT FAILED")
			}
		}

	}
}