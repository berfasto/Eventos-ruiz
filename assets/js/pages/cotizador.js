/**
 * Eventos Ruiz — Página: Paquetes y Cotizador (cotizador.html)
 * Incluye vista previa fotográfica en vivo del evento seleccionado + efectos destello
 */
(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    var state = {
        eventId: "Boda",
        pkgName: "Premium",
        guests: 100,
        extras: [],
        lastTotal: 0,
        summaryText: "",
    };

    function findEvent(id) {
        return (
            ER.DATA.eventTypes.filter(function (e) {
                return e.id === id;
            })[0] || ER.DATA.eventTypes[0]
        );
    }

    function findPkg(name) {
        return (
            ER.DATA.packages.filter(function (p) {
                return p.name === name;
            })[0] || ER.DATA.packages[1]
        );
    }

    function venueScaleLabel(guests) {
        if (guests <= 50) return "Reunión íntima";
        if (guests <= 120) return "Salón mediano";
        if (guests <= 250) return "Gran recepción";
        return "Evento de gran gala";
    }

    function init() {
        var pkgRow = ER.utils.qs("#packagesRow");
        var typeGrid = ER.utils.qs("#typeCards");
        var pkgSeg = ER.utils.qs("#pkgSegment");
        var guestsSlider = ER.utils.qs("#guestsSlider");
        var guestsVal = ER.utils.qs("#guestsVal");
        var scaleBadge = ER.utils.qs("#scaleBadge");
        var extrasBox = ER.utils.qs("#extrasList");
        var totalEl = ER.utils.qs("#receiptTotal");
        var rowsEl = ER.utils.qs("#receiptRows");
        var previewImg = ER.utils.qs("#receiptImg");
        var previewLabel = ER.utils.qs("#receiptImgLabel");
        var waBtn = ER.utils.qs("#btnSendQuoteWa");
        var copyBtn = ER.utils.qs("#btnCopyQuote");
        var bookBtn = ER.utils.qs("#btnToBooking");

        if (!typeGrid || !pkgSeg) return;

        var paramEvent = ER.utils.getParam("evento");
        if (paramEvent) {
            state.eventId = findEvent(paramEvent).id;
        }

        if (pkgRow) {
            pkgRow.innerHTML = ER.DATA.packages
                .map(function (pkg, i) {
                    return (
                        '<article class="card pkg-card' +
                        (pkg.featured ? " pkg-card--star" : "") +
                        '" data-spotlight data-tilt="5" data-reveal="up" style="--delay:' +
                        i * 80 +
                        'ms">' +
                        '<div class="pkg-card__top">' +
                        '<span class="pkg-card__level">' +
                        pkg.level +
                        "</span>" +
                        (pkg.featured
                            ? '<span class="pkg-card__pill">Más elegido</span>'
                            : "") +
                        "</div>" +
                        '<h3 class="pkg-card__name">' +
                        pkg.name +
                        "</h3>" +
                        '<p class="pkg-card__desc">' +
                        pkg.summary +
                        "</p>" +
                        '<div class="pkg-card__price">' +
                        '<span class="pkg-card__from mono" style="font-size:0.75rem">DESDE</span>' +
                        '<strong class="mono">' +
                        ER.utils.money(pkg.fromPrice) +
                        "</strong>" +
                        "</div>" +
                        '<ul class="pkg-card__feats">' +
                        pkg.features
                            .map(function (f) {
                                return (
                                    "<li>" +
                                    ER.utils.ICONS.check +
                                    "<span>" +
                                    f +
                                    "</span></li>"
                                );
                            })
                            .join("") +
                        "</ul>" +
                        '<button type="button" class="btn btn--full ' +
                        (pkg.featured ? "btn--gold" : "btn--dark") +
                        '" data-pick-pkg="' +
                        pkg.name +
                        '">Usar en cotizador ' +
                        ER.utils.ICONS.arrow +
                        "</button>" +
                        "</article>"
                    );
                })
                .join("");

            pkgRow.addEventListener("click", function (e) {
                var btn = e.target.closest("[data-pick-pkg]");
                if (!btn) return;
                state.pkgName = btn.dataset.pickPkg;
                syncControls();
                recalc(true);
                ER.utils.qs("#builderSection").scrollIntoView({
                    behavior: "smooth",
                });
                ER.utils.toast("Paquete " + state.pkgName + " cargado");
            });
        }

        typeGrid.innerHTML = ER.DATA.eventTypes
            .map(function (ev) {
                return (
                    '<button type="button" class="type-card" data-ev="' +
                    ev.id +
                    '" style="--tc:' +
                    ev.color +
                    '">' +
                    '<span class="type-card__dot"></span>' +
                    "<strong>" +
                    ev.label +
                    "</strong>" +
                    "<small>Base " +
                    ER.utils.money(ev.base) +
                    "</small>" +
                    "</button>"
                );
            })
            .join("");

        pkgSeg.innerHTML = ER.DATA.packages
            .map(function (pkg) {
                return (
                    '<button type="button" class="pkg-seg-btn" data-pkg="' +
                    pkg.name +
                    '">' +
                    pkg.name +
                    "<small>" +
                    pkg.level +
                    "</small></button>"
                );
            })
            .join("");

        extrasBox.innerHTML = ER.DATA.extras
            .map(function (ex) {
                return (
                    '<label class="extra-tile">' +
                    '<input type="checkbox" value="' +
                    ex.name +
                    '" />' +
                    '<span class="extra-tile__name">' +
                    ex.name +
                    "</span>" +
                    '<span class="extra-tile__price">+' +
                    ER.utils.money(ex.price) +
                    "</span>" +
                    "</label>"
                );
            })
            .join("");

        function syncControls() {
            ER.utils.qsa(".type-card", typeGrid).forEach(function (c) {
                c.classList.toggle("is-active", c.dataset.ev === state.eventId);
            });
            ER.utils.qsa(".pkg-seg-btn", pkgSeg).forEach(function (b) {
                b.classList.toggle("is-active", b.dataset.pkg === state.pkgName);
            });
            var ev = findEvent(state.eventId);
            if (previewImg) {
                previewImg.style.opacity = "0.35";
                setTimeout(function () {
                    previewImg.src = ev.heroImage;
                    previewImg.alt = ev.label;
                    previewImg.style.opacity = "1";
                }, 110);
            }
            if (previewLabel) {
                previewLabel.textContent = ev.label + " · " + state.pkgName;
            }
        }

        function recalc(animate) {
            var ev = findEvent(state.eventId);
            var pkg = findPkg(state.pkgName);

            var min = Number(guestsSlider.min);
            var max = Number(guestsSlider.max);
            guestsSlider.style.setProperty(
                "--fill",
                ((state.guests - min) / (max - min)) * 100 + "%"
            );
            guestsVal.textContent = state.guests + " invitados";
            if (scaleBadge) scaleBadge.textContent = venueScaleLabel(state.guests);

            var basePart = (ev.base + state.guests * ev.perGuest) * pkg.multiplier;
            var extrasPart = state.extras.reduce(function (acc, name) {
                var item = ER.DATA.extras.filter(function (x) {
                    return x.name === name;
                })[0];
                return acc + (item ? item.price : 0);
            }, 0);

            var total = Math.round(basePart + extrasPart);

            if (animate !== false) {
                ER.utils.animateNumber(
                    totalEl,
                    state.lastTotal,
                    total,
                    360,
                    ER.utils.money
                );
            } else {
                totalEl.textContent = ER.utils.money(total);
            }
            state.lastTotal = total;

            rowsEl.innerHTML =
                '<div class="receipt-row"><dt>Especialidad</dt><dd>' +
                ev.label +
                "</dd></div>" +
                '<div class="receipt-row"><dt>Paquete</dt><dd>' +
                pkg.name +
                "</dd></div>" +
                '<div class="receipt-row"><dt>Invitados</dt><dd class="mono">' +
                state.guests +
                "</dd></div>" +
                '<div class="receipt-row"><dt>Montaje y diseño</dt><dd class="mono">' +
                ER.utils.money(basePart) +
                "</dd></div>" +
                '<div class="receipt-row"><dt>Extras</dt><dd>' +
                (state.extras.length
                    ? state.extras.join(", ") +
                      " (" +
                      ER.utils.money(extrasPart) +
                      ")"
                    : "Ninguno") +
                "</dd></div>";

            state.summaryText =
                "Hola Eventos Ruiz, armé mi cotización web: " +
                ev.label +
                ", paquete " +
                pkg.name +
                ", " +
                state.guests +
                " invitados" +
                (state.extras.length
                    ? ", extras: " + state.extras.join(", ")
                    : "") +
                ". Estimado referencial: " +
                ER.utils.money(total) +
                ".";
        }

        typeGrid.addEventListener("click", function (e) {
            var card = e.target.closest(".type-card");
            if (!card) return;
            state.eventId = card.dataset.ev;
            syncControls();
            recalc(true);
        });

        pkgSeg.addEventListener("click", function (e) {
            var btn = e.target.closest(".pkg-seg-btn");
            if (!btn) return;
            state.pkgName = btn.dataset.pkg;
            syncControls();
            recalc(true);
        });

        guestsSlider.addEventListener("input", function () {
            state.guests = Number(guestsSlider.value);
            recalc(false);
        });

        extrasBox.addEventListener("change", function () {
            state.extras = [];
            ER.utils.qsa(".extra-tile", extrasBox).forEach(function (tile) {
                var cb = ER.utils.qs("input", tile);
                tile.classList.toggle("is-checked", cb.checked);
                if (cb.checked) state.extras.push(cb.value);
            });
            recalc(true);
        });

        waBtn.addEventListener("click", function (e) {
            ER.utils.burstSparkles(e.clientX, e.clientY);
            ER.utils.openWhatsApp(state.summaryText);
        });

        copyBtn.addEventListener("click", function () {
            ER.utils
                .copyText(state.summaryText)
                .then(function () {
                    ER.utils.toast("Resumen copiado al portapapeles");
                })
                .catch(function () {
                    ER.utils.toast("No se pudo copiar");
                });
        });

        bookBtn.addEventListener("click", function (e) {
            ER.utils.burstSparkles(e.clientX, e.clientY);
            ER.utils.saveDraft("quote", {
                eventId: state.eventId,
                pkgName: state.pkgName,
                guests: state.guests,
                extras: state.extras,
                total: state.lastTotal,
            });
            setTimeout(function () {
                ER.utils.goPage(
                    "reservas.html?evento=" + encodeURIComponent(state.eventId)
                );
            }, 180);
        });

        syncControls();
        recalc(false);
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
