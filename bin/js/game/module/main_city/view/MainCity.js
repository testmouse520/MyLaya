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
    /**
     *
     */
    var MainCity = /** @class */ (function (_super) {
        __extends(MainCity, _super);
        function MainCity() {
            var _this = _super.call(this) || this;
            _this.isMaskBg = true;
            _this.arrayRes.push({ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS });
            return _this;
            // Laya.loader.load()
            // Laya.Loader.ATLAS
            // new Laya.Animation().loadAtlas()
        }
        return MainCity;
    }(ui.main_city.MainCityUI));
    h5game.MainCity = MainCity;
})(h5game || (h5game = {}));
//# sourceMappingURL=MainCity.js.map