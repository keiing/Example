(function (window, undefined) {
    onmessage = function (e) {
        this.console.log(e,e.currentTarget.name)
        for (var i = 0; i < 10; i++) {
            this.postMessage(i)
        }
    }
})(window={})