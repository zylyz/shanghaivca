
    /**
     * @method 注册事件
     * @param event_name 时间名称
     * @param callback 事件回调
     */
    var on = function (event_name, callback) {
        if (!this._events) this._events = {};
        if (!this._events[event_name]) this._events[event_name] = [];
        this._events[event_name].push(callback);
        return this;
    };
    /**
     * @method 注销事件
     * @param event_name 事件名称
     * @param callback 要注销的回调。如果为空则注销该事件的所有回调。
     */
    var off = function (event_name, callback) {
        if (!this._events) return this;
        var el = this._events[event_name];
        if (!el) return this;
        if (!callback || (el.length == 1 && el[0] == callback)) {
            this._events[event_name] = [];
            delete this._events[event_name];
        }
        else {
            for (var i = 0; i < el.length; ++i) {
                if (el[i] == callback) {
                    el.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    };
    /**
     * @method 触发事件
     * @param event_name 触发的事件名称
     */
    var trigger = function (event_name) {
        if (!this._events) return this;
        var el = this._events[event_name];
        if (!el || !el.length) return this;
        var args = [];
        for (var i = 1; i < arguments.length; ++i) {
            args.push(arguments[i]);
        }
        for (var i = 0; i < el.length; ++i) {
            el[i].apply(this, args);
        }
        return this;
    };

    export default  function (o) {
        if (!o) return;
        o.on = on;
        o.off = off;
        o.trigger = trigger;
        return o;
    };
