!(function (t) {
    var e = {};
    function n(o) {
        if (e[o]) return e[o].exports;
        var i = (e[o] = { i: o, l: !1, exports: {} });
        return t[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    (n.m = t),
        (n.c = e),
        (n.d = function (t, e, o) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
        }),
        (n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (n.t = function (t, e) {
            if ((1 & e && (t = n(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if ((n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var i in t)
                    n.d(
                        o,
                        i,
                        function (e) {
                            return t[e];
                        }.bind(null, i)
                    );
            return o;
        }),
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return n.d(e, "a", e), e;
        }),
        (n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = "public"),
        n((n.s = 0));
})([
    function (t, e, n) {
        t.exports = n(2);
    },
    function (t, e) {
        var n, o, i, r, a, s;
        (n = jQuery),
            (o = window),
            (i = window.document),
            (r = "touchstart mousedown"),
            (a = "touchmove mousemove"),
            (s = "touchend mouseup"),
            n(i).ready(function () {
                function t(t) {
                    for (var e = {}, n = t.match(/([^;:]+)/g) || []; n.length; ) e[n.shift()] = n.shift().trim();
                    return e;
                }
                n("table").each(function () {
                    "dnd" === n(this).data("table") &&
                        n(this).tableDnD({
                            onDragStyle: (n(this).data("ondragstyle") && t(n(this).data("ondragstyle"))) || null,
                            onDropStyle: (n(this).data("ondropstyle") && t(n(this).data("ondropstyle"))) || null,
                            onDragClass: void 0 === n(this).data("ondragclass") ? "tDnD_whileDrag" : n(this).data("ondragclass"),
                            onDrop: n(this).data("ondrop") && new Function("table", "row", n(this).data("ondrop")),
                            onDragStart: n(this).data("ondragstart") && new Function("table", "row", n(this).data("ondragstart")),
                            onDragStop: n(this).data("ondragstop") && new Function("table", "row", n(this).data("ondragstop")),
                            scrollAmount: n(this).data("scrollamount") || 5,
                            sensitivity: n(this).data("sensitivity") || 10,
                            hierarchyLevel: n(this).data("hierarchylevel") || 0,
                            indentArtifact: n(this).data("indentartifact") || '<div class="indent">&nbsp;</div>',
                            autoWidthAdjust: n(this).data("autowidthadjust") || !0,
                            autoCleanRelations: n(this).data("autocleanrelations") || !0,
                            jsonPretifySeparator: n(this).data("jsonpretifyseparator") || "\t",
                            serializeRegexp: (n(this).data("serializeregexp") && new RegExp(n(this).data("serializeregexp"))) || /[^\-]*$/,
                            serializeParamName: n(this).data("serializeparamname") || !1,
                            dragHandle: n(this).data("draghandle") || null,
                        });
                });
            }),
            (jQuery.tableDnD = {
                currentTable: null,
                dragObject: null,
                mouseOffset: null,
                oldX: 0,
                oldY: 0,
                build: function (t) {
                    return (
                        this.each(function () {
                            (this.tableDnDConfig = n.extend(
                                {
                                    onDragStyle: null,
                                    onDropStyle: null,
                                    onDragClass: "tDnD_whileDrag",
                                    onDrop: null,
                                    onDragStart: null,
                                    onDragStop: null,
                                    scrollAmount: 5,
                                    sensitivity: 10,
                                    hierarchyLevel: 0,
                                    indentArtifact: '<div class="indent">&nbsp;</div>',
                                    autoWidthAdjust: !0,
                                    autoCleanRelations: !0,
                                    jsonPretifySeparator: "\t",
                                    serializeRegexp: /[^\-]*$/,
                                    serializeParamName: !1,
                                    dragHandle: null,
                                },
                                t || {}
                            )),
                                n.tableDnD.makeDraggable(this),
                                this.tableDnDConfig.hierarchyLevel && n.tableDnD.makeIndented(this);
                        }),
                        this
                    );
                },
                makeIndented: function (t) {
                    var e,
                        o,
                        i = t.tableDnDConfig,
                        r = t.rows,
                        a = n(r).first().find("td:first")[0],
                        s = 0,
                        l = 0;
                    if (n(t).hasClass("indtd")) return null;
                    (o = n(t).addClass("indtd").attr("style")), n(t).css({ whiteSpace: "nowrap" });
                    for (var d = 0; d < r.length; d++) l < n(r[d]).find("td:first").text().length && ((l = n(r[d]).find("td:first").text().length), (e = d));
                    for (n(a).css({ width: "auto" }), d = 0; d < i.hierarchyLevel; d++) n(r[e]).find("td:first").prepend(i.indentArtifact);
                    for (a && n(a).css({ width: a.offsetWidth }), o && n(t).css(o), d = 0; d < i.hierarchyLevel; d++) n(r[e]).find("td:first").children(":first").remove();
                    return (
                        i.hierarchyLevel &&
                            n(r).each(function () {
                                ((s = n(this).data("level") || 0) <= i.hierarchyLevel && n(this).data("level", s)) || n(this).data("level", 0);
                                for (var t = 0; t < n(this).data("level"); t++) n(this).find("td:first").prepend(i.indentArtifact);
                            }),
                        this
                    );
                },
                makeDraggable: function (t) {
                    var e = t.tableDnDConfig;
                    (e.dragHandle &&
                        n(e.dragHandle, t).each(function () {
                            n(this).bind(r, function (o) {
                                return n.tableDnD.initialiseDrag(n(this).parents("tr")[0], t, this, o, e), !1;
                            });
                        })) ||
                        n(t.rows).each(function () {
                            n(this).hasClass("nodrag")
                                ? n(this).css("cursor", "")
                                : n(this)
                                      .bind(r, function (o) {
                                          if ("TD" === o.target.tagName) return n.tableDnD.initialiseDrag(this, t, this, o, e), !1;
                                      })
                                      .css("cursor", "move");
                        });
                },
                currentOrder: function () {
                    var t = this.currentTable.rows;
                    return n
                        .map(t, function (t) {
                            return (n(t).data("level") + t.id).replace(/\s/g, "");
                        })
                        .join("");
                },
                initialiseDrag: function (t, e, o, r, l) {
                    (this.dragObject = t),
                        (this.currentTable = e),
                        (this.mouseOffset = this.getMouseOffset(o, r)),
                        (this.originalOrder = this.currentOrder()),
                        n(i).bind(a, this.mousemove).bind(s, this.mouseup),
                        l.onDragStart && l.onDragStart(e, o);
                },
                updateTables: function () {
                    this.each(function () {
                        this.tableDnDConfig && n.tableDnD.makeDraggable(this);
                    });
                },
                mouseCoords: function (t) {
                    return t.originalEvent.changedTouches
                        ? { x: t.originalEvent.changedTouches[0].clientX, y: t.originalEvent.changedTouches[0].clientY }
                        : t.pageX || t.pageY
                        ? { x: t.pageX, y: t.pageY }
                        : { x: t.clientX + i.body.scrollLeft - i.body.clientLeft, y: t.clientY + i.body.scrollTop - i.body.clientTop };
                },
                getMouseOffset: function (t, e) {
                    var n, i;
                    return (e = e || o.event), (i = this.getPosition(t)), { x: (n = this.mouseCoords(e)).x - i.x, y: n.y - i.y };
                },
                getPosition: function (t) {
                    var e = 0,
                        n = 0;
                    for (0 === t.offsetHeight && (t = t.firstChild); t.offsetParent; ) (e += t.offsetLeft), (n += t.offsetTop), (t = t.offsetParent);
                    return { x: (e += t.offsetLeft), y: (n += t.offsetTop) };
                },
                autoScroll: function (t) {
                    var e = this.currentTable.tableDnDConfig,
                        n = o.pageYOffset,
                        r = o.innerHeight ? o.innerHeight : i.documentElement.clientHeight ? i.documentElement.clientHeight : i.body.clientHeight;
                    i.all && (void 0 !== i.compatMode && "BackCompat" !== i.compatMode ? (n = i.documentElement.scrollTop) : void 0 !== i.body && (n = i.body.scrollTop)),
                        (t.y - n < e.scrollAmount && o.scrollBy(0, -e.scrollAmount)) || (r - (t.y - n) < e.scrollAmount && o.scrollBy(0, e.scrollAmount));
                },
                moveVerticle: function (t, e) {
                    0 !== t.vertical &&
                        e &&
                        this.dragObject !== e &&
                        this.dragObject.parentNode === e.parentNode &&
                        ((0 > t.vertical && this.dragObject.parentNode.insertBefore(this.dragObject, e.nextSibling)) || (0 < t.vertical && this.dragObject.parentNode.insertBefore(this.dragObject, e)));
                },
                moveHorizontal: function (t, e) {
                    var o,
                        i = this.currentTable.tableDnDConfig;
                    if (!i.hierarchyLevel || 0 === t.horizontal || !e || this.dragObject !== e) return null;
                    (o = n(e).data("level")),
                        0 < t.horizontal && o > 0 && n(e).find("td:first").children(":first").remove() && n(e).data("level", --o),
                        0 > t.horizontal && o < i.hierarchyLevel && n(e).prev().data("level") >= o && n(e).children(":first").prepend(i.indentArtifact) && n(e).data("level", ++o);
                },
                mousemove: function (t) {
                    var e,
                        o,
                        i,
                        r,
                        a,
                        s = n(n.tableDnD.dragObject),
                        l = n.tableDnD.currentTable.tableDnDConfig;
                    return (
                        t && t.preventDefault(),
                        !!n.tableDnD.dragObject &&
                            ("touchmove" === t.type && event.preventDefault(),
                            (l.onDragClass && s.addClass(l.onDragClass)) || s.css(l.onDragStyle),
                            (r = (o = n.tableDnD.mouseCoords(t)).x - n.tableDnD.mouseOffset.x),
                            (a = o.y - n.tableDnD.mouseOffset.y),
                            n.tableDnD.autoScroll(o),
                            (e = n.tableDnD.findDropTargetRow(s, a)),
                            (i = n.tableDnD.findDragDirection(r, a)),
                            n.tableDnD.moveVerticle(i, e),
                            n.tableDnD.moveHorizontal(i, e),
                            !1)
                    );
                },
                findDragDirection: function (t, e) {
                    var n = this.currentTable.tableDnDConfig.sensitivity,
                        o = this.oldX,
                        i = this.oldY,
                        r = { horizontal: t >= o - n && t <= o + n ? 0 : t > o ? -1 : 1, vertical: e >= i - n && e <= i + n ? 0 : e > i ? -1 : 1 };
                    return 0 !== r.horizontal && (this.oldX = t), 0 !== r.vertical && (this.oldY = e), r;
                },
                findDropTargetRow: function (t, e) {
                    for (var o = 0, i = this.currentTable.rows, r = this.currentTable.tableDnDConfig, a = 0, s = null, l = 0; l < i.length; l++)
                        if (
                            ((s = i[l]),
                            (a = this.getPosition(s).y),
                            (o = parseInt(s.offsetHeight) / 2),
                            0 === s.offsetHeight && ((a = this.getPosition(s.firstChild).y), (o = parseInt(s.firstChild.offsetHeight) / 2)),
                            e > a - o && e < a + o)
                        )
                            return t.is(s) || (r.onAllowDrop && !r.onAllowDrop(t, s)) || n(s).hasClass("nodrop") ? null : s;
                    return null;
                },
                processMouseup: function () {
                    if (!this.currentTable || !this.dragObject) return null;
                    var t = this.currentTable.tableDnDConfig,
                        e = this.dragObject,
                        o = 0,
                        r = 0;
                    n(i).unbind(a, this.mousemove).unbind(s, this.mouseup),
                        t.hierarchyLevel &&
                            t.autoCleanRelations &&
                            n(this.currentTable.rows)
                                .first()
                                .find("td:first")
                                .children()
                                .each(function () {
                                    (r = n(this).parents("tr:first").data("level")) &&
                                        n(this)
                                            .parents("tr:first")
                                            .data("level", --r) &&
                                        n(this).remove();
                                }) &&
                            t.hierarchyLevel > 1 &&
                            n(this.currentTable.rows).each(function () {
                                if ((r = n(this).data("level")) > 1) for (o = n(this).prev().data("level"); r > o + 1; ) n(this).find("td:first").children(":first").remove(), n(this).data("level", --r);
                            }),
                        (t.onDragClass && n(e).removeClass(t.onDragClass)) || n(e).css(t.onDropStyle),
                        (this.dragObject = null),
                        t.onDrop && this.originalOrder !== this.currentOrder() && n(e).hide().fadeIn("fast") && t.onDrop(this.currentTable, e),
                        t.onDragStop && t.onDragStop(this.currentTable, e),
                        (this.currentTable = null);
                },
                mouseup: function (t) {
                    return t && t.preventDefault(), n.tableDnD.processMouseup(), !1;
                },
                jsonize: function (t) {
                    var e = this.currentTable;
                    return t ? JSON.stringify(this.tableData(e), null, e.tableDnDConfig.jsonPretifySeparator) : JSON.stringify(this.tableData(e));
                },
                serialize: function () {
                    return n.param(this.tableData(this.currentTable));
                },
                serializeTable: function (t) {
                    for (var e = "", n = t.tableDnDConfig.serializeParamName || t.id, o = t.rows, i = 0; i < o.length; i++) {
                        e.length > 0 && (e += "&");
                        var r = o[i].id;
                        r && t.tableDnDConfig && t.tableDnDConfig.serializeRegexp && (e += n + "[]=" + (r = r.match(t.tableDnDConfig.serializeRegexp)[0]));
                    }
                    return e;
                },
                serializeTables: function () {
                    var t = [];
                    return (
                        n("table").each(function () {
                            this.id && t.push(n.param(n.tableDnD.tableData(this)));
                        }),
                        t.join("&")
                    );
                },
                tableData: function (t) {
                    var e,
                        o,
                        i,
                        r,
                        a = t.tableDnDConfig,
                        s = [],
                        l = 0,
                        d = 0,
                        c = null,
                        u = {};
                    if ((t || (t = this.currentTable), !t || !t.rows || !t.rows.length)) return { error: { code: 500, message: "Not a valid table." } };
                    if (!t.id && !a.serializeParamName) return { error: { code: 500, message: "No serializable unique id provided." } };
                    (r = (a.autoCleanRelations && t.rows) || n.makeArray(t.rows)),
                        (e = function (t) {
                            return t && a && a.serializeRegexp ? t.match(a.serializeRegexp)[0] : t;
                        }),
                        (u[(i = o = a.serializeParamName || t.id)] = []),
                        !a.autoCleanRelations && n(r[0]).data("level") && r.unshift({ id: "undefined" });
                    for (var h = 0; h < r.length; h++)
                        if (a.hierarchyLevel) {
                            if (0 === (d = n(r[h]).data("level") || 0)) (i = o), (s = []);
                            else if (d > l) s.push([i, l]), (i = e(r[h - 1].id));
                            else if (d < l) for (var f = 0; f < s.length; f++) s[f][1] === d && (i = s[f][0]), s[f][1] >= l && (s[f][1] = 0);
                            (l = d), n.isArray(u[i]) || (u[i] = []), (c = e(r[h].id)) && u[i].push(c);
                        } else (c = e(r[h].id)) && u[i].push(c);
                    return u;
                },
            }),
            jQuery.fn.extend({
                tableDnD: n.tableDnD.build,
                tableDnDUpdate: n.tableDnD.updateTables,
                tableDnDSerialize: n.proxy(n.tableDnD.serialize, n.tableDnD),
                tableDnDSerializeAll: n.tableDnD.serializeTables,
                tableDnDData: n.proxy(n.tableDnD.tableData, n.tableDnD),
            });
    },
    function (t, e, n) {
        "use strict";
        n.r(e);
        /**
         * Copyright since 2007 PrestaShop SA and Contributors
         * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
         *
         * NOTICE OF LICENSE
         *
         * This source file is subject to the Open Software License (OSL 3.0)
         * that is bundled with this package in the file LICENSE.md.
         * It is also available through the world-wide-web at this URL:
         * https://opensource.org/licenses/OSL-3.0
         * If you did not receive a copy of the license and are unable to
         * obtain it through the world-wide-web, please send an email
         * to license@prestashop.com so we can send you a copy immediately.
         *
         * DISCLAIMER
         *
         * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
         * versions in the future. If you wish to customize PrestaShop for your
         * needs please refer to https://devdocs.prestashop.com/ for more information.
         *
         * @author    PrestaShop SA and Contributors <contact@prestashop.com>
         * @copyright Since 2007 PrestaShop SA and Contributors
         * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
         */ var o,
            i = {
                categoryDeleteAction: ".js-delete-category-row-action",
                customerDeleteAction: ".js-delete-customer-row-action",
                linkRowAction: ".js-link-row-action",
                linkRowActionClickableFirst: ".js-link-row-action[data-clickable-row=1]:first",
                clickableTd: "td.clickable",
            },
            r = function (t) {
                return "".concat(t, "-grid-confirm-modal");
            },
            a = ".js-grid-table",
            s = ".js-drag-handle",
            l = function (t) {
                return "#".concat(t, "_grid");
            },
            d = ".js-grid-panel",
            c = ".js-grid-header",
            u = function (t) {
                return ".js-grid-table .js-".concat(t, "-position");
            },
            h = function (t) {
                return ".js-".concat(t, "-position:first");
            },
            f = "table.table",
            p = ".js-reset-search",
            m = "position-row-while-drag",
            g = window.$,
            b = (function () {
                function t(t) {
                    (this.id = t), (this.$container = g(l(this.id)));
                }
                return (
                    (t.prototype.getId = function () {
                        return this.id;
                    }),
                    (t.prototype.getContainer = function () {
                        return this.$container;
                    }),
                    (t.prototype.getHeaderContainer = function () {
                        return this.$container.closest(d).find(c);
                    }),
                    (t.prototype.addExtension = function (t) {
                        t.extend(this);
                    }),
                    t
                );
            })(),
            y = window.$,
            v = (function () {
                function t() {}
                return (
                    (t.prototype.extend = function (t) {
                        this.initRowLinks(t), this.initConfirmableActions(t);
                    }),
                    (t.prototype.initConfirmableActions = function (t) {
                        t.getContainer().on("click", i.linkRowAction, function (t) {
                            var e = y(t.currentTarget).data("confirm-message");
                            e.length && !window.confirm(e) && t.preventDefault();
                        });
                    }),
                    (t.prototype.initRowLinks = function (t) {
                        y("tr", t.getContainer()).each(function () {
                            var t = y(this);
                            y(i.linkRowActionClickableFirst, t).each(function () {
                                var e = y(this),
                                    n = e.closest("td"),
                                    o = y(i.clickableTd, t).not(n),
                                    r = !1;
                                o.addClass("cursor-pointer").mousedown(function () {
                                    y(window).mousemove(function () {
                                        (r = !0), y(window).unbind("mousemove");
                                    });
                                }),
                                    o.mouseup(function () {
                                        var t = r;
                                        if (((r = !1), y(window).unbind("mousemove"), !t)) {
                                            var n = e.data("confirm-message");
                                            (!n.length || (window.confirm(n) && e.attr("href"))) && (document.location.href = e.attr("href"));
                                        }
                                    });
                            });
                        });
                    }),
                    t
                );
            })(),
            D = function () {
                return (D =
                    Object.assign ||
                    function (t) {
                        for (var e, n = 1, o = arguments.length; n < o; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                        return t;
                    }).apply(this, arguments);
            },
            w = (function () {
                function t(t) {
                    var e = D(
                        {
                            id: "confirm-modal",
                            closable: !1,
                            closeCallback: function () {
                                return !0;
                            },
                        },
                        t
                    );
                    this.buildModalContainer(e);
                }
                return (
                    (t.prototype.buildModalContainer = function (t) {
                        var e = this;
                        (this.container = document.createElement("div")),
                            this.container.classList.add("modal", "fade"),
                            (this.container.id = t.id),
                            (this.dialog = document.createElement("div")),
                            this.dialog.classList.add("modal-dialog"),
                            t.dialogStyle &&
                                Object.keys(t.dialogStyle).forEach(function (n) {
                                    e.dialog.style[n] = t.dialogStyle[n];
                                }),
                            (this.content = document.createElement("div")),
                            this.content.classList.add("modal-content"),
                            (this.message = document.createElement("p")),
                            this.message.classList.add("modal-message"),
                            (this.header = document.createElement("div")),
                            this.header.classList.add("modal-header"),
                            t.modalTitle && ((this.title = document.createElement("h4")), this.title.classList.add("modal-title"), (this.title.innerHTML = t.modalTitle)),
                            (this.closeIcon = document.createElement("button")),
                            this.closeIcon.classList.add("close"),
                            this.closeIcon.setAttribute("type", "button"),
                            (this.closeIcon.dataset.dismiss = "modal"),
                            (this.closeIcon.innerHTML = "×"),
                            (this.body = document.createElement("div")),
                            this.body.classList.add("modal-body", "text-left", "font-weight-normal"),
                            this.title && this.header.appendChild(this.title),
                            this.header.appendChild(this.closeIcon),
                            this.content.append(this.header, this.body),
                            this.body.appendChild(this.message),
                            this.dialog.appendChild(this.content),
                            this.container.appendChild(this.dialog);
                    }),
                    t
                );
            })(),
            C = (function () {
                function t(t) {
                    var e = D({ id: "confirm-modal", closable: !1, dialogStyle: {} }, t);
                    this.initContainer(e);
                }
                return (
                    (t.prototype.initContainer = function (t) {
                        this.modal || (this.modal = new w(t)), (this.$modal = $(this.modal.container));
                        var e = t.id,
                            n = t.closable;
                        this.$modal.modal({ backdrop: !!n || "static", keyboard: void 0 === n || n, show: !1 }),
                            this.$modal.on("hidden.bs.modal", function () {
                                var n = document.querySelector("#".concat(e));
                                n && n.remove(), t.closeCallback && t.closeCallback();
                            }),
                            document.body.appendChild(this.modal.container);
                    }),
                    (t.prototype.setTitle = function (t) {
                        this.modal.title || ((this.modal.title = document.createElement("h4")), this.modal.title.classList.add("modal-title"), this.modal.header.insertBefore(this.modal.title, this.modal.closeIcon)),
                            (this.modal.title.innerHTML = t);
                    }),
                    (t.prototype.render = function (t) {
                        this.modal.message.innerHTML = t;
                    }),
                    (t.prototype.show = function () {
                        this.$modal.modal("show");
                    }),
                    (t.prototype.hide = function () {
                        this.$modal.modal("hide");
                    }),
                    t
                );
            })(),
            O =
                ((o = function (t, e) {
                    return (o =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
                    function n() {
                        this.constructor = t;
                    }
                    o(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                }),
            T = function () {
                return (T =
                    Object.assign ||
                    function (t) {
                        for (var e, n = 1, o = arguments.length; n < o; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                        return t;
                    }).apply(this, arguments);
            },
            L = function (t, e, n) {
                if (n || 2 === arguments.length) for (var o, i = 0, r = e.length; i < r; i++) (!o && i in e) || (o || (o = Array.prototype.slice.call(e, 0, i)), (o[i] = e[i]));
                return t.concat(o || Array.prototype.slice.call(e));
            },
            j = (function (t) {
                function e(e) {
                    return t.call(this, e) || this;
                }
                return (
                    O(e, t),
                    (e.prototype.buildModalContainer = function (e) {
                        var n;
                        t.prototype.buildModalContainer.call(this, e),
                            this.message.classList.add("confirm-message"),
                            (this.message.innerHTML = e.confirmMessage),
                            (this.footer = document.createElement("div")),
                            this.footer.classList.add("modal-footer"),
                            (this.closeButton = document.createElement("button")),
                            this.closeButton.setAttribute("type", "button"),
                            this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg"),
                            (this.closeButton.dataset.dismiss = "modal"),
                            (this.closeButton.innerHTML = e.closeButtonLabel),
                            (this.confirmButton = document.createElement("button")),
                            this.confirmButton.setAttribute("type", "button"),
                            this.confirmButton.classList.add("btn", e.confirmButtonClass, "btn-lg", "btn-confirm-submit"),
                            (this.confirmButton.dataset.dismiss = "modal"),
                            (this.confirmButton.innerHTML = e.confirmButtonLabel),
                            (n = this.footer).append.apply(n, L(L([this.closeButton], e.customButtons, !1), [this.confirmButton], !1)),
                            this.content.append(this.footer);
                    }),
                    e
                );
            })(w),
            S = (function (t) {
                function e(e, n, o) {
                    void 0 === o &&
                        (o = function () {
                            return !0;
                        });
                    var i = T(
                        {
                            id: "confirm-modal",
                            confirmMessage: "Are you sure?",
                            closeButtonLabel: "Close",
                            confirmButtonLabel: "Accept",
                            confirmButtonClass: "btn-primary",
                            customButtons: [],
                            closable: !1,
                            modalTitle: e.confirmTitle,
                            dialogStyle: {},
                            confirmCallback: n,
                            closeCallback: o,
                        },
                        e
                    );
                    return t.call(this, i) || this;
                }
                return (
                    O(e, t),
                    (e.prototype.initContainer = function (e) {
                        (this.modal = new j(e)), this.modal.confirmButton.addEventListener("click", e.confirmCallback), t.prototype.initContainer.call(this, e);
                    }),
                    e
                );
            })(C),
            P = (function () {
                var t = function (e, n) {
                    return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(e, n);
                };
                return function (e, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function o() {
                        this.constructor = e;
                    }
                    t(e, n), (e.prototype = null === n ? Object.create(n) : ((o.prototype = n.prototype), new o()));
                };
            })(),
            x = function () {
                return (x =
                    Object.assign ||
                    function (t) {
                        for (var e, n = 1, o = arguments.length; n < o; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                        return t;
                    }).apply(this, arguments);
            },
            B = (function (t) {
                function e(e) {
                    return t.call(this, e) || this;
                }
                return (
                    P(e, t),
                    (e.prototype.buildModalContainer = function (e) {
                        t.prototype.buildModalContainer.call(this, e),
                            this.container.classList.add("modal-iframe"),
                            this.message.classList.add("d-none"),
                            (this.iframe = document.createElement("iframe")),
                            (this.iframe.frameBorder = "0"),
                            (this.iframe.scrolling = "auto"),
                            (this.iframe.width = "100%"),
                            (this.iframe.height = "100%"),
                            (this.loader = document.createElement("div")),
                            this.loader.classList.add("modal-iframe-loader"),
                            (this.spinner = document.createElement("div")),
                            this.spinner.classList.add("spinner"),
                            this.loader.appendChild(this.spinner),
                            this.body.append(this.loader, this.iframe);
                    }),
                    e
                );
            })(w),
            z = (function (t) {
                function e(e) {
                    var n = x({ id: "iframe-modal", closable: !1, autoSize: !0, autoSizeContainer: "body" }, e);
                    return t.call(this, n) || this;
                }
                return (
                    P(e, t),
                    (e.prototype.initContainer = function (e) {
                        var n = this;
                        (this.modal = new B(e)),
                            t.prototype.initContainer.call(this, e),
                            (this.autoSize = e.autoSize),
                            (this.autoSizeContainer = e.autoSizeContainer),
                            this.modal.iframe.addEventListener("load", function (t) {
                                n.hideLoading(),
                                    e.onLoaded && e.onLoaded(n.modal.iframe, t),
                                    n.modal.iframe.contentWindow &&
                                        (n.modal.iframe.contentWindow.addEventListener("beforeunload", function (t) {
                                            e.onUnload && e.onUnload(n.modal.iframe, t), n.showLoading();
                                        }),
                                        n.autoResize());
                            }),
                            this.$modal.on("shown.bs.modal", function () {
                                n.modal.iframe.src = e.iframeUrl;
                            });
                    }),
                    (e.prototype.render = function (t, e) {
                        void 0 === e && (e = !0), (this.modal.message.innerHTML = t), this.modal.message.classList.remove("d-none"), e && this.hideIframe(), this.autoResize(), this.hideLoading();
                    }),
                    (e.prototype.showLoading = function () {
                        this.modal.loader.classList.remove("d-none");
                    }),
                    (e.prototype.hideLoading = function () {
                        this.modal.loader.classList.add("d-none");
                    }),
                    (e.prototype.hideIframe = function () {
                        this.modal.iframe.classList.add("d-none");
                    }),
                    (e.prototype.autoResize = function () {
                        if (this.autoSize && this.modal.iframe.contentWindow) {
                            var t = this.modal.iframe.contentWindow.document.querySelector(this.autoSizeContainer);
                            if (t) {
                                var e = t.scrollHeight,
                                    n = this.getOuterHeight(this.modal.header) + this.getOuterHeight(this.modal.message) + e;
                                n && (this.modal.dialog.style.height = "".concat(n, "px"));
                            }
                        }
                    }),
                    (e.prototype.getOuterHeight = function (t) {
                        if (!t.offsetHeight) return 0;
                        var e = t.offsetHeight,
                            n = getComputedStyle(t);
                        return (e += parseInt(n.marginTop, 10) + parseInt(n.marginBottom, 10));
                    }),
                    e
                );
            })(C),
            A = (function () {
                var t = function (e, n) {
                    return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(e, n);
                };
                return function (e, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                    function o() {
                        this.constructor = e;
                    }
                    t(e, n), (e.prototype = null === n ? Object.create(n) : ((o.prototype = n.prototype), new o()));
                };
            })(),
            _ = function () {
                return (_ =
                    Object.assign ||
                    function (t) {
                        for (var e, n = 1, o = arguments.length; n < o; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                        return t;
                    }).apply(this, arguments);
            },
            E =
                ((function (t) {
                    function e(e) {
                        var n = this,
                            o = _(
                                {
                                    iframeUrl: e.formUrl,
                                    onLoaded: function (t, e) {
                                        return n.onIframeLoaded(t, e);
                                    },
                                },
                                e
                            );
                        return ((n = t.call(this, o) || this).onFormLoaded = e.onFormLoaded), (n.cancelButtonSelector = e.cancelButtonSelector || ".cancel-btn"), (n.formSelector = e.formSelector || "form"), n;
                    }
                    A(e, t),
                        (e.prototype.onIframeLoaded = function (t, e) {
                            var n = this;
                            if (t.contentWindow) {
                                var o = t.contentWindow.document.querySelector(this.formSelector);
                                if (o)
                                    if (
                                        (o.querySelectorAll(this.cancelButtonSelector).forEach(function (t) {
                                            t.addEventListener("click", function () {
                                                n.hide();
                                            });
                                        }),
                                        this.onFormLoaded)
                                    ) {
                                        var i = null,
                                            r = $(o).serializeArray();
                                        o.dataset && (i = o.dataset), this.onFormLoaded(o, r, i, e);
                                    }
                            }
                        });
                })(z),
                window.$),
            k = (function () {
                function t() {}
                return (
                    (t.prototype.extend = function (t) {
                        var e = this;
                        t.getContainer().on("click", ".js-submit-row-action", function (n) {
                            n.preventDefault();
                            var o = E(n.currentTarget),
                                i = o.data("confirmMessage"),
                                r = o.data("title"),
                                a = o.data("method");
                            if (r) e.showConfirmModal(o, t, i, r, a);
                            else {
                                if (i.length && !window.confirm(i)) return;
                                e.postForm(o, a);
                            }
                        });
                    }),
                    (t.prototype.postForm = function (t, e) {
                        var n = ["GET", "POST"].includes(e),
                            o = E("<form>", { action: t.data("url"), method: n ? e : "POST" }).appendTo("body");
                        n || o.append(E("<input>", { type: "_hidden", name: "_method", value: e })), o.submit();
                    }),
                    (t.prototype.showConfirmModal = function (t, e, n, o, i) {
                        var a = this,
                            s = t.data("confirmButtonLabel"),
                            l = t.data("closeButtonLabel"),
                            d = t.data("confirmButtonClass");
                        new S({ id: r(e.getId()), confirmTitle: o, confirmMessage: n, confirmButtonLabel: s, closeButtonLabel: l, confirmButtonClass: d }, function () {
                            return a.postForm(t, i);
                        }).show();
                    }),
                    t
                );
            })(),
            M = window.$,
            H = (function () {
                function t(t) {
                    (this.selector = ".ps-sortable-column"), (this.columns = M(t).find(this.selector));
                }
                return (
                    (t.prototype.attach = function () {
                        var t = this;
                        this.columns.on("click", function (e) {
                            var n = M(e.delegateTarget);
                            t.sortByColumn(n, t.getToggledSortDirection(n));
                        });
                    }),
                    (t.prototype.sortBy = function (t, e) {
                        if (!this.columns.is('[data-sort-col-name="'.concat(t, '"]'))) throw new Error('Cannot sort by "'.concat(t, '": invalid column'));
                        this.sortByColumn(this.columns, e);
                    }),
                    (t.prototype.sortByColumn = function (t, e) {
                        window.location.href = this.getUrl(t.data("sortColName"), "desc" === e ? "desc" : "asc", t.data("sortPrefix"));
                    }),
                    (t.prototype.getToggledSortDirection = function (t) {
                        return "asc" === t.data("sortDirection") ? "desc" : "asc";
                    }),
                    (t.prototype.getUrl = function (t, e, n) {
                        var o = new URL(window.location.href),
                            i = o.searchParams;
                        return n ? (i.set("".concat(n, "[orderBy]"), t), i.set("".concat(n, "[sortOrder]"), e)) : (i.set("orderBy", t), i.set("sortOrder", e)), o.toString();
                    }),
                    t
                );
            })(),
            I = (function () {
                function t() {}
                return (
                    (t.prototype.extend = function (t) {
                        var e = t.getContainer().find(f);
                        new H(e).attach();
                    }),
                    t
                );
            })(),
            R = (n(1), window.$),
            N = (function () {
                function t(t) {
                    this.grid = t;
                }
                return (
                    (t.prototype.extend = function (t) {
                        var e = this;
                        (this.grid = t),
                            this.addIdsToGridTableRows(),
                            t
                                .getContainer()
                                .find(a)
                                .tableDnD({
                                    onDragClass: m,
                                    dragHandle: s,
                                    onDrop: function (t, n) {
                                        return e.handlePositionChange(n);
                                    },
                                }),
                            t
                                .getContainer()
                                .find(".js-drag-handle")
                                .hover(
                                    function () {
                                        R(this).closest("tr").addClass("hover");
                                    },
                                    function () {
                                        R(this).closest("tr").removeClass("hover");
                                    }
                                );
                    }),
                    (t.prototype.handlePositionChange = function (t) {
                        var e = R(t).find(h(this.grid.getId())),
                            n = e.data("update-url"),
                            o = e.data("update-method"),
                            i = { positions: this.getRowsPositions() };
                        this.updatePosition(n, i, o);
                    }),
                    (t.prototype.getRowsPositions = function () {
                        for (var t, e = JSON.parse(R.tableDnD.jsonize())["".concat(this.grid.getId(), "_grid_table")], n = [], o = 0; o < e.length; o += 1)
                            (t = this.grid.getContainer().find("#".concat(e[o]))), n.push({ rowMarker: e[o], offset: t.data("dragAndDropOffset") });
                        return this.computeMappingBetweenOldAndNewPositions(n);
                    }),
                    (t.prototype.addIdsToGridTableRows = function () {
                        var t = 0;
                        this.grid
                            .getContainer()
                            .find(u(this.grid.getId()))
                            .each(function (e, n) {
                                var o = R(n),
                                    i = o.data("id"),
                                    r = o.data("position"),
                                    a = "row_".concat(i, "_").concat(r);
                                o.closest("tr").attr("id", a), o.closest("td").addClass(s), o.closest("tr").data("dragAndDropOffset", t), (t += 1);
                            });
                    }),
                    (t.prototype.updatePosition = function (t, e, n) {
                        for (var o, i = ["GET", "POST"].includes(n), r = R("<form>", { action: t, method: i ? n : "POST" }).appendTo("body"), a = e.positions.length, s = 0; s < a; s += 1)
                            (o = e.positions[s]),
                                r.append(
                                    R("<input>", { type: "hidden", name: "positions[".concat(s, "][rowId]"), value: o.rowId }),
                                    R("<input>", { type: "hidden", name: "positions[".concat(s, "][oldPosition]"), value: o.oldPosition }),
                                    R("<input>", { type: "hidden", name: "positions[".concat(s, "][newPosition]"), value: o.newPosition })
                                );
                        i || r.append(R("<input>", { type: "hidden", name: "_method", value: n })), r.submit();
                    }),
                    (t.prototype.computeMappingBetweenOldAndNewPositions = function (t) {
                        for (var e = /^row_(\d+)_(\d+)$/, n = Array(t.length).map(Object), o = 0; o < t.length; o += 1) {
                            var i = e.exec(t[o].rowMarker);
                            (null == i ? void 0 : i.rowId) && (null == i ? void 0 : i.oldPosition) && ((n[o].rowId = i.rowId), (n[o].oldPosition = parseInt(i.oldPosition, 10))), (n[t[o].offset].newPosition = n[o].oldPosition);
                        }
                        return n;
                    }),
                    t
                );
            })();
        /**
         * Copyright since 2007 PrestaShop SA and Contributors
         * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
         *
         * NOTICE OF LICENSE
         *
         * This source file is subject to the Open Software License (OSL 3.0)
         * that is bundled with this package in the file LICENSE.md.
         * It is also available through the world-wide-web at this URL:
         * https://opensource.org/licenses/OSL-3.0
         * If you did not receive a copy of the license and are unable to
         * obtain it through the world-wide-web, please send an email
         * to license@prestashop.com so we can send you a copy immediately.
         *
         * DISCLAIMER
         *
         * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
         * versions in the future. If you wish to customize PrestaShop for your
         * needs please refer to https://devdocs.prestashop.com/ for more information.
         *
         * @author    PrestaShop SA and Contributors <contact@prestashop.com>
         * @copyright Since 2007 PrestaShop SA and Contributors
         * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
         */
        /**
         * Copyright since 2007 PrestaShop SA and Contributors
         * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
         *
         * NOTICE OF LICENSE
         *
         * This source file is subject to the Open Software License (OSL 3.0)
         * that is bundled with this package in the file LICENSE.md.
         * It is also available through the world-wide-web at this URL:
         * https://opensource.org/licenses/OSL-3.0
         * If you did not receive a copy of the license and are unable to
         * obtain it through the world-wide-web, please send an email
         * to license@prestashop.com so we can send you a copy immediately.
         *
         * DISCLAIMER
         *
         * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
         * versions in the future. If you wish to customize PrestaShop for your
         * needs please refer to https://devdocs.prestashop.com/ for more information.
         *
         * @author    PrestaShop SA and Contributors <contact@prestashop.com>
         * @copyright Since 2007 PrestaShop SA and Contributors
         * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
         */
        const { $: F } = window;
        var U = function (t, e) {
                F.post(t).then(() => window.location.assign(e));
            },
            W = window.$,
            Y = (function () {
                function t() {}
                return (
                    (t.prototype.extend = function (t) {
                        t.getContainer().on("click", p, function (t) {
                            U(W(t.currentTarget).data("url"), W(t.currentTarget).data("redirect"));
                        });
                    }),
                    t
                );
            })();
        /**
         * Copyright since 2007 PrestaShop SA and Contributors
         * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
         *
         * NOTICE OF LICENSE
         *
         * This source file is subject to the Open Software License (OSL 3.0)
         * that is bundled with this package in the file LICENSE.md.
         * It is also available through the world-wide-web at this URL:
         * https://opensource.org/licenses/OSL-3.0
         * If you did not receive a copy of the license and are unable to
         * obtain it through the world-wide-web, please send an email
         * to license@prestashop.com so we can send you a copy immediately.
         *
         * DISCLAIMER
         *
         * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
         * versions in the future. If you wish to customize PrestaShop for your
         * needs please refer to https://devdocs.prestashop.com/ for more information.
         *
         * @author    PrestaShop SA and Contributors <contact@prestashop.com>
         * @copyright Since 2007 PrestaShop SA and Contributors
         * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
         */
        /**
         * Copyright since 2007 PrestaShop SA and Contributors
         * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
         *
         * NOTICE OF LICENSE
         *
         * This source file is subject to the Academic Free License version 3.0
         * that is bundled with this package in the file LICENSE.md.
         * It is also available through the world-wide-web at this URL:
         * https://opensource.org/licenses/AFL-3.0
         * If you did not receive a copy of the license and are unable to
         * obtain it through the world-wide-web, please send an email
         * to license@prestashop.com so we can send you a copy immediately.
         *
         * @author    PrestaShop SA and Contributors <contact@prestashop.com>
         * @copyright Since 2007 PrestaShop SA and Contributors
         * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
         */
        const { $: X } = window;
        X(() => {
            const t = new b("carrierrule");
            t.addExtension(new I()), t.addExtension(new v()), t.addExtension(new k()), t.addExtension(new N()), t.addExtension(new Y());
        });
    },
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9ob21lL2dvdC9wcm9qZWN0cy9wcmVzdGFzaG9wL3NvdXJjZS9kZXZlbG9wL2FkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL25vZGVfbW9kdWxlcy90YWJsZWRuZC9kaXN0L2pxdWVyeS50YWJsZWRuZC5taW4uanMiLCJ3ZWJwYWNrOi8vLy9ob21lL2dvdC9wcm9qZWN0cy9wcmVzdGFzaG9wL3NvdXJjZS9kZXZlbG9wL2FkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2NvbXBvbmVudHMvZ3JpZC9ncmlkLW1hcC50cyIsIndlYnBhY2s6Ly8vL2hvbWUvZ290L3Byb2plY3RzL3ByZXN0YXNob3Avc291cmNlL2RldmVsb3AvYWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovLy8vaG9tZS9nb3QvcHJvamVjdHMvcHJlc3Rhc2hvcC9zb3VyY2UvZGV2ZWxvcC9hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9jb21wb25lbnRzL2dyaWQvZ3JpZC50cyIsIndlYnBhY2s6Ly8vL2hvbWUvZ290L3Byb2plY3RzL3ByZXN0YXNob3Avc291cmNlL2RldmVsb3AvYWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9saW5rLXJvdy1hY3Rpb24tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovLy8vaG9tZS9nb3QvcHJvamVjdHMvcHJlc3Rhc2hvcC9zb3VyY2UvZGV2ZWxvcC9hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovLy8vaG9tZS9nb3QvcHJvamVjdHMvcHJlc3Rhc2hvcC9zb3VyY2UvZGV2ZWxvcC9hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly8vL2hvbWUvZ290L3Byb2plY3RzL3ByZXN0YXNob3Avc291cmNlL2RldmVsb3AvYWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly8vL2hvbWUvZ290L3Byb2plY3RzL3ByZXN0YXNob3Avc291cmNlL2RldmVsb3AvYWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L3N1Ym1pdC1yb3ctYWN0aW9uLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly8vL2hvbWUvZ290L3Byb2plY3RzL3ByZXN0YXNob3Avc291cmNlL2RldmVsb3AvYWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvYXBwL3V0aWxzL3RhYmxlLXNvcnRpbmcudHMiLCJ3ZWJwYWNrOi8vLy9ob21lL2dvdC9wcm9qZWN0cy9wcmVzdGFzaG9wL3NvdXJjZS9kZXZlbG9wL2FkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc29ydGluZy1leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vLy9ob21lL2dvdC9wcm9qZWN0cy9wcmVzdGFzaG9wL3NvdXJjZS9kZXZlbG9wL2FkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vcG9zaXRpb24tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovLy8vaG9tZS9nb3QvcHJvamVjdHMvcHJlc3Rhc2hvcC9zb3VyY2UvZGV2ZWxvcC9hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9hcHAvdXRpbHMvcmVzZXRfc2VhcmNoLmpzIiwid2VicGFjazovLy8vaG9tZS9nb3QvcHJvamVjdHMvcHJlc3Rhc2hvcC9zb3VyY2UvZGV2ZWxvcC9hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2ZpbHRlcnMtcmVzZXQtZXh0ZW5zaW9uLnRzIiwid2VicGFjazovLy8uL2RlbW8vaW5kZXguanMiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJhIiwiYiIsImUiLCJmIiwiZyIsImpRdWVyeSIsIndpbmRvdyIsImRvY3VtZW50IiwicmVhZHkiLCJtYXRjaCIsImxlbmd0aCIsInNoaWZ0IiwidHJpbSIsImVhY2giLCJ0aGlzIiwiZGF0YSIsInRhYmxlRG5EIiwib25EcmFnU3R5bGUiLCJvbkRyb3BTdHlsZSIsIm9uRHJhZ0NsYXNzIiwib25Ecm9wIiwiRnVuY3Rpb24iLCJvbkRyYWdTdGFydCIsIm9uRHJhZ1N0b3AiLCJzY3JvbGxBbW91bnQiLCJzZW5zaXRpdml0eSIsImhpZXJhcmNoeUxldmVsIiwiaW5kZW50QXJ0aWZhY3QiLCJhdXRvV2lkdGhBZGp1c3QiLCJhdXRvQ2xlYW5SZWxhdGlvbnMiLCJqc29uUHJldGlmeVNlcGFyYXRvciIsInNlcmlhbGl6ZVJlZ2V4cCIsIlJlZ0V4cCIsInNlcmlhbGl6ZVBhcmFtTmFtZSIsImRyYWdIYW5kbGUiLCJjdXJyZW50VGFibGUiLCJkcmFnT2JqZWN0IiwibW91c2VPZmZzZXQiLCJvbGRYIiwib2xkWSIsImJ1aWxkIiwidGFibGVEbkRDb25maWciLCJleHRlbmQiLCJtYWtlRHJhZ2dhYmxlIiwibWFrZUluZGVudGVkIiwicm93cyIsImZpcnN0IiwiZmluZCIsImgiLCJoYXNDbGFzcyIsImFkZENsYXNzIiwiYXR0ciIsImNzcyIsIndoaXRlU3BhY2UiLCJqIiwidGV4dCIsIndpZHRoIiwicHJlcGVuZCIsIm9mZnNldFdpZHRoIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJpbml0aWFsaXNlRHJhZyIsInBhcmVudHMiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY3VycmVudE9yZGVyIiwibWFwIiwiaWQiLCJyZXBsYWNlIiwiam9pbiIsImdldE1vdXNlT2Zmc2V0Iiwib3JpZ2luYWxPcmRlciIsIm1vdXNlbW92ZSIsIm1vdXNldXAiLCJ1cGRhdGVUYWJsZXMiLCJtb3VzZUNvb3JkcyIsIm9yaWdpbmFsRXZlbnQiLCJjaGFuZ2VkVG91Y2hlcyIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJwYWdlWCIsInBhZ2VZIiwiYm9keSIsInNjcm9sbExlZnQiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsVG9wIiwiY2xpZW50VG9wIiwiZXZlbnQiLCJnZXRQb3NpdGlvbiIsIm9mZnNldEhlaWdodCIsImZpcnN0Q2hpbGQiLCJvZmZzZXRQYXJlbnQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwiYXV0b1Njcm9sbCIsInBhZ2VZT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJhbGwiLCJjb21wYXRNb2RlIiwic2Nyb2xsQnkiLCJtb3ZlVmVydGljbGUiLCJ2ZXJ0aWNhbCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsIm1vdmVIb3Jpem9udGFsIiwiaG9yaXpvbnRhbCIsInByZXYiLCJwcmV2ZW50RGVmYXVsdCIsInR5cGUiLCJmaW5kRHJvcFRhcmdldFJvdyIsImZpbmREcmFnRGlyZWN0aW9uIiwicGFyc2VJbnQiLCJpcyIsIm9uQWxsb3dEcm9wIiwicHJvY2Vzc01vdXNldXAiLCJ1bmJpbmQiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJmYWRlSW4iLCJqc29uaXplIiwiSlNPTiIsInN0cmluZ2lmeSIsInRhYmxlRGF0YSIsInNlcmlhbGl6ZSIsInBhcmFtIiwic2VyaWFsaXplVGFibGUiLCJzZXJpYWxpemVUYWJsZXMiLCJwdXNoIiwiayIsImVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJtYWtlQXJyYXkiLCJ1bnNoaWZ0IiwiaXNBcnJheSIsImZuIiwidGFibGVEbkRVcGRhdGUiLCJ0YWJsZURuRFNlcmlhbGl6ZSIsInByb3h5IiwidGFibGVEbkRTZXJpYWxpemVBbGwiLCJ0YWJsZURuRERhdGEiLCJleHRlbmRTdGF0aWNzIiwiY2F0ZWdvcnlEZWxldGVBY3Rpb24iLCJjdXN0b21lckRlbGV0ZUFjdGlvbiIsImxpbmtSb3dBY3Rpb24iLCJsaW5rUm93QWN0aW9uQ2xpY2thYmxlRmlyc3QiLCJjbGlja2FibGVUZCIsImNvbmNhdCIsIiQiLCJHcmlkIiwiJGNvbnRhaW5lciIsImdldElkIiwiZ2V0Q29udGFpbmVyIiwiZ2V0SGVhZGVyQ29udGFpbmVyIiwiY2xvc2VzdCIsImFkZEV4dGVuc2lvbiIsImV4dGVuc2lvbiIsIkxpbmtSb3dBY3Rpb25FeHRlbnNpb24iLCJncmlkIiwiaW5pdFJvd0xpbmtzIiwiaW5pdENvbmZpcm1hYmxlQWN0aW9ucyIsIm9uIiwiY29uZmlybU1lc3NhZ2UiLCJjdXJyZW50VGFyZ2V0IiwiY29uZmlybSIsIiRwYXJlbnRSb3ciLCIkcm93QWN0aW9uIiwiJHBhcmVudENlbGwiLCJjbGlja2FibGVDZWxscyIsIm5vdCIsImlzRHJhZ2dpbmciLCJtb3VzZWRvd24iLCJ3YXNEcmFnZ2luZyIsImxvY2F0aW9uIiwiaHJlZiIsIl9fYXNzaWduIiwiYXNzaWduIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJNb2RhbENvbnRhaW5lciIsImlucHV0UGFyYW1zIiwicGFyYW1zIiwiY2xvc2FibGUiLCJjbG9zZUNhbGxiYWNrIiwiYnVpbGRNb2RhbENvbnRhaW5lciIsIl90aGlzIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRpYWxvZyIsImRpYWxvZ1N0eWxlIiwia2V5cyIsImZvckVhY2giLCJzdHlsZSIsImNvbnRlbnQiLCJoZWFkZXIiLCJtb2RhbFRpdGxlIiwidGl0bGUiLCJpbm5lckhUTUwiLCJjbG9zZUljb24iLCJzZXRBdHRyaWJ1dGUiLCJkYXRhc2V0IiwiZGlzbWlzcyIsImFwcGVuZENoaWxkIiwiYXBwZW5kIiwiTW9kYWwiLCJpbml0Q29udGFpbmVyIiwibW9kYWwiLCIkbW9kYWwiLCJiYWNrZHJvcCIsImtleWJvYXJkIiwidW5kZWZpbmVkIiwic2hvdyIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRUaXRsZSIsInJlbmRlciIsIl9fZXh0ZW5kcyIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiQXJyYXkiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiX19zcHJlYWRBcnJheSIsInRvIiwiZnJvbSIsInBhY2siLCJhciIsInNsaWNlIiwiQ29uZmlybU1vZGFsQ29udGFpbmVyIiwiX3N1cGVyIiwiX2EiLCJmb290ZXIiLCJjbG9zZUJ1dHRvbiIsImNsb3NlQnV0dG9uTGFiZWwiLCJjb25maXJtQnV0dG9uIiwiY29uZmlybUJ1dHRvbkNsYXNzIiwiY29uZmlybUJ1dHRvbkxhYmVsIiwiY3VzdG9tQnV0dG9ucyIsIkNvbmZpcm1Nb2RhbCIsImNvbmZpcm1DYWxsYmFjayIsImNhbmNlbENhbGxiYWNrIiwiY29uZmlybVRpdGxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIklmcmFtZU1vZGFsQ29udGFpbmVyIiwiaWZyYW1lIiwiZnJhbWVCb3JkZXIiLCJzY3JvbGxpbmciLCJoZWlnaHQiLCJsb2FkZXIiLCJzcGlubmVyIiwiSWZyYW1lTW9kYWwiLCJhdXRvU2l6ZSIsImF1dG9TaXplQ29udGFpbmVyIiwibG9hZGVkRXZlbnQiLCJoaWRlTG9hZGluZyIsIm9uTG9hZGVkIiwiY29udGVudFdpbmRvdyIsInVubG9hZEV2ZW50Iiwib25VbmxvYWQiLCJzaG93TG9hZGluZyIsImF1dG9SZXNpemUiLCJzcmMiLCJpZnJhbWVVcmwiLCJoaWRlSWZyYW1lIiwiaWZyYW1lQ29udGFpbmVyIiwiaWZyYW1lU2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiY29udGVudEhlaWdodCIsImdldE91dGVySGVpZ2h0IiwiZWxlbWVudCIsImdldENvbXB1dGVkU3R5bGUiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJGb3JtSWZyYW1lTW9kYWwiLCJpZnJhbWVQYXJhbXMiLCJmb3JtVXJsIiwib25JZnJhbWVMb2FkZWQiLCJvbkZvcm1Mb2FkZWQiLCJjYW5jZWxCdXR0b25TZWxlY3RvciIsImZvcm1TZWxlY3RvciIsImlmcmFtZUZvcm0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2FuY2VsQnV0dG9uIiwiZGF0YUF0dHJpYnV0ZXMiLCJmb3JtRGF0YSIsInNlcmlhbGl6ZUFycmF5IiwiU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uIiwiJGJ1dHRvbiIsIm1ldGhvZCIsInNob3dDb25maXJtTW9kYWwiLCJwb3N0Rm9ybSIsImlzR2V0T3JQb3N0TWV0aG9kIiwiaW5jbHVkZXMiLCIkZm9ybSIsImFjdGlvbiIsImFwcGVuZFRvIiwic3VibWl0IiwiJHN1Ym1pdEJ0biIsIlRhYmxlU29ydGluZyIsInRhYmxlIiwic2VsZWN0b3IiLCJjb2x1bW5zIiwiYXR0YWNoIiwiJGNvbHVtbiIsImRlbGVnYXRlVGFyZ2V0Iiwic29ydEJ5Q29sdW1uIiwiZ2V0VG9nZ2xlZFNvcnREaXJlY3Rpb24iLCJzb3J0QnkiLCJjb2x1bW5OYW1lIiwiZGlyZWN0aW9uIiwiRXJyb3IiLCJjb2x1bW4iLCJnZXRVcmwiLCJjb2xOYW1lIiwicHJlZml4IiwidXJsIiwiVVJMIiwic2VhcmNoUGFyYW1zIiwic2V0IiwidG9TdHJpbmciLCJTb3J0aW5nRXh0ZW5zaW9uIiwiJHNvcnRhYmxlVGFibGUiLCJQb3NpdGlvbkV4dGVuc2lvbiIsImFkZElkc1RvR3JpZFRhYmxlUm93cyIsInJvdyIsImhhbmRsZVBvc2l0aW9uQ2hhbmdlIiwiaG92ZXIiLCIkcm93UG9zaXRpb25Db250YWluZXIiLCJ1cGRhdGVVcmwiLCJwb3NpdGlvbnMiLCJnZXRSb3dzUG9zaXRpb25zIiwidXBkYXRlUG9zaXRpb24iLCJ0ckRhdGEiLCJyb3dzRGF0YSIsInBhcnNlIiwiY29tcGxldGVSb3dzRGF0YSIsInJvd01hcmtlciIsIm9mZnNldCIsImNvbXB1dGVNYXBwaW5nQmV0d2Vlbk9sZEFuZE5ld1Bvc2l0aW9ucyIsImNvdW50ZXIiLCJpbmRleCIsInBvc2l0aW9uV3JhcHBlciIsIiRwb3NpdGlvbldyYXBwZXIiLCJyb3dJZCIsInBvc2l0aW9uIiwicG9zaXRpb25zTmIiLCJvbGRQb3NpdGlvbiIsIm5ld1Bvc2l0aW9uIiwicmVnZXgiLCJtYXBwaW5nIiwicmVnZXhSZXN1bHQiLCJleGVjIiwicmVkaXJlY3RVcmwiLCJwb3N0IiwidGhlbiIsIkZpbHRlcnNSZXNldEV4dGVuc2lvbiJdLCJtYXBwaW5ncyI6ImFBQ0UsSUFBSUEsRUFBbUIsR0FHdkIsU0FBU0MsRUFBb0JDLEdBRzVCLEdBQUdGLEVBQWlCRSxHQUNuQixPQUFPRixFQUFpQkUsR0FBVUMsUUFHbkMsSUFBSUMsRUFBU0osRUFBaUJFLEdBQVksQ0FDekNHLEVBQUdILEVBQ0hJLEdBQUcsRUFDSEgsUUFBUyxJQVVWLE9BTkFJLEVBQVFMLEdBQVVNLEtBQUtKLEVBQU9ELFFBQVNDLEVBQVFBLEVBQU9ELFFBQVNGLEdBRy9ERyxFQUFPRSxHQUFJLEVBR0pGLEVBQU9ELFFBS2ZGLEVBQW9CUSxFQUFJRixFQUd4Qk4sRUFBb0JTLEVBQUlWLEVBR3hCQyxFQUFvQlUsRUFBSSxTQUFTUixFQUFTUyxFQUFNQyxHQUMzQ1osRUFBb0JhLEVBQUVYLEVBQVNTLElBQ2xDRyxPQUFPQyxlQUFlYixFQUFTUyxFQUFNLENBQUVLLFlBQVksRUFBTUMsSUFBS0wsS0FLaEVaLEVBQW9Ca0IsRUFBSSxTQUFTaEIsR0FDWCxvQkFBWGlCLFFBQTBCQSxPQUFPQyxhQUMxQ04sT0FBT0MsZUFBZWIsRUFBU2lC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YnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJwdWJsaWNcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyohIGpxdWVyeS50YWJsZWRuZC5qcyAzMC0xMi0yMDE3ICovXG4hZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9XCJ0b3VjaHN0YXJ0IG1vdXNlZG93blwiLGY9XCJ0b3VjaG1vdmUgbW91c2Vtb3ZlXCIsZz1cInRvdWNoZW5kIG1vdXNldXBcIjthKGMpLnJlYWR5KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihhKXtmb3IodmFyIGI9e30sYz1hLm1hdGNoKC8oW147Ol0rKS9nKXx8W107Yy5sZW5ndGg7KWJbYy5zaGlmdCgpXT1jLnNoaWZ0KCkudHJpbSgpO3JldHVybiBifWEoXCJ0YWJsZVwiKS5lYWNoKGZ1bmN0aW9uKCl7XCJkbmRcIj09PWEodGhpcykuZGF0YShcInRhYmxlXCIpJiZhKHRoaXMpLnRhYmxlRG5EKHtvbkRyYWdTdHlsZTphKHRoaXMpLmRhdGEoXCJvbmRyYWdzdHlsZVwiKSYmYihhKHRoaXMpLmRhdGEoXCJvbmRyYWdzdHlsZVwiKSl8fG51bGwsb25Ecm9wU3R5bGU6YSh0aGlzKS5kYXRhKFwib25kcm9wc3R5bGVcIikmJmIoYSh0aGlzKS5kYXRhKFwib25kcm9wc3R5bGVcIikpfHxudWxsLG9uRHJhZ0NsYXNzOmEodGhpcykuZGF0YShcIm9uZHJhZ2NsYXNzXCIpPT09ZCYmXCJ0RG5EX3doaWxlRHJhZ1wifHxhKHRoaXMpLmRhdGEoXCJvbmRyYWdjbGFzc1wiKSxvbkRyb3A6YSh0aGlzKS5kYXRhKFwib25kcm9wXCIpJiZuZXcgRnVuY3Rpb24oXCJ0YWJsZVwiLFwicm93XCIsYSh0aGlzKS5kYXRhKFwib25kcm9wXCIpKSxvbkRyYWdTdGFydDphKHRoaXMpLmRhdGEoXCJvbmRyYWdzdGFydFwiKSYmbmV3IEZ1bmN0aW9uKFwidGFibGVcIixcInJvd1wiLGEodGhpcykuZGF0YShcIm9uZHJhZ3N0YXJ0XCIpKSxvbkRyYWdTdG9wOmEodGhpcykuZGF0YShcIm9uZHJhZ3N0b3BcIikmJm5ldyBGdW5jdGlvbihcInRhYmxlXCIsXCJyb3dcIixhKHRoaXMpLmRhdGEoXCJvbmRyYWdzdG9wXCIpKSxzY3JvbGxBbW91bnQ6YSh0aGlzKS5kYXRhKFwic2Nyb2xsYW1vdW50XCIpfHw1LHNlbnNpdGl2aXR5OmEodGhpcykuZGF0YShcInNlbnNpdGl2aXR5XCIpfHwxMCxoaWVyYXJjaHlMZXZlbDphKHRoaXMpLmRhdGEoXCJoaWVyYXJjaHlsZXZlbFwiKXx8MCxpbmRlbnRBcnRpZmFjdDphKHRoaXMpLmRhdGEoXCJpbmRlbnRhcnRpZmFjdFwiKXx8JzxkaXYgY2xhc3M9XCJpbmRlbnRcIj4mbmJzcDs8L2Rpdj4nLGF1dG9XaWR0aEFkanVzdDphKHRoaXMpLmRhdGEoXCJhdXRvd2lkdGhhZGp1c3RcIil8fCEwLGF1dG9DbGVhblJlbGF0aW9uczphKHRoaXMpLmRhdGEoXCJhdXRvY2xlYW5yZWxhdGlvbnNcIil8fCEwLGpzb25QcmV0aWZ5U2VwYXJhdG9yOmEodGhpcykuZGF0YShcImpzb25wcmV0aWZ5c2VwYXJhdG9yXCIpfHxcIlxcdFwiLHNlcmlhbGl6ZVJlZ2V4cDphKHRoaXMpLmRhdGEoXCJzZXJpYWxpemVyZWdleHBcIikmJm5ldyBSZWdFeHAoYSh0aGlzKS5kYXRhKFwic2VyaWFsaXplcmVnZXhwXCIpKXx8L1teXFwtXSokLyxzZXJpYWxpemVQYXJhbU5hbWU6YSh0aGlzKS5kYXRhKFwic2VyaWFsaXplcGFyYW1uYW1lXCIpfHwhMSxkcmFnSGFuZGxlOmEodGhpcykuZGF0YShcImRyYWdoYW5kbGVcIil8fG51bGx9KX0pfSksalF1ZXJ5LnRhYmxlRG5EPXtjdXJyZW50VGFibGU6bnVsbCxkcmFnT2JqZWN0Om51bGwsbW91c2VPZmZzZXQ6bnVsbCxvbGRYOjAsb2xkWTowLGJ1aWxkOmZ1bmN0aW9uKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnRhYmxlRG5EQ29uZmlnPWEuZXh0ZW5kKHtvbkRyYWdTdHlsZTpudWxsLG9uRHJvcFN0eWxlOm51bGwsb25EcmFnQ2xhc3M6XCJ0RG5EX3doaWxlRHJhZ1wiLG9uRHJvcDpudWxsLG9uRHJhZ1N0YXJ0Om51bGwsb25EcmFnU3RvcDpudWxsLHNjcm9sbEFtb3VudDo1LHNlbnNpdGl2aXR5OjEwLGhpZXJhcmNoeUxldmVsOjAsaW5kZW50QXJ0aWZhY3Q6JzxkaXYgY2xhc3M9XCJpbmRlbnRcIj4mbmJzcDs8L2Rpdj4nLGF1dG9XaWR0aEFkanVzdDohMCxhdXRvQ2xlYW5SZWxhdGlvbnM6ITAsanNvblByZXRpZnlTZXBhcmF0b3I6XCJcXHRcIixzZXJpYWxpemVSZWdleHA6L1teXFwtXSokLyxzZXJpYWxpemVQYXJhbU5hbWU6ITEsZHJhZ0hhbmRsZTpudWxsfSxifHx7fSksYS50YWJsZURuRC5tYWtlRHJhZ2dhYmxlKHRoaXMpLHRoaXMudGFibGVEbkRDb25maWcuaGllcmFyY2h5TGV2ZWwmJmEudGFibGVEbkQubWFrZUluZGVudGVkKHRoaXMpfSksdGhpc30sbWFrZUluZGVudGVkOmZ1bmN0aW9uKGIpe3ZhciBjLGQsZT1iLnRhYmxlRG5EQ29uZmlnLGY9Yi5yb3dzLGc9YShmKS5maXJzdCgpLmZpbmQoXCJ0ZDpmaXJzdFwiKVswXSxoPTAsaT0wO2lmKGEoYikuaGFzQ2xhc3MoXCJpbmR0ZFwiKSlyZXR1cm4gbnVsbDtkPWEoYikuYWRkQ2xhc3MoXCJpbmR0ZFwiKS5hdHRyKFwic3R5bGVcIiksYShiKS5jc3Moe3doaXRlU3BhY2U6XCJub3dyYXBcIn0pO2Zvcih2YXIgaj0wO2o8Zi5sZW5ndGg7aisrKWk8YShmW2pdKS5maW5kKFwidGQ6Zmlyc3RcIikudGV4dCgpLmxlbmd0aCYmKGk9YShmW2pdKS5maW5kKFwidGQ6Zmlyc3RcIikudGV4dCgpLmxlbmd0aCxjPWopO2ZvcihhKGcpLmNzcyh7d2lkdGg6XCJhdXRvXCJ9KSxqPTA7ajxlLmhpZXJhcmNoeUxldmVsO2orKylhKGZbY10pLmZpbmQoXCJ0ZDpmaXJzdFwiKS5wcmVwZW5kKGUuaW5kZW50QXJ0aWZhY3QpO2ZvcihnJiZhKGcpLmNzcyh7d2lkdGg6Zy5vZmZzZXRXaWR0aH0pLGQmJmEoYikuY3NzKGQpLGo9MDtqPGUuaGllcmFyY2h5TGV2ZWw7aisrKWEoZltjXSkuZmluZChcInRkOmZpcnN0XCIpLmNoaWxkcmVuKFwiOmZpcnN0XCIpLnJlbW92ZSgpO3JldHVybiBlLmhpZXJhcmNoeUxldmVsJiZhKGYpLmVhY2goZnVuY3Rpb24oKXsoaD1hKHRoaXMpLmRhdGEoXCJsZXZlbFwiKXx8MCk8PWUuaGllcmFyY2h5TGV2ZWwmJmEodGhpcykuZGF0YShcImxldmVsXCIsaCl8fGEodGhpcykuZGF0YShcImxldmVsXCIsMCk7Zm9yKHZhciBiPTA7YjxhKHRoaXMpLmRhdGEoXCJsZXZlbFwiKTtiKyspYSh0aGlzKS5maW5kKFwidGQ6Zmlyc3RcIikucHJlcGVuZChlLmluZGVudEFydGlmYWN0KX0pLHRoaXN9LG1ha2VEcmFnZ2FibGU6ZnVuY3Rpb24oYil7dmFyIGM9Yi50YWJsZURuRENvbmZpZztjLmRyYWdIYW5kbGUmJmEoYy5kcmFnSGFuZGxlLGIpLmVhY2goZnVuY3Rpb24oKXthKHRoaXMpLmJpbmQoZSxmdW5jdGlvbihkKXtyZXR1cm4gYS50YWJsZURuRC5pbml0aWFsaXNlRHJhZyhhKHRoaXMpLnBhcmVudHMoXCJ0clwiKVswXSxiLHRoaXMsZCxjKSwhMX0pfSl8fGEoYi5yb3dzKS5lYWNoKGZ1bmN0aW9uKCl7YSh0aGlzKS5oYXNDbGFzcyhcIm5vZHJhZ1wiKT9hKHRoaXMpLmNzcyhcImN1cnNvclwiLFwiXCIpOmEodGhpcykuYmluZChlLGZ1bmN0aW9uKGQpe2lmKFwiVERcIj09PWQudGFyZ2V0LnRhZ05hbWUpcmV0dXJuIGEudGFibGVEbkQuaW5pdGlhbGlzZURyYWcodGhpcyxiLHRoaXMsZCxjKSwhMX0pLmNzcyhcImN1cnNvclwiLFwibW92ZVwiKX0pfSxjdXJyZW50T3JkZXI6ZnVuY3Rpb24oKXt2YXIgYj10aGlzLmN1cnJlbnRUYWJsZS5yb3dzO3JldHVybiBhLm1hcChiLGZ1bmN0aW9uKGIpe3JldHVybihhKGIpLmRhdGEoXCJsZXZlbFwiKStiLmlkKS5yZXBsYWNlKC9cXHMvZyxcIlwiKX0pLmpvaW4oXCJcIil9LGluaXRpYWxpc2VEcmFnOmZ1bmN0aW9uKGIsZCxlLGgsaSl7dGhpcy5kcmFnT2JqZWN0PWIsdGhpcy5jdXJyZW50VGFibGU9ZCx0aGlzLm1vdXNlT2Zmc2V0PXRoaXMuZ2V0TW91c2VPZmZzZXQoZSxoKSx0aGlzLm9yaWdpbmFsT3JkZXI9dGhpcy5jdXJyZW50T3JkZXIoKSxhKGMpLmJpbmQoZix0aGlzLm1vdXNlbW92ZSkuYmluZChnLHRoaXMubW91c2V1cCksaS5vbkRyYWdTdGFydCYmaS5vbkRyYWdTdGFydChkLGUpfSx1cGRhdGVUYWJsZXM6ZnVuY3Rpb24oKXt0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnRhYmxlRG5EQ29uZmlnJiZhLnRhYmxlRG5ELm1ha2VEcmFnZ2FibGUodGhpcyl9KX0sbW91c2VDb29yZHM6ZnVuY3Rpb24oYSl7cmV0dXJuIGEub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcz97eDphLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCx5OmEub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZfTphLnBhZ2VYfHxhLnBhZ2VZP3t4OmEucGFnZVgseTphLnBhZ2VZfTp7eDphLmNsaWVudFgrYy5ib2R5LnNjcm9sbExlZnQtYy5ib2R5LmNsaWVudExlZnQseTphLmNsaWVudFkrYy5ib2R5LnNjcm9sbFRvcC1jLmJvZHkuY2xpZW50VG9wfX0sZ2V0TW91c2VPZmZzZXQ6ZnVuY3Rpb24oYSxjKXt2YXIgZCxlO3JldHVybiBjPWN8fGIuZXZlbnQsZT10aGlzLmdldFBvc2l0aW9uKGEpLGQ9dGhpcy5tb3VzZUNvb3JkcyhjKSx7eDpkLngtZS54LHk6ZC55LWUueX19LGdldFBvc2l0aW9uOmZ1bmN0aW9uKGEpe3ZhciBiPTAsYz0wO2ZvcigwPT09YS5vZmZzZXRIZWlnaHQmJihhPWEuZmlyc3RDaGlsZCk7YS5vZmZzZXRQYXJlbnQ7KWIrPWEub2Zmc2V0TGVmdCxjKz1hLm9mZnNldFRvcCxhPWEub2Zmc2V0UGFyZW50O3JldHVybiBiKz1hLm9mZnNldExlZnQsYys9YS5vZmZzZXRUb3Ase3g6Yix5OmN9fSxhdXRvU2Nyb2xsOmZ1bmN0aW9uKGEpe3ZhciBkPXRoaXMuY3VycmVudFRhYmxlLnRhYmxlRG5EQ29uZmlnLGU9Yi5wYWdlWU9mZnNldCxmPWIuaW5uZXJIZWlnaHQ/Yi5pbm5lckhlaWdodDpjLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ/Yy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0OmMuYm9keS5jbGllbnRIZWlnaHQ7Yy5hbGwmJih2b2lkIDAhPT1jLmNvbXBhdE1vZGUmJlwiQmFja0NvbXBhdFwiIT09Yy5jb21wYXRNb2RlP2U9Yy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wOnZvaWQgMCE9PWMuYm9keSYmKGU9Yy5ib2R5LnNjcm9sbFRvcCkpLGEueS1lPGQuc2Nyb2xsQW1vdW50JiZiLnNjcm9sbEJ5KDAsLWQuc2Nyb2xsQW1vdW50KXx8Zi0oYS55LWUpPGQuc2Nyb2xsQW1vdW50JiZiLnNjcm9sbEJ5KDAsZC5zY3JvbGxBbW91bnQpfSxtb3ZlVmVydGljbGU6ZnVuY3Rpb24oYSxiKXswIT09YS52ZXJ0aWNhbCYmYiYmdGhpcy5kcmFnT2JqZWN0IT09YiYmdGhpcy5kcmFnT2JqZWN0LnBhcmVudE5vZGU9PT1iLnBhcmVudE5vZGUmJigwPmEudmVydGljYWwmJnRoaXMuZHJhZ09iamVjdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmRyYWdPYmplY3QsYi5uZXh0U2libGluZyl8fDA8YS52ZXJ0aWNhbCYmdGhpcy5kcmFnT2JqZWN0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZHJhZ09iamVjdCxiKSl9LG1vdmVIb3Jpem9udGFsOmZ1bmN0aW9uKGIsYyl7dmFyIGQsZT10aGlzLmN1cnJlbnRUYWJsZS50YWJsZURuRENvbmZpZztpZighZS5oaWVyYXJjaHlMZXZlbHx8MD09PWIuaG9yaXpvbnRhbHx8IWN8fHRoaXMuZHJhZ09iamVjdCE9PWMpcmV0dXJuIG51bGw7ZD1hKGMpLmRhdGEoXCJsZXZlbFwiKSwwPGIuaG9yaXpvbnRhbCYmZD4wJiZhKGMpLmZpbmQoXCJ0ZDpmaXJzdFwiKS5jaGlsZHJlbihcIjpmaXJzdFwiKS5yZW1vdmUoKSYmYShjKS5kYXRhKFwibGV2ZWxcIiwtLWQpLDA+Yi5ob3Jpem9udGFsJiZkPGUuaGllcmFyY2h5TGV2ZWwmJmEoYykucHJldigpLmRhdGEoXCJsZXZlbFwiKT49ZCYmYShjKS5jaGlsZHJlbihcIjpmaXJzdFwiKS5wcmVwZW5kKGUuaW5kZW50QXJ0aWZhY3QpJiZhKGMpLmRhdGEoXCJsZXZlbFwiLCsrZCl9LG1vdXNlbW92ZTpmdW5jdGlvbihiKXt2YXIgYyxkLGUsZixnLGg9YShhLnRhYmxlRG5ELmRyYWdPYmplY3QpLGk9YS50YWJsZURuRC5jdXJyZW50VGFibGUudGFibGVEbkRDb25maWc7cmV0dXJuIGImJmIucHJldmVudERlZmF1bHQoKSwhIWEudGFibGVEbkQuZHJhZ09iamVjdCYmKFwidG91Y2htb3ZlXCI9PT1iLnR5cGUmJmV2ZW50LnByZXZlbnREZWZhdWx0KCksaS5vbkRyYWdDbGFzcyYmaC5hZGRDbGFzcyhpLm9uRHJhZ0NsYXNzKXx8aC5jc3MoaS5vbkRyYWdTdHlsZSksZD1hLnRhYmxlRG5ELm1vdXNlQ29vcmRzKGIpLGY9ZC54LWEudGFibGVEbkQubW91c2VPZmZzZXQueCxnPWQueS1hLnRhYmxlRG5ELm1vdXNlT2Zmc2V0LnksYS50YWJsZURuRC5hdXRvU2Nyb2xsKGQpLGM9YS50YWJsZURuRC5maW5kRHJvcFRhcmdldFJvdyhoLGcpLGU9YS50YWJsZURuRC5maW5kRHJhZ0RpcmVjdGlvbihmLGcpLGEudGFibGVEbkQubW92ZVZlcnRpY2xlKGUsYyksYS50YWJsZURuRC5tb3ZlSG9yaXpvbnRhbChlLGMpLCExKX0sZmluZERyYWdEaXJlY3Rpb246ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmN1cnJlbnRUYWJsZS50YWJsZURuRENvbmZpZy5zZW5zaXRpdml0eSxkPXRoaXMub2xkWCxlPXRoaXMub2xkWSxmPWQtYyxnPWQrYyxoPWUtYyxpPWUrYyxqPXtob3Jpem9udGFsOmE+PWYmJmE8PWc/MDphPmQ/LTE6MSx2ZXJ0aWNhbDpiPj1oJiZiPD1pPzA6Yj5lPy0xOjF9O3JldHVybiAwIT09ai5ob3Jpem9udGFsJiYodGhpcy5vbGRYPWEpLDAhPT1qLnZlcnRpY2FsJiYodGhpcy5vbGRZPWIpLGp9LGZpbmREcm9wVGFyZ2V0Um93OmZ1bmN0aW9uKGIsYyl7Zm9yKHZhciBkPTAsZT10aGlzLmN1cnJlbnRUYWJsZS5yb3dzLGY9dGhpcy5jdXJyZW50VGFibGUudGFibGVEbkRDb25maWcsZz0wLGg9bnVsbCxpPTA7aTxlLmxlbmd0aDtpKyspaWYoaD1lW2ldLGc9dGhpcy5nZXRQb3NpdGlvbihoKS55LGQ9cGFyc2VJbnQoaC5vZmZzZXRIZWlnaHQpLzIsMD09PWgub2Zmc2V0SGVpZ2h0JiYoZz10aGlzLmdldFBvc2l0aW9uKGguZmlyc3RDaGlsZCkueSxkPXBhcnNlSW50KGguZmlyc3RDaGlsZC5vZmZzZXRIZWlnaHQpLzIpLGM+Zy1kJiZjPGcrZClyZXR1cm4gYi5pcyhoKXx8Zi5vbkFsbG93RHJvcCYmIWYub25BbGxvd0Ryb3AoYixoKXx8YShoKS5oYXNDbGFzcyhcIm5vZHJvcFwiKT9udWxsOmg7cmV0dXJuIG51bGx9LHByb2Nlc3NNb3VzZXVwOmZ1bmN0aW9uKCl7aWYoIXRoaXMuY3VycmVudFRhYmxlfHwhdGhpcy5kcmFnT2JqZWN0KXJldHVybiBudWxsO3ZhciBiPXRoaXMuY3VycmVudFRhYmxlLnRhYmxlRG5EQ29uZmlnLGQ9dGhpcy5kcmFnT2JqZWN0LGU9MCxoPTA7YShjKS51bmJpbmQoZix0aGlzLm1vdXNlbW92ZSkudW5iaW5kKGcsdGhpcy5tb3VzZXVwKSxiLmhpZXJhcmNoeUxldmVsJiZiLmF1dG9DbGVhblJlbGF0aW9ucyYmYSh0aGlzLmN1cnJlbnRUYWJsZS5yb3dzKS5maXJzdCgpLmZpbmQoXCJ0ZDpmaXJzdFwiKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oKXsoaD1hKHRoaXMpLnBhcmVudHMoXCJ0cjpmaXJzdFwiKS5kYXRhKFwibGV2ZWxcIikpJiZhKHRoaXMpLnBhcmVudHMoXCJ0cjpmaXJzdFwiKS5kYXRhKFwibGV2ZWxcIiwtLWgpJiZhKHRoaXMpLnJlbW92ZSgpfSkmJmIuaGllcmFyY2h5TGV2ZWw+MSYmYSh0aGlzLmN1cnJlbnRUYWJsZS5yb3dzKS5lYWNoKGZ1bmN0aW9uKCl7aWYoKGg9YSh0aGlzKS5kYXRhKFwibGV2ZWxcIikpPjEpZm9yKGU9YSh0aGlzKS5wcmV2KCkuZGF0YShcImxldmVsXCIpO2g+ZSsxOylhKHRoaXMpLmZpbmQoXCJ0ZDpmaXJzdFwiKS5jaGlsZHJlbihcIjpmaXJzdFwiKS5yZW1vdmUoKSxhKHRoaXMpLmRhdGEoXCJsZXZlbFwiLC0taCl9KSxiLm9uRHJhZ0NsYXNzJiZhKGQpLnJlbW92ZUNsYXNzKGIub25EcmFnQ2xhc3MpfHxhKGQpLmNzcyhiLm9uRHJvcFN0eWxlKSx0aGlzLmRyYWdPYmplY3Q9bnVsbCxiLm9uRHJvcCYmdGhpcy5vcmlnaW5hbE9yZGVyIT09dGhpcy5jdXJyZW50T3JkZXIoKSYmYShkKS5oaWRlKCkuZmFkZUluKFwiZmFzdFwiKSYmYi5vbkRyb3AodGhpcy5jdXJyZW50VGFibGUsZCksYi5vbkRyYWdTdG9wJiZiLm9uRHJhZ1N0b3AodGhpcy5jdXJyZW50VGFibGUsZCksdGhpcy5jdXJyZW50VGFibGU9bnVsbH0sbW91c2V1cDpmdW5jdGlvbihiKXtyZXR1cm4gYiYmYi5wcmV2ZW50RGVmYXVsdCgpLGEudGFibGVEbkQucHJvY2Vzc01vdXNldXAoKSwhMX0sanNvbml6ZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmN1cnJlbnRUYWJsZTtyZXR1cm4gYT9KU09OLnN0cmluZ2lmeSh0aGlzLnRhYmxlRGF0YShiKSxudWxsLGIudGFibGVEbkRDb25maWcuanNvblByZXRpZnlTZXBhcmF0b3IpOkpTT04uc3RyaW5naWZ5KHRoaXMudGFibGVEYXRhKGIpKX0sc2VyaWFsaXplOmZ1bmN0aW9uKCl7cmV0dXJuIGEucGFyYW0odGhpcy50YWJsZURhdGEodGhpcy5jdXJyZW50VGFibGUpKX0sc2VyaWFsaXplVGFibGU6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVwiXCIsYz1hLnRhYmxlRG5EQ29uZmlnLnNlcmlhbGl6ZVBhcmFtTmFtZXx8YS5pZCxkPWEucm93cyxlPTA7ZTxkLmxlbmd0aDtlKyspe2IubGVuZ3RoPjAmJihiKz1cIiZcIik7dmFyIGY9ZFtlXS5pZDtmJiZhLnRhYmxlRG5EQ29uZmlnJiZhLnRhYmxlRG5EQ29uZmlnLnNlcmlhbGl6ZVJlZ2V4cCYmKGY9Zi5tYXRjaChhLnRhYmxlRG5EQ29uZmlnLnNlcmlhbGl6ZVJlZ2V4cClbMF0sYis9YytcIltdPVwiK2YpfXJldHVybiBifSxzZXJpYWxpemVUYWJsZXM6ZnVuY3Rpb24oKXt2YXIgYj1bXTtyZXR1cm4gYShcInRhYmxlXCIpLmVhY2goZnVuY3Rpb24oKXt0aGlzLmlkJiZiLnB1c2goYS5wYXJhbShhLnRhYmxlRG5ELnRhYmxlRGF0YSh0aGlzKSkpfSksYi5qb2luKFwiJlwiKX0sdGFibGVEYXRhOmZ1bmN0aW9uKGIpe3ZhciBjLGQsZSxmLGc9Yi50YWJsZURuRENvbmZpZyxoPVtdLGk9MCxqPTAsaz1udWxsLGw9e307aWYoYnx8KGI9dGhpcy5jdXJyZW50VGFibGUpLCFifHwhYi5yb3dzfHwhYi5yb3dzLmxlbmd0aClyZXR1cm57ZXJyb3I6e2NvZGU6NTAwLG1lc3NhZ2U6XCJOb3QgYSB2YWxpZCB0YWJsZS5cIn19O2lmKCFiLmlkJiYhZy5zZXJpYWxpemVQYXJhbU5hbWUpcmV0dXJue2Vycm9yOntjb2RlOjUwMCxtZXNzYWdlOlwiTm8gc2VyaWFsaXphYmxlIHVuaXF1ZSBpZCBwcm92aWRlZC5cIn19O2Y9Zy5hdXRvQ2xlYW5SZWxhdGlvbnMmJmIucm93c3x8YS5tYWtlQXJyYXkoYi5yb3dzKSxkPWcuc2VyaWFsaXplUGFyYW1OYW1lfHxiLmlkLGU9ZCxjPWZ1bmN0aW9uKGEpe3JldHVybiBhJiZnJiZnLnNlcmlhbGl6ZVJlZ2V4cD9hLm1hdGNoKGcuc2VyaWFsaXplUmVnZXhwKVswXTphfSxsW2VdPVtdLCFnLmF1dG9DbGVhblJlbGF0aW9ucyYmYShmWzBdKS5kYXRhKFwibGV2ZWxcIikmJmYudW5zaGlmdCh7aWQ6XCJ1bmRlZmluZWRcIn0pO2Zvcih2YXIgbT0wO208Zi5sZW5ndGg7bSsrKWlmKGcuaGllcmFyY2h5TGV2ZWwpe2lmKDA9PT0oaj1hKGZbbV0pLmRhdGEoXCJsZXZlbFwiKXx8MCkpZT1kLGg9W107ZWxzZSBpZihqPmkpaC5wdXNoKFtlLGldKSxlPWMoZlttLTFdLmlkKTtlbHNlIGlmKGo8aSlmb3IodmFyIG49MDtuPGgubGVuZ3RoO24rKyloW25dWzFdPT09aiYmKGU9aFtuXVswXSksaFtuXVsxXT49aSYmKGhbbl1bMV09MCk7aT1qLGEuaXNBcnJheShsW2VdKXx8KGxbZV09W10pLGs9YyhmW21dLmlkKSxrJiZsW2VdLnB1c2goayl9ZWxzZShrPWMoZlttXS5pZCkpJiZsW2VdLnB1c2goayk7cmV0dXJuIGx9fSxqUXVlcnkuZm4uZXh0ZW5kKHt0YWJsZURuRDphLnRhYmxlRG5ELmJ1aWxkLHRhYmxlRG5EVXBkYXRlOmEudGFibGVEbkQudXBkYXRlVGFibGVzLHRhYmxlRG5EU2VyaWFsaXplOmEucHJveHkoYS50YWJsZURuRC5zZXJpYWxpemUsYS50YWJsZURuRCksdGFibGVEbkRTZXJpYWxpemVBbGw6YS50YWJsZURuRC5zZXJpYWxpemVUYWJsZXMsdGFibGVEbkREYXRhOmEucHJveHkoYS50YWJsZURuRC50YWJsZURhdGEsYS50YWJsZURuRCl9KX0oalF1ZXJ5LHdpbmRvdyx3aW5kb3cuZG9jdW1lbnQpOyIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBidWxrczoge1xuICAgICAgICBkZWxldGVDYXRlZ29yaWVzOiAnLmpzLWRlbGV0ZS1jYXRlZ29yaWVzLWJ1bGstYWN0aW9uJyxcbiAgICAgICAgZGVsZXRlQ2F0ZWdvcmllc01vZGFsOiBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiI1wiLmNvbmNhdChpZCwgXCJfZ3JpZF9kZWxldGVfY2F0ZWdvcmllc19tb2RhbFwiKTsgfSxcbiAgICAgICAgY2hlY2tlZENoZWNrYm94OiAnLmpzLWJ1bGstYWN0aW9uLWNoZWNrYm94OmNoZWNrZWQnLFxuICAgICAgICBkZWxldGVDdXN0b21lcnM6ICcuanMtZGVsZXRlLWN1c3RvbWVycy1idWxrLWFjdGlvbicsXG4gICAgICAgIGRlbGV0ZUN1c3RvbWVyTW9kYWw6IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIjXCIuY29uY2F0KGlkLCBcIl9ncmlkX2RlbGV0ZV9jdXN0b21lcnNfbW9kYWxcIik7IH0sXG4gICAgICAgIHN1Ym1pdERlbGV0ZUNhdGVnb3JpZXM6ICcuanMtc3VibWl0LWRlbGV0ZS1jYXRlZ29yaWVzJyxcbiAgICAgICAgc3VibWl0RGVsZXRlQ3VzdG9tZXJzOiAnLmpzLXN1Ym1pdC1kZWxldGUtY3VzdG9tZXJzJyxcbiAgICAgICAgY2F0ZWdvcmllc1RvRGVsZXRlOiAnI2RlbGV0ZV9jYXRlZ29yaWVzX2NhdGVnb3JpZXNfdG9fZGVsZXRlJyxcbiAgICAgICAgY3VzdG9tZXJzVG9EZWxldGU6ICcjZGVsZXRlX2N1c3RvbWVyc19jdXN0b21lcnNfdG9fZGVsZXRlJyxcbiAgICAgICAgYWN0aW9uU2VsZWN0QWxsOiAnLmpzLWJ1bGstYWN0aW9uLXNlbGVjdC1hbGwnLFxuICAgICAgICBidWxrQWN0aW9uQ2hlY2tib3g6ICcuanMtYnVsay1hY3Rpb24tY2hlY2tib3gnLFxuICAgICAgICBidWxrQWN0aW9uQnRuOiAnLmpzLWJ1bGstYWN0aW9ucy1idG4nLFxuICAgICAgICBvcGVuVGFic0J0bjogJy5qcy1idWxrLWFjdGlvbi1idG4ub3Blbl90YWJzJyxcbiAgICAgICAgdGFibGVDaG9pY2VPcHRpb25zOiAndGFibGUudGFibGUgLmpzLWNob2ljZS1vcHRpb25zJyxcbiAgICAgICAgY2hvaWNlT3B0aW9uczogJy5qcy1jaG9pY2Utb3B0aW9ucycsXG4gICAgICAgIG1vZGFsRm9ybVN1Ym1pdEJ0bjogJy5qcy1idWxrLW1vZGFsLWZvcm0tc3VibWl0LWJ0bicsXG4gICAgICAgIHN1Ym1pdEFjdGlvbjogJy5qcy1idWxrLWFjdGlvbi1zdWJtaXQtYnRuJyxcbiAgICAgICAgZ3JpZFN1Ym1pdEFjdGlvbjogJy5qcy1ncmlkLWFjdGlvbi1zdWJtaXQtYnRuJyxcbiAgICB9LFxuICAgIHJvd3M6IHtcbiAgICAgICAgY2F0ZWdvcnlEZWxldGVBY3Rpb246ICcuanMtZGVsZXRlLWNhdGVnb3J5LXJvdy1hY3Rpb24nLFxuICAgICAgICBjdXN0b21lckRlbGV0ZUFjdGlvbjogJy5qcy1kZWxldGUtY3VzdG9tZXItcm93LWFjdGlvbicsXG4gICAgICAgIGxpbmtSb3dBY3Rpb246ICcuanMtbGluay1yb3ctYWN0aW9uJyxcbiAgICAgICAgbGlua1Jvd0FjdGlvbkNsaWNrYWJsZUZpcnN0OiAnLmpzLWxpbmstcm93LWFjdGlvbltkYXRhLWNsaWNrYWJsZS1yb3c9MV06Zmlyc3QnLFxuICAgICAgICBjbGlja2FibGVUZDogJ3RkLmNsaWNrYWJsZScsXG4gICAgfSxcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIHNob3dRdWVyeTogJy5qcy1jb21tb25fc2hvd19xdWVyeS1ncmlkLWFjdGlvbicsXG4gICAgICAgIGV4cG9ydFF1ZXJ5OiAnLmpzLWNvbW1vbl9leHBvcnRfc3FsX21hbmFnZXItZ3JpZC1hY3Rpb24nLFxuICAgICAgICBzaG93TW9kYWxGb3JtOiBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiI1wiLmNvbmNhdChpZCwgXCJfY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxfZm9ybVwiKTsgfSxcbiAgICAgICAgc2hvd01vZGFsR3JpZDogZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcIiNcIi5jb25jYXQoaWQsIFwiX2dyaWRfY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxcIik7IH0sXG4gICAgICAgIG1vZGFsRm9ybVN1Ym1pdEJ0bjogJy5qcy1idWxrLW1vZGFsLWZvcm0tc3VibWl0LWJ0bicsXG4gICAgICAgIHN1Ym1pdE1vZGFsRm9ybUJ0bjogJy5qcy1zdWJtaXQtbW9kYWwtZm9ybS1idG4nLFxuICAgICAgICBidWxrSW5wdXRzQmxvY2s6IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIjXCIuY29uY2F0KGlkKTsgfSxcbiAgICAgICAgdG9rZW5JbnB1dDogZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcImlucHV0W25hbWU9XFxcIlwiLmNvbmNhdChpZCwgXCJbX3Rva2VuXVxcXCJdXCIpOyB9LFxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIuanMtXCIuY29uY2F0KGlkLCBcIi1wb3NpdGlvbjpmaXJzdFwiKTsgfSxcbiAgICBjb25maXJtTW9kYWw6IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCJcIi5jb25jYXQoaWQsIFwiLWdyaWQtY29uZmlybS1tb2RhbFwiKTsgfSxcbiAgICBncmlkVGFibGU6ICcuanMtZ3JpZC10YWJsZScsXG4gICAgZHJhZ0hhbmRsZXI6ICcuanMtZHJhZy1oYW5kbGUnLFxuICAgIHNwZWNpZmljR3JpZFRhYmxlOiBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiXCIuY29uY2F0KGlkLCBcIl9ncmlkX3RhYmxlXCIpOyB9LFxuICAgIGdyaWQ6IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIjXCIuY29uY2F0KGlkLCBcIl9ncmlkXCIpOyB9LFxuICAgIGdyaWRQYW5lbDogJy5qcy1ncmlkLXBhbmVsJyxcbiAgICBncmlkSGVhZGVyOiAnLmpzLWdyaWQtaGVhZGVyJyxcbiAgICBncmlkUG9zaXRpb246IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIuanMtXCIuY29uY2F0KGlkLCBcIi1wb3NpdGlvblwiKTsgfSxcbiAgICBncmlkVGFibGVQb3NpdGlvbjogZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcIi5qcy1ncmlkLXRhYmxlIC5qcy1cIi5jb25jYXQoaWQsIFwiLXBvc2l0aW9uXCIpOyB9LFxuICAgIGdyaWRQb3NpdGlvbkZpcnN0OiBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiLmpzLVwiLmNvbmNhdChpZCwgXCItcG9zaXRpb246Zmlyc3RcIik7IH0sXG4gICAgc2VsZWN0UG9zaXRpb246ICdqcy1wb3NpdGlvbicsXG4gICAgdG9nZ2xhYmxlUm93OiAnLnBzLXRvZ2dsYWJsZS1yb3cnLFxuICAgIGRyb3Bkb3duSXRlbTogJy5qcy1kcm9wZG93bi1pdGVtJyxcbiAgICB0YWJsZTogJ3RhYmxlLnRhYmxlJyxcbiAgICBoZWFkZXJUb29sYmFyOiAnLmhlYWRlci10b29sYmFyJyxcbiAgICBicmVhZGNydW1iSXRlbTogJy5icmVhZGNydW1iLWl0ZW0nLFxuICAgIHJlc2V0U2VhcmNoOiAnLmpzLXJlc2V0LXNlYXJjaCcsXG4gICAgZXhwYW5kOiAnLmpzLWV4cGFuZCcsXG4gICAgY29sbGFwc2U6ICcuanMtY29sbGFwc2UnLFxuICAgIGNvbHVtbkZpbHRlcnM6ICcuY29sdW1uLWZpbHRlcnMnLFxuICAgIGdyaWRTZWFyY2hCdXR0b246ICcuZ3JpZC1zZWFyY2gtYnV0dG9uJyxcbiAgICBncmlkUmVzZXRCdXR0b246ICcuZ3JpZC1yZXNldC1idXR0b24nLFxuICAgIGlucHV0QW5kU2VsZWN0OiAnaW5wdXQ6bm90KC5qcy1idWxrLWFjdGlvbi1zZWxlY3QtYWxsKSwgc2VsZWN0JyxcbiAgICBwcmV2aWV3VG9nZ2xlOiAnLnByZXZpZXctdG9nZ2xlJyxcbiAgICBwcmV2aWV3Um93OiAnLnByZXZpZXctcm93JyxcbiAgICBncmlkVGJvZHk6ICcuZ3JpZC10YWJsZSB0Ym9keScsXG4gICAgdHJOb3RQcmV2aWV3Um93OiAndHI6bm90KC5wcmV2aWV3LXJvdyknLFxuICAgIGNvbW1vblJlZnJlc2hMaXN0QWN0aW9uOiAnLmpzLWNvbW1vbl9yZWZyZXNoX2xpc3QtZ3JpZC1hY3Rpb24nLFxuICAgIGZpbHRlckZvcm06IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCIjXCIuY29uY2F0KGlkLCBcIl9maWx0ZXJfZm9ybVwiKTsgfSxcbiAgICBvbkRyYWdDbGFzczogJ3Bvc2l0aW9uLXJvdy13aGlsZS1kcmFnJyxcbiAgICBzcWxTdWJtaXQ6ICcuYnRuLXNxbC1zdWJtaXQnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xuaW1wb3J0IHsgTW9kYWxDb250YWluZXIsIE1vZGFsLCB9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cbiAqXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cbiAqL1xudmFyIENvbmZpcm1Nb2RhbENvbnRhaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29uZmlybU1vZGFsQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXG4gICAgZnVuY3Rpb24gQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGFyYW1zKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDb25maXJtTW9kYWxDb250YWluZXIucHJvdG90eXBlLmJ1aWxkTW9kYWxDb250YWluZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5idWlsZE1vZGFsQ29udGFpbmVyLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgICAgICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XG4gICAgICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcbiAgICAgICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcbiAgICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XG4gICAgICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xuICAgICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xuICAgICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcbiAgICAgICAgKF9hID0gdGhpcy5mb290ZXIpLmFwcGVuZC5hcHBseShfYSwgX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFt0aGlzLmNsb3NlQnV0dG9uXSwgcGFyYW1zLmN1c3RvbUJ1dHRvbnMsIGZhbHNlKSwgW3RoaXMuY29uZmlybUJ1dHRvbl0sIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbmZpcm1Nb2RhbENvbnRhaW5lcjtcbn0oTW9kYWxDb250YWluZXIpKTtcbmV4cG9ydCB7IENvbmZpcm1Nb2RhbENvbnRhaW5lciB9O1xuLyoqXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxuICovXG52YXIgQ29uZmlybU1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb25maXJtTW9kYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29uZmlybU1vZGFsKGlucHV0UGFyYW1zLCBjb25maXJtQ2FsbGJhY2ssIGNhbmNlbENhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjYW5jZWxDYWxsYmFjayA9PT0gdm9pZCAwKSB7IGNhbmNlbENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGFyYW1zID0gX19hc3NpZ24oeyBpZDogJ2NvbmZpcm0tbW9kYWwnLCBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLCBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLCBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLCBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsIGN1c3RvbUJ1dHRvbnM6IFtdLCBjbG9zYWJsZTogZmFsc2UsIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSwgZGlhbG9nU3R5bGU6IHt9LCBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1DYWxsYmFjaywgY2xvc2VDYWxsYmFjazogY2FuY2VsQ2FsbGJhY2sgfSwgaW5wdXRQYXJhbXMpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmFtcykgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb25maXJtTW9kYWwucHJvdG90eXBlLmluaXRDb250YWluZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XG4gICAgICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmluaXRDb250YWluZXIuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbmZpcm1Nb2RhbDtcbn0oTW9kYWwpKTtcbmV4cG9ydCB7IENvbmZpcm1Nb2RhbCB9O1xuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuaW1wb3J0IEdyaWRNYXAgZnJvbSAnQGNvbXBvbmVudHMvZ3JpZC9ncmlkLW1hcCc7XG52YXIgJCA9IHdpbmRvdy4kO1xuLyoqXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgR3JpZCBldmVudHNcbiAqL1xudmFyIEdyaWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogR3JpZCBpZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICovXG4gICAgZnVuY3Rpb24gR3JpZChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoR3JpZE1hcC5ncmlkKHRoaXMuaWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGdyaWQgaWRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgR3JpZC5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGdyaWQgY29udGFpbmVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxuICAgICAqL1xuICAgIEdyaWQucHJvdG90eXBlLmdldENvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBncmlkIGhlYWRlciBjb250YWluZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtqUXVlcnl9XG4gICAgICovXG4gICAgR3JpZC5wcm90b3R5cGUuZ2V0SGVhZGVyQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLmNsb3Nlc3QoR3JpZE1hcC5ncmlkUGFuZWwpLmZpbmQoR3JpZE1hcC5ncmlkSGVhZGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4dGVuZCBncmlkIHdpdGggZXh0ZXJuYWwgZXh0ZW5zaW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV4dGVuc2lvblxuICAgICAqL1xuICAgIEdyaWQucHJvdG90eXBlLmFkZEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHRlbnNpb24pIHtcbiAgICAgICAgZXh0ZW5zaW9uLmV4dGVuZCh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBHcmlkO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcbnZhciAkID0gd2luZG93LiQ7XG4vKipcbiAqIENsYXNzIExpbmtSb3dBY3Rpb25FeHRlbnNpb24gaGFuZGxlcyBsaW5rIHJvdyBhY3Rpb25zXG4gKi9cbnZhciBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4dGVuZCBncmlkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcbiAgICAgKi9cbiAgICBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB0aGlzLmluaXRSb3dMaW5rcyhncmlkKTtcbiAgICAgICAgdGhpcy5pbml0Q29uZmlybWFibGVBY3Rpb25zKGdyaWQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXh0ZW5kIGdyaWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIExpbmtSb3dBY3Rpb25FeHRlbnNpb24ucHJvdG90eXBlLmluaXRDb25maXJtYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICBncmlkLmdldENvbnRhaW5lcigpLm9uKCdjbGljaycsIEdyaWRNYXAucm93cy5saW5rUm93QWN0aW9uLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XG4gICAgICAgICAgICBpZiAoY29uZmlybU1lc3NhZ2UubGVuZ3RoICYmICF3aW5kb3cuY29uZmlybShjb25maXJtTWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZCBhIGNsaWNrIGV2ZW50IG9uIHJvd3MgdGhhdCBtYXRjaGVzIHRoZSBmaXJzdCBsaW5rIGFjdGlvbiAoaWYgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIExpbmtSb3dBY3Rpb25FeHRlbnNpb24ucHJvdG90eXBlLmluaXRSb3dMaW5rcyA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgICQoJ3RyJywgZ3JpZC5nZXRDb250YWluZXIoKSkuZWFjaChmdW5jdGlvbiBpbml0RWFjaFJvdygpIHtcbiAgICAgICAgICAgIHZhciAkcGFyZW50Um93ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQoR3JpZE1hcC5yb3dzLmxpbmtSb3dBY3Rpb25DbGlja2FibGVGaXJzdCwgJHBhcmVudFJvdykuZWFjaChmdW5jdGlvbiBwcm9wYWdhdGVGaXJzdExpbmtBY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRyb3dBY3Rpb24gPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciAkcGFyZW50Q2VsbCA9ICRyb3dBY3Rpb24uY2xvc2VzdCgndGQnKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xpY2thYmxlQ2VsbHMgPSAkKEdyaWRNYXAucm93cy5jbGlja2FibGVUZCwgJHBhcmVudFJvdykubm90KCRwYXJlbnRDZWxsKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNsaWNrYWJsZUNlbGxzLmFkZENsYXNzKCdjdXJzb3ItcG9pbnRlcicpLm1vdXNlZG93bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5tb3VzZW1vdmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudW5iaW5kKCdtb3VzZW1vdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2xpY2thYmxlQ2VsbHMubW91c2V1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3YXNEcmFnZ2luZyA9IGlzRHJhZ2dpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnbW91c2Vtb3ZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghd2FzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9ICRyb3dBY3Rpb24uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZpcm1NZXNzYWdlLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICh3aW5kb3cuY29uZmlybShjb25maXJtTWVzc2FnZSkgJiYgJHJvd0FjdGlvbi5hdHRyKCdocmVmJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICRyb3dBY3Rpb24uYXR0cignaHJlZicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua1Jvd0FjdGlvbkV4dGVuc2lvbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cbiAqXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcbiAqL1xudmFyIE1vZGFsQ29udGFpbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsQ29udGFpbmVyKGlucHV0UGFyYW1zKSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBfX2Fzc2lnbih7IGlkOiAnY29uZmlybS1tb2RhbCcsIGNsb3NhYmxlOiBmYWxzZSwgY2xvc2VDYWxsYmFjazogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSB9LCBpbnB1dFBhcmFtcyk7XG4gICAgICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xuICAgIH1cbiAgICBNb2RhbENvbnRhaW5lci5wcm90b3R5cGUuYnVpbGRNb2RhbENvbnRhaW5lciA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XG4gICAgICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xuICAgICAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZGlhbG9nU3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBfdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTW9kYWwgY29udGVudCBlbGVtZW50XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgICAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbW9kYWwtbWVzc2FnZScpO1xuICAgICAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxuICAgICAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcbiAgICAgICAgLy8gTW9kYWwgdGl0bGUgZWxlbWVudFxuICAgICAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xuICAgICAgICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxuICAgICAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuICAgICAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XG4gICAgICAgIHRoaXMuY2xvc2VJY29uLmlubmVySFRNTCA9ICfDlyc7XG4gICAgICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxuICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xuICAgICAgICAvLyBDb25zdHJ1Y3RpbmcgdGhlIG1vZGFsXG4gICAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XG4gICAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYm9keSk7XG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XG4gICAgfTtcbiAgICByZXR1cm4gTW9kYWxDb250YWluZXI7XG59KCkpO1xuZXhwb3J0IHsgTW9kYWxDb250YWluZXIgfTtcbi8qKlxuICogTW9kYWwgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcbiAqL1xudmFyIE1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsKGlucHV0UGFyYW1zKSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBfX2Fzc2lnbih7IGlkOiAnY29uZmlybS1tb2RhbCcsIGNsb3NhYmxlOiBmYWxzZSwgZGlhbG9nU3R5bGU6IHt9IH0sIGlucHV0UGFyYW1zKTtcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XG4gICAgfVxuICAgIE1vZGFsLnByb3RvdHlwZS5pbml0Q29udGFpbmVyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcbiAgICAgICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcbiAgICAgICAgdmFyIGlkID0gcGFyYW1zLmlkLCBjbG9zYWJsZSA9IHBhcmFtcy5jbG9zYWJsZTtcbiAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoe1xuICAgICAgICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxuICAgICAgICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgaWYgKG1vZGFsKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuc2V0VGl0bGUgPSBmdW5jdGlvbiAobW9kYWxUaXRsZSkge1xuICAgICAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZGFsO1xufSgpKTtcbmV4cG9ydCB7IE1vZGFsIH07XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xuaW1wb3J0IHsgTW9kYWxDb250YWluZXIsIE1vZGFsLCB9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cbiAqXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxuICpcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcbiAqL1xudmFyIElmcmFtZU1vZGFsQ29udGFpbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJZnJhbWVNb2RhbENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xuICAgIGZ1bmN0aW9uIElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGFyYW1zKSB8fCB0aGlzO1xuICAgIH1cbiAgICBJZnJhbWVNb2RhbENvbnRhaW5lci5wcm90b3R5cGUuYnVpbGRNb2RhbENvbnRhaW5lciA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5idWlsZE1vZGFsQ29udGFpbmVyLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XG4gICAgICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcbiAgICAgICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUtbG9hZGVyJyk7XG4gICAgICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xuICAgICAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kKHRoaXMubG9hZGVyLCB0aGlzLmlmcmFtZSk7XG4gICAgfTtcbiAgICByZXR1cm4gSWZyYW1lTW9kYWxDb250YWluZXI7XG59KE1vZGFsQ29udGFpbmVyKSk7XG5leHBvcnQgeyBJZnJhbWVNb2RhbENvbnRhaW5lciB9O1xuLyoqXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcbiAqIC0gb25Mb2FkZWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaGFzIGp1c3RlIGJlZW4gcmVmcmVzaGVkXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxuICovXG52YXIgSWZyYW1lTW9kYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKElmcmFtZU1vZGFsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElmcmFtZU1vZGFsKGlucHV0UGFyYW1zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwYXJhbXMgPSBfX2Fzc2lnbih7IGlkOiAnaWZyYW1lLW1vZGFsJywgY2xvc2FibGU6IGZhbHNlLCBhdXRvU2l6ZTogdHJ1ZSwgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyB9LCBpbnB1dFBhcmFtcyk7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcGFyYW1zKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIElmcmFtZU1vZGFsLnByb3RvdHlwZS5pbml0Q29udGFpbmVyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxuICAgICAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuaW5pdENvbnRhaW5lci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XG4gICAgICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAobG9hZGVkRXZlbnQpIHtcbiAgICAgICAgICAgIF90aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLm9uTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLm9uTG9hZGVkKF90aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKHVubG9hZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5vblVubG9hZChfdGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93TG9hZGluZygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgX3RoaXMuYXV0b1Jlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSWZyYW1lTW9kYWwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZW50LCBoaWRlSWZyYW1lKSB7XG4gICAgICAgIGlmIChoaWRlSWZyYW1lID09PSB2b2lkIDApIHsgaGlkZUlmcmFtZSA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgaWYgKGhpZGVJZnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUlmcmFtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgfTtcbiAgICBJZnJhbWVNb2RhbC5wcm90b3R5cGUuc2hvd0xvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIH07XG4gICAgSWZyYW1lTW9kYWwucHJvdG90eXBlLmhpZGVMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICB9O1xuICAgIElmcmFtZU1vZGFsLnByb3RvdHlwZS5oaWRlSWZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICB9O1xuICAgIElmcmFtZU1vZGFsLnByb3RvdHlwZS5hdXRvUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvU2l6ZSAmJiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICB2YXIgaWZyYW1lQ29udGFpbmVyID0gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xuICAgICAgICAgICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHZhciBpZnJhbWVTY3JvbGxIZWlnaHQgPSBpZnJhbWVDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLmhlYWRlcilcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgKyBpZnJhbWVTY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5kaWFsb2cuc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoY29udGVudEhlaWdodCwgXCJweFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIElmcmFtZU1vZGFsLnByb3RvdHlwZS5nZXRPdXRlckhlaWdodCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cbiAgICAgICAgaWYgKCFlbGVtZW50Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9O1xuICAgIHJldHVybiBJZnJhbWVNb2RhbDtcbn0oTW9kYWwpKTtcbmV4cG9ydCB7IElmcmFtZU1vZGFsIH07XG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IElmcmFtZU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XG4vKipcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXG4gKi9cbnZhciBGb3JtSWZyYW1lTW9kYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvcm1JZnJhbWVNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JtSWZyYW1lTW9kYWwocGFyYW1zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpZnJhbWVQYXJhbXMgPSBfX2Fzc2lnbih7IGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsIG9uTG9hZGVkOiBmdW5jdGlvbiAoaWZyYW1lLCBldmVudCkgeyByZXR1cm4gX3RoaXMub25JZnJhbWVMb2FkZWQoaWZyYW1lLCBldmVudCk7IH0gfSwgcGFyYW1zKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBpZnJhbWVQYXJhbXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9uRm9ybUxvYWRlZCA9IHBhcmFtcy5vbkZvcm1Mb2FkZWQ7XG4gICAgICAgIF90aGlzLmNhbmNlbEJ1dHRvblNlbGVjdG9yID0gcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yIHx8ICcuY2FuY2VsLWJ0bic7XG4gICAgICAgIF90aGlzLmZvcm1TZWxlY3RvciA9IHBhcmFtcy5mb3JtU2VsZWN0b3IgfHwgJ2Zvcm0nO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEZvcm1JZnJhbWVNb2RhbC5wcm90b3R5cGUub25JZnJhbWVMb2FkZWQgPSBmdW5jdGlvbiAoaWZyYW1lLCBldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIWlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmcmFtZUZvcm0gPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZm9ybVNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFpZnJhbWVGb3JtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgdmFyIGNhbmNlbEJ1dHRvbnMgPSBpZnJhbWVGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jYW5jZWxCdXR0b25TZWxlY3Rvcik7XG4gICAgICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoY2FuY2VsQnV0dG9uKSB7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMub25Gb3JtTG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGFBdHRyaWJ1dGVzID0gbnVsbDtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJChpZnJhbWVGb3JtKS5zZXJpYWxpemVBcnJheSgpO1xuICAgICAgICBpZiAoaWZyYW1lRm9ybS5kYXRhc2V0KSB7XG4gICAgICAgICAgICBkYXRhQXR0cmlidXRlcyA9IGlmcmFtZUZvcm0uZGF0YXNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRm9ybUxvYWRlZChpZnJhbWVGb3JtLCBmb3JtRGF0YSwgZGF0YUF0dHJpYnV0ZXMsIGV2ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiBGb3JtSWZyYW1lTW9kYWw7XG59KElmcmFtZU1vZGFsKSk7XG5leHBvcnQgeyBGb3JtSWZyYW1lTW9kYWwgfTtcbiIsImltcG9ydCBHcmlkTWFwIGZyb20gJ0Bjb21wb25lbnRzL2dyaWQvZ3JpZC1tYXAnO1xuaW1wb3J0IHsgQ29uZmlybU1vZGFsIH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xudmFyICQgPSB3aW5kb3cuJDtcbi8qKlxuICogQ2xhc3MgU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uIGhhbmRsZXMgc3VibWl0dGluZyBvZiByb3cgYWN0aW9uXG4gKi9cbnZhciBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHRlbmQgZ3JpZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtHcmlkfSBncmlkXG4gICAgICovXG4gICAgU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBncmlkLmdldENvbnRhaW5lcigpLm9uKCdjbGljaycsICcuanMtc3VibWl0LXJvdy1hY3Rpb24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgJGJ1dHRvbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSAkYnV0dG9uLmRhdGEoJ2NvbmZpcm1NZXNzYWdlJyk7XG4gICAgICAgICAgICB2YXIgY29uZmlybVRpdGxlID0gJGJ1dHRvbi5kYXRhKCd0aXRsZScpO1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9ICRidXR0b24uZGF0YSgnbWV0aG9kJyk7XG4gICAgICAgICAgICBpZiAoY29uZmlybVRpdGxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd0NvbmZpcm1Nb2RhbCgkYnV0dG9uLCBncmlkLCBjb25maXJtTWVzc2FnZSwgY29uZmlybVRpdGxlLCBtZXRob2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlLmxlbmd0aCAmJiAhd2luZG93LmNvbmZpcm0oY29uZmlybU1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMucG9zdEZvcm0oJGJ1dHRvbiwgbWV0aG9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24ucHJvdG90eXBlLnBvc3RGb3JtID0gZnVuY3Rpb24gKCRidXR0b24sIG1ldGhvZCkge1xuICAgICAgICB2YXIgaXNHZXRPclBvc3RNZXRob2QgPSBbJ0dFVCcsICdQT1NUJ10uaW5jbHVkZXMobWV0aG9kKTtcbiAgICAgICAgdmFyICRmb3JtID0gJCgnPGZvcm0+Jywge1xuICAgICAgICAgICAgYWN0aW9uOiAkYnV0dG9uLmRhdGEoJ3VybCcpLFxuICAgICAgICAgICAgbWV0aG9kOiBpc0dldE9yUG9zdE1ldGhvZCA/IG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgICAgfSkuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgICAgaWYgKCFpc0dldE9yUG9zdE1ldGhvZCkge1xuICAgICAgICAgICAgJGZvcm0uYXBwZW5kKCQoJzxpbnB1dD4nLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ19oaWRkZW4nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdfbWV0aG9kJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWV0aG9kLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgICRmb3JtLnN1Ym1pdCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqUXVlcnl9ICRzdWJtaXRCdG5cbiAgICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybU1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybVRpdGxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuICAgICAqL1xuICAgIFN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbi5wcm90b3R5cGUuc2hvd0NvbmZpcm1Nb2RhbCA9IGZ1bmN0aW9uICgkc3VibWl0QnRuLCBncmlkLCBjb25maXJtTWVzc2FnZSwgY29uZmlybVRpdGxlLCBtZXRob2QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNvbmZpcm1CdXR0b25MYWJlbCA9ICRzdWJtaXRCdG4uZGF0YSgnY29uZmlybUJ1dHRvbkxhYmVsJyk7XG4gICAgICAgIHZhciBjbG9zZUJ1dHRvbkxhYmVsID0gJHN1Ym1pdEJ0bi5kYXRhKCdjbG9zZUJ1dHRvbkxhYmVsJyk7XG4gICAgICAgIHZhciBjb25maXJtQnV0dG9uQ2xhc3MgPSAkc3VibWl0QnRuLmRhdGEoJ2NvbmZpcm1CdXR0b25DbGFzcycpO1xuICAgICAgICB2YXIgbW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKHtcbiAgICAgICAgICAgIGlkOiBHcmlkTWFwLmNvbmZpcm1Nb2RhbChncmlkLmdldElkKCkpLFxuICAgICAgICAgICAgY29uZmlybVRpdGxlOiBjb25maXJtVGl0bGUsXG4gICAgICAgICAgICBjb25maXJtTWVzc2FnZTogY29uZmlybU1lc3NhZ2UsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGNvbmZpcm1CdXR0b25MYWJlbCxcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IGNsb3NlQnV0dG9uTGFiZWwsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGNvbmZpcm1CdXR0b25DbGFzcyxcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucG9zdEZvcm0oJHN1Ym1pdEJ0biwgbWV0aG9kKTsgfSk7XG4gICAgICAgIG1vZGFsLnNob3coKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb247XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xudmFyICQgPSB3aW5kb3cuJDtcbi8qKlxuICogTWFrZXMgYSB0YWJsZSBzb3J0YWJsZSBieSBjb2x1bW5zLlxuICogVGhpcyBmb3JjZXMgYSBwYWdlIHJlbG9hZCB3aXRoIG1vcmUgcXVlcnkgcGFyYW1ldGVycy5cbiAqL1xudmFyIFRhYmxlU29ydGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gdGFibGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUYWJsZVNvcnRpbmcodGFibGUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9ICcucHMtc29ydGFibGUtY29sdW1uJztcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gJCh0YWJsZSkuZmluZCh0aGlzLnNlbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIFRhYmxlU29ydGluZy5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbHVtbnMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciAkY29sdW1uID0gJChlLmRlbGVnYXRlVGFyZ2V0KTtcbiAgICAgICAgICAgIF90aGlzLnNvcnRCeUNvbHVtbigkY29sdW1uLCBfdGhpcy5nZXRUb2dnbGVkU29ydERpcmVjdGlvbigkY29sdW1uKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU29ydCB1c2luZyBhIGNvbHVtbiBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbk5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIFwiYXNjXCIgb3IgXCJkZXNjXCJcbiAgICAgKi9cbiAgICBUYWJsZVNvcnRpbmcucHJvdG90eXBlLnNvcnRCeSA9IGZ1bmN0aW9uIChjb2x1bW5OYW1lLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyICRjb2x1bW4gPSB0aGlzLmNvbHVtbnMuaXMoXCJbZGF0YS1zb3J0LWNvbC1uYW1lPVxcXCJcIi5jb25jYXQoY29sdW1uTmFtZSwgXCJcXFwiXVwiKSk7XG4gICAgICAgIGlmICghJGNvbHVtbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNvcnQgYnkgXFxcIlwiLmNvbmNhdChjb2x1bW5OYW1lLCBcIlxcXCI6IGludmFsaWQgY29sdW1uXCIpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvcnRCeUNvbHVtbih0aGlzLmNvbHVtbnMsIGRpcmVjdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTb3J0IHVzaW5nIGEgY29sdW1uIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gY29sdW1uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvbiBcImFzY1wiIG9yIFwiZGVzY1wiXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYWJsZVNvcnRpbmcucHJvdG90eXBlLnNvcnRCeUNvbHVtbiA9IGZ1bmN0aW9uIChjb2x1bW4sIGRpcmVjdGlvbikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuZ2V0VXJsKGNvbHVtbi5kYXRhKCdzb3J0Q29sTmFtZScpLCBkaXJlY3Rpb24gPT09ICdkZXNjJyA/ICdkZXNjJyA6ICdhc2MnLCBjb2x1bW4uZGF0YSgnc29ydFByZWZpeCcpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGludmVydGVkIGRpcmVjdGlvbiB0byBzb3J0IGFjY29yZGluZyB0byB0aGUgY29sdW1uJ3MgY3VycmVudCBvbmVcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gY29sdW1uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFibGVTb3J0aW5nLnByb3RvdHlwZS5nZXRUb2dnbGVkU29ydERpcmVjdGlvbiA9IGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5kYXRhKCdzb3J0RGlyZWN0aW9uJykgPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYyc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB1cmwgZm9yIHRoZSBzb3J0ZWQgdGFibGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sTmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFibGVTb3J0aW5nLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoY29sTmFtZSwgZGlyZWN0aW9uLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICB2YXIgcGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgcGFyYW1zLnNldChcIlwiLmNvbmNhdChwcmVmaXgsIFwiW29yZGVyQnldXCIpLCBjb2xOYW1lKTtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoXCJcIi5jb25jYXQocHJlZml4LCBcIltzb3J0T3JkZXJdXCIpLCBkaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zLnNldCgnb3JkZXJCeScsIGNvbE5hbWUpO1xuICAgICAgICAgICAgcGFyYW1zLnNldCgnc29ydE9yZGVyJywgZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGVTb3J0aW5nO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFRhYmxlU29ydGluZztcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbmltcG9ydCBUYWJsZVNvcnRpbmcgZnJvbSAnQGFwcC91dGlscy90YWJsZS1zb3J0aW5nJztcbmltcG9ydCBHcmlkTWFwIGZyb20gJ0Bjb21wb25lbnRzL2dyaWQvZ3JpZC1tYXAnO1xuLyoqXG4gKiBDbGFzcyBSZWxvYWRMaXN0RXh0ZW5zaW9uIGV4dGVuZHMgZ3JpZCB3aXRoIFwiTGlzdCByZWxvYWRcIiBhY3Rpb25cbiAqL1xudmFyIFNvcnRpbmdFeHRlbnNpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU29ydGluZ0V4dGVuc2lvbigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXh0ZW5kIGdyaWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIFNvcnRpbmdFeHRlbnNpb24ucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIHZhciAkc29ydGFibGVUYWJsZSA9IGdyaWQuZ2V0Q29udGFpbmVyKCkuZmluZChHcmlkTWFwLnRhYmxlKTtcbiAgICAgICAgbmV3IFRhYmxlU29ydGluZygkc29ydGFibGVUYWJsZSkuYXR0YWNoKCk7XG4gICAgfTtcbiAgICByZXR1cm4gU29ydGluZ0V4dGVuc2lvbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTb3J0aW5nRXh0ZW5zaW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuaW1wb3J0IEdyaWRNYXAgZnJvbSAnQGNvbXBvbmVudHMvZ3JpZC9ncmlkLW1hcCc7XG5pbXBvcnQgJ3RhYmxlZG5kL2Rpc3QvanF1ZXJ5LnRhYmxlZG5kLm1pbic7XG52YXIgJCA9IHdpbmRvdy4kO1xuLyoqXG4gKiBDbGFzcyBQb3NpdGlvbkV4dGVuc2lvbiBleHRlbmRzIEdyaWQgd2l0aCByZW9yZGVyYWJsZSBwb3NpdGlvbnNcbiAqL1xudmFyIFBvc2l0aW9uRXh0ZW5zaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvc2l0aW9uRXh0ZW5zaW9uKGdyaWQpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXh0ZW5kIGdyaWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIFBvc2l0aW9uRXh0ZW5zaW9uLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgICAgICB0aGlzLmFkZElkc1RvR3JpZFRhYmxlUm93cygpO1xuICAgICAgICBncmlkXG4gICAgICAgICAgICAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5maW5kKEdyaWRNYXAuZ3JpZFRhYmxlKVxuICAgICAgICAgICAgLnRhYmxlRG5EKHtcbiAgICAgICAgICAgIG9uRHJhZ0NsYXNzOiBHcmlkTWFwLm9uRHJhZ0NsYXNzLFxuICAgICAgICAgICAgZHJhZ0hhbmRsZTogR3JpZE1hcC5kcmFnSGFuZGxlcixcbiAgICAgICAgICAgIG9uRHJvcDogZnVuY3Rpb24gKHRhYmxlLCByb3cpIHsgcmV0dXJuIF90aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKHJvdyk7IH0sXG4gICAgICAgIH0pO1xuICAgICAgICBncmlkXG4gICAgICAgICAgICAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5maW5kKCcuanMtZHJhZy1oYW5kbGUnKVxuICAgICAgICAgICAgLmhvdmVyKGZ1bmN0aW9uIGhvdmVyKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCd0cicpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdob3ZlcicpO1xuICAgICAgICB9LCBmdW5jdGlvbiBzdG9wSG92ZXIoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJ3RyJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogV2hlbiBwb3NpdGlvbiBpcyBjaGFuZ2VkIGhhbmRsZSB1cGRhdGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvd1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBQb3NpdGlvbkV4dGVuc2lvbi5wcm90b3R5cGUuaGFuZGxlUG9zaXRpb25DaGFuZ2UgPSBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHZhciAkcm93UG9zaXRpb25Db250YWluZXIgPSAkKHJvdykuZmluZChHcmlkTWFwLmdyaWRQb3NpdGlvbkZpcnN0KHRoaXMuZ3JpZC5nZXRJZCgpKSk7XG4gICAgICAgIHZhciB1cGRhdGVVcmwgPSAkcm93UG9zaXRpb25Db250YWluZXIuZGF0YSgndXBkYXRlLXVybCcpO1xuICAgICAgICB2YXIgbWV0aG9kID0gJHJvd1Bvc2l0aW9uQ29udGFpbmVyLmRhdGEoJ3VwZGF0ZS1tZXRob2QnKTtcbiAgICAgICAgdmFyIHBvc2l0aW9ucyA9IHRoaXMuZ2V0Um93c1Bvc2l0aW9ucygpO1xuICAgICAgICB2YXIgcGFyYW1zID0geyBwb3NpdGlvbnM6IHBvc2l0aW9ucyB9O1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHVwZGF0ZVVybCwgcGFyYW1zLCBtZXRob2QpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB0YWJsZSBwb3NpdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBQb3NpdGlvbkV4dGVuc2lvbi5wcm90b3R5cGUuZ2V0Um93c1Bvc2l0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhYmxlRGF0YSA9IEpTT04ucGFyc2UoJC50YWJsZURuRC5qc29uaXplKCkpO1xuICAgICAgICB2YXIgcm93c0RhdGEgPSB0YWJsZURhdGFbXCJcIi5jb25jYXQodGhpcy5ncmlkLmdldElkKCksIFwiX2dyaWRfdGFibGVcIildO1xuICAgICAgICB2YXIgY29tcGxldGVSb3dzRGF0YSA9IFtdO1xuICAgICAgICB2YXIgdHJEYXRhO1xuICAgICAgICAvLyByZXRyaWV2ZSBkcmFnQW5kRHJvcE9mZnNldCBvZmZzZXQgdG8gaGF2ZSBhbGwgbmVlZGVkIGRhdGFcbiAgICAgICAgLy8gZm9yIHBvc2l0aW9ucyBtYXBwaW5nIGV2b2x1dGlvbiBvdmVyIHRpbWVcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzRGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdHJEYXRhID0gdGhpcy5ncmlkLmdldENvbnRhaW5lcigpLmZpbmQoXCIjXCIuY29uY2F0KHJvd3NEYXRhW2ldKSk7XG4gICAgICAgICAgICBjb21wbGV0ZVJvd3NEYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIHJvd01hcmtlcjogcm93c0RhdGFbaV0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB0ckRhdGEuZGF0YSgnZHJhZ0FuZERyb3BPZmZzZXQnKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVNYXBwaW5nQmV0d2Vlbk9sZEFuZE5ld1Bvc2l0aW9ucyhjb21wbGV0ZVJvd3NEYXRhKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZCBJRCdzIHRvIEdyaWQgdGFibGUgcm93cyB0byBtYWtlIHRhYmxlRG5ELm9uRHJvcCgpIGZ1bmN0aW9uIHdvcmsuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFBvc2l0aW9uRXh0ZW5zaW9uLnByb3RvdHlwZS5hZGRJZHNUb0dyaWRUYWJsZVJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5ncmlkXG4gICAgICAgICAgICAuZ2V0Q29udGFpbmVyKClcbiAgICAgICAgICAgIC5maW5kKEdyaWRNYXAuZ3JpZFRhYmxlUG9zaXRpb24odGhpcy5ncmlkLmdldElkKCkpKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGluZGV4LCBwb3NpdGlvbldyYXBwZXIpIHtcbiAgICAgICAgICAgIHZhciAkcG9zaXRpb25XcmFwcGVyID0gJChwb3NpdGlvbldyYXBwZXIpO1xuICAgICAgICAgICAgdmFyIHJvd0lkID0gJHBvc2l0aW9uV3JhcHBlci5kYXRhKCdpZCcpO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gJHBvc2l0aW9uV3JhcHBlci5kYXRhKCdwb3NpdGlvbicpO1xuICAgICAgICAgICAgdmFyIGlkID0gXCJyb3dfXCIuY29uY2F0KHJvd0lkLCBcIl9cIikuY29uY2F0KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICRwb3NpdGlvbldyYXBwZXIuY2xvc2VzdCgndHInKS5hdHRyKCdpZCcsIGlkKTtcbiAgICAgICAgICAgICRwb3NpdGlvbldyYXBwZXIuY2xvc2VzdCgndGQnKS5hZGRDbGFzcyhHcmlkTWFwLmRyYWdIYW5kbGVyKTtcbiAgICAgICAgICAgICRwb3NpdGlvbldyYXBwZXIuY2xvc2VzdCgndHInKS5kYXRhKCdkcmFnQW5kRHJvcE9mZnNldCcsIGNvdW50ZXIpO1xuICAgICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFByb2Nlc3Mgcm93cyBwb3NpdGlvbnMgdXBkYXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgUG9zaXRpb25FeHRlbnNpb24ucHJvdG90eXBlLnVwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zLCBtZXRob2QpIHtcbiAgICAgICAgdmFyIGlzR2V0T3JQb3N0TWV0aG9kID0gWydHRVQnLCAnUE9TVCddLmluY2x1ZGVzKG1ldGhvZCk7XG4gICAgICAgIHZhciAkZm9ybSA9ICQoJzxmb3JtPicsIHtcbiAgICAgICAgICAgIGFjdGlvbjogdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBpc0dldE9yUG9zdE1ldGhvZCA/IG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgICAgfSkuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uc05iID0gcGFyYW1zLnBvc2l0aW9ucy5sZW5ndGg7XG4gICAgICAgIHZhciBwb3NpdGlvbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3NpdGlvbnNOYjsgaSArPSAxKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBhcmFtcy5wb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvc2l0aW9uc1tcIi5jb25jYXQoaSwgXCJdW3Jvd0lkXVwiKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcG9zaXRpb24ucm93SWQsXG4gICAgICAgICAgICB9KSwgJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvc2l0aW9uc1tcIi5jb25jYXQoaSwgXCJdW29sZFBvc2l0aW9uXVwiKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcG9zaXRpb24ub2xkUG9zaXRpb24sXG4gICAgICAgICAgICB9KSwgJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvc2l0aW9uc1tcIi5jb25jYXQoaSwgXCJdW25ld1Bvc2l0aW9uXVwiKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcG9zaXRpb24ubmV3UG9zaXRpb24sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBfbWV0aG9kIHBhcmFtIGlzIHVzZWQgYnkgU3ltZm9ueSB0byBzaW11bGF0ZSBERUxFVEUgYW5kIFBVVCBtZXRob2RzXG4gICAgICAgIGlmICghaXNHZXRPclBvc3RNZXRob2QpIHtcbiAgICAgICAgICAgICRmb3JtLmFwcGVuZCgkKCc8aW5wdXQ+Jywge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdfbWV0aG9kJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWV0aG9kLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgICRmb3JtLnN1Ym1pdCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUm93cyBoYXZlIGJlZW4gcmVvcmRlcmVkLiBUaGlzIGZ1bmN0aW9uXG4gICAgICogZmluZHMsIGZvciBlYWNoIHJvdyBJRDogdGhlIG9sZCBwb3NpdGlvbiwgdGhlIG5ldyBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgUG9zaXRpb25FeHRlbnNpb24ucHJvdG90eXBlLmNvbXB1dGVNYXBwaW5nQmV0d2Vlbk9sZEFuZE5ld1Bvc2l0aW9ucyA9IGZ1bmN0aW9uIChyb3dzRGF0YSkge1xuICAgICAgICB2YXIgcmVnZXggPSAvXnJvd18oXFxkKylfKFxcZCspJC87XG4gICAgICAgIHZhciBtYXBwaW5nID0gQXJyYXkocm93c0RhdGEubGVuZ3RoKS5tYXAoT2JqZWN0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzRGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIHJlZ2V4UmVzdWx0ID0gcmVnZXguZXhlYyhyb3dzRGF0YVtpXS5yb3dNYXJrZXIpO1xuICAgICAgICAgICAgaWYgKChyZWdleFJlc3VsdCA9PT0gbnVsbCB8fCByZWdleFJlc3VsdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVnZXhSZXN1bHQucm93SWQpICYmIChyZWdleFJlc3VsdCA9PT0gbnVsbCB8fCByZWdleFJlc3VsdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVnZXhSZXN1bHQub2xkUG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgbWFwcGluZ1tpXS5yb3dJZCA9IHJlZ2V4UmVzdWx0LnJvd0lkO1xuICAgICAgICAgICAgICAgIG1hcHBpbmdbaV0ub2xkUG9zaXRpb24gPSBwYXJzZUludChyZWdleFJlc3VsdC5vbGRQb3NpdGlvbiwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyByb3cgd2lsbCBoYXZlIGFzIGEgbmV3IHBvc2l0aW9uIHRoZSBvbGQgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgb25lXG4gICAgICAgICAgICBtYXBwaW5nW3Jvd3NEYXRhW2ldLm9mZnNldF0ubmV3UG9zaXRpb24gPSBtYXBwaW5nW2ldLm9sZFBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBwaW5nO1xuICAgIH07XG4gICAgcmV0dXJuIFBvc2l0aW9uRXh0ZW5zaW9uO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFBvc2l0aW9uRXh0ZW5zaW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG4vKipcbiAqIFNlbmQgYSBQb3N0IFJlcXVlc3QgdG8gcmVzZXQgc2VhcmNoIEFjdGlvbi5cbiAqL1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbmNvbnN0IGluaXQgPSBmdW5jdGlvbiByZXNldFNlYXJjaCh1cmwsIHJlZGlyZWN0VXJsKSB7XG4gICQucG9zdCh1cmwpLnRoZW4oKCkgPT4gd2luZG93LmxvY2F0aW9uLmFzc2lnbihyZWRpcmVjdFVybCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbmltcG9ydCByZXNldFNlYXJjaCBmcm9tICdAYXBwL3V0aWxzL3Jlc2V0X3NlYXJjaCc7XG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcbnZhciAkID0gd2luZG93LiQ7XG4vKipcbiAqIENsYXNzIEZpbHRlcnNSZXNldEV4dGVuc2lvbiBleHRlbmRzIGdyaWQgd2l0aCBmaWx0ZXJzIHJlc2V0dGluZ1xuICovXG52YXIgRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZpbHRlcnNSZXNldEV4dGVuc2lvbigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXh0ZW5kIGdyaWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIEZpbHRlcnNSZXNldEV4dGVuc2lvbi5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgZ3JpZC5nZXRDb250YWluZXIoKS5vbignY2xpY2snLCBHcmlkTWFwLnJlc2V0U2VhcmNoLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJlc2V0U2VhcmNoKCQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgndXJsJyksICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncmVkaXJlY3QnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEZpbHRlcnNSZXNldEV4dGVuc2lvbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJzUmVzZXRFeHRlbnNpb247XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgdmVyc2lvbiAzLjBcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMCBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgdmVyc2lvbiAzLjBcbiAqL1xuXG5pbXBvcnQgR3JpZCBmcm9tICdAUFNKcy9jb21wb25lbnRzL2dyaWQvZ3JpZCc7XG5pbXBvcnQgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbiBmcm9tICdAUFNKcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2xpbmstcm93LWFjdGlvbi1leHRlbnNpb24nO1xuaW1wb3J0IFN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbiBmcm9tICdAUFNKcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9yb3cvc3VibWl0LXJvdy1hY3Rpb24tZXh0ZW5zaW9uJztcbmltcG9ydCBTb3J0aW5nRXh0ZW5zaW9uIGZyb20gJ0BQU0pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc29ydGluZy1leHRlbnNpb24nO1xuaW1wb3J0IFBvc2l0aW9uRXh0ZW5zaW9uIGZyb20gJ0BQU0pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vcG9zaXRpb24tZXh0ZW5zaW9uJztcbmltcG9ydCBGaWx0ZXJzUmVzZXRFeHRlbnNpb24gZnJvbSAnQFBTSnMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9maWx0ZXJzLXJlc2V0LWV4dGVuc2lvbic7XG5jb25zdCB7ICQgfSA9IHdpbmRvd1xuXG4kKCgpID0+IHtcbiAgY29uc3QgZ3JpZCA9IG5ldyBHcmlkKCdwcm9kdWN0JylcblxuICBncmlkLmFkZEV4dGVuc2lvbihuZXcgU29ydGluZ0V4dGVuc2lvbigpKTtcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IExpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBQb3NpdGlvbkV4dGVuc2lvbigpKTtcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IEZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
