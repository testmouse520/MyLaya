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
var h5game;
(function (h5game) {
    var ResourceUtils = /** @class */ (function (_super) {
        __extends(ResourceUtils, _super);
        function ResourceUtils() {
            return _super.call(this) || this;
        }
        /**
         * 加载资源
         * @param {Array} resource: [{type: , url: }]
         * @param {Function} onResourceLoadComplete
         * @param {Function} onResourceLoadProgress
         * @param {any} onResourceLoadTarget
         */
        ResourceUtils.prototype.loadResource = function (resource, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget) {
            Laya.loader.load(resource, Laya.Handler.create(onResourceLoadTarget, onResourceLoadComplete), Laya.Handler.create(onResourceLoadTarget, onResourceLoadProgress, null, false));
        };
        /**
         * 获取资源加载地址
         * @param {string} host 一类型资源放置位置
         * @param {string} name 资源名字
         * @param {string} resType 资源类型，默认png（png|jpg|sk|fnt|txt|json|mp4|mp3|wav）
         */
        ResourceUtils.prototype.getUrl = function (host, name, resType) {
            if (resType === void 0) { resType = h5game.consts.ResourceType.PNG; }
            return host + "/" + name + "." + resType;
        };
        return ResourceUtils;
    }(h5game.BaseClass));
    h5game.ResourceUtils = ResourceUtils;
})(h5game || (h5game = {}));
//# sourceMappingURL=ResourceUtils.js.map