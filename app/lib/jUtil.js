import $  from "jquery";
import jEvents from "./jEvents";
//触摸事件的简单适配
function touchProxy(calbk) {
    return function (e) {
        var pe = e;
        if (e.touches && e.touches.length) e = e.touches[0];
        if (e.originalEvent) e = e.originalEvent;
        if (e.targetTouches && e.targetTouches.length) e = e.targetTouches[0] || e;
        if (calbk.call(this, e) == false) {
            pe.stopPropagation();
            pe.preventDefault();
            pe.handled = true;
        }
    };
}
//数组扩展
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof  callback != "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
var util = {
    isMobile: navigator.userAgent.match(/pad|midp|ucweb|android|windows ce|mobile|phone/ig),
    isWeixin: /(micromessenger)/ig.test(navigator.userAgent),
    isWeibo: /(weibo)/ig.test(navigator.userAgent),
    isAliApp: /(AliApp)/ig.test(navigator.userAgent),
    touch: {
        //触摸范围管理
        startTouch: function startTouch(ele, obj) {
            var doc = $(document.body);
            var cache;
            var move = touchProxy(function (e) {
                if (obj.move) return obj.move.call(cache, e);
            });
            var ex = 0;
            var up = function () {
                if (!ex) return;
                ex = false;
                doc.off("mousemove touchmove", move);
                doc.off("mouseup touchend", up);
                if (obj.up) return obj.up.call(cache);
            };
            obj.exit = up;
            ele.on(util.isMobile ? "touchstart" : "mousedown", touchProxy(function (e) {
                if (ex) return;
                ex = true;
                cache = this;
                doc.on("mousemove touchmove", move);
                doc.on("mouseup touchend", up);
                if (obj.down) return obj.down.call(this, e);
            }));
            return function () {
                ele.off(util.isMobile ? "touchstart" : "mousedown");
            };
        },
        //單個手指的手勢
        single: function (ele, sett, distance) {
            sett = sett || {};
            var pos, tpos, istap = false, startTime;
            distance = distance || 5;
            // var jResize = require('./jResize');
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
            var h = window.innerHeight || document.documentElement.clientHeight || document.body.offsetHeight;
            var wScale = w/h;
            return util.touch.startTouch(ele, {
                down: function (e) {
                    pos = {
                        x: e.pageX / wScale,
                        y: e.pageY / wScale
                    };
                    tpos = pos;
                    startTime = new Date().getTime();
                    istap = true;
                    if (sett.down) sett.down.call(this, pos, e);
                },
                move: function (e) {
                    if (!pos) return;
                    tpos = {
                        x: e.pageX / wScale,
                        y: e.pageY / wScale
                    };
                    var dp = {
                        deltaX: tpos.x - pos.x,
                        deltaY: tpos.y - pos.y
                    };
                    if (Math.abs(dp.deltaX) > 20 || Math.abs(dp.deltaY) > 20) istap = false;
                    var deg = Math.abs(dp.deltaX / dp.deltaY);
                    if (!sett.move && deg < 0.5) {
                        if (dp.deltaY > 0 && !sett.top) return;
                        if (dp.deltaY < 0 && !sett.bottom) return;
                    }
                    if (sett.move && sett.move.call(this, dp, tpos, pos, e)) return;
                    return false;
                },
                up: function () {
                    if (!pos) return;
                    var dtime = new Date().getTime() - startTime;
                    if (dtime < 800) {
                        var e = {
                            deltaX: tpos.x - pos.x,
                            deltaY: tpos.y - pos.y
                        };
                        var deg = Math.abs(e.deltaX / e.deltaY);
                        if (isNaN(deg) || deg > 2) {
                            if (e.deltaX > distance && sett.left) return sett.left.call(this);
                            else if (e.deltaX < -distance && sett.right) return sett.right.call(this);
                        } else if (deg < 0.5) {
                            if (e.deltaY > distance && sett.top) return sett.top.call(this);
                            else if (e.deltaY < -distance && sett.bottom) return sett.bottom.call(this);
                        }
                    }
                    if (dtime < 300) {
                        if (istap) {
                            istap = false;
                            if (sett.tap) sett.tap.call(this);
                        }
                    }
                    if (sett.up) sett.up.call(this);
                    pos = null;
                    tpos = null;
                }
            });
        }
    },
    url: {
        //根據名稱獲取url中search裏面的值
        getSearch: function (name, search) {
            if (arguments.length < 2) search = location.search;
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&#]" + name + "=([^&#]*)"),
                results = regex.exec(search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        //計算絕對地址
        getAbsUrl: function (url, baseUrl) {
            var urladd = url.split("/");
            if (urladd[0].indexOf(":") > 0) return url;
            if (urladd[0] == ":") {
                urladd[0] = location.protocol;
                return urladd.join("/");
            }
            var urlbase = (baseUrl || location.href).split("?")[0].split("#")[0].split("/");
            urlbase.pop();
            if (!urladd[0]) {
                urladd.shift();
                while (urlbase.length > 1 && urlbase[urlbase.length - 2]) urlbase.pop();
            }
            for (var i = 0; i < urladd.length; ++i) {
                if (!urladd[i] || urladd[i] == ".") continue;
                if (urladd[i] == "..") {
                    if (urlbase.length > 1 && urlbase[urlbase.length - 2]) urlbase.pop();
                    continue;
                }
                urlbase.push(urladd[i])
            }
            return urlbase.join("/");
        }
    },
    cookie: {
        //設置cookies
        setCookie: function (name, value, time) {
            var ck = name + "=" + value;
            if (time) {
                var exp = new Date();
                exp.setTime(exp.getTime() + time);
                ck += ";expires=" + exp.toGMTString();
            }
            document.cookie = ck + ";path=/";
        },
        //读取cookies
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);
            return null;
        },
        //删除cookies
        delCookie: function (name) {
            jSetCookie(name, "", -1000 * 3600 * 24 * 365);
        }
    },
    color: {
        //顔色分量
        colorPart: function (r, g, b, a) {
            if (arguments.length < 3) {
                var c = r, x = g;
                r = parseInt(c % 0x1000000 / 0x10000);
                g = parseInt(c % 0x10000 / 0x100);
                b = parseInt(c % 0x100);
                a = Math.max(1, r % 0x1000000 / 255);
                if (!a && !x) a = 1;
            }
            else if (arguments.length == 3) {
                a = 1;
            }
            var color = {
                a: function (v) {
                    if (arguments.length == 0) return a;
                    a = v;
                    this.trigger("change");
                    return this;
                },
                r: function (v) {
                    if (arguments.length == 0) return r;
                    r = v;
                    this.trigger("change");
                    return this;
                },
                g: function (v) {
                    if (arguments.length == 0) return g;
                    g = v;
                    this.trigger("change");
                    return this;
                },
                b: function (v) {
                    if (arguments.length == 0) return b;
                    b = v;
                    this.trigger("change");
                    return this;
                },
                toString: function () {
                    if (this.a() == 1) this.toAString();
                    return 'rgba(' + parseInt(this.r()) + ',' + parseInt(this.g()) + ',' + parseInt(this.b()) + ',' + this.a() + ')';
                },
                toAString: function () {
                    return "#" + (parseInt(this.r()) * 0x10000 + parseInt(this.g()) * 0x100 + parseInt(this.b())).toString(16);
                }
            };
            jEvents(color);
            return color;
        },
        colorFromBlack: function () {
            var pixel = util.color.colorPart.apply(this, arguments);
            //叠加黑色
            var a0 = pixel.a();
            var r1 = pixel.r() * a0;
            var g1 = pixel.g() * a0;
            var b1 = pixel.b() * a0;
            //去掉黑色
            var a = Math.max(Math.max(r1, g1), b1) / 255.0;
            var r = a == 0 ? 255 : r1 / a;
            var b = a == 0 ? 255 : b1 / a;
            var g = a == 0 ? 255 : g1 / a;
            return pixel.r(Math.round(r)).g(Math.round(g)).b(Math.round(b)).a(a);
        },
        colorFromWhite: function () {
            var pixel = util.color.colorPart.apply(this, arguments);
            //叠加白色
            var a0 = pixel.a();
            var r1 = pixel.r() * a0 + 255.0 * (1 - a0);
            var g1 = pixel.g() * a0 + 255.0 * (1 - a0);
            var b1 = pixel.b() * a0 + 255.0 * (1 - a0);
            var remove1 = Math.min(Math.min(r1, g1), b1);
            var a = 1 - remove1 / 255.0;
            //去掉白色
            var r = a == 0 ? 255 : (r1 - remove1) / a;
            var b = a == 0 ? 255 : (b1 - remove1) / a;
            var g = a == 0 ? 255 : (g1 - remove1) / a;
            return pixel.r(Math.round(r)).g(Math.round(g)).b(Math.round(b)).a(a);
        }
    },
    string: {
        endWith: function (str, end) {
            if (!str || !end || end.length > str.length) return;
            if (str.lastIndexOf(end) == str.length - end.length) return true;
        }
    },
    isNumber: function (v) {
        return /^\d+$/.test(v);
    },
    async: {
        //等待多個操作完成
        waitCount: function (cnt, onend, onprogress) {
            var num = 0;
            return function (data) {
                ++num;
                if (cnt >= num) onprogress && onprogress(num, cnt, data);
                if (cnt == num) onend && onend();
            };
        },
        //用于jTimeline的整数计数器
        intSetter: function (min, max) {
            var val = 0;
            var intVal;
            var setter = {
                value: function (v) {
                    if (!arguments.length) return val;
                    val = Math.max(0, Math.min(1, v)) || 0;
                    var iv = Math.floor((max - min) * val) + min;
                    if (val == 1) iv = max - 1;
                    if (iv != intVal) {
                        setter.trigger("frame", iv, intVal);
                        intVal = iv;
                    }
                }
            };
            jEvents(setter);
            return setter;
        }
    }
};
export  default util;