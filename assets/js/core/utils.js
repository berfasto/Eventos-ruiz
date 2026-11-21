(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});
    var toastTimer = null;

    function qs(sel, scope) {
        return (scope || document).querySelector(sel);
    }

    function qsa(sel, scope) {
        return Array.prototype.slice.call(
            (scope || document).querySelectorAll(sel),
        );
    }

    function money(n) {
        return "Bs " + Math.round(n).toLocaleString("es-BO");
    }

    function openWhatsApp(text) {
        var phone = ER.DATA.brand.whatsapp;
        window.open(
            "https://wa.me/" + phone + "?text=" + encodeURIComponent(text),
            "_blank",
            "noopener,noreferrer",
        );
    }

    function toast(msg) {
        var el = qs("#erToast");
        if (!el) return;
        el.textContent = msg;
        el.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            el.classList.remove("is-visible");
        }, 2800);
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return fallbackCopy(text);
            });
        }
        return fallbackCopy(text);
    }

    function fallbackCopy(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try {
            ok = document.execCommand("copy");
        } catch (err) {
            ok = false;
        }
        ta.remove();
        return ok ? Promise.resolve() : Promise.reject();
    }

    function animateNumber(el, from, to, duration, fmt) {
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.textContent = fmt(to);
            return;
        }
        var start = performance.now();
        var diff = to - from;
        if (el._raf) cancelAnimationFrame(el._raf);

        function step(now) {
            var p = Math.min(1, (now - start) / duration);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(from + diff * eased);
            if (p < 1) {
                el._raf = requestAnimationFrame(step);
            } else {
                el.textContent = fmt(to);
                el._raf = null;
            }
        }
        el._raf = requestAnimationFrame(step);
    }

    function burstSparkles(x, y) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        var colors = ["#d99b26", "#f2bc4c", "#7c3aed", "#059669", "#ffffff"];
        for (var i = 0; i < 16; i++) {
            var dot = document.createElement("span");
            dot.className = "spark-particle";
            var angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.4;
            var dist = 36 + Math.random() * 54;
            dot.style.left = x + "px";
            dot.style.top = y + "px";
            dot.style.background = colors[i % colors.length];
            dot.style.setProperty("--dx", Math.cos(angle) * dist + "px");
            dot.style.setProperty("--dy", Math.sin(angle) * dist + "px");
            document.body.appendChild(dot);
            setTimeout(
                (function (node) {
                    return function () {
                        node.remove();
                    };
                })(dot),
                720,
            );
        }
    }

    function getParam(key) {
        try {
            return new URLSearchParams(window.location.search).get(key);
        } catch (err) {
            return null;
        }
    }

    function saveDraft(key, data) {
        try {
            sessionStorage.setItem("er_" + key, JSON.stringify(data));
        } catch (err) {}
    }

    function loadDraft(key) {
        try {
            var raw = sessionStorage.getItem("er_" + key);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    }

    function clearDraft(key) {
        try {
            sessionStorage.removeItem("er_" + key);
        } catch (err) {}
    }

    function getFavorites() {
        try {
            var raw = localStorage.getItem("er_favs");
            var arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (err) {
            return [];
        }
    }

    function toggleFavorite(id) {
        var list = getFavorites();
        var idx = list.indexOf(id);
        var added = false;
        if (idx >= 0) {
            list.splice(idx, 1);
        } else {
            list.push(id);
            added = true;
        }
        try {
            localStorage.setItem("er_favs", JSON.stringify(list));
        } catch (err) {}
        return { added: added, list: list };
    }

    function goPage(url) {
        window.location.href = url;
    }

    var ICONS = {
        rings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9.5" cy="13" r="5"/><circle cx="14.5" cy="13" r="5"/><path d="M12 6.5 13.5 4h-3L12 6.5Z"/></svg>',
        crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4L3 18Z"/><path d="M5 21h14"/></svg>',
        medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="14" r="6"/><path d="M8.5 9.2 6 3h4l2 4 2-4h4l-2.5 6.2"/><path d="m10.5 14 1 1 2.2-2.2"/></svg>',
        leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 4C11 4 5 9.5 5 18c0 .7.1 1.4.2 2C13.7 20 19 14 19 4Z"/><path d="M5 19l9-9"/></svg>',
        cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.5 18h11a4 4 0 0 0 .8-7.9A5.5 5.5 0 0 0 7.6 8.5 3.8 3.8 0 0 0 6.5 18Z"/></svg>',
        sparkle:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z"/></svg>',
        grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        arrow: '<svg class="arrow-move" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
        wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20l1.3-5.2A8.4 8.4 0 1 1 21 11.5Z"/></svg>',
        up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>',
        heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    };

    ER.utils = {
        qs: qs,
        qsa: qsa,
        money: money,
        openWhatsApp: openWhatsApp,
        toast: toast,
        copyText: copyText,
        animateNumber: animateNumber,
        burstSparkles: burstSparkles,
        getParam: getParam,
        saveDraft: saveDraft,
        loadDraft: loadDraft,
        clearDraft: clearDraft,
        getFavorites: getFavorites,
        toggleFavorite: toggleFavorite,
        goPage: goPage,
        ICONS: ICONS,
    };
})(window);
