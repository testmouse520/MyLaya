var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // if (App.DebugUtils.isDebug) {
        console.log.apply(console, args);
        // }
    };
    return Logger;
}());
//# sourceMappingURL=Logger.js.map