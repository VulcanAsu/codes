(function(e, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(o) {
        return t(e, o)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
})(window, function(e, t) {
    'use strict';

    function o(o, r, a) {
        function l(e, t, n) {
            var r, l = "$()." + o + "(\"" + t + "\")";
            return e.each(function(e, i) {
                var m = a.data(i, o);
                if(!m) return void s(o + " not initialized. Cannot call methods, i.e. " + l);
                var d = m[t];
                if(!d || "_" == t.charAt(0)) return void s(l + " is not a valid method");
                var p = d.apply(m, n);
                r = void 0 === r ? p : r
            }), void 0 === r ? e : r
        }

        function m(e, t) {
            e.each(function(e, i) {
                var n = a.data(i, o);
                n ? (n.option(t), n._init()) : (n = new r(i, t), a.data(i, o, n))
            })
        }
        a = a || t || e.jQuery, a && (!r.prototype.option && (r.prototype.option = function(e) {
            a.isPlainObject(e) && (this.options = a.extend(!0, this.options, e))
        }), a.fn[o] = function(e) {
            if("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t)
            }
            return m(this, e), this
        }, i(a))
    }

    function i(e) {
        !e || e && e.bridget || (e.bridget = o)
    }
    var n = Array.prototype.slice,
        r = e.console,
        s = "undefined" == typeof r ? function() {} : function(e) {
            r.error(e)
        };
    return i(t || e.jQuery), o
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" == typeof window ? this : window, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if(e && t) {
            var o = this._events = this._events || {},
                i = o[e] = o[e] || [];
            return -1 == i.indexOf(t) && i.push(t), this
        }
    }, t.once = function(e, t) {
        if(e && t) {
            this.on(e, t);
            var o = this._onceEvents = this._onceEvents || {},
                i = o[e] = o[e] || {};
            return i[t] = !0, this
        }
    }, t.off = function(e, t) {
        var o = this._events && this._events[e];
        if(o && o.length) {
            var i = o.indexOf(t);
            return -1 != i && o.splice(i, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var o = this._events && this._events[e];
        if(o && o.length) {
            o = o.slice(0), t = t || [];
            for(var n = this._onceEvents && this._onceEvents[e], r = 0; r < o.length; r++) {
                var s = o[r],
                    a = n && n[s];
                a && (this.off(e, s), delete n[s]), s.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, function() {
    'use strict';

    function e(e) {
        var t = parseFloat(e),
            o = -1 == e.indexOf("%") && !isNaN(t);
        return o && t
    }

    function t() {
        for(var e, t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, o = 0; o < m; o++) e = l[o], t[e] = 0;
        return t
    }

    function o(e) {
        var t = getComputedStyle(e);
        return t || a("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }

    function n() {
        if(!d) {
            d = !0;
            var t = document.createElement("div");
            t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(t);
            var n = o(t);
            s = 200 == Math.round(e(n.width)), r.isBoxSizeOuter = s, i.removeChild(t)
        }
    }

    function r(r) {
        if(n(), "string" == typeof r && (r = document.querySelector(r)), r && "object" == typeof r && r.nodeType) {
            var a = o(r);
            if("none" == a.display) return t();
            for(var d = {
                    width: r.offsetWidth,
                    height: r.offsetHeight
                }, p = d.isBorderBox = "border-box" == a.boxSizing, y = 0; y < m; y++) {
                var g = l[y],
                    u = a[g],
                    c = parseFloat(u);
                d[g] = isNaN(c) ? 0 : c
            }
            var h = d.paddingLeft + d.paddingRight,
                _ = d.paddingTop + d.paddingBottom,
                f = d.marginLeft + d.marginRight,
                z = d.marginTop + d.marginBottom,
                I = d.borderLeftWidth + d.borderRightWidth,
                v = d.borderTopWidth + d.borderBottomWidth,
                x = p && s,
                S = e(a.width);
            !1 !== S && (d.width = S + (x ? 0 : h + I));
            var b = e(a.height);
            return !1 !== b && (d.height = b + (x ? 0 : _ + v)), d.innerWidth = d.width - (h + I), d.innerHeight = d.height - (_ + v), d.outerWidth = d.width + f, d.outerHeight = d.height + z, d
        }
    }
    var s, a = "undefined" == typeof console ? function() {} : function(e) {
            console.error(e)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        m = l.length,
        d = !1;
    return r
}),
function(e, t) {
    'use strict';
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, function() {
    'use strict';
    var e = function() {
        var e = window.Element.prototype;
        if(e.matches) return "matches";
        if(e.matchesSelector) return "matchesSelector";
        for(var t = ["webkit", "moz", "ms", "o"], o = 0; o < t.length; o++) {
            var n = t[o],
                r = n + "MatchesSelector";
            if(e[r]) return r
        }
    }();
    return function(t, o) {
        return t[e](o)
    }
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(o) {
        return t(e, o)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, function(e, t) {
    var o = {
            extend: function(e, t) {
                for(var o in t) e[o] = t[o];
                return e
            },
            modulo: function(e, t) {
                return (e % t + t) % t
            }
        },
        i = Array.prototype.slice;
    o.makeArray = function(e) {
        if(Array.isArray(e)) return e;
        if(null === e || void 0 === e) return [];
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? i.call(e) : [e]
    }, o.removeFrom = function(e, t) {
        var o = e.indexOf(t); - 1 != o && e.splice(o, 1)
    }, o.getParent = function(e, o) {
        for(; e.parentNode && e != document.body;)
            if(e = e.parentNode, t(e, o)) return e
    }, o.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, o.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, o.filterFindElements = function(e, n) {
        e = o.makeArray(e);
        var r = [];
        return e.forEach(function(e) {
            if(e instanceof HTMLElement) {
                if(!n) return void r.push(e);
                t(e, n) && r.push(e);
                for(var o = e.querySelectorAll(n), s = 0; s < o.length; s++) r.push(o[s])
            }
        }), r
    }, o.debounceMethod = function(e, t, o) {
        o = o || 100;
        var i = e.prototype[t],
            n = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[n];
            clearTimeout(e);
            var t = arguments,
                r = this;
            this[n] = setTimeout(function() {
                i.apply(r, t), delete r[n]
            }, o)
        }
    }, o.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }, o.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, function(e, t, o) {
            return t + "-" + o
        }).toLowerCase()
    };
    var n = e.console;
    return o.htmlInit = function(t, i) {
        o.docReady(function() {
            var r = o.toDashed(i),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                l = document.querySelectorAll(".js-" + r),
                m = o.makeArray(a).concat(o.makeArray(l)),
                d = e.jQuery;
            m.forEach(function(e) {
                var o, r = e.getAttribute(s) || e.getAttribute(s + "-options");
                try {
                    o = r && JSON.parse(r)
                } catch (t) {
                    return void(n && n.error("Error parsing " + s + " on " + e.className + ": " + t))
                }
                var a = new t(e, o);
                d && d.data(e, i, a)
            })
        })
    }, o
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, function(e, t) {
    'use strict';

    function o(e) {
        for(var t in e) return !1;
        return t = null, !0
    }

    function i(e, t) {
        e && (this.element = e, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var n = document.documentElement.style,
        r = "string" == typeof n.transition ? "transition" : "WebkitTransition",
        s = "string" == typeof n.transform ? "transform" : "WebkitTransform",
        a = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        } [r],
        l = {
            transform: s,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        m = i.prototype = Object.create(e.prototype);
    m.constructor = i, m._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "relative"
        })
    }, m.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, m.getSize = function() {
        this.size = t(this.element)
    }, m.css = function(e) {
        var t = this.element.style;
        for(var o in e) {
            var i = l[o] || o;
            t[i] = e[o]
        }
    }, m.getPosition = function() {
        var e = getComputedStyle(this.element),
            t = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            i = e[t ? "left" : "right"],
            n = e[o ? "top" : "bottom"],
            r = parseFloat(i),
            s = parseFloat(n),
            a = this.layout.size; - 1 != i.indexOf("%") && (r = r / 100 * a.width), -1 != n.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= t ? a.paddingLeft : a.paddingRight, s -= o ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s
    }, m.layoutPosition = function() {
        var e = this.layout.size,
            t = {},
            o = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = o ? "paddingLeft" : "paddingRight",
            r = o ? "left" : "right",
            s = o ? "right" : "left",
            a = this.position.x + e[n];
        t[r] = this.getXValue(a), t[s] = "";
        var l = i ? "paddingTop" : "paddingBottom",
            m = i ? "top" : "bottom",
            d = i ? "bottom" : "top",
            p = this.position.y + e[l];
        t[m] = this.getYValue(p), t[d] = "", this.css(t), this.emitEvent("layout", [this])
    }, m._transitionTo = function(e, t) {
        this.getPosition();
        var o = this.position.x,
            i = this.position.y,
            n = e == this.position.x && t == this.position.y;
        if(this.setPosition(e, t), n && !this.isTransitioning) return void this.layoutPosition();
        var r = {};
        r.transform = this.getTranslate(e - o, t - i), this.transition({
            to: r,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, m.getTranslate = function(e, t) {
        var o = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop");
        return e = o ? e : -e, t = i ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)"
    }, m.goTo = function(e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, m.moveTo = m._transitionTo, m.setPosition = function(e, t) {
        this.position.x = parseFloat(e), this.position.y = parseFloat(t)
    }, m._nonTransition = function(e) {
        for(var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
    }, m.transition = function(e) {
        if(!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(e);
        var t = this._transn;
        for(var o in e.onTransitionEnd) t.onEnd[o] = e.onTransitionEnd[o];
        for(o in e.to) t.ingProperties[o] = !0, e.isCleaning && (t.clean[o] = !0);
        if(e.from) {
            this.css(e.from);
            this.element.offsetHeight
        }
        this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
    };
    var d = "opacity," + function(e) {
        return e.replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase()
        })
    }(s);
    m.enableTransition = function() {
        if(!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            e = "number" == typeof e ? e + "ms" : e, this.css({
                transitionProperty: d,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(a, this, !1)
        }
    }, m.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e)
    }, m.onotransitionend = function(e) {
        this.ontransitionend(e)
    };
    var p = {
        "-webkit-transform": "transform"
    };
    m.ontransitionend = function(e) {
        if(e.target === this.element) {
            var t = this._transn,
                i = p[e.propertyName] || e.propertyName;
            if(delete t.ingProperties[i], o(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
                var n = t.onEnd[i];
                n.call(this), delete t.onEnd[i]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, m.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, m._removeStyles = function(e) {
        var t = {};
        for(var o in e) t[o] = "";
        this.css(t)
    };
    var y = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return m.removeTransitionStyles = function() {
        this.css(y)
    }, m.stagger = function(e) {
        e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
    }, m.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, m.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? void(this.once("transitionEnd", function() {
            this.removeElem()
        }), this.hide()) : void this.removeElem()
    }, m.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {},
            o = this.getHideRevealTransitionEndProperty("visibleStyle");
        t[o] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, m.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, m.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if(t.opacity) return "opacity";
        for(var o in t) return o
    }, m.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {},
            o = this.getHideRevealTransitionEndProperty("hiddenStyle");
        t[o] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, m.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, m.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, i
}),
function(e, t) {
    'use strict';
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(o, i, n, r) {
        return t(e, o, i, n, r)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, function(e, t, o, i, n) {
    'use strict';

    function r(e, t) {
        var o = i.getQueryElement(e);
        if(!o) return void(l && l.error("Bad element for " + this.constructor.namespace + ": " + (o || e)));
        this.element = o, m && (this.$element = m(this.element)), this.options = i.extend({}, this.constructor.defaults), this.option(t);
        var n = ++p;
        this.element.outlayerGUID = n, y[n] = this, this._create();
        var r = this._getOption("initLayout");
        r && this.layout()
    }

    function s(e) {
        function t() {
            e.apply(this, arguments)
        }
        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
    }

    function a(e) {
        if("number" == typeof e) return e;
        var t = e.match(/(^\d*\.?\d*)(\w*)/),
            o = t && t[1],
            i = t && t[2];
        if(!o.length) return 0;
        o = parseFloat(o);
        var n = u[i] || 1;
        return o * n
    }
    var l = e.console,
        m = e.jQuery,
        d = function() {},
        p = 0,
        y = {};
    r.namespace = "outlayer", r.Item = n, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var g = r.prototype;
    i.extend(g, t.prototype), g.option = function(e) {
        i.extend(this.options, e)
    }, g._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, g._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), i.extend(this.element.style, this.options.containerStyle);
        var e = this._getOption("resize");
        e && this.bindResize()
    }, g.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, g._itemize = function(e) {
        for(var t = this._filterFindItemElements(e), o = this.constructor.Item, n = [], r = 0; r < t.length; r++) {
            var s = t[r],
                a = new o(s, this);
            n.push(a)
        }
        return n
    }, g._filterFindItemElements = function(e) {
        return i.filterFindElements(e, this.options.itemSelector)
    }, g.getItemElements = function() {
        return this.items.map(function(e) {
            return e.element
        })
    }, g.layout = function() {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"),
            t = void 0 === e ? !this._isLayoutInited : e;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, g._init = g.layout, g._resetLayout = function() {
        this.getSize()
    }, g.getSize = function() {
        this.size = o(this.element)
    }, g._getMeasurement = function(e, t) {
        var i, n = this.options[e];
        n ? ("string" == typeof n ? i = this.element.querySelector(n) : n instanceof HTMLElement && (i = n), this[e] = i ? o(i)[t] : n) : this[e] = 0
    }, g.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, g._getItemsForLayout = function(e) {
        return e.filter(function(e) {
            return !e.isIgnored
        })
    }, g._layoutItems = function(e, t) {
        if(this._emitCompleteOnItems("layout", e), e && e.length) {
            var o = [];
            e.forEach(function(e) {
                var i = this._getItemLayoutPosition(e);
                i.item = e, i.isInstant = t || e.isLayoutInstant, o.push(i)
            }, this), this._processLayoutQueue(o)
        }
    }, g._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, g._processLayoutQueue = function(e) {
        this.updateStagger(), e.forEach(function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t)
        }, this)
    }, g.updateStagger = function() {
        var e = this.options.stagger;
        return null === e || void 0 === e ? void(this.stagger = 0) : (this.stagger = a(e), this.stagger)
    }, g._positionItem = function(e, t, o, n, r) {
        n ? e.goTo(t, o) : (e.stagger(r * this.stagger), e.moveTo(t, o))
    }, g._postLayout = function() {
        this.resizeContainer()
    }, g.resizeContainer = function() {
        var e = this._getOption("resizeContainer");
        if(e) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, g._getContainerSize = d, g._setContainerMeasure = function(e, t) {
        if(void 0 !== e) {
            var o = this.size;
            o.isBorderBox && (e += t ? o.paddingLeft + o.paddingRight + o.borderLeftWidth + o.borderRightWidth : o.paddingBottom + o.paddingTop + o.borderTopWidth + o.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
        }
    }, g._emitCompleteOnItems = function(e, t) {
        function o() {
            n.dispatchEvent(e + "Complete", null, [t])
        }

        function i() {
            s++, s == r && o()
        }
        var n = this,
            r = t.length;
        if(!t || !r) return void o();
        var s = 0;
        t.forEach(function(t) {
            t.once(e, i)
        })
    }, g.dispatchEvent = function(e, t, o) {
        var i = t ? [t].concat(o) : o;
        if(this.emitEvent(e, i), m)
            if(this.$element = this.$element || m(this.element), t) {
                var n = m.Event(t);
                n.type = e, this.$element.trigger(n, o)
            } else this.$element.trigger(e, o)
    }, g.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, g.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, g.stamp = function(e) {
        e = this._find(e), e && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, g.unstamp = function(e) {
        e = this._find(e), e && e.forEach(function(e) {
            i.removeFrom(this.stamps, e), this.unignore(e)
        }, this)
    }, g._find = function(e) {
        if(e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), e = i.makeArray(e), e
    }, g._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, g._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(),
            t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, g._manageStamp = d, g._getElementOffset = function(e) {
        var t = e.getBoundingClientRect(),
            i = this._boundingRect,
            n = o(e),
            r = {
                left: t.left - i.left - n.marginLeft,
                top: t.top - i.top - n.marginTop,
                right: i.right - t.right - n.marginRight,
                bottom: i.bottom - t.bottom - n.marginBottom
            };
        return r
    }, g.handleEvent = i.handleEvent, g.bindResize = function() {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, g.unbindResize = function() {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, g.onresize = function() {
        this.resize()
    }, i.debounceMethod(r, "onresize", 100), g.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, g.needsResizeLayout = function() {
        var e = o(this.element),
            t = this.size && e;
        return t && e.innerWidth !== this.size.innerWidth
    }, g.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, g.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, g.prepended = function(e) {
        var t = this._itemize(e);
        if(t.length) {
            var o = this.items.slice(0);
            this.items = t.concat(o), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(o)
        }
    }, g.reveal = function(e) {
        if(this._emitCompleteOnItems("reveal", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach(function(e, o) {
                e.stagger(o * t), e.reveal()
            })
        }
    }, g.hide = function(e) {
        if(this._emitCompleteOnItems("hide", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach(function(e, o) {
                e.stagger(o * t), e.hide()
            })
        }
    }, g.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, g.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t)
    }, g.getItem = function(e) {
        for(var t, o = 0; o < this.items.length; o++)
            if(t = this.items[o], t.element == e) return t
    }, g.getItems = function(e) {
        e = i.makeArray(e);
        var t = [];
        return e.forEach(function(e) {
            var o = this.getItem(e);
            o && t.push(o)
        }, this), t
    }, g.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function(e) {
            e.remove(), i.removeFrom(this.items, e)
        }, this)
    }, g.destroy = function() {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach(function(e) {
            e.destroy()
        }), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete y[t], delete this.element.outlayerGUID, m && m.removeData(this.element, this.constructor.namespace)
    }, r.data = function(e) {
        e = i.getQueryElement(e);
        var t = e && e.outlayerGUID;
        return t && y[t]
    }, r.create = function(e, t) {
        var o = s(r);
        return o.defaults = i.extend({}, r.defaults), i.extend(o.defaults, t), o.compatOptions = i.extend({}, r.compatOptions), o.namespace = e, o.data = r.data, o.Item = s(n), i.htmlInit(o, e), m && m.bridget && m.bridget(e, o), o
    };
    var u = {
        ms: 1,
        s: 1e3
    };
    return r.Item = n, r
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
}(window, function(e) {
    'use strict';

    function t() {
        e.Item.apply(this, arguments)
    }
    var o = t.prototype = Object.create(e.Item.prototype),
        i = o._create;
    o._create = function() {
        this.id = this.layout.itemGUID++, i.call(this), this.sortData = {}
    }, o.updateSortData = function() {
        if(!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var e = this.layout.options.getSortData,
                t = this.layout._sorters;
            for(var o in e) {
                var i = t[o];
                this.sortData[o] = i(this.element, this)
            }
        }
    };
    var n = o.destroy;
    return o.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, t
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
}(window, function(e, t) {
    'use strict';

    function o(e) {
        this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
    }
    var i = o.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(e) {
        i[e] = function() {
            return t.prototype[e].apply(this.isotope, arguments)
        }
    }), i.needsVerticalResizeLayout = function() {
        var t = e(this.isotope.element),
            o = this.isotope.size && t;
        return o && t.innerHeight != this.isotope.size.innerHeight
    }, i._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, i.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, i.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, i.getSegmentSize = function(e, t) {
        var o = e + t,
            i = "outer" + t;
        if(this._getMeasurement(o, i), !this[o]) {
            var n = this.getFirstItemSize();
            this[o] = n && n[i] || this.isotope.size["inner" + t]
        }
    }, i.getFirstItemSize = function() {
        var t = this.isotope.filteredItems[0];
        return t && t.element && e(t.element)
    }, i.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, i.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, o.modes = {}, o.create = function(e, t) {
        function n() {
            o.apply(this, arguments)
        }
        return n.prototype = Object.create(i), n.prototype.constructor = n, t && (n.options = t), n.prototype.namespace = e, o.modes[e] = n, n
    }, o
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, function(e, t) {
    var o = e.create("masonry");
    o.compatOptions.fitWidth = "isFitWidth";
    var i = o.prototype;
    return i._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for(var e = 0; e < this.cols; e++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, i.measureColumns = function() {
        if(this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0],
                o = e && e.element;
            this.columnWidth = o && t(o).outerWidth || this.containerWidth
        }
        var i = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            r = n / i,
            s = i - n % i,
            a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1)
    }, i.getContainerWidth = function() {
        var e = this._getOption("fitWidth"),
            o = e ? this.element.parentNode : this.element,
            i = t(o);
        this.containerWidth = i && i.innerWidth
    }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth,
            o = t && 1 > t ? "round" : "ceil",
            n = Math[o](e.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for(var r = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[r](n, e), a = {
                x: this.columnWidth * s.col,
                y: s.y
            }, l = s.y + e.size.outerHeight, m = n + s.col, d = s.col; d < m; d++) this.colYs[d] = l;
        return a
    }, i._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e),
            o = Math.min.apply(Math, t);
        return {
            col: t.indexOf(o),
            y: o
        }
    }, i._getTopColGroup = function(e) {
        if(2 > e) return this.colYs;
        for(var t = [], o = this.cols + 1 - e, n = 0; n < o; n++) t[n] = this._getColGroupY(n, e);
        return t
    }, i._getColGroupY = function(e, t) {
        if(2 > t) return this.colYs[e];
        var o = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, o)
    }, i._getHorizontalColPosition = function(e, t) {
        var o = this.horizontalColIndex % this.cols,
            i = 1 < e && o + e > this.cols;
        o = i ? 0 : o;
        var n = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = n ? o + e : this.horizontalColIndex, {
            col: o,
            y: this._getColGroupY(o, e)
        }
    }, i._manageStamp = function(e) {
        var o = t(e),
            n = this._getElementOffset(e),
            r = this._getOption("originLeft"),
            s = r ? n.left : n.right,
            a = s + o.outerWidth,
            l = Math.floor(s / this.columnWidth);
        l = Math.max(0, l);
        var m = Math.floor(a / this.columnWidth);
        m -= a % this.columnWidth ? 0 : 1, m = Math.min(this.cols - 1, m);
        for(var d = this._getOption("originTop"), p = (d ? n.top : n.bottom) + o.outerHeight, y = l; y <= m; y++) this.colYs[y] = Math.max(p, this.colYs[y])
    }, i._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, i._getContainerFitWidth = function() {
        for(var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, i.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, o
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
}(window, function(e, t) {
    'use strict';
    var o = e.create("masonry"),
        i = o.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for(var r in t.prototype) n[r] || (i[r] = t.prototype[r]);
    var s = i.measureColumns;
    i.measureColumns = function() {
        this.items = this.isotope.filteredItems, s.call(this)
    };
    var a = i._getOption;
    return i._getOption = function(e) {
        return "fitWidth" == e ? void 0 === this.options.isFitWidth ? this.options.fitWidth : this.options.isFitWidth : a.apply(this.isotope, arguments)
    }, o
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
}(window, function(e) {
    'use strict';
    var t = e.create("fitRows"),
        o = t.prototype;
    return o._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, o._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth + this.gutter,
            o = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && t + this.x > o && (this.x = 0, this.y = this.maxY);
        var i = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, i
    }, o._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, t
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
}(window, function(e) {
    'use strict';
    var t = e.create("vertical", {
            horizontalAlignment: 0
        }),
        o = t.prototype;
    return o._resetLayout = function() {
        this.y = 0
    }, o._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
            o = this.y;
        return this.y += e.size.outerHeight, {
            x: t,
            y: o
        }
    }, o._getContainerSize = function() {
        return {
            height: this.y
        }
    }, t
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(o, i, n, r, s, a) {
        return t(e, o, i, n, r, s, a)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
}(window, function(e, t, o, i, n, r, s) {
    function a(e, t) {
        return function(o, n) {
            for(var r = 0; r < e.length; r++) {
                var s = e[r],
                    l = o.sortData[s],
                    a = n.sortData[s];
                if(l > a || l < a) {
                    var m = void 0 === t[s] ? t : t[s],
                        d = m ? 1 : -1;
                    return (l > a ? 1 : -1) * d
                }
            }
            return 0
        }
    }
    var l = e.jQuery,
        m = String.prototype.trim ? function(e) {
            return e.trim()
        } : function(e) {
            return e.replace(/^\s+|\s+$/g, "")
        },
        d = t.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = r, d.LayoutMode = s;
    var p = d.prototype;
    p._create = function() {
        for(var e in this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], s.modes) this._initLayoutMode(e)
    }, p.reloadItems = function() {
        this.itemGUID = 0, t.prototype.reloadItems.call(this)
    }, p._itemize = function() {
        for(var e, o = t.prototype._itemize.apply(this, arguments), n = 0; n < o.length; n++) e = o[n], e.id = this.itemGUID++;
        return this._updateItemsSortData(o), o
    }, p._initLayoutMode = function(e) {
        var t = s.modes[e],
            o = this.options[e] || {};
        this.options[e] = t.options ? n.extend(t.options, o) : o, this.modes[e] = new t(this)
    }, p.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, p._layout = function() {
        var e = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
    }, p.arrange = function(e) {
        this.option(e), this._getIsInstant();
        var t = this._filter(this.items);
        this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t), this._sort(), this._layout()
    }, p._init = p.arrange, p._hideReveal = function(e) {
        this.reveal(e.needReveal), this.hide(e.needHide)
    }, p._getIsInstant = function() {
        var e = this._getOption("layoutInstant"),
            t = void 0 === e ? !this._isLayoutInited : e;
        return this._isInstant = t, t
    }, p._bindArrangeComplete = function() {
        function e() {
            t && o && i && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var t, o, i, n = this;
        this.once("layoutComplete", function() {
            t = !0, e()
        }), this.once("hideComplete", function() {
            o = !0, e()
        }), this.once("revealComplete", function() {
            i = !0, e()
        })
    }, p._filter = function(e) {
        var t = this.options.filter;
        t = t || "*";
        for(var o, n = [], r = [], s = [], a = this._getFilterTest(t), l = 0; l < e.length; l++)
            if(o = e[l], !o.isIgnored) {
                var m = a(o);
                m && n.push(o), m && o.isHidden ? r.push(o) : !m && !o.isHidden && s.push(o)
            } return {
            matches: n,
            needReveal: r,
            needHide: s
        }
    }, p._getFilterTest = function(e) {
        return l && this.options.isJQueryFiltering ? function(t) {
            return l(t.element).is(e)
        } : "function" == typeof e ? function(t) {
            return e(t.element)
        } : function(t) {
            return i(t.element, e)
        }
    }, p.updateSortData = function(e) {
        var t;
        e ? (e = n.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
    }, p._getSorters = function() {
        var e = this.options.getSortData;
        for(var t in e) {
            var o = e[t];
            this._sorters[t] = y(o)
        }
    }, p._updateItemsSortData = function(e) {
        for(var t, o = e && e.length, n = 0; o && n < o; n++) t = e[n], t.updateSortData()
    };
    var y = function() {
        function e(e, t) {
            return e ? function(t) {
                return t.getAttribute(e)
            } : function(e) {
                var o = e.querySelector(t);
                return o && o.textContent
            }
        }
        return function(t) {
            if("string" != typeof t) return t;
            var o = m(t).split(" "),
                i = o[0],
                n = i.match(/^\[(.+)\]$/),
                r = n && n[1],
                s = e(r, i),
                a = d.sortDataParsers[o[1]];
            return t = a ? function(e) {
                return e && a(s(e))
            } : function(e) {
                return e && s(e)
            }, t
        }
    }();
    d.sortDataParsers = {
        parseInt: function(e) {
            return parseInt(e, 10)
        },
        parseFloat: function(e) {
            return parseFloat(e)
        }
    }, p._sort = function() {
        if(this.options.sortBy) {
            var e = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(e) || (this.sortHistory = e.concat(this.sortHistory));
            var t = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(t)
        }
    }, p._getIsSameSortBy = function(e) {
        for(var t = 0; t < e.length; t++)
            if(e[t] != this.sortHistory[t]) return !1;
        return !0
    }, p._mode = function() {
        var e = this.options.layoutMode,
            t = this.modes[e];
        if(!t) throw new Error("No layout mode: " + e);
        return t.options = this.options[e], t
    }, p._resetLayout = function() {
        t.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, p._getItemLayoutPosition = function(e) {
        return this._mode()._getItemLayoutPosition(e)
    }, p._manageStamp = function(e) {
        this._mode()._manageStamp(e)
    }, p._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, p.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, p.appended = function(e) {
        var t = this.addItems(e);
        if(t.length) {
            var o = this._filterRevealAdded(t);
            this.filteredItems = this.filteredItems.concat(o)
        }
    }, p.prepended = function(e) {
        var t = this._itemize(e);
        if(t.length) {
            this._resetLayout(), this._manageStamps();
            var o = this._filterRevealAdded(t);
            this.layoutItems(this.filteredItems), this.filteredItems = o.concat(this.filteredItems), this.items = t.concat(this.items)
        }
    }, p._filterRevealAdded = function(e) {
        var t = this._filter(e);
        return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
    }, p.insert = function(e) {
        var t = this.addItems(e);
        if(t.length) {
            var o, n, r = t.length;
            for(o = 0; o < r; o++) n = t[o], this.element.appendChild(n.element);
            var s = this._filter(t).matches;
            for(o = 0; o < r; o++) t[o].isLayoutInstant = !0;
            for(this.arrange(), o = 0; o < r; o++) delete t[o].isLayoutInstant;
            this.reveal(s)
        }
    };
    var g = p.remove;
    return p.remove = function(e) {
        e = n.makeArray(e);
        var t = this.getItems(e);
        g.call(this, e);
        for(var o, r = t && t.length, s = 0; r && s < r; s++) o = t[s], n.removeFrom(this.filteredItems, o)
    }, p.shuffle = function() {
        for(var e, t = 0; t < this.items.length; t++) e = this.items[t], e.sortData.random = Math.random();
        this.options.sortBy = "random", this._sort(), this._layout()
    }, p._noTransition = function(e, t) {
        var o = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var i = e.apply(this, t);
        return this.options.transitionDuration = o, i
    }, p.getFilteredItemElements = function() {
        return this.filteredItems.map(function(e) {
            return e.element
        })
    }, d
});
