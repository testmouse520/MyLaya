/**
 *
 */
var h5game;
(function (h5game) {
    /**
     *
     */
    var BaseEvent = /** @class */ (function () {
        function BaseEvent(data) {
            this._data = data;
        }
        Object.defineProperty(BaseEvent.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        return BaseEvent;
    }());
    h5game.BaseEvent = BaseEvent;
})(h5game || (h5game = {}));
//# sourceMappingURL=BaseEvent.js.map