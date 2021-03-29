

/**
 * 
 */
module h5game {

	/**
	 * 
	 */
	export class Global extends BaseClass {

		constructor() {
			super();
		}

		static get evtMgr(): EventDispatcher {
			return EventDispatcher.instance;
		}

		static assert(expr) {
			if (Conf.DEBUG && !expr) {
				throw new Error("ASSERT FAILED")
			}
		}
	}
}