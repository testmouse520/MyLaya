

/**
 * 
 */
module h5game {

	/**
	 * 
	 */
	export class Global {

		static get evtMgr(): EventDispatcher {
			return EventDispatcher.getInstance() as EventDispatcher;
		}

		static get redDotMgr(): RedDotMgr {
			return RedDotMgr.getInstance() as RedDotMgr;
		}

		static assert(expr) {
			if (Conf.DEBUG && !expr) {
				throw new Error("ASSERT FAILED")
			}
		}
	}
}