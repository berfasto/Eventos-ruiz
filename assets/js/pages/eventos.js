(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    function init() {
        var filterBar = ER.utils.qs("#eventsFilterBar");
        var specDeck = ER.utils.qs("#servicesDeck");
        var galGrid = ER.utils.qs("#galleryGrid");
        var galCount = ER.utils.qs("#galleryCount");
        var viewToggle = ER.utils.qs("#viewToggleBtn");
        var favTray = ER.utils.qs("#favTray");
        var favCountEl = ER.utils.qs("#favCountText");
        var favSendWa = ER.utils.qs("#favSendWa");
        var lb = ER.utils.qs("#erLightbox");

        if (!filterBar || !specDeck || !galGrid) return;

        var initialCat = ER.utils.getParam("cat") || "todo";
        var validCat = ER.DATA.categories.some(function (c) {
            return c.id === initialCat;
        })
            ? initialCat
            : "todo";

        var visiblePhotos = [];
        var lbIndex = 0;
        var uniformMode = false;

        filterBar.innerHTML = ER.DATA.categories
            .map(function (cat) {
                return (
                    '<button type="button" class="pill' +
                    (cat.id === validCat ? " is-active" : "") +
                    '" data-cat="' +
                    cat.id +
                    '" style="--pill-color:' +
                    cat.color +
                    '">' +
                    '<span class="pill__dot"></span>' +
                    cat.label +
                    "</button>"
                );
            })
            .join("");

        function updateFavTray() {
            if (!favTray || !favCountEl) return;
            var favs = ER.utils.getFavorites();
            favTray.classList.toggle("is-visible", favs.length > 0);
            favCountEl.textContent =
                favs.length +
                (favs.length === 1
                    ? " montaje favorito guardado"
                    : " montajes favoritos guardados");
        }

        function renderAll(cat) {
            var favs = ER.utils.getFavorites();

            var specs = ER.DATA.eventTypes.filter(function (ev) {
                return cat === "todo" || ev.category === cat;
            });

            specDeck.innerHTML = specs
                .map(function (ev, i) {
                    var icon =
                        ER.utils.ICONS[ev.icon] || ER.utils.ICONS.sparkle;
                    return (
                        '<article class="card event-spec" data-spotlight data-tilt="5" style="--spec-color:' +
                        ev.color +
                        "; --delay:" +
                        i * 55 +
                        'ms" data-reveal="up" tabindex="0" role="button" aria-expanded="false">' +
                        '<div class="event-spec__top">' +
                        '<span class="event-spec__icon">' +
                        icon +
                        "</span>" +
                        '<span class="event-spec__tag">' +
                        ev.categoryLabel +
                        "</span>" +
                        "</div>" +
                        "<div><h3>" +
                        ev.label +
                        "</h3><p>" +
                        ev.description +
                        "</p></div>" +
                        '<div class="event-spec__body"><div class="event-spec__inner">' +
                        '<ul class="event-spec__list">' +
                        ev.includes
                            .map(function (inc) {
                                return "<li>" + inc + "</li>";
                            })
                            .join("") +
                        "</ul></div></div>" +
                        '<div class="event-spec__foot">' +
                        '<span class="event-spec__toggle">Ver qué incluye +</span>' +
                        '<div style="display:flex;gap:0.45rem">' +
                        '<a class="btn btn--sm" href="cotizador.html?evento=' +
                        encodeURIComponent(ev.id) +
                        '">Cotizar</a>' +
                        '<a class="btn btn--dark btn--sm" href="reservas.html?evento=' +
                        encodeURIComponent(ev.id) +
                        '">Reservar</a>' +
                        "</div>" +
                        "</div>" +
                        "</article>"
                    );
                })
                .join("");

            visiblePhotos = ER.DATA.gallery.filter(function (g) {
                return cat === "todo" || g.category === cat;
            });

            if (galCount) {
                galCount.textContent =
                    visiblePhotos.length +
                    (visiblePhotos.length === 1
                        ? " montaje mostrado"
                        : " montajes mostrados");
            }

            galGrid.classList.toggle("is-all", cat === "todo" && !uniformMode);
            galGrid.classList.toggle("is-uniform", uniformMode);

            galGrid.innerHTML = visiblePhotos
                .map(function (item, idx) {
                    var isFav = favs.indexOf(item.id) >= 0;
                    return (
                        '<div class="gal-card-wrap" data-reveal="scale" style="--delay:' +
                        idx * 45 +
                        'ms">' +
                        '<button type="button" class="fav-btn' +
                        (isFav ? " is-fav" : "") +
                        '" data-fav-id="' +
                        item.id +
                        '" aria-label="Guardar como favorito" title="Guardar en favoritos">' +
                        ER.utils.ICONS.heart +
                        "</button>" +
                        '<button type="button" class="gal-item" data-gal-idx="' +
                        idx +
                        '" data-cursor="AMPLIAR">' +
                        '<img src="' +
                        item.src +
                        '" alt="' +
                        item.title +
                        '" loading="lazy" />' +
                        '<div class="gal-item__info">' +
                        '<div><span class="gal-item__badge">' +
                        item.categoryLabel +
                        '</span><span class="gal-item__title">' +
                        item.title +
                        "</span></div>" +
                        "</div>" +
                        "</button>" +
                        "</div>"
                    );
                })
                .join("");

            ER.motion.observeNew(specDeck);
            ER.motion.observeNew(galGrid);
        }

        filterBar.addEventListener("click", function (e) {
            var pill = e.target.closest(".pill");
            if (!pill) return;
            validCat = pill.dataset.cat;
            ER.utils.qsa(".pill", filterBar).forEach(function (p) {
                p.classList.toggle("is-active", p === pill);
            });
            renderAll(validCat);
        });

        if (viewToggle) {
            viewToggle.addEventListener("click", function () {
                uniformMode = !uniformMode;
                viewToggle.textContent = uniformMode
                    ? "Vista: Cuadrícula"
                    : "Vista: Editorial";
                galGrid.classList.toggle(
                    "is-all",
                    validCat === "todo" && !uniformMode
                );
                galGrid.classList.toggle("is-uniform", uniformMode);
            });
        }

        function toggleSpec(card) {
            var open = card.classList.toggle("is-open");
            card.setAttribute("aria-expanded", String(open));
            var t = ER.utils.qs(".event-spec__toggle", card);
            if (t) t.textContent = open ? "Ocultar detalles –" : "Ver qué incluye +";
        }

        specDeck.addEventListener("click", function (e) {
            if (e.target.closest("a")) return;
            var card = e.target.closest(".event-spec");
            if (card) toggleSpec(card);
        });

        specDeck.addEventListener("keydown", function (e) {
            if (e.key !== "Enter" && e.key !== " ") return;
            var card = e.target.closest(".event-spec");
            if (card && e.target === card) {
                e.preventDefault();
                toggleSpec(card);
            }
        });

        var lbImg = ER.utils.qs("#lbImg", lb);
        var lbTitle = ER.utils.qs("#lbTitle", lb);
        var lbDesc = ER.utils.qs("#lbDesc", lb);
        var lbCounter = ER.utils.qs("#lbCounter", lb);
        var lbQuote = ER.utils.qs("#lbQuote", lb);
        var lbBook = ER.utils.qs("#lbBook", lb);

        function showPhoto(idx) {
            if (!visiblePhotos.length) return;
            lbIndex = (idx + visiblePhotos.length) % visiblePhotos.length;
            var p = visiblePhotos[lbIndex];
            lbImg.style.opacity = "0.25";
            lbImg.src = p.src;
            lbImg.alt = p.title;
            lbTitle.textContent = p.title;
            lbDesc.textContent = p.desc;
            lbCounter.textContent =
                lbIndex +
                1 +
                " / " +
                visiblePhotos.length +
                " · " +
                p.categoryLabel;
            lbQuote.href =
                "cotizador.html?evento=" + encodeURIComponent(p.eventType);
            lbBook.href =
                "reservas.html?evento=" + encodeURIComponent(p.eventType);
            requestAnimationFrame(function () {
                lbImg.style.opacity = "1";
            });
        }

        function openLb(idx) {
            showPhoto(idx);
            lb.hidden = false;
            document.body.style.overflow = "hidden";
            requestAnimationFrame(function () {
                lb.classList.add("is-open");
            });
        }

        function closeLb() {
            lb.classList.remove("is-open");
            document.body.style.overflow = "";
            setTimeout(function () {
                if (!lb.classList.contains("is-open")) lb.hidden = true;
            }, 300);
        }

        galGrid.addEventListener("click", function (e) {
            var favBtn = e.target.closest("[data-fav-id]");
            if (favBtn) {
                var res = ER.utils.toggleFavorite(favBtn.dataset.favId);
                favBtn.classList.toggle("is-fav", res.added);
                if (res.added) {
                    var r = favBtn.getBoundingClientRect();
                    ER.utils.burstSparkles(
                        r.left + r.width / 2,
                        r.top + r.height / 2
                    );
                    ER.utils.toast("Guardado en tus montajes favoritos");
                } else {
                    ER.utils.toast("Quitado de favoritos");
                }
                updateFavTray();
                return;
            }
            var tile = e.target.closest(".gal-item");
            if (tile) openLb(Number(tile.dataset.galIdx));
        });

        if (favSendWa) {
            favSendWa.addEventListener("click", function () {
                var ids = ER.utils.getFavorites();
                var names = ER.DATA.gallery
                    .filter(function (g) {
                        return ids.indexOf(g.id) >= 0;
                    })
                    .map(function (g) {
                        return g.title;
                    });
                ER.utils.openWhatsApp(
                    "Hola Eventos Ruiz, me encantaron estos montajes de su galería: " +
                        names.join(", ") +
                        ". ¿Podrían asesorarme para mi evento?"
                );
            });
        }

        ER.utils.qs("#lbClose", lb).addEventListener("click", closeLb);
        ER.utils.qs("#lbPrev", lb).addEventListener("click", function () {
            showPhoto(lbIndex - 1);
        });
        ER.utils.qs("#lbNext", lb).addEventListener("click", function () {
            showPhoto(lbIndex + 1);
        });
        lb.addEventListener("click", function (e) {
            if (e.target === lb) closeLb();
        });

        window.addEventListener("keydown", function (e) {
            if (lb.hidden) return;
            if (e.key === "Escape") closeLb();
            if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
            if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
        });

        var startX = 0;
        lb.addEventListener(
            "touchstart",
            function (e) {
                startX = e.changedTouches[0].clientX;
            },
            { passive: true }
        );
        lb.addEventListener(
            "touchend",
            function (e) {
                var dx = e.changedTouches[0].clientX - startX;
                if (Math.abs(dx) > 45) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
            },
            { passive: true }
        );

        renderAll(validCat);
        updateFavTray();
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
