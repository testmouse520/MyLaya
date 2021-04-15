

/**
 * 
 */
module h5game {

	/**
	 * 
	 */
	export class Global {

		/**
		 * 生成获取类
		 */
		static get classManager(): ClassManager {
			return ClassManager.getInstance() as ClassManager;
		}

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
		static get randomUtils(): RandomUtils {
			return RandomUtils.getInstance() as RandomUtils;
		}

		/**
		 * 单例获取调试工具类
		 */
		static get debugUtils(): DebugUtils {
			return DebugUtils.getInstance() as DebugUtils;
		}

		/**
		 * 单例获取字符串工具类
		 */
		static get stringUtils(): StringUtils {
			return StringUtils.getInstance() as StringUtils;
		}

		/**
		 * 单例获取md5加密工具类
		 */
		static get md5(): MD5 {
			return MD5.getInstance() as MD5;
		}

		/**
		 * 单例获取sha1加密工具类
		 */
		static get sha1(): SHA1 {
			return SHA1.getInstance() as SHA1;
		}

		/**
		 * 单例获取舞台工具类（包含：舞台初始化、舞台宽高获取等）
		 */
		static get stageUtils(): StageUtils {
			return StageUtils.getInstance() as StageUtils;
		}

		/**
		 * 层级管理
		 */
		static get layerMgr(): LayerMgr {
			return LayerMgr.getInstance() as LayerMgr;
		}

		/**
		 * 单例获取number处理工具类
		 */
		static get mathUtils() {
			return MathUtils.getInstance();
		}

		static get handler() {
			return Handler;
		}

		static _gid: number = 10000;

		/**
		 * 全局唯一值生成器：每次调用的值都不一样。
		 */
		static getGID(): string {
			return (Global._gid++).toString();
		}

		static assert(expr) {
			if (Global.debugUtils.isDebug && !expr) {
				throw new Error("ASSERT FAILED")
			}
		}
	}
}