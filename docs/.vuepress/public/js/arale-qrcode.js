this.AraleQRCode = function (t) {
    function e(o) {
        if (r[o]) return r[o].exports;
        var i = r[o] = {exports: {}, id: o, loaded: !1};
        return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
    }

    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0)
}([function (t, e, r) {
    t.exports = r(1)
}, function (t, e, r) {
    "use strict";
    t.exports = r(2)
}, function (t, e, r) {
    "use strict";
    var o = r(4), i = [], n = r(3), s = function (t) {
        var e = t.options;
        return e.pdground && (t.row > 1 && t.row < 5 && t.col > 1 && t.col < 5 || t.row > t.count - 6 && t.row < t.count - 2 && t.col > 1 && t.col < 5 || t.row > 1 && t.row < 5 && t.col > t.count - 6 && t.col < t.count - 2) ? e.pdground : e.foreground
    }, u = function (t) {
        var e = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / e
    }, a = function (t) {
        "string" == typeof t && (t = {text: t}), this.options = o({}, {
            element: "",
            text: "",
            render: "",
            size: 256,
            correctLevel: 3,
            background: "#ffffff",
            foreground: "#000000",
            image: "",
            imageSize: 30
        }, t);
        for (var e = null, r = 0, s = i.length; s > r; r++) if (i[r].text == this.options.text && i[r].text.correctLevel == this.options.correctLevel) {
            e = i[r].obj;
            break
        }
        if (r == s && (e = new n(this.options.text, this.options.correctLevel), i.push({
            text: this.options.text,
            correctLevel: this.options.correctLevel,
            obj: e
        })), this.options.render) switch (this.options.render) {
            case"canvas":
                return this.createCanvas(e);
            case"table":
                return this.createTable(e);
            case"svg":
                return this.createSVG(e);
        }
        console.log("not support！")
    };
    o(a.prototype, {
        createCanvas: function (t) {
            var e = this.options, r = document.getElementById(e.element), o = r.getContext("2d"),
                i = t.getModuleCount(),
                n = u(o), a = e.size, l = a * n, h = e.imageSize * n, g = function (t, e) {
                    var r = new Image;
                    r.src = t, r.onload = function () {
                        e(this), r.onload = null
                    }
                }, c = (l / i).toPrecision(4), f = (l / i).toPrecision(4);
            r.width = l, r.height = l;
            for (var d = 0; i > d; d++) for (var m = 0; i > m; m++) {
                var p = Math.ceil((m + 1) * c) - Math.floor(m * c), v = Math.ceil((d + 1) * c) - Math.floor(d * c),
                    b = s({row: d, col: m, count: i, options: e});
                o.fillStyle = t.modules[d][m] ? b : e.background, o.fillRect(Math.round(m * c), Math.round(d * f), p, v)
            }
            return e.image && g(e.image, function (t) {
                var e = ((l - h) / 2).toFixed(2), r = ((l - h) / 2).toFixed(2);
                o.drawImage(t, e, r, h, h)
            }), r.style.width = a + "px", r.style.height = a + "px", r
        }, createTable: function (t) {
            var e = this.options, r = t.getModuleCount(), o = Math.floor(e.size / r), i = Math.floor(e.size / r);
            0 >= o && (o = 80 > r ? 2 : 1), 0 >= i && (i = 80 > r ? 2 : 1);
            var n = [];
            n.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color:' + e.background + ';">');
            for (var u = 0; r > u; u++) {
                n.push('<tr style="border:0px; margin:0px; padding:0px; height:' + i + 'px">');
                for (var a = 0; r > a; a++) {
                    var l = s({row: u, col: a, count: r, options: e});
                    t.modules[u][a] ? n.push('<td style="border:0px; margin:0px; padding:0px; width:' + o + "px; background-color:" + l + '"></td>') : n.push('<td style="border:0px; margin:0px; padding:0px; width:' + o + "px; background-color:" + e.background + '"></td>')
                }
                n.push("</tr>")
            }
            if (n.push("</table>"), e.image) {
                var h = o * r, g = i * r, c = ((h - e.imageSize) / 2).toFixed(2),
                    f = ((g - e.imageSize) / 2).toFixed(2);
                n.unshift("<div style='position:relative;\n                        width:" + h + "px;\n                        height:" + g + "px;'>"), n.push("<img src='" + e.image + "'\n                        width='" + e.imageSize + "'\n                        height='" + e.imageSize + "'\n                        style='position:absolute;left:" + c + "px; top:" + f + "px;'>"), n.push("</div>")
            }
            var d = document.getElementById(e.element);
            return d.innerHTML = n.join(""), d.firstChild
        }, createSVG: function (t) {
            var e = this.options, r = t.getModuleCount(), o = r / e.size,
                i = document.getElementById(e.element)
            i.setAttribute("width", e.size)
            i.setAttribute("height", e.size)
            i.setAttribute("viewBox", "0 0 " + r + " " + r);
            for (var n = 0; r > n; n++) for (var u = 0; r > u; u++) {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
                    l = s({row: n, col: u, count: r, options: e});
                a.setAttribute("x", u), a.setAttribute("y", n), a.setAttribute("width", 1), a.setAttribute("height", 1), a.setAttribute("stroke-width", 0), t.modules[n][u] ? a.setAttribute("fill", l) : a.setAttribute("fill", e.background), i.appendChild(a)
            }
            if (e.image) {
                var h = document.createElementNS("http://www.w3.org/2000/svg", "image");
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", e.image), h.setAttribute("x", ((r - e.imageSize * o) / 2).toFixed(2)), h.setAttribute("y", ((r - e.imageSize * o) / 2).toFixed(2)), h.setAttribute("width", e.imageSize * o), h.setAttribute("height", e.imageSize * o), i.appendChild(h)
            }
            return i
        }
    }), t.exports = a
}, function (t, e) {
    "use strict";

    function r(t) {
        var e, r, o;
        return 128 > t ? [t] : 2048 > t ? (e = 192 + (t >> 6), r = 128 + (63 & t), [e, r]) : (e = 224 + (t >> 12), r = 128 + (t >> 6 & 63), o = 128 + (63 & t), [e, r, o])
    }

    function o(t) {
        for (var e = [], o = 0; o < t.length; o++) for (var i = t.charCodeAt(o), n = r(i), s = 0; s < n.length; s++) e.push(n[s]);
        return e
    }

    function i(t, e) {
        this.typeNumber = -1, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.rsBlocks = null, this.totalDataCount = -1, this.data = t, this.utf8bytes = o(t), this.make()
    }

    function n(t, e) {
        if (void 0 == t.length) throw new Error(t.length + "/" + e);
        for (var r = 0; r < t.length && 0 == t[r];) r++;
        this.num = new Array(t.length - r + e);
        for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r]
    }

    function s() {
        this.buffer = new Array, this.length = 0
    }

    i.prototype = {
        constructor: i, getModuleCount: function () {
            return this.moduleCount
        }, make: function () {
            this.getRightType(), this.dataCache = this.createData(), this.createQrcode()
        }, makeImpl: function (t) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var e = 0; e < this.moduleCount; e++) this.modules[e] = new Array(this.moduleCount);
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(!0, t), this.typeNumber >= 7 && this.setupTypeNumber(!0), this.mapData(this.dataCache, t)
        }, setupPositionProbePattern: function (t, e) {
            for (var r = -1; 7 >= r; r++) if (!(-1 >= t + r || this.moduleCount <= t + r)) for (var o = -1; 7 >= o; o++) -1 >= e + o || this.moduleCount <= e + o || (r >= 0 && 6 >= r && (0 == o || 6 == o) || o >= 0 && 6 >= o && (0 == r || 6 == r) || r >= 2 && 4 >= r && o >= 2 && 4 >= o ? this.modules[t + r][e + o] = !0 : this.modules[t + r][e + o] = !1)
        }, createQrcode: function () {
            for (var t = 0, e = 0, r = null, o = 0; 8 > o; o++) {
                this.makeImpl(o);
                var i = l.getLostPoint(this);
                (0 == o || t > i) && (t = i, e = o, r = this.modules)
            }
            this.modules = r, this.setupTypeInfo(!1, e), this.typeNumber >= 7 && this.setupTypeNumber(!1)
        }, setupTimingPattern: function () {
            for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0, null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0))
        }, setupPositionAdjustPattern: function () {
            for (var t = l.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var r = 0; r < t.length; r++) {
                var o = t[e], i = t[r];
                if (null == this.modules[o][i]) for (var n = -2; 2 >= n; n++) for (var s = -2; 2 >= s; s++) -2 == n || 2 == n || -2 == s || 2 == s || 0 == n && 0 == s ? this.modules[o + n][i + s] = !0 : this.modules[o + n][i + s] = !1
            }
        }, setupTypeNumber: function (t) {
            for (var e = l.getBCHTypeNumber(this.typeNumber), r = 0; 18 > r; r++) {
                var o = !t && 1 == (e >> r & 1);
                this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = o, this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = o
            }
        }, setupTypeInfo: function (t, e) {
            for (var r = u[this.errorCorrectLevel] << 3 | e, o = l.getBCHTypeInfo(r), i = 0; 15 > i; i++) {
                var n = !t && 1 == (o >> i & 1);
                6 > i ? this.modules[i][8] = n : 8 > i ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;
                var n = !t && 1 == (o >> i & 1);
                8 > i ? this.modules[8][this.moduleCount - i - 1] = n : 9 > i ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n
            }
            this.modules[this.moduleCount - 8][8] = !t
        }, createData: function () {
            var t = new s, e = this.typeNumber > 9 ? 16 : 8;
            t.put(4, 4), t.put(this.utf8bytes.length, e);
            for (var r = 0, o = this.utf8bytes.length; o > r; r++) t.put(this.utf8bytes[r], 8);
            for (t.length + 4 <= 8 * this.totalDataCount && t.put(0, 4); t.length % 8 != 0;) t.putBit(!1);
            for (; ;) {
                if (t.length >= 8 * this.totalDataCount) break;
                if (t.put(i.PAD0, 8), t.length >= 8 * this.totalDataCount) break;
                t.put(i.PAD1, 8)
            }
            return this.createBytes(t)
        }, createBytes: function (t) {
            for (var e = 0, r = 0, o = 0, i = this.rsBlock.length / 3, s = new Array, u = 0; i > u; u++) for (var a = this.rsBlock[3 * u + 0], h = this.rsBlock[3 * u + 1], g = this.rsBlock[3 * u + 2], c = 0; a > c; c++) s.push([g, h]);
            for (var f = new Array(s.length), d = new Array(s.length), m = 0; m < s.length; m++) {
                var p = s[m][0], v = s[m][1] - p;
                r = Math.max(r, p), o = Math.max(o, v), f[m] = new Array(p);
                for (var u = 0; u < f[m].length; u++) f[m][u] = 255 & t.buffer[u + e];
                e += p;
                var b = l.getErrorCorrectPolynomial(v), w = new n(f[m], b.getLength() - 1), A = w.mod(b);
                d[m] = new Array(b.getLength() - 1);
                for (var u = 0; u < d[m].length; u++) {
                    var T = u + A.getLength() - d[m].length;
                    d[m][u] = T >= 0 ? A.get(T) : 0
                }
            }
            for (var P = new Array(this.totalDataCount), y = 0, u = 0; r > u; u++) for (var m = 0; m < s.length; m++) u < f[m].length && (P[y++] = f[m][u]);
            for (var u = 0; o > u; u++) for (var m = 0; m < s.length; m++) u < d[m].length && (P[y++] = d[m][u]);
            return P
        }, mapData: function (t, e) {
            for (var r = -1, o = this.moduleCount - 1, i = 7, n = 0, s = this.moduleCount - 1; s > 0; s -= 2) for (6 == s && s--; ;) {
                for (var u = 0; 2 > u; u++) if (null == this.modules[o][s - u]) {
                    var a = !1;
                    n < t.length && (a = 1 == (t[n] >>> i & 1));
                    var h = l.getMask(e, o, s - u);
                    h && (a = !a), this.modules[o][s - u] = a, i--, -1 == i && (n++, i = 7)
                }
                if (o += r, 0 > o || this.moduleCount <= o) {
                    o -= r, r = -r;
                    break
                }
            }
        }
    }, i.PAD0 = 236, i.PAD1 = 17;
    for (var u = [1, 0, 3, 2], a = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    }, l = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function (t) {
            for (var e = t << 10; l.getBCHDigit(e) - l.getBCHDigit(l.G15) >= 0;) e ^= l.G15 << l.getBCHDigit(e) - l.getBCHDigit(l.G15);
            return (t << 10 | e) ^ l.G15_MASK
        },
        getBCHTypeNumber: function (t) {
            for (var e = t << 12; l.getBCHDigit(e) - l.getBCHDigit(l.G18) >= 0;) e ^= l.G18 << l.getBCHDigit(e) - l.getBCHDigit(l.G18);
            return t << 12 | e
        },
        getBCHDigit: function (t) {
            for (var e = 0; 0 != t;) e++, t >>>= 1;
            return e
        },
        getPatternPosition: function (t) {
            return l.PATTERN_POSITION_TABLE[t - 1]
        },
        getMask: function (t, e, r) {
            switch (t) {
                case a.PATTERN000:
                    return (e + r) % 2 == 0;
                case a.PATTERN001:
                    return e % 2 == 0;
                case a.PATTERN010:
                    return r % 3 == 0;
                case a.PATTERN011:
                    return (e + r) % 3 == 0;
                case a.PATTERN100:
                    return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                case a.PATTERN101:
                    return e * r % 2 + e * r % 3 == 0;
                case a.PATTERN110:
                    return (e * r % 2 + e * r % 3) % 2 == 0;
                case a.PATTERN111:
                    return (e * r % 3 + (e + r) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + t)
            }
        },
        getErrorCorrectPolynomial: function (t) {
            for (var e = new n([1], 0), r = 0; t > r; r++) e = e.multiply(new n([1, h.gexp(r)], 0));
            return e
        },
        getLostPoint: function (t) {
            for (var e = t.getModuleCount(), r = 0, o = 0, i = 0; e > i; i++) for (var n = 0, s = t.modules[i][0], u = 0; e > u; u++) {
                var a = t.modules[i][u];
                if (e - 6 > u && a && !t.modules[i][u + 1] && t.modules[i][u + 2] && t.modules[i][u + 3] && t.modules[i][u + 4] && !t.modules[i][u + 5] && t.modules[i][u + 6] && (e - 10 > u ? t.modules[i][u + 7] && t.modules[i][u + 8] && t.modules[i][u + 9] && t.modules[i][u + 10] && (r += 40) : u > 3 && t.modules[i][u - 1] && t.modules[i][u - 2] && t.modules[i][u - 3] && t.modules[i][u - 4] && (r += 40)), e - 1 > i && e - 1 > u) {
                    var l = 0;
                    a && l++, t.modules[i + 1][u] && l++, t.modules[i][u + 1] && l++, t.modules[i + 1][u + 1] && l++, (0 == l || 4 == l) && (r += 3)
                }
                s ^ a ? n++ : (s = a, n >= 5 && (r += 3 + n - 5), n = 1), a && o++
            }
            for (var u = 0; e > u; u++) for (var n = 0, s = t.modules[0][u], i = 0; e > i; i++) {
                var a = t.modules[i][u];
                e - 6 > i && a && !t.modules[i + 1][u] && t.modules[i + 2][u] && t.modules[i + 3][u] && t.modules[i + 4][u] && !t.modules[i + 5][u] && t.modules[i + 6][u] && (e - 10 > i ? t.modules[i + 7][u] && t.modules[i + 8][u] && t.modules[i + 9][u] && t.modules[i + 10][u] && (r += 40) : i > 3 && t.modules[i - 1][u] && t.modules[i - 2][u] && t.modules[i - 3][u] && t.modules[i - 4][u] && (r += 40)), s ^ a ? n++ : (s = a, n >= 5 && (r += 3 + n - 5), n = 1)
            }
            var h = Math.abs(100 * o / e / e - 50) / 5;
            return r += 10 * h
        }
    }, h = {
        glog: function (t) {
            if (1 > t) throw new Error("glog(" + t + ")");
            return h.LOG_TABLE[t]
        }, gexp: function (t) {
            for (; 0 > t;) t += 255;
            for (; t >= 256;) t -= 255;
            return h.EXP_TABLE[t]
        }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
    }, g = 0; 8 > g; g++) h.EXP_TABLE[g] = 1 << g;
    for (var g = 8; 256 > g; g++) h.EXP_TABLE[g] = h.EXP_TABLE[g - 4] ^ h.EXP_TABLE[g - 5] ^ h.EXP_TABLE[g - 6] ^ h.EXP_TABLE[g - 8];
    for (var g = 0; 255 > g; g++) h.LOG_TABLE[h.EXP_TABLE[g]] = g;
    n.prototype = {
        get: function (t) {
            return this.num[t]
        }, getLength: function () {
            return this.num.length
        }, multiply: function (t) {
            for (var e = new Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++) for (var o = 0; o < t.getLength(); o++) e[r + o] ^= h.gexp(h.glog(this.get(r)) + h.glog(t.get(o)));
            return new n(e, 0)
        }, mod: function (t) {
            var e = this.getLength(), r = t.getLength();
            if (0 > e - r) return this;
            for (var o = new Array(e), i = 0; e > i; i++) o[i] = this.get(i);
            for (; o.length >= r;) {
                for (var s = h.glog(o[0]) - h.glog(t.get(0)), i = 0; i < t.getLength(); i++) o[i] ^= h.gexp(h.glog(t.get(i)) + s);
                for (; 0 == o[0];) o.shift()
            }
            return new n(o, 0)
        }
    };
    var c = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
    i.prototype.getRightType = function () {
        for (var t = 1; 41 > t; t++) {
            var e = c[4 * (t - 1) + this.errorCorrectLevel];
            if (void 0 == e) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + this.errorCorrectLevel);
            for (var r = e.length / 3, o = 0, i = 0; r > i; i++) {
                var n = e[3 * i + 0], s = e[3 * i + 2];
                o += s * n
            }
            var u = t > 9 ? 2 : 1;
            if (this.utf8bytes.length + u < o || 40 == t) {
                this.typeNumber = t, this.rsBlock = e, this.totalDataCount = o;
                break
            }
        }
    }, s.prototype = {
        get: function (t) {
            var e = Math.floor(t / 8);
            return this.buffer[e] >>> 7 - t % 8 & 1
        }, put: function (t, e) {
            for (var r = 0; e > r; r++) this.putBit(t >>> e - r - 1 & 1)
        }, putBit: function (t) {
            var e = Math.floor(this.length / 8);
            this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
        }
    }, t.exports = i
}, function (t, e) {
    t.exports = function (t) {
        for (var e, r = Array.prototype.slice.call(arguments, 1), o = 0; e = r[o]; o++) if (e) for (var i in e) t[i] = e[i];
        return t
    }
}]);
