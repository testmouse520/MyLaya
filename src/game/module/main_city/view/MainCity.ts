

/**
 * 
 */
module h5game {

	/**
	 * 
	 */
	export class MainCity extends ui.main_city.MainCityUI {

		constructor() {
			super();
			this.isMaskBg = true;
			this.arrayRes.push({ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS });

			// Laya.loader.load()
			// Laya.Loader.ATLAS
			// new Laya.Animation().loadAtlas()
		}
	}
}