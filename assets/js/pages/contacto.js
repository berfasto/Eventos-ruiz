(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    function init() {
        var loc = ER.DATA.location;
        var map = ER.utils.qs("#erMap");
        var openMaps = ER.utils.qs("#btnOpenMaps");
        var dirMaps = ER.utils.qs("#btnDirMaps");
        var copyAddr = ER.utils.qs("#btnCopyAddr");
        var waLoc = ER.utils.qs("#btnWaLoc");
        var faqWrap = ER.utils.qs("#faqWrap");

        if (map) {
            map.src =
                "https://maps.google.com/maps?q=" +
                encodeURIComponent(loc.query) +
                "&output=embed";
        }

        if (openMaps) {
            openMaps.href =
                loc.customLink ||
                "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(loc.query);
        }

        if (dirMaps) {
            dirMaps.href =
                "https://www.google.com/maps/dir/?api=1&destination=" +
                encodeURIComponent(loc.query);
        }

        if (copyAddr) {
            copyAddr.addEventListener("click", function () {
                ER.utils
                    .copyText(loc.address)
                    .then(function () {
                        ER.utils.toast("Dirección copiada al portapapeles");
                    })
                    .catch(function () {
                        ER.utils.toast("No se pudo copiar");
                    });
            });
        }

        if (waLoc) {
            waLoc.addEventListener("click", function () {
                ER.utils.openWhatsApp(
                    "Hola Eventos Ruiz, ¿me pueden enviar la ubicación exacta para coordinar una visita?",
                );
            });
        }

        if (faqWrap) {
            faqWrap.innerHTML = ER.DATA.faqs
                .map(function (f, i) {
                    return (
                        '<article class="faq-card' +
                        (i === 0 ? " is-open" : "") +
                        '" data-reveal="up" style="--delay:' +
                        i * 50 +
                        'ms">' +
                        '<button type="button" class="faq-q" aria-expanded="' +
                        (i === 0) +
                        '">' +
                        "<span>" +
                        f.q +
                        '</span><span class="faq-plus" aria-hidden="true">+</span></button>' +
                        '<div class="faq-a"><div class="faq-a__inner"><p>' +
                        f.a +
                        "</p></div></div>" +
                        "</article>"
                    );
                })
                .join("");

            faqWrap.addEventListener("click", function (e) {
                var btn = e.target.closest(".faq-q");
                if (!btn) return;
                var card = btn.closest(".faq-card");
                var wasOpen = card.classList.contains("is-open");

                ER.utils.qsa(".faq-card", faqWrap).forEach(function (other) {
                    other.classList.remove("is-open");
                    var q = ER.utils.qs(".faq-q", other);
                    if (q) q.setAttribute("aria-expanded", "false");
                });

                if (!wasOpen) {
                    card.classList.add("is-open");
                    btn.setAttribute("aria-expanded", "true");
                }
            });
        }
    }

    function boot() {
        ER.shell.init();
        init();
        ER.motion.init();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})(window);
