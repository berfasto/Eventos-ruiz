/**
 * Eventos Ruiz — Página: Inicio (Index.html)
 * Hero interactivo, Quick-Book, Comparador Deslizante, Baraja 3D, Bento y Atmósferas
 */
(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    function initHeroSwitcher() {
        var hero = ER.utils.qs("#homeHero");
        var chipsBox = ER.utils.qs("#heroSwitcher");
        var photo = ER.utils.qs("#heroPhoto");
        var tag = ER.utils.qs("#heroTag");
        var title = ER.utils.qs("#heroStageTitle");
        var cta = ER.utils.qs("#heroStageCta");
        if (!hero || !chipsBox || !photo) return;

        var types = ER.DATA.eventTypes;
        var activeIndex = 0;
        var autoTimer = null;

        chipsBox.innerHTML = types
            .map(function (ev, idx) {
                return (
                    '<button type="button" class="hero-chip' +
                    (idx === 0 ? " is-active" : "") +
                    '" data-idx="' +
                    idx +
                    '">' +
                    ev.label +
                    "</button>"
                );
            })
            .join("");

        function applyEvent(idx) {
            activeIndex = idx;
            var ev = types[idx];
            hero.style.setProperty("--hero-accent", ev.color);

            ER.utils.qsa(".hero-chip", chipsBox).forEach(function (btn, i) {
                btn.classList.toggle("is-active", i === idx);
            });

            photo.style.opacity = "0.22";
            photo.style.transform = "scale(1.06)";
            setTimeout(function () {
                photo.src = ev.heroImage;
                photo.alt = ev.label + " — " + ev.tagline;
                photo.style.opacity = "1";
                photo.style.transform = "scale(1)";
            }, 150);

            if (tag) tag.textContent = ev.categoryLabel + " · Eventos Ruiz";
            if (title) title.textContent = ev.tagline;
            if (cta) {
                cta.href = "reservas.html?evento=" + encodeURIComponent(ev.id);
            }
        }

        chipsBox.addEventListener("click", function (e) {
            var btn = e.target.closest(".hero-chip");
            if (!btn) return;
            applyEvent(Number(btn.dataset.idx));
            resetAuto();
        });

        function resetAuto() {
            clearInterval(autoTimer);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }
            autoTimer = setInterval(function () {
                if (document.hidden) return;
                applyEvent((activeIndex + 1) % types.length);
            }, 5200);
        }

        applyEvent(0);
        resetAuto();
    }

    function initQuickBook() {
        var form = ER.utils.qs("#quickBookForm");
        var select = ER.utils.qs("#qbType");
        var dateInput = ER.utils.qs("#qbDate");
        var guestsInput = ER.utils.qs("#qbGuests");
        if (!form || !select) return;

        select.innerHTML = ER.DATA.eventTypes
            .map(function (ev) {
                return '<option value="' + ev.id + '">' + ev.label + "</option>";
            })
            .join("");

        var today = new Date();
        var iso =
            today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0");
        if (dateInput) dateInput.min = iso;

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var params = new URLSearchParams();
            params.set("evento", select.value);
            if (dateInput && dateInput.value) params.set("fecha", dateInput.value);
            if (guestsInput && guestsInput.value) {
                params.set("invitados", guestsInput.value);
            }
            ER.utils.goPage("reservas.html?" + params.toString());
        });
    }

    /* Comparador interactivo deslizante de atmósferas reales */
    function initComparator() {
        var stage = ER.utils.qs("#compareStage");
        var range = ER.utils.qs("#compareRange");
        var tabs = ER.utils.qs("#compareTabs");
        var leftImg = ER.utils.qs("#cmpLeftImg");
        var rightImg = ER.utils.qs("#cmpRightImg");
        var leftLbl = ER.utils.qs("#cmpLeftLabel");
        var rightLbl = ER.utils.qs("#cmpRightLabel");
        var note = ER.utils.qs("#cmpNote");
        if (!stage || !range || !tabs) return;

        var pairs = ER.DATA.comparisons;

        tabs.innerHTML = pairs
            .map(function (p, i) {
                return (
                    '<button type="button" class="pill' +
                    (i === 0 ? " is-active" : "") +
                    '" data-cmp="' +
                    i +
                    '">' +
                    p.label +
                    "</button>"
                );
            })
            .join("");

        function setSplit(val) {
            var safe = Math.max(4, Math.min(96, Number(val)));
            stage.style.setProperty("--split", safe + "%");
            range.value = safe;
        }

        function selectPair(idx) {
            var p = pairs[idx];
            ER.utils.qsa(".pill", tabs).forEach(function (b, i) {
                b.classList.toggle("is-active", i === idx);
            });
            leftImg.src = p.leftImg;
            leftImg.alt = p.leftLabel;
            rightImg.src = p.rightImg;
            rightImg.alt = p.rightLabel;
            leftLbl.textContent = p.leftLabel;
            rightLbl.textContent = p.rightLabel;
            if (note) note.textContent = p.note;
            setSplit(50);
        }

        range.addEventListener("input", function () {
            setSplit(range.value);
        });

        tabs.addEventListener("click", function (e) {
            var btn = e.target.closest("[data-cmp]");
            if (btn) selectPair(Number(btn.dataset.cmp));
        });

        selectPair(0);
    }

    /* Baraja 3D interactiva de montajes reales */
    function initPhotoDeck() {
        var deck = ER.utils.qs("#photoDeck");
        var titleEl = ER.utils.qs("#deckTitle");
        var descEl = ER.utils.qs("#deckDesc");
        var countEl = ER.utils.qs("#deckCounter");
        var nextBtn = ER.utils.qs("#deckNext");
        var prevBtn = ER.utils.qs("#deckPrev");
        var bookLink = ER.utils.qs("#deckBookLink");
        if (!deck) return;

        var items = ER.DATA.gallery;
        var current = 0;
        var cards = [];

        deck.innerHTML = items
            .map(function (item, idx) {
                return (
                    '<article class="deck-card" data-idx="' +
                    idx +
                    '" data-cursor="SIGUIENTE">' +
                    '<img src="' +
                    item.src +
                    '" alt="' +
                    item.title +
                    '" loading="lazy" />' +
                    '<div class="deck-card__caption">' +
                    "<small>" +
                    item.categoryLabel +
                    "</small>" +
                    "<strong>" +
                    item.title +
                    "</strong>" +
                    "</div>" +
                    "</article>"
                );
            })
            .join("");

        cards = ER.utils.qsa(".deck-card", deck);

        function updateStack() {
            var n = items.length;
            cards.forEach(function (card, idx) {
                var rel = (idx - current + n) % n;
                card.classList.remove("is-flying");
                if (rel === 0) card.dataset.pos = "0";
                else if (rel === 1) card.dataset.pos = "1";
                else if (rel === 2) card.dataset.pos = "2";
                else card.dataset.pos = "hidden";
            });

            var active = items[current];
            if (titleEl) titleEl.textContent = active.title;
            if (descEl) descEl.textContent = active.desc;
            if (countEl) {
                countEl.textContent =
                    String(current + 1).padStart(2, "0") +
                    " / " +
                    String(n).padStart(2, "0");
            }
            if (bookLink) {
                bookLink.href =
                    "reservas.html?evento=" + encodeURIComponent(active.eventType);
            }
        }

        function advance(dir) {
            var topCard = cards[current];
            if (dir > 0 && topCard) {
                topCard.classList.add("is-flying");
                setTimeout(function () {
                    current = (current + 1) % items.length;
                    updateStack();
                }, 220);
            } else {
                current = (current - 1 + items.length) % items.length;
                updateStack();
            }
        }

        deck.addEventListener("click", function () {
            advance(1);
        });
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                advance(1);
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                advance(-1);
            });
        }

        updateStack();
    }

    function initSpecialtyBento() {
        var grid = ER.utils.qs("#specialtyBento");
        if (!grid) return;

        var featured = [
            { ev: ER.DATA.eventTypes[0], wide: true },
            { ev: ER.DATA.eventTypes[1], wide: true },
            { ev: ER.DATA.eventTypes[2], wide: false },
            { ev: ER.DATA.eventTypes[3], wide: false },
            { ev: ER.DATA.eventTypes[4], wide: false },
        ];

        grid.innerHTML = featured
            .map(function (item, i) {
                var ev = item.ev;
                return (
                    '<a class="bento-tile' +
                    (item.wide ? " bento-tile--wide" : "") +
                    '" href="eventos.html?cat=' +
                    ev.category +
                    '" style="--tile-color:' +
                    ev.color +
                    "; --delay:" +
                    i * 75 +
                    'ms" data-reveal="up" data-tilt="6" data-cursor="VER">' +
                    '<img src="' +
                    ev.heroImage +
                    '" alt="' +
                    ev.label +
                    '" loading="lazy" />' +
                    '<span class="bento-tile__badge">' +
                    ev.label +
                    "</span>" +
                    "<div>" +
                    '<h3 class="bento-tile__title">' +
                    ev.label +
                    "</h3>" +
                    '<p class="bento-tile__desc">' +
                    ev.description +
                    "</p>" +
                    '<div class="bento-tile__foot"><span>Ver montajes y detalles</span>' +
                    ER.utils.ICONS.arrow +
                    "</div>" +
                    "</div>" +
                    "</a>"
                );
            })
            .join("");
    }

    function initMoodStudio() {
        var list = ER.utils.qs("#moodList");
        var preview = ER.utils.qs("#moodPreview");
        var img = ER.utils.qs("#moodImg");
        var title = ER.utils.qs("#moodTitle");
        var desc = ER.utils.qs("#moodDesc");
        var tags = ER.utils.qs("#moodTags");
        var quoteLink = ER.utils.qs("#moodQuoteLink");
        var bookLink = ER.utils.qs("#moodBookLink");
        if (!list || !img) return;

        var moods = ER.DATA.moods;

        list.innerHTML = moods
            .map(function (m, i) {
                return (
                    '<button type="button" class="mood-btn' +
                    (i === 0 ? " is-active" : "") +
                    '" data-mood="' +
                    i +
                    '">' +
                    '<span><span class="mood-btn__title">' +
                    m.title +
                    '</span><span class="mood-btn__sub">' +
                    m.subtitle +
                    "</span></span>" +
                    '<span class="mood-swatches">' +
                    m.swatches
                        .map(function (c) {
                            return (
                                '<span class="mood-swatch" style="background:' +
                                c +
                                '"></span>'
                            );
                        })
                        .join("") +
                    "</span>" +
                    "</button>"
                );
            })
            .join("");

        function selectMood(i) {
            var m = moods[i];
            ER.utils.qsa(".mood-btn", list).forEach(function (b, idx) {
                b.classList.toggle("is-active", idx === i);
            });
            if (preview) {
                preview.style.borderColor = m.color;
            }
            img.style.opacity = "0.2";
            img.style.transform = "scale(1.06)";
            setTimeout(function () {
                img.src = m.image;
                img.alt = m.title;
                img.style.opacity = "1";
                img.style.transform = "scale(1)";
            }, 130);
            title.textContent = m.title;
            desc.textContent = m.desc;
            tags.innerHTML = m.tags
                .map(function (t) {
                    return '<span class="mood-tag">' + t + "</span>";
                })
                .join("");
            quoteLink.href =
                "cotizador.html?evento=" + encodeURIComponent(m.eventType);
            bookLink.href =
                "reservas.html?evento=" + encodeURIComponent(m.eventType);
        }

        list.addEventListener("click", function (e) {
            var btn = e.target.closest(".mood-btn");
            if (btn) selectMood(Number(btn.dataset.mood));
        });

        selectMood(0);
    }

    function boot() {
        ER.shell.init();
        initHeroSwitcher();
        initQuickBook();
        initComparator();
        initPhotoDeck();
        initSpecialtyBento();
        initMoodStudio();
        ER.motion.init();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})(window);
