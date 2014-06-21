/**
 * Created by oded on 21/06/2014.
 */
(function (d) {
    var root = this;

    require.config({
        baseUrl: "./js/"
    });
    define3rdPartyModules();
    runShims();
    loadPluginsAndBoot();

    function define3rdPartyModules() {
        // These are already loaded via bundles.
        // We define them and put them in the root object.
//        define('ko', [], function () { return root.ko; });
//        define('hopscotch', [], function () { return root.hopscotch; });
//        define('createjs', [], function () { return root.createjs; });
    }

    function runShims() {

        //RAF. from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }

    function loadPluginsAndBoot() {
        // Plugins must be loaded after jQuery and Knockout,
        // since they depend on them.
        requirejs([
        ], boot);
    }

    function boot() {
        require(['bootstrapper'], function (bootstrapper) { bootstrapper.run(d); });
    }
})(document);

define('bootstrapper',
    ['analytics', 'processor'],
    function (analytics, processor) {

            var startApp = function () {
                processor.start();
            };

        return {
            run: function () {
//                var url = window.location.href;
//                analytics.track('Page View', { URL: url});
                startApp();
            }
        };
    });