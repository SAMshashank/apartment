/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? {
                top: 0,
                left: 0
            } : f ? null : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.7", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);

/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

;
(function($) {

    'use strict';

    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };

        if (!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function() {
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var ignoreList = '.fitvidsignore';

            if (settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

            $allVideos.each(function() {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return; // Disable FitVids on this video.
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('name')) {
                    var videoName = 'fitvid' + $.fn.fitVids._count;
                    $this.attr('name', videoName);
                    $.fn.fitVids._count++;
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + '%');
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };

    // Internal counter for unique video names.
    $.fn.fitVids._count = 0;

    // Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
            return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(a, b) {
        var c = this._items.length,
            e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings,
            f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c, e = 1,
            f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c),
            e = [],
            f = 0;
        a.each(d, function(b, c) {
            e.push(a(c).height())
        }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = function() {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, e.prototype.swap = function() {
            if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                this.core.speed(0);
                var b, c = a.proxy(this.clear, this),
                    d = this.core.$stage.children().eq(this.previous),
                    e = this.core.$stage.children().eq(this.next),
                    f = this.core.settings.animateIn,
                    g = this.core.settings.animateOut;
                this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                    left: b + "px"
                }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
            }
        }, e.prototype.clear = function(b) {
            a(b.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, e.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        },
        a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function(a, b) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, e.prototype._getNextTimeout = function(d, e) {
        return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout)
    }, e.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout()
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);



/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function(c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        },
        close: function() {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                    el: a(e)
                } : (d = e.type, e = {
                    data: e,
                    src: e.src
                }), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline",
        G = function() {
            E && (D.after(E.addClass(C)).detach(), E = null)
        };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F), w(h + "." + F, function() {
                    G()
                })
            },
            getInline: function(c, d) {
                if (G(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax",
        J = function() {
            H && a(document.body).removeClass(H)
        },
        K = function() {
            J(), b.req && b.req.abort()
        };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"), w(m + d, function() {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration,
                        j = function(a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                f = "transition";
                            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                        },
                        k = function() {
                            b.content.css("visibility", "visible")
                        };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                f.css(b._getOffset(!0)), e = setTimeout(function() {
                                    k(), setTimeout(function() {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function() {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function() {
                    R()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function(a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function() {
                            b.prev()
                        }), f.click(function() {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function() {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});

(function($, window, document, undefined) {
    function appendPrefixedStyles(obj, prop, val) {
        if (prop.charAt(0) === '*') {
            obj[prop.substring(1)] = val;
        } else {
            obj['-ms-' + prop] = val;
            obj['-webkit-' + prop] = val;
            obj[prop] = val;
        }
    }
    $.fn.precss = function(styles) {
        var prefixedStyles = {};
        if (arguments.length === 1) {
            for (style in styles) {
                if (styles.hasOwnProperty(style)) {
                    appendPrefixedStyles(prefixedStyles, style, styles[style]);
                }
            }
        } else {
            appendPrefixedStyles(prefixedStyles, arguments[0], arguments[1]);
        }
        this.css(prefixedStyles);
        return this;
    }
})(jQuery, window, document);
(function($, window, document, undefined) {
    'use strict';
    var supportsCSSProp = function(featurename) {
        var feature = false;
        var domPrefixes = 'Webkit Moz ms O'.split(' ');
        var elm = document.createElement('div');
        var featurenameCapital = null;
        featurename = featurename.toLowerCase();
        if (elm.style[featurename]) {
            feature = true;
        }
        if (feature === false) {
            featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + featurenameCapital] !== undefined) {
                    feature = true;
                    break;
                }
            }
        }
        return feature;
    };
    var supports = {};
    supports.animation = supportsCSSProp('animation');
    supports.transition = supportsCSSProp('transition');
    supports.transform = supportsCSSProp('transform');
    var pluginName = 'pogoSlider';
    var defaults = {
        autoplayTimeout: 4000,
        autoplay: true,
        baseZindex: 1,
        displayProgess: true,
        onSlideStart: null,
        onSlideEnd: null,
        onSliderPause: null,
        onSliderResume: null,
        slideTransition: 'slide',
        slideTransitionDuration: 1000,
        elementTransitionStart: 500,
        elementTransitionDuration: 1000,
        elementTransitionIn: 'slideUp',
        elementTransitionOut: 'slideDown',
        generateButtons: true,
        buttonPosition: 'CenterHorizontal',
        generateNav: true,
        navPosition: 'Bottom',
        preserveTargetSize: false,
        targetWidth: 1000,
        targetHeight: 300,
        responsive: false,
        pauseOnHover: true
    };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this.currentSlideIndex = 0;
        this.prevSlideIndex = 0;
        this.slideTimeoutId = 0;
        this.slides = [];
        this.calls = [];
        this.paused = false;
        this.navigating = false;
        this.slideStartTime = null;
        this.slideTimeRemaining = 0;
        this._init();
    }
    Plugin.prototype = {
        _init: function() {
            var self = this;
            self.$element.find('.pogoSlider-slide').each(function() {
                var children = [];
                var elementTransitionDuration = 0;
                $(this).data('original-styles', $(this).attr('style'));
                $(this).find('.pogoSlider-slide-element').each(function() {
                    var startTime = parseInt($(this).data('start')) !== undefined ? $(this).data('start') : self.settings.elementTransitionStart;
                    var duration = parseInt($(this).data('duration')) || self.settings.elementTransitionDuration;
                    if ((startTime + duration) > elementTransitionDuration) {
                        elementTransitionDuration = (startTime + duration);
                    }
                    children.push({
                        $element: $(this),
                        element: this,
                        startTime: startTime,
                        duration: duration,
                        transitionIn: $(this).data('in') || self.settings.elementTransitionIn,
                        transitionOut: $(this).data('out') || self.settings.elementTransitionOut
                    });
                    $(this).css('opacity', 0);
                });
                var slide = {
                    $element: $(this),
                    element: this,
                    transition: $(this).data('transition') || self.settings.slideTransition,
                    duration: parseInt($(this).data('duration')) || self.settings.slideTransitionDuration,
                    elementTransitionDuration: elementTransitionDuration,
                    totalSlideDuration: self.settings.autoplayTimeout + elementTransitionDuration,
                    children: children
                };
                self.slides.push(slide);
            });
            self.numSlides = self.slides.length;
            self.slides[0].$element.css('opacity', 1);
            if (self.settings.autoplay && self.settings.displayProgess) {
                self._createProgessBar();
            }
            self.$element.css('padding-bottom', (100 / (self.settings.targetWidth / self.settings.targetHeight)) + '%');
            var numImages = self.$element.find('img').length;
            if (numImages > 0) {
                var imagesLoaded = 0;
                self.$element.prepend('<div class="pogoSlider-loading"><div class="pogoSlider-loading-icon"></div></div>');
                self.$element.find('img').one('load', function() {
                    if (++imagesLoaded === numImages) {
                        $('.pogoSlider-loading').remove();
                        self._onSliderReady();
                    }
                }).each(function() {
                    if (this.complete) {
                        $(this).trigger('load');
                    }
                });
            } else {
                self._onSliderReady();
            }
        },
        _onSliderReady: function() {
            var self = this;
            if (self.settings.autoplay) {
                self.slideStartTime = new Date();
                self.slideTimeRemaining = self.slides[0].totalSlideDuration;
                self._slideTimeout(self.slideTimeRemaining);
            }
            if (self.settings.generateButtons && self.slides.length > 1) {
                self._createDirButtons();
            }
            if (self.settings.generateNav && self.slides.length > 1) {
                self._createNavigation();
            }
            if (self.settings.preserveTargetSize) {
                self._preserveTargetSize();
                if (self.settings.responsive) {
                    $(window).on('resize', function() {
                        self._preserveTargetSize();
                    });
                }
            }
            if (self.settings.pauseOnHover) {
                self.$element.on('mouseenter', function() {
                    self.pause();
                });
                self.$element.on('mouseleave', function() {
                    self.resume();
                });
            }
            self._onSlideStart(0);
        },
        _createDirButtons: function() {
            var self = this;
            self.$element.addClass('pogoSlider--dir' + self.settings.buttonPosition);
            $('<button class="pogoSlider-dir-btn pogoSlider-dir-btn--prev"></button>').appendTo(self.$element).on('click', function() {
                self.prevSlide();
            });
            $('<button class="pogoSlider-dir-btn pogoSlider-dir-btn--next"></button>').appendTo(self.$element).on('click', function() {
                self.nextSlide();
            });
        },
        _createNavigation: function() {
            var self = this;
            self.$element.addClass('pogoSlider--nav' + self.settings.navPosition);
            var $navContainer = $('<ul class="pogoSlider-nav"></ul>').appendTo(self.$element);
            for (var i = 0; i < self.slides.length; i++) {
                $('<li data-num="' + i + '"><button class="pogoSlider-nav-btn"></button></li>').appendTo($navContainer).on('click', function() {
                    self.toSlide($(this).data('num'));
                });
            }
        },
        getAppliedProps: function(el) {
            var styleSheets = document.styleSheets;
            var stylesReg = new RegExp('{(.+)}');
            el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
            var inlineStyles = el.getAttribute('style').replace(/ /g, '').split(';');
            var props = [];
            for (var k = 0; k < inlineStyles.length; k++) {
                var inlineProp = inlineStyles[k].split(':')[0];
                if (inlineProp && props.indexOf(inlineProp) === -1) {
                    props.push(inlineProp);
                }
            }
            return props;
        },
        _preserveTargetSize: function() {
            var self = this;
            var unitReg = new RegExp('px|%|em', 'i');
            var numReg = new RegExp('[0-9]*.?[0-9]+');
            var pixelReg = new RegExp('px', 'i');
            var scaleFactor = 1;
            if (this.scaledBy) {
                scaleFactor = (this.$element.width() / this.settings.targetWidth) / this.scaledBy;
            } else {
                scaleFactor = this.$element.width() / this.settings.targetWidth;
            }
            this.scaledBy = this.$element.width() / this.settings.targetWidth;
            this.$element.find('.pogoSlider-slide-element').each(function() {
                var elementStyles = window.getComputedStyle(this);
                var appliedProps = self.getAppliedProps(this);
                var styleObj = {};
                if (!$.data(self, 'originalStyles')) {
                    $.data(self, 'originalStyles', $(this).attr('style'));
                }
                for (var i = 0; i < appliedProps.length; i++) {
                    var cssVal = elementStyles.getPropertyValue(appliedProps[i]);
                    if (unitReg.test(cssVal) && numReg.test(cssVal)) {
                        var numVal = numReg.exec(cssVal);
                        var unitVal = unitReg.exec(cssVal);
                        if (pixelReg.test(unitVal[0])) {
                            styleObj[appliedProps[i]] = Math.ceil(numVal[0] * scaleFactor) + unitVal[0];
                        } else {
                            styleObj[appliedProps[i]] = (numVal[0] * scaleFactor) + unitVal[0];
                        }
                    }
                }
                $(this).css(styleObj);
            });
        },
        _createProgessBar: function() {
            var progressHtml = '';
            progressHtml += '<div class="pogoSlider-progressBar">';
            progressHtml += '<div class="pogoSlider-progressBar-duration"></div>';
            progressHtml += '</div>';
            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].$element.prepend(progressHtml);
            }
        },
        _slideTimeout: function(pauseFor) {
            var self = this;
            var timeoutId;
            timeoutId = self.slideTimeoutId = setTimeout(function() {
                if (!self.paused && timeoutId === self.slideTimeoutId) {
                    self._changeToNext();
                }
            }, pauseFor);
        },
        pause: function() {
            if (this.settings.autoplay) {
                this.paused = true;
                clearTimeout(this.slideTimeoutId);
                if (this.settings.displayProgess) {
                    this.$element.find('.pogoSlider-progressBar-duration').stop(true);
                }
                this.slidePauseTime = new Date();
                this.slideTimeRemaining = this.slideTimeRemaining - ((new Date()) - this.slideStartTime);
                for (var i = 0; i < this.slides[this.currentSlideIndex].children.length; i++) {
                    this.slides[this.currentSlideIndex].children[i].$element.precss('animation-play-state', '');
                }
                if (this.settings.onSliderPause) {
                    this.settings.onSliderPause.apply(this);
                }
            }
        },
        resume: function() {
            if (this.settings.autoplay) {
                this.paused = false;
                this.slideStartTime = new Date();
                for (var i = 0; i < this.slides[this.currentSlideIndex].children.length; i++) {
                    this.slides[this.currentSlideIndex].children[i].$element.precss('animation-play-state', '');
                }
                if (this.slideTimeRemaining > 0 && !this.navigating) {
                    if (this.settings.displayProgess) {
                        this.$element.find('.pogoSlider-progressBar-duration').animate({
                            'width': '100%'
                        }, this.slideTimeRemaining, 'linear');
                    }
                    this._slideTimeout(this.slideTimeRemaining);
                }
                if (this.settings.onSliderResume) {
                    this.settings.onSliderResume.apply(this);
                }
            }
        },
        nextSlide: function() {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                this.prevSlideIndex = this.currentSlideIndex;
                if (++this.currentSlideIndex > (this.numSlides - 1)) {
                    this.currentSlideIndex = 0;
                }
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
            }
        },
        prevSlide: function() {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                this.prevSlideIndex = this.currentSlideIndex;
                if (--this.currentSlideIndex < 0) {
                    this.currentSlideIndex = this.numSlides - 1;
                }
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
            }
        },
        toSlide: function(slideIndex) {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                if (slideIndex === this.currentSlideIndex || slideIndex > (this.slides.length - 1)) {
                    return;
                }
                this.prevSlideIndex = this.currentSlideIndex;
                this.currentSlideIndex = slideIndex;
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
            }
        },
        destroy: function() {
            this.paused = true;
            clearTimeout(this.slideTimeoutId);
            $.removeData(this.element, 'plugin_' + pluginName);
        },
        _changeToNext: function() {
            this.prevSlideIndex = this.currentSlideIndex;
            if (++this.currentSlideIndex > (this.numSlides - 1)) {
                this.currentSlideIndex = 0;
            }
            this._changeSlide(this.prevSlideIndex, this.currentSlideIndex);
        },
        _changeSlide: function(prevSlideIndex, currentSlideIndex) {
            var self = this;
            var slideTransitions;
            self._onSlideEnd(prevSlideIndex);
            self.navigating = true;
            if (supports.animation && supports.transition && supports.transform) {
                slideTransitions = self.slideTransitions;
            } else {
                slideTransitions = self.compatSlideTransitions;
            }
            var slideTransition = slideTransitions[self.slides[currentSlideIndex].transition] ? self.slides[currentSlideIndex].transition : 'slide';
            var slideTransitionCallback = slideTransitions[slideTransition].apply(self, [prevSlideIndex, currentSlideIndex]);
            setTimeout(function() {
                if (slideTransitionCallback) {
                    slideTransitionCallback();
                }
                self.navigating = false;
                self._slideCleanup(prevSlideIndex, false);
                self._slideElementCleanup(prevSlideIndex);
                if (self.settings.autoplay) {
                    self._slideTimeout(self.slides[currentSlideIndex].totalSlideDuration);
                }
                self._onSlideStart(currentSlideIndex);
            }, self.slides[currentSlideIndex].duration);
        },
        _onSlideStart: function(slideIndex) {
            this.slides[slideIndex].$element.css('z-index', 1);
            if (this.settings.autoplay) {
                this.slideStartTime = new Date();
                this.slideTimeRemaining = this.slides[slideIndex].totalSlideDuration;
                if (this.settings.displayProgess && !this.paused) {
                    this.slides[slideIndex].$element.find('.pogoSlider-progressBar-duration').css('width', '0').animate({
                        'width': '100%'
                    }, this.slideTimeRemaining, 'linear');
                }
            }
            if (this.slides[slideIndex].children.length > 0) {
                this._slideElementsTransitionIn(slideIndex);
            }
            if (this.paused) {
                for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                    this.slides[slideIndex].children[i].$element.precss('animation-play-state', '');
                }
            }
            if (this.settings.generateNav) {
                this.$element.find('.pogoSlider-nav-btn').removeClass('pogoSlider-nav-btn--selected');
                this.$element.find('.pogoSlider-nav-btn').eq(slideIndex).addClass('pogoSlider-nav-btn--selected');
            }
            if (this.settings.onSlideStart) {
                this.settings.onSlideStart.apply(this);
            }
        },
        _onSlideEnd: function(slideIndex) {
            var timeElapsed;
            if (this.settings.autoplay) {
                if (this.settings.displayProgess) {
                    this.slides[slideIndex].$element.find('.pogoSlider-progressBar-duration').stop(true).css('width', '0');
                }
            }
            if (this.paused) {
                timeElapsed = this.slides[slideIndex].totalSlideDuration - this.slideTimeRemaining;
                for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                    this.slides[slideIndex].children[i].$element.precss('animation-play-state', '');
                }
            } else {
                timeElapsed = this.slides[slideIndex].totalSlideDuration - (this.slideTimeRemaining - ((new Date()) - this.slideStartTime));
            }
            if (this.slides[slideIndex].children.length > 0 && timeElapsed > this.slides[slideIndex].elementTransitionDuration) {
                this._slideElementsTransitionOut(slideIndex);
            }
            if (this.settings.onSlideEnd) {
                this.settings.onSlideEnd.apply(this);
            }
        },
        _slideElementsTransitionIn: function(slideIndex) {
            for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                var el = this.slides[slideIndex].children[i];
                el.$element.precss({
                    '*opacity': 1,
                    'animation-duration': el.duration + 'ms',
                    'animation-delay': el.startTime + 'ms'
                }).addClass('pogoSlider-animation-' + el.transitionIn + 'In');
            }
        },
        _slideElementsTransitionOut: function(slideIndex) {
            for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                var el = this.slides[slideIndex].children[i];
                el.$element.precss('animation-delay', '').removeClass('pogoSlider-animation-' + el.transitionIn + 'In').addClass('pogoSlider-animation-' + el.transitionOut + 'Out');
            }
        },
        _slideCleanup: function(slideIndex, slideVisible) {
            if (this.slides[slideIndex].$element.find('.pogoSlider-slide-slice').length > 0) {
                this._removeSlideSlices(slideIndex);
            }
            this.slides[slideIndex].$element.attr('style', this.slides[slideIndex].$element.data('original-styles')).css('opacity', slideVisible ? '1' : '0');
        },
        _slideElementCleanup: function(slideIndex) {
            var removePogoSlideElementClasses = function(index, className) {
                return (className.match(/pogoSlider-(?:(?:transition)|(?:animation))(?:-[a-zA-Z0-9]+)?(?:--[a-z]+)?/gi) || []).join(' ');
            };
            var removePogoSlideElementStyles = function(index, style) {
                return style.replace(/(?:-webkit-)?(?:-ms-)?((?:transition)|(?:animation))[^;]+;/g, '');
            };
            this.slides[slideIndex].$element.find('.pogoSlider-progressBar-duration').css('width', '0');
            for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                this.slides[slideIndex].children[i].$element.removeClass(removePogoSlideElementClasses).attr('style', removePogoSlideElementStyles).css('opacity', 0);
            }
        },
        _createSlideSlices: function(slideIndex, rows, cols) {
            var numSlices = cols * rows;
            var sliceWidth = 100 / cols;
            var sliceHeight = 100 / rows;
            var sliceInnerWidth = 100 * cols;
            var sliceInnerHeight = 100 * rows;
            var $el = this.slides[slideIndex].$element;
            var styleAttr = $el.attr('style');
            var timeElapsed;
            if (this.paused) {
                timeElapsed = this.slides[slideIndex].totalSlideDuration - this.slideTimeRemaining;
            } else {
                timeElapsed = this.slides[slideIndex].totalSlideDuration - (this.slideTimeRemaining - ((new Date()) - this.slideStartTime));
            }
            if (slideIndex === this.prevSlideIndex && this.slides[slideIndex].children.length > 0 && timeElapsed < this.slides[slideIndex].elementTransitionDuration) {
                for (var i = 0; i < this.slides[slideIndex].children.length; i++) {
                    var animationDelay = (this.slides[slideIndex].children[i].startTime - timeElapsed) + 'ms';
                    this.slides[slideIndex].children[i].$element.precss('animation-delay', animationDelay);
                }
            }
            $el.children().wrapAll('<div class="pogoSlider-slide-slice" style="' + 'width:' + sliceWidth + '%;height:' + sliceHeight + '%;top:0%;left:0%;' + '"/>').wrapAll('<div class="pogoSlider-slide-slice-inner" style="' + styleAttr + 'width:' + sliceInnerWidth + '%;height:' + sliceInnerHeight + '%;top:0%;left:0%;' + '"/>');
            $el.attr('style', function(i, style) {
                return style.replace(/(?:background)[^;]+;/g, '');
            });
            for (var j = 0; j < numSlices; j++) {
                var colNum = j % rows;
                var rowNum = Math.floor(j / rows);
                var slicePosStyles = 'width:' + sliceWidth + '%;height:' + sliceHeight + '%;top:' + (sliceHeight * colNum) + '%;left:' + (sliceWidth * rowNum) + '%;';
                var sliceInnerPosStyles = 'width:' + sliceInnerWidth + '%;height:' + sliceInnerHeight + '%;top:-' + (100 * colNum) + '%;left:-' + (100 * rowNum) + '%;';
                var sliceInnerBackgroundStyles = '';
                if (this.settings.preserveTargetSize) {
                    sliceInnerBackgroundStyles = 'background-size:' + this.$element.width() + 'px ' + parseFloat(this.$element.css('padding-bottom')) + 'px;';
                }
                var el = $el.find('.pogoSlider-slide-slice').last();
                if (j != 0) {
                    el = el.clone(true, true).appendTo(this.slides[slideIndex].element);
                }
                el.attr('style', slicePosStyles).find('.pogoSlider-slide-slice-inner').attr('style', styleAttr + sliceInnerPosStyles + sliceInnerBackgroundStyles);
            }
        },
        _removeSlideSlices: function(slideIndex) {
            var self = this;
            var $el = self.slides[slideIndex].$element;
            $el.attr('style', $el.data('original-styles'));
            $el.find('.pogoSlider-slide-slice').not(':first').remove();
            $el.find('.pogoSlider-slide-slice-inner').children().unwrap();
            $el.find('.pogoSlider-slide-slice').children().unwrap();
        },
        _generateARandomArray: function(numItems) {
            var arr = [];
            for (var i = 0; i < numItems; i++) {
                arr.push(i);
            }
            for (var j = arr.length - 1; j > 0; j--) {
                var k = Math.floor(Math.random() * (j + 1));
                var temp = arr[j];
                arr[j] = arr[k];
                arr[k] = temp;
            }
            return arr;
        },
        slideTransitions: {
            fade: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.precss({
                    '*opacity': '0',
                    'transition-duration': currentSlide.duration + 'ms'
                });
                currentSlide.$element.precss({
                    '*opacity': '1',
                    'transition-duration': currentSlide.duration + 'ms'
                });
            },
            slide: function(prevSlideIndex, currentSlideIndex) {
                var method;
                if (currentSlideIndex === 0 && prevSlideIndex === this.slides.length - 1) {
                    method = 'slideLeft';
                } else if (prevSlideIndex === 0 && currentSlideIndex === this.slides.length - 1) {
                    method = 'slideRight';
                } else if (currentSlideIndex > prevSlideIndex) {
                    method = 'slideLeft';
                } else {
                    method = 'slideRight';
                }
                return this.slideTransitions[method].apply(this, [prevSlideIndex, currentSlideIndex]);
            },
            verticalSlide: function(prevSlideIndex, currentSlideIndex) {
                var method;
                if (currentSlideIndex === 0 && prevSlideIndex === this.slides.length - 1) {
                    method = 'slideUp';
                } else if (prevSlideIndex === 0 && currentSlideIndex === this.slides.length - 1) {
                    method = 'slideDown';
                } else if (currentSlideIndex > prevSlideIndex) {
                    method = 'slideUp';
                } else {
                    method = 'slideDown';
                }
                return this.slideTransitions[method].apply(this, [prevSlideIndex, currentSlideIndex]);
            },
            slideLeft: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss('animation-duration', currentSlide.duration + 'ms').addClass('pogoSlider-animation-leftOut');
                currentSlide.$element.precss({
                    '*opacity': '1',
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-leftIn');
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-leftOut');
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-leftIn');
                };
            },
            slideRight: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss('animation-duration', currentSlide.duration + 'ms').addClass('pogoSlider-animation-rightOut');
                currentSlide.$element.precss({
                    '*opacity': '1',
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-rightIn');
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-rightOut');
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-rightIn');
                };
            },
            slideUp: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss('animation-duration', currentSlide.duration + 'ms').addClass('pogoSlider-animation-upOut');
                currentSlide.$element.precss({
                    '*opacity': '1',
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-upIn');
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-upOut');
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-upIn');
                };
            },
            slideDown: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss('animation-duration', currentSlide.duration + 'ms').addClass('pogoSlider-animation-downOut');
                currentSlide.$element.precss({
                    '*opacity': '1',
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-downIn');
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-downOut');
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-downIn');
                };
            },
            slideRevealLeft: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss({
                    '*z-index': self.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-leftOut');
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-leftOut');
                };
            },
            slideRevealRight: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss({
                    '*z-index': self.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-rightOut');
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-rightOut');
                };
            },
            slideOverLeft: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                currentSlide.$element.precss({
                    '*opacity': '1',
                    '*z-index': this.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-leftIn');
                return function() {
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-leftIn');
                };
            },
            slideOverRight: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                currentSlide.$element.precss({
                    '*opacity': '1',
                    '*z-index': this.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-rightIn');
                return function() {
                    currentSlide.$element.attr('style', currentSlide.$element.data('original-styles')).css('opacity', '1').removeClass('pogoSlider-animation-rightIn');
                };
            },
            expandReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.$element.css('overflow', 'visible');
                self.slides[prevSlideIndex].$element.precss({
                    '*z-index': self.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-expandReveal');
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                return function() {
                    self.$element.css('overflow', '');
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-expandReveal');
                };
            },
            shrinkReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.precss({
                    '*z-index': self.settings.baseZindex + 1,
                    'animation-duration': currentSlide.duration + 'ms'
                }).addClass('pogoSlider-animation-shrinkReveal');
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                return function() {
                    self.slides[prevSlideIndex].$element.removeClass('pogoSlider-animation-shrinkReveal');
                };
            },
            verticalSplitReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, 2);
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                $slices.precss('animation-duration', currentSlide.duration + 'ms');
                $slices.eq(0).addClass('pogoSlider-animation-leftOut');
                $slices.eq(1).addClass('pogoSlider-animation-rightOut');
            },
            horizontalSplitReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 2, 1);
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                $slices.precss('animation-duration', currentSlide.duration + 'ms');
                $slices.eq(0).addClass('pogoSlider-animation-upOut');
                $slices.eq(1).addClass('pogoSlider-animation-downOut');
            },
            zipReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, Math.round(self.$element.width() / 100));
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                $slices.precss('animation-duration', currentSlide.duration + 'ms');
                $slices.each(function(index) {
                    if (index % 2 === 0) {
                        $(this).addClass('pogoSlider-animation-upOut');
                    } else {
                        $(this).addClass('pogoSlider-animation-downOut');
                    }
                });
            },
            barRevealDown: function(prevSlideIndex, currentSlideIndex) {
                return this.slideTransitions['barReveal'].apply(this, [prevSlideIndex, currentSlideIndex, 'down']);
            },
            barRevealUp: function(prevSlideIndex, currentSlideIndex) {
                return this.slideTransitions['barReveal'].apply(this, [prevSlideIndex, currentSlideIndex, 'up']);
            },
            barReveal: function(prevSlideIndex, currentSlideIndex, direction) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, Math.round(self.$element.width() / 100));
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                var animationDelay = currentSlide.duration / ($slices.length + 1);
                var animationDuration = animationDelay * 2;
                $slices.precss('animation-duration', animationDuration + 'ms');
                $slices.each(function(index) {
                    if (direction === 'down') {
                        $(this).addClass('pogoSlider-animation-downOut').precss('animation-delay', animationDelay * index + 'ms');
                    } else {
                        $(this).addClass('pogoSlider-animation-upOut').precss('animation-delay', animationDelay * index + 'ms');
                    }
                });
            },
            blocksReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                var height = 0;
                if (self.settings.preserveTargetSize) {
                    height = parseFloat(self.$element.css('padding-bottom'));
                } else {
                    height = self.$element.height();
                }
                var numRows = Math.round(height / 100);
                var numCols = Math.round(self.$element.width() / 100);
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                var randArr = self._generateARandomArray(numRows * numCols);
                self._createSlideSlices(prevSlideIndex, numRows, numCols);
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                var animationDelay = currentSlide.duration / ($slices.length + 1);
                var animationDuration = animationDelay * 2;
                $slices.precss('animation-duration', animationDuration + 'ms');
                for (var i = 0; i < $slices.length; i++) {
                    $slices.eq(randArr.pop()).precss('animation-delay', (animationDelay * i) + 'ms').addClass('pogoSlider-animation-blocksReveal');
                }
            },
            fold: function(prevSlideIndex, currentSlideIndex) {
                var method;
                if (currentSlideIndex === 0 && prevSlideIndex === this.slides.length - 1) {
                    method = 'foldLeft';
                } else if (prevSlideIndex === 0 && currentSlideIndex === this.slides.length - 1) {
                    method = 'foldRight';
                } else if (currentSlideIndex > prevSlideIndex) {
                    method = 'foldLeft';
                } else {
                    method = 'foldRight';
                }
                return this.slideTransitions[method].apply(this, [prevSlideIndex, currentSlideIndex]);
            },
            foldRight: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                var prevSlide = self.slides[prevSlideIndex];
                self.$element.css('overflow', 'visible');
                prevSlide.$element.css({
                    'overflow': 'visible',
                    'z-index': self.settings.baseZindex
                });
                currentSlide.$element.css({
                    'opacity': 1,
                    'overflow': 'visible',
                    'z-index': self.settings.baseZindex + 1
                });
                self._createSlideSlices(prevSlideIndex, 1, 2);
                var $prevSlideSlices = prevSlide.$element.find('.pogoSlider-slide-slice');
                self._createSlideSlices(currentSlideIndex, 1, 2);
                var $currentSlideSlices = self.slides[currentSlideIndex].$element.find('.pogoSlider-slide-slice');
                var $bottomLeft = $prevSlideSlices.eq(0);
                var $topLeft = $currentSlideSlices.eq(0);
                var $topRight = $currentSlideSlices.eq(1);
                currentSlide.$element.prepend($bottomLeft.detach());
                prevSlide.$element.prepend($topLeft.detach());
                $bottomLeft.addClass('pogoSlider-animation-foldInRight').precss('animation-duration', currentSlide.duration + 'ms');
                $topRight.addClass('pogoSlider-animation-foldOutRight').precss('animation-duration', currentSlide.duration + 'ms');
                return function() {
                    self.$element.css('overflow', '');
                    currentSlide.$element.prepend($topLeft.detach());
                    prevSlide.$element.prepend($bottomLeft.detach());
                    self._slideCleanup(currentSlideIndex, true);
                };
            },
            foldLeft: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                var prevSlide = self.slides[prevSlideIndex];
                self.$element.css('overflow', 'visible');
                prevSlide.$element.css({
                    'overflow': 'visible',
                    'z-index': self.settings.baseZindex
                });
                currentSlide.$element.css({
                    'opacity': 1,
                    'overflow': 'visible',
                    'z-index': self.settings.baseZindex + 1
                });
                self._createSlideSlices(prevSlideIndex, 1, 2);
                var $prevSlideSlices = prevSlide.$element.find('.pogoSlider-slide-slice');
                self._createSlideSlices(currentSlideIndex, 1, 2);
                var $currentSlideSlices = self.slides[currentSlideIndex].$element.find('.pogoSlider-slide-slice');
                var $bottomRight = $prevSlideSlices.eq(1);
                var $topLeft = $currentSlideSlices.eq(0);
                var $topRight = $currentSlideSlices.eq(1);
                currentSlide.$element.append($bottomRight.detach());
                prevSlide.$element.append($topRight.detach());
                $bottomRight.addClass('pogoSlider-animation-foldInLeft').precss('animation-duration', currentSlide.duration + 'ms');
                $topLeft.addClass('pogoSlider-animation-foldOutLeft').precss('animation-duration', currentSlide.duration + 'ms');
                return function() {
                    self.$element.css('overflow', '');
                    self._slideCleanup(currentSlideIndex, true);
                };
            }
        },
        compatSlideTransitions: {
            fade: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.animate({
                    opacity: 0
                }, currentSlide.duration);
                currentSlide.$element.animate({
                    opacity: 1
                }, currentSlide.duration);
            },
            slide: function(prevSlideIndex, currentSlideIndex) {
                var method;
                if (prevSlideIndex > currentSlideIndex && prevSlideIndex === this.slides.length - 1 && currentSlideIndex === 0) {
                    method = 'slideLeft';
                } else if (prevSlideIndex < currentSlideIndex && prevSlideIndex === 0 && currentSlideIndex === this.slides.length - 1) {
                    method = 'slideRight';
                } else if (prevSlideIndex < currentSlideIndex) {
                    method = 'slideLeft';
                } else {
                    method = 'slideRight';
                }
                return this.slideTransitions[method].apply(this, [prevSlideIndex, currentSlideIndex]);
            },
            verticalSlide: function(prevSlideIndex, currentSlideIndex) {
                var method;
                if (prevSlideIndex > currentSlideIndex && prevSlideIndex === this.slides.length - 1 && currentSlideIndex === 0) {
                    method = 'slideUp';
                } else if (prevSlideIndex < currentSlideIndex && prevSlideIndex === 0 && currentSlideIndex === this.slides.length - 1) {
                    method = 'slideDown';
                } else if (prevSlideIndex < currentSlideIndex) {
                    method = 'slideUp';
                } else {
                    method = 'slideDown';
                }
                return this.slideTransitions[method].apply(this, [prevSlideIndex, currentSlideIndex]);
            },
            slideLeft: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.animate({
                    left: '-100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    left: '100%',
                    'opacity': 1
                }).animate({
                    left: 0
                }, currentSlide.duration);
            },
            slideRight: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.animate({
                    left: '100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    left: '-100%',
                    'opacity': 1
                }).animate({
                    left: 0
                }, currentSlide.duration);
            },
            slideUp: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.animate({
                    top: '-100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    top: '100%',
                    'opacity': 1
                }).animate({
                    top: '0'
                }, currentSlide.duration);
            },
            slideDown: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.animate({
                    top: '100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    top: '-100%',
                    'opacity': 1
                }).animate({
                    top: '0'
                }, currentSlide.duration);
            },
            slideRevealLeft: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.css('z-index', this.settings.baseZindex + 1).animate({
                    left: '-100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex
                });
            },
            slideRevealRight: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.css('z-index', this.settings.baseZindex + 1).animate({
                    left: '100%'
                }, currentSlide.duration);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex
                });
            },
            slideOverLeft: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex,
                    'left': '100%'
                }).animate({
                    'left': 0
                }, currentSlide.duration);
            },
            slideOverRight: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex,
                    'right': '100%'
                }).animate({
                    'right': 0
                }, currentSlide.duration);
            },
            expandReveal: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.css('z-index', this.settings.baseZindex + 1).animate({
                    width: '120%',
                    height: '120%',
                    'left': '-10%',
                    'top': '-10%',
                    opacity: 0
                }, currentSlide.duration);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex
                });
            },
            shrinkReveal: function(prevSlideIndex, currentSlideIndex) {
                var currentSlide = this.slides[currentSlideIndex];
                this.slides[prevSlideIndex].$element.css('z-index', this.settings.baseZindex + 1).animate({
                    width: '50%',
                    height: '50%',
                    'left': '25%',
                    'top': '25%',
                    opacity: 0
                }, currentSlide.duration);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': this.settings.baseZindex
                });
            },
            verticalSplitReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, 2);
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                $slices.eq(0).animate({
                    'left': '-50%'
                }, currentSlide.duration);
                $slices.eq(1).animate({
                    'left': '100%'
                }, currentSlide.duration);
            },
            horizontalSplitReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 2, 1);
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                $slices.eq(0).animate({
                    'top': '-50%'
                }, currentSlide.duration);
                $slices.eq(1).animate({
                    'top': '100%'
                }, currentSlide.duration);
            },
            zipReveal: function(prevSlideIndex, currentSlideIndex) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, Math.round(self.$element.width() / 100));
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                var transitionDelay = currentSlide.duration / ($slices.length + 1);
                var transitionDuration = transitionDelay * 2;
                $slices.each(function(index) {
                    if (index % 2 === 0) {
                        $(this).delay(transitionDelay * index).animate({
                            'top': '100%'
                        }, transitionDuration);
                    } else {
                        $(this).delay(transitionDelay * index).animate({
                            'top': '-100%'
                        }, transitionDuration);
                    }
                });
            },
            barRevealDown: function(prevSlideIndex, currentSlideIndex) {
                return this.slideTransitions['barReveal'].apply(this, [prevSlideIndex, currentSlideIndex, 'down']);
            },
            barRevealUp: function(prevSlideIndex, currentSlideIndex) {
                return this.slideTransitions['barReveal'].apply(this, [prevSlideIndex, currentSlideIndex, 'up']);
            },
            barReveal: function(prevSlideIndex, currentSlideIndex, direction) {
                var self = this;
                var currentSlide = self.slides[currentSlideIndex];
                self.slides[prevSlideIndex].$element.css('z-index', self.settings.baseZindex + 1);
                currentSlide.$element.css({
                    'opacity': 1,
                    'z-index': self.settings.baseZindex
                });
                self._createSlideSlices(prevSlideIndex, 1, Math.round(self.$element.width() / 100));
                var $slices = self.slides[prevSlideIndex].$element.find('.pogoSlider-slide-slice');
                var transitionDelay = currentSlide.duration / ($slices.length + 1);
                var transitionDuration = transitionDelay * 2;
                $slices.each(function(index) {
                    if (direction === 'down') {
                        $(this).delay(transitionDelay * index).animate({
                            'top': '100%'
                        }, transitionDuration);
                    } else {
                        $(this).delay(transitionDelay * index).animate({
                            'top': '-100%'
                        }, transitionDuration);
                    }
                });
            }
        }
    };
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
        return this;
    };
})(jQuery, window, document);

/**
 * SyoTimer v.1.1.0 | under MIT licence
 * https://github.com/mrfratello/SyoTimer#readme
 */
! function(e) {
    const t = 86400,
        i = 3600,
        o = 60;
    var n = {
        rus: {
            second: ["секунда", "секунды", "секунд"],
            minute: ["минута", "минуты", "минут"],
            hour: ["час", "часа", "часов"],
            day: ["день", "дня", "дней"]
        },
        eng: {
            second: ["second", "seconds"],
            minute: ["minute", "minutes"],
            hour: ["hour", "hours"],
            day: ["day", "days"]
        }
    };
    const r = {
        year: 2014,
        month: 7,
        day: 31,
        hour: 0,
        minute: 0,
        second: 0,
        timeZone: "local",
        ignoreTransferTime: !1,
        periodic: !1,
        periodInterval: 7,
        periodUnit: "d",
        dayVisible: !0,
        dubleNumbers: !0,
        doubleNumbers: !0,
        effectType: "none",
        lang: "eng",
        headTitle: "",
        footTitle: "",
        afterDeadline: function(e) {
            e.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>')
        }
    };
    var a = {
            init: function(t) {
                var i = e.extend({}, r, t || {});
                return t.hasOwnProperty("dubleNumbers") && (i.doubleNumbers = t.dubleNumbers), this.each(function() {
                    var t = e(this);
                    t.data("syotimer-options", i), a._render.apply(this, []), a._perSecondHandler.apply(this, [])
                })
            },
            _render: function() {
                var t, i = e(this),
                    o = i.data("syotimer-options"),
                    n = o.dayVisible ? s.getCellDom("day", "0") : "";
                t = '<div class="timer-head-block">' + o.headTitle + '</div><div class="timer-body-block">' + n + s.getCellDom("hour") + s.getCellDom("minute") + s.getCellDom("second") + '</div><div class="timer-foot-block">' + o.footTitle + "</div>", i.addClass("syotimer").addClass("timer").html(t);
                var r = e(".timer-head-block", i),
                    a = e(".timer-body-block", i),
                    d = e(".timer-foot-block", i),
                    l = {
                        headBlock: r,
                        bodyBlock: a,
                        footBlock: d
                    };
                i.data("syotimer-blocks", l)
            },
            _perSecondHandler: function() {
                var t = e(this),
                    i = t.data("syotimer-options");
                e(".second .tab-val", t).css("opacity", 1);
                var o = new Date,
                    n = new Date(i.year, i.month - 1, i.day, i.hour, i.minute, i.second),
                    r = s.getDifferenceWithTimezone(o, n, i),
                    d = s.getSecondsToDeadLine(r, i);
                d >= 0 ? (a._refreshUnitsDom.apply(this, [d]), a._applyEffectSwitch.apply(this, [i.effectType])) : (t = e.extend(t, t.data("syotimer-blocks")), i.afterDeadline(t))
            },
            _refreshUnitsDom: function(t) {
                var i = e(this),
                    o = i.data("syotimer-options"),
                    r = ["day", "hour", "minute", "second"],
                    a = s.getUnitsToDeadLine(t),
                    d = n[o.lang];
                o.dayVisible || (a.hour += 24 * a.day, r.splice(0, 1));
                for (var l = 0; l < r.length; l++) {
                    var c = r[l],
                        u = "." + c;
                    e(u + " .tab-val", i).html(s.format2(a[c], "day" != c && o.doubleNumbers)), e(u + " .tab-unit", i).html(s.definitionOfNumerals(a[c], d[c], o.lang))
                }
            },
            _applyEffectSwitch: function(t) {
                var i = this,
                    o = e(i);
                switch (t) {
                    case "none":
                        setTimeout(function() {
                            a._perSecondHandler.apply(i, [])
                        }, 1e3);
                        break;
                    case "opacity":
                        e(".second .tab-val", o).animate({
                            opacity: .1
                        }, 1e3, "linear", function() {
                            a._perSecondHandler.apply(i, [])
                        })
                }
            }
        },
        s = {
            getCellDom: function(e, t) {
                return e = e || "", t = t || "00", '<div class="table-cell ' + e + '"><div class="tab-val">' + t + '</div><div class="tab-metr tab-unit"></div></div>'
            },
            getSecondsToDeadLine: function(e, t) {
                var i, o = e / 1e3;
                if (o = Math.floor(o), t.periodic) {
                    var n, r, a = s.getPeriodUnit(t.periodUnit),
                        d = e / (1e3 * a);
                    d = Math.ceil(d), d = Math.abs(d), o >= 0 ? (r = d % t.periodInterval, r = 0 == r ? t.periodInterval : r, r -= 1) : r = t.periodInterval - d % t.periodInterval, n = o % a, 0 == n && o < 0 && r--, i = Math.abs(r * a + n)
                } else i = o;
                return i
            },
            getUnitsToDeadLine: function(e) {
                for (var t = ["day", "hour", "minute", "second"], i = {}, o = 0; o < t.length; o++) {
                    var n = t[o],
                        r = s.getPeriodUnit(n);
                    i[n] = Math.floor(e / r), e %= r
                }
                return i
            },
            getPeriodUnit: function(e) {
                switch (e) {
                    case "d":
                    case "day":
                        return t;
                    case "h":
                    case "hour":
                        return i;
                    case "m":
                    case "minute":
                        return o;
                    case "s":
                    case "second":
                        return 1
                }
            },
            getDifferenceWithTimezone: function(e, t, i) {
                var o, n = t.getTime() - e.getTime(),
                    r = 0,
                    a = 0;
                if ("local" !== i.timeZone) {
                    var d = parseFloat(i.timeZone) * s.getPeriodUnit("hour"),
                        l = -e.getTimezoneOffset() * s.getPeriodUnit("minute");
                    r = 1e3 * (d - l)
                }
                if (i.ignoreTransferTime) {
                    var c = -e.getTimezoneOffset() * s.getPeriodUnit("minute"),
                        u = -t.getTimezoneOffset() * s.getPeriodUnit("minute");
                    a = 1e3 * (c - u)
                }
                return o = r + a, n - o
            },
            format2: function(e, t) {
                return t = t !== !1, e <= 9 && t ? "0" + e : "" + e
            },
            definitionOfNumerals: function(e, t, i) {
                switch (i) {
                    case "rus":
                        var o, n = [2, 0, 1, 1, 1, 2];
                        return o = e % 100 > 4 && e % 100 < 20 ? 2 : n[e % 10 < 5 ? e % 10 : 5], t[o];
                    case "eng":
                        return t[1 == e ? 0 : 1]
                }
            }
        },
        d = {
            setOption: function(t, i) {
                var o = e(this),
                    n = o.data("syotimer-options");
                n.hasOwnProperty(t) && (n[t] = i, o.data("syotimer-options", n))
            }
        };
    e.fn.syotimer = function(t) {
        if ("string" == typeof t && "setOption" === t) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                d[t].apply(this, i)
            })
        }
        return null === t || "object" == typeof t ? a.init.apply(this, [t]) : void e.error("SyoTimer. Error in call methods: methods is not exist")
    }
}(jQuery);

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.7.2
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(e) {
    "use strict";

    function t() {
        i = e.innerWidth || document.documentElement.clientWidth, a = e.innerHeight || document.documentElement.clientHeight
    }

    function n(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, function() {
            n.call(e)
        })
    }

    function o(n) {
        e.requestAnimationFrame(function() {
            "scroll" !== n.type && t();
            for (var e = 0, o = g.length; e < o; e++) "scroll" !== n.type && (g[e].coverImage(), g[e].clipContainer()), g[e].onScroll()
        })
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), e.requestAnimationFrame || ! function() {
        for (var t = ["webkit", "moz"], n = 0; n < t.length && !e.requestAnimationFrame; ++n) {
            var o = t[n];
            e.requestAnimationFrame = e[o + "RequestAnimationFrame"], e.cancelAnimationFrame = e[o + "CancelAnimationFrame"] || e[o + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent) || !e.requestAnimationFrame || !e.cancelAnimationFrame) {
            var i = 0;
            e.requestAnimationFrame = function(e) {
                var t = Date.now(),
                    n = Math.max(i + 16, t);
                return setTimeout(function() {
                    e(i = n)
                }, n - t)
            }, e.cancelAnimationFrame = clearTimeout
        }
    }();
    var i, a, r = function() {
            if (!e.getComputedStyle) return !1;
            var t, n = document.createElement("p"),
                o = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            (document.body || document.documentElement).insertBefore(n, null);
            for (var i in o) "undefined" != typeof n.style[i] && (n.style[i] = "translate3d(1px,1px,1px)", t = e.getComputedStyle(n).getPropertyValue(o[i]));
            return (document.body || document.documentElement).removeChild(n), "undefined" != typeof t && t.length > 0 && "none" !== t
        }(),
        l = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        s = /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream,
        m = !!e.opera,
        c = /Edge\/\d+/.test(navigator.userAgent),
        p = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
        u = !!Function("/*@cc_on return document.documentMode===10@*/")(),
        d = document.all && !e.atob;
    t();
    var g = [],
        f = function() {
            function e(e, n) {
                var o, i = this;
                if (i.$item = e, i.defaults = {
                        type: "scroll",
                        speed: .5,
                        imgSrc: null,
                        imgWidth: null,
                        imgHeight: null,
                        enableTransform: !0,
                        elementInViewport: null,
                        zIndex: -100,
                        noAndroid: !1,
                        noIos: !0,
                        onScroll: null,
                        onInit: null,
                        onDestroy: null,
                        onCoverImage: null
                    }, o = JSON.parse(i.$item.getAttribute("data-jarallax") || "{}"), i.options = i.extend({}, i.defaults, o, n), !(l && i.options.noAndroid || s && i.options.noIos)) {
                    i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed)));
                    var a = i.options.elementInViewport;
                    a && "object" == typeof a && "undefined" != typeof a.length && (a = a[0]), !a instanceof Element && (a = null), i.options.elementInViewport = a, i.instanceID = t++, i.image = {
                        src: i.options.imgSrc || null,
                        $container: null,
                        $item: null,
                        width: i.options.imgWidth || null,
                        height: i.options.imgHeight || null,
                        useImgTag: s || l || m || p || u || c
                    }, i.initImg() && i.init()
                }
            }
            var t = 0;
            return e
        }();
    f.prototype.css = function(t, n) {
        if ("string" == typeof n) return e.getComputedStyle ? e.getComputedStyle(t).getPropertyValue(n) : t.style[n];
        n.transform && (n.WebkitTransform = n.MozTransform = n.transform);
        for (var o in n) t.style[o] = n[o];
        return t
    }, f.prototype.extend = function(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
        return e
    }, f.prototype.initImg = function() {
        var e = this;
        return null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src)
    }, f.prototype.init = function() {
        function e() {
            t.coverImage(), t.clipContainer(), t.onScroll(!0), t.$item.setAttribute("data-jarallax-original-styles", t.$item.getAttribute("style")), t.options.onInit && t.options.onInit.call(t), setTimeout(function() {
                t.$item && t.css(t.$item, {
                    "background-image": "none",
                    "background-attachment": "scroll",
                    "background-size": "auto"
                })
            }, 0)
        }
        var t = this,
            n = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none"
            },
            o = {
                position: "fixed"
            };
        t.image.$container = document.createElement("div"), t.css(t.image.$container, n), t.css(t.image.$container, {
            visibility: "hidden",
            "z-index": t.options.zIndex
        }), t.image.$container.setAttribute("id", "jarallax-container-" + t.instanceID), t.$item.appendChild(t.image.$container), t.image.useImgTag && r && t.options.enableTransform ? (t.image.$item = document.createElement("img"), t.image.$item.setAttribute("src", t.image.src), o = t.extend({
            "max-width": "none"
        }, n, o)) : (t.image.$item = document.createElement("div"), o = t.extend({
            "background-position": "50% 50%",
            "background-size": "100% auto",
            "background-repeat": "no-repeat no-repeat",
            "background-image": 'url("' + t.image.src + '")'
        }, n, o)), d && (o.backgroundAttachment = "fixed"), t.parentWithTransform = 0;
        for (var i = t.$item; null !== i && i !== document && 0 === t.parentWithTransform;) {
            var a = t.css(i, "-webkit-transform") || t.css(i, "-moz-transform") || t.css(i, "transform");
            a && "none" !== a && (t.parentWithTransform = 1, t.css(t.image.$container, {
                transform: "translateX(0) translateY(0)"
            })), i = i.parentNode
        }
        t.css(t.image.$item, o), t.image.$container.appendChild(t.image.$item), t.image.width && t.image.height ? e() : t.getImageSize(t.image.src, function(n, o) {
            t.image.width = n, t.image.height = o, e()
        }), g.push(t)
    }, f.prototype.destroy = function() {
        for (var e = this, t = 0, n = g.length; t < n; t++)
            if (g[t].instanceID === e.instanceID) {
                g.splice(t, 1);
                break
            }
        var o = e.$item.getAttribute("data-jarallax-original-styles");
        e.$item.removeAttribute("data-jarallax-original-styles"), "null" === o ? e.$item.removeAttribute("style") : e.$item.setAttribute("style", o), e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax;
        for (var i in e) delete e[i]
    }, f.prototype.getImageSize = function(e, t) {
        if (e && t) {
            var n = new Image;
            n.onload = function() {
                t(n.width, n.height)
            }, n.src = e
        }
    }, f.prototype.clipContainer = function() {
        if (!d) {
            var e = this,
                t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height;
            if (!e.$clipStyles) {
                e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "#jarallax-clip-" + e.instanceID);
                var i = document.head || document.getElementsByTagName("head")[0];
                i.appendChild(e.$clipStyles)
            }
            var a = ["#jarallax-container-" + e.instanceID + " {", "   clip: rect(0 " + n + "px " + o + "px 0);", "   clip: rect(0, " + n + "px, " + o + "px, 0);", "}"].join("\n");
            e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = a : e.$clipStyles.innerHTML = a
        }
    }, f.prototype.coverImage = function() {
        var e = this;
        if (e.image.width && e.image.height) {
            var t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height,
                i = t.left,
                l = e.image.width,
                s = e.image.height,
                m = e.options.speed,
                c = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                p = 0,
                u = 0,
                d = o,
                g = 0,
                f = 0;
            c && (p = m * (o + a) / 2, (m < 0 || m > 1) && (p = m * Math.max(o, a) / 2), m < 0 || m > 1 ? d = Math.max(o, a) + 2 * Math.abs(p) : d += Math.abs(a - o) * (1 - m)), u = d * l / s, u < n && (u = n, d = u * s / l), e.bgPosVerticalCenter = 0, !(c && d < a) || r && e.options.enableTransform || (e.bgPosVerticalCenter = (a - d) / 2, d = a), c ? (g = i + (n - u) / 2, f = (a - d) / 2) : (g = (n - u) / 2, f = (o - d) / 2), r && e.options.enableTransform && e.parentWithTransform && (g -= i), e.parallaxScrollDistance = p, e.css(e.image.$item, {
                width: u + "px",
                height: d + "px",
                marginLeft: g + "px",
                marginTop: f + "px"
            }), e.options.onCoverImage && e.options.onCoverImage.call(e)
        }
    }, f.prototype.isVisible = function() {
        return this.isElementInViewport || !1
    }, f.prototype.onScroll = function(e) {
        var t = this;
        if (t.image.width && t.image.height) {
            var n = t.$item.getBoundingClientRect(),
                o = n.top,
                l = n.height,
                s = {
                    position: "absolute",
                    visibility: "visible",
                    backgroundPosition: "50% 50%"
                },
                m = n;
            if (t.options.elementInViewport && (m = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = m.bottom >= 0 && m.right >= 0 && m.top <= a && m.left <= i, e || t.isElementInViewport) {
                var c = Math.max(0, o),
                    p = Math.max(0, l + o),
                    u = Math.max(0, -o),
                    g = Math.max(0, o + l - a),
                    f = Math.max(0, l - (o + l - a)),
                    h = Math.max(0, -o + a - l),
                    y = 1 - 2 * (a - o) / (a + l),
                    v = 1;
                if (l < a ? v = 1 - (u || g) / l : p <= a ? v = p / a : f <= a && (v = f / a), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (s.transform = "translate3d(0, 0, 0)", s.opacity = v), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                    var x = 1;
                    t.options.speed < 0 ? x -= t.options.speed * v : x += t.options.speed * (1 - v), s.transform = "scale(" + x + ") translate3d(0, 0, 0)"
                }
                if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                    var b = t.parallaxScrollDistance * y;
                    r && t.options.enableTransform ? (t.parentWithTransform && (b -= o), s.transform = "translate3d(0, " + b + "px, 0)") : t.image.useImgTag ? s.top = b + "px" : (t.bgPosVerticalCenter && (b += t.bgPosVerticalCenter), s.backgroundPosition = "50% " + b + "px"), s.position = d ? "absolute" : "fixed"
                }
                t.css(t.image.$item, s), t.options.onScroll && t.options.onScroll.call(t, {
                    section: n,
                    beforeTop: c,
                    beforeTopEnd: p,
                    afterTop: u,
                    beforeBottom: g,
                    beforeBottomEnd: f,
                    afterBottom: h,
                    visiblePercent: v,
                    fromViewportCenter: y
                })
            }
        }
    }, n(e, "scroll", o), n(e, "resize", o), n(e, "orientationchange", o), n(e, "load", o);
    var h = function(e) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        var t, n = arguments[1],
            o = Array.prototype.slice.call(arguments, 2),
            i = e.length,
            a = 0;
        for (a; a < i; a++)
            if ("object" == typeof n || "undefined" == typeof n ? e[a].jarallax || (e[a].jarallax = new f(e[a], n)) : e[a].jarallax && (t = e[a].jarallax[n].apply(e[a].jarallax, o)), "undefined" != typeof t) return t;
        return e
    };
    h.constructor = f;
    var y = e.jarallax;
    if (e.jarallax = h, e.jarallax.noConflict = function() {
            return e.jarallax = y, this
        }, "undefined" != typeof jQuery) {
        var v = function() {
            var t = arguments || [];
            Array.prototype.unshift.call(t, this);
            var n = h.apply(e, t);
            return "object" != typeof n ? n : this
        };
        v.constructor = f;
        var x = jQuery.fn.jarallax;
        jQuery.fn.jarallax = v, jQuery.fn.jarallax.noConflict = function() {
            return jQuery.fn.jarallax = x, this
        }
    }
    n(e, "DOMContentLoaded", function() {
        h(document.querySelectorAll("[data-jarallax], [data-jarallax-video]"))
    })
}(window);

/*!
 * Name    : Video Worker (wrapper for Youtube, Vimeo and Local videos)
 * Version : 1.2.1
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(e) {
    "use strict";

    function t(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
        return e
    }

    function i() {
        this._done = [], this._fail = []
    }

    function o(e, t, i) {
        e.addEventListener ? e.addEventListener(t, i) : e.attachEvent("on" + t, function() {
            i.call(e)
        })
    }
    i.prototype = {
        execute: function(e, t) {
            var i = e.length;
            for (t = Array.prototype.slice.call(t); i--;) e[i].apply(null, t)
        },
        resolve: function() {
            this.execute(this._done, arguments)
        },
        reject: function() {
            this.execute(this._fail, arguments)
        },
        done: function(e) {
            this._done.push(e)
        },
        fail: function(e) {
            this._fail.push(e)
        }
    };
    var a = function() {
        function e(e, o) {
            var a = this;
            a.url = e, a.options_default = {
                autoplay: 1,
                loop: 1,
                mute: 1,
                controls: 0,
                startTime: 0,
                endTime: 0
            }, a.options = t({}, a.options_default, o), a.videoID = a.parseURL(e), a.videoID && (a.ID = i++, a.loadAPI(), a.init())
        }
        var i = 0;
        return e
    }();
    a.prototype.parseURL = function(e) {
        function t(e) {
            var t = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                i = e.match(t);
            return !(!i || 11 !== i[1].length) && i[1]
        }

        function i(e) {
            var t = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
                i = e.match(t);
            return !(!i || !i[3]) && i[3]
        }

        function o(e) {
            for (var t = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/), i = {}, o = 0, a = 0; a < t.length; a++) {
                var n = t[a].match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                n && n[1] && n[2] && (i["ogv" === n[1] ? "ogg" : n[1]] = n[2], o = 1)
            }
            return !!o && i
        }
        var a = t(e),
            n = i(e),
            r = o(e);
        return a ? (this.type = "youtube", a) : n ? (this.type = "vimeo", n) : !!r && (this.type = "local", r)
    }, a.prototype.isValid = function() {
        return !!this.videoID
    }, a.prototype.on = function(e, t) {
        this.userEventsList = this.userEventsList || [], (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t)
    }, a.prototype.off = function(e, t) {
        if (this.userEventsList && this.userEventsList[e])
            if (t)
                for (var i = 0; i < this.userEventsList[e].length; i++) this.userEventsList[e][i] === t && (this.userEventsList[e][i] = !1);
            else delete this.userEventsList[e]
    }, a.prototype.fire = function(e) {
        var t = [].slice.call(arguments, 1);
        if (this.userEventsList && "undefined" != typeof this.userEventsList[e])
            for (var i in this.userEventsList[e]) this.userEventsList[e][i] && this.userEventsList[e][i].apply(this, t)
    };
    var n = 0;
    a.prototype.play = function(e) {
        var t = this;
        t.player && ("youtube" === t.type && t.player.playVideo && ("undefined" != typeof e && t.player.seekTo(e || 0), t.player.playVideo()), "vimeo" !== t.type || n || ("undefined" != typeof e ? (n = 1, t.player.setCurrentTime(e || 0).then(function() {
            t.player.play(), n = 0
        })) : t.player.play()), "local" === t.type && ("undefined" != typeof e && (t.player.currentTime = e), t.player.play()))
    }, a.prototype.pause = function() {
        this.player && ("youtube" === this.type && this.player.pauseVideo && this.player.pauseVideo(), "vimeo" === this.type && this.player.pause(), "local" === this.type && this.player.pause())
    }, a.prototype.getImageURL = function(e) {
        var t = this;
        if (t.videoImage) return void e(t.videoImage);
        if ("youtube" === t.type) {
            var i = ["maxresdefault", "sddefault", "hqdefault", "0"],
                o = 0,
                a = new Image;
            a.onload = function() {
                120 !== (this.naturalWidth || this.width) || o === i.length - 1 ? (t.videoImage = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg", e(t.videoImage)) : (o++, this.src = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg")
            }, a.src = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg"
        }
        if ("vimeo" === t.type) {
            var n = new XMLHttpRequest;
            n.open("GET", "https://vimeo.com/api/v2/video/" + t.videoID + ".json", !0), n.onreadystatechange = function() {
                if (4 === this.readyState && this.status >= 200 && this.status < 400) {
                    var i = JSON.parse(this.responseText);
                    t.videoImage = i[0].thumbnail_large, e(t.videoImage)
                }
            }, n.send(), n = null
        }
    }, a.prototype.getIframe = function(t) {
        var i = this;
        return i.$iframe ? void t(i.$iframe) : void i.onAPIready(function() {
            function a(e, t, i) {
                var o = document.createElement("source");
                o.src = t, o.type = i, e.appendChild(o)
            }
            var n;
            if (i.$iframe || (n = document.createElement("div"), n.style.display = "none"), "youtube" === i.type) {
                i.playerOptions = {}, i.playerOptions.videoId = i.videoID, i.playerOptions.width = e.innerWidth || document.documentElement.clientWidth, i.playerOptions.playerVars = {
                    autohide: 1,
                    rel: 0,
                    autoplay: 0
                }, i.options.controls || (i.playerOptions.playerVars.iv_load_policy = 3, i.playerOptions.playerVars.modestbranding = 1, i.playerOptions.playerVars.controls = 0, i.playerOptions.playerVars.showinfo = 0, i.playerOptions.playerVars.disablekb = 1);
                var r, p;
                i.playerOptions.events = {
                    onReady: function(e) {
                        i.options.mute && e.target.mute(), i.options.autoplay && i.play(i.options.startTime), i.fire("ready", e)
                    },
                    onStateChange: function(e) {
                        i.options.loop && e.data === YT.PlayerState.ENDED && i.play(i.options.startTime), r || e.data !== YT.PlayerState.PLAYING || (r = 1, i.fire("started", e)), e.data === YT.PlayerState.PLAYING && i.fire("play", e), e.data === YT.PlayerState.PAUSED && i.fire("pause", e), e.data === YT.PlayerState.ENDED && i.fire("end", e), i.options.endTime && (e.data === YT.PlayerState.PLAYING ? p = setInterval(function() {
                            i.options.endTime && i.player.getCurrentTime() >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause())
                        }, 150) : clearInterval(p))
                    }
                };
                var s = !i.$iframe;
                if (s) {
                    var l = document.createElement("div");
                    l.setAttribute("id", i.playerID), n.appendChild(l), document.body.appendChild(n)
                }
                i.player = i.player || new e.YT.Player(i.playerID, i.playerOptions), s && (i.$iframe = document.getElementById(i.playerID))
            }
            if ("vimeo" === i.type) {
                i.playerOptions = "", i.playerOptions += "player_id=" + i.playerID, i.playerOptions += "&autopause=0", i.options.controls || (i.playerOptions += "&badge=0&byline=0&portrait=0&title=0"), i.playerOptions += "&autoplay=0", i.playerOptions += "&loop=" + (i.options.loop ? 1 : 0), i.$iframe || (i.$iframe = document.createElement("iframe"), i.$iframe.setAttribute("id", i.playerID), i.$iframe.setAttribute("src", "https://player.vimeo.com/video/" + i.videoID + "?" + i.playerOptions), i.$iframe.setAttribute("frameborder", "0"), n.appendChild(i.$iframe), document.body.appendChild(n)), i.player = i.player || new Vimeo.Player(i.$iframe), i.player.setVolume(i.options.mute ? 0 : 100), i.options.autoplay && i.play(i.options.startTime);
                var d;
                i.player.on("timeupdate", function(e) {
                    d || i.fire("started", e), d = 1, i.options.endTime && i.options.endTime && e.seconds >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause())
                }), i.player.on("play", function(e) {
                    i.fire("play", e)
                }), i.player.on("pause", function(e) {
                    i.fire("pause", e)
                }), i.player.on("ended", function(e) {
                    i.fire("end", e)
                }), i.player.on("loaded", function(e) {
                    i.fire("ready", e)
                })
            }
            if ("local" === i.type) {
                if (!i.$iframe) {
                    i.$iframe = document.createElement("video"), i.options.mute && i.$iframe.setAttribute("muted", "on"), i.options.loop && i.$iframe.setAttribute("loop", "on"), i.$iframe.setAttribute("id", i.playerID), n.appendChild(i.$iframe), document.body.appendChild(n);
                    for (var u in i.videoID) a(i.$iframe, i.videoID[u], "video/" + u)
                }
                i.player = i.player || i.$iframe;
                var y;
                o(i.player, "playing", function(e) {
                    y || i.fire("started", e), y = 1
                }), o(i.player, "timeupdate", function() {
                    i.options.endTime && i.options.endTime && this.currentTime >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause())
                }), o(i.player, "play", function(e) {
                    i.fire("play", e)
                }), o(i.player, "pause", function(e) {
                    i.fire("pause", e)
                }), o(i.player, "ended", function(e) {
                    i.fire("end", e)
                }), o(i.player, "loadedmetadata", function() {
                    i.fire("ready"), i.options.autoplay && i.play(i.options.startTime)
                })
            }
            t(i.$iframe)
        })
    }, a.prototype.init = function() {
        var e = this;
        e.playerID = "VideoWorker-" + e.ID
    };
    var r = 0,
        p = 0;
    a.prototype.loadAPI = function() {
        var t = this;
        if (!r || !p) {
            var i = "";
            if ("youtube" !== t.type || r || (r = 1, i = "//www.youtube.com/iframe_api"), "vimeo" !== t.type || p || (p = 1, i = "//player.vimeo.com/api/player.js"), i) {
                "file://" === e.location.origin && (i = "http:" + i);
                var o = document.createElement("script"),
                    a = document.getElementsByTagName("head")[0];
                o.src = i, a.appendChild(o), a = null, o = null
            }
        }
    };
    var s = 0,
        l = 0,
        d = new i,
        u = new i;
    a.prototype.onAPIready = function(t) {
        var i = this;
        if ("youtube" === i.type && ("undefined" != typeof YT && 0 !== YT.loaded || s ? "object" == typeof YT && 1 === YT.loaded ? t() : d.done(function() {
                t()
            }) : (s = 1, e.onYouTubeIframeAPIReady = function() {
                e.onYouTubeIframeAPIReady = null, d.resolve("done"), t()
            })), "vimeo" === i.type)
            if ("undefined" != typeof Vimeo || l) "undefined" != typeof Vimeo ? t() : u.done(function() {
                t()
            });
            else {
                l = 1;
                var o = setInterval(function() {
                    "undefined" != typeof Vimeo && (clearInterval(o), u.resolve("done"), t())
                }, 20)
            }
        "local" === i.type && t()
    }, e.VideoWorker = a
}(window),
/*!
 * Name    : Video Background Extension for Jarallax
 */
function() {
    "use strict";
    if ("undefined" != typeof jarallax) {
        var e = jarallax.constructor,
            t = e.prototype.init;
        e.prototype.init = function() {
            var e = this;
            t.apply(e), e.video && e.video.getIframe(function(t) {
                var i = t.parentNode;
                e.css(t, {
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    visibility: "visible",
                    zIndex: -1
                }), e.$video = t, e.image.$container.appendChild(t), i.parentNode.removeChild(i)
            })
        };
        var i = e.prototype.coverImage;
        e.prototype.coverImage = function() {
            var e = this;
            i.apply(e), e.video && "IFRAME" === e.image.$item.nodeName && e.css(e.image.$item, {
                height: e.image.$item.getBoundingClientRect().height + 400 + "px",
                marginTop: -200 + parseFloat(e.css(e.image.$item, "margin-top")) + "px"
            })
        };
        var o = e.prototype.initImg;
        e.prototype.initImg = function() {
            var e = this;
            if (e.options.videoSrc || (e.options.videoSrc = e.$item.getAttribute("data-jarallax-video") || !1), e.options.videoSrc) {
                var t = new VideoWorker(e.options.videoSrc, {
                    startTime: e.options.videoStartTime || 0,
                    endTime: e.options.videoEndTime || 0
                });
                if (t.isValid() && (e.image.useImgTag = !0, t.on("ready", function() {
                        var i = e.onScroll;
                        e.onScroll = function() {
                            i.apply(e), e.isVisible() ? t.play() : t.pause()
                        }
                    }), t.on("started", function() {
                        e.image.$default_item = e.image.$item, e.image.$item = e.$video, e.image.width = e.options.imgWidth = e.image.width || 1280, e.image.height = e.options.imgHeight = e.image.height || 720, e.coverImage(), e.clipContainer(), e.onScroll(), e.image.$default_item && (e.image.$default_item.style.display = "none")
                    }), e.video = t, "local" !== t.type && t.getImageURL(function(t) {
                        e.image.src = t, e.init()
                    })), "local" !== t.type) return !1
            }
            return o.apply(e)
        };
        var a = e.prototype.destroy;
        e.prototype.destroy = function() {
            var e = this;
            a.apply(e)
        }
    }
}();

(function(window) {
    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var hasClass, addClass, removeClass;
    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if (typeof define === 'function' && define.amd) {
        define(classie);
    } else {
        window.classie = classie;
    }
})(window);

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var CountTo = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
        this.init();
    };
    CountTo.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };
    CountTo.prototype.init = function() {
        this.value = this.options.from;
        this.loops = Math.ceil(this.options.speed / this.options.refreshInterval);
        this.loopCount = 0;
        this.increment = (this.options.to - this.options.from) / this.loops;
    };
    CountTo.prototype.dataOptions = function() {
        var options = {
            from: this.$element.data('from'),
            to: this.$element.data('to'),
            speed: this.$element.data('speed'),
            refreshInterval: this.$element.data('refresh-interval'),
            decimals: this.$element.data('decimals')
        };
        var keys = Object.keys(options);
        for (var i in keys) {
            var key = keys[i];
            if (typeof(options[key]) === 'undefined') {
                delete options[key];
            }
        }
        return options;
    };
    CountTo.prototype.update = function() {
        this.value += this.increment;
        this.loopCount++;
        this.render();
        if (typeof(this.options.onUpdate) == 'function') {
            this.options.onUpdate.call(this.$element, this.value);
        }
        if (this.loopCount >= this.loops) {
            clearInterval(this.interval);
            this.value = this.options.to;
            if (typeof(this.options.onComplete) == 'function') {
                this.options.onComplete.call(this.$element, this.value);
            }
        }
    };
    CountTo.prototype.render = function() {
        var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(formattedValue);
    };
    CountTo.prototype.restart = function() {
        this.stop();
        this.init();
        this.start();
    };
    CountTo.prototype.start = function() {
        this.stop();
        this.render();
        this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
    };
    CountTo.prototype.stop = function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    CountTo.prototype.toggle = function() {
        if (this.interval) {
            this.stop();
        } else {
            this.start();
        }
    };

    function formatter(value, options) {
        return value.toFixed(options.decimals);
    }
    $.fn.countTo = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('countTo');
            var init = !data || typeof(option) === 'object';
            var options = typeof(option) === 'object' ? option : {};
            var method = typeof(option) === 'string' ? option : 'start';
            if (init) {
                if (data) data.stop();
                $this.data('countTo', data = new CountTo(this, options));
            }
            data[method].call(data);
        });
    };
}));

jQuery(document).ready(function($) {
    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formForgotPassword = formModal.find('#cd-reset-password'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
        mainNav = $('.left-content');

    //open modal
    mainNav.on('click', function(event) {
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    $(".cd-signin, .cd-close-form").on("click", function(e) {
        e.preventDefault();
    });

    //open sign-up form
    mainNav.on('click', '.cd-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.cd-signin', login_selected);

    //close modal
    formModal.on('click', function(event) {
        if ($(event.target).is(formModal) || $(event.target).is('.cd-close-form')) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event) {
        if (event.which == '27') {
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected(): signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function() {
        var togglePass = $(this),
            passwordField = togglePass.prev('input');

        ('password' == passwordField.attr('type')) ? passwordField.attr('type', 'text'): passwordField.attr('type', 'password');
        ('Hide' == togglePass.text()) ? togglePass.text('Show'): togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form 
    forgotPasswordLink.on('click', function(event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function(event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages 
    formLogin.find('input[type="submit"]').on('click', function(event) {
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function(event) {
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};