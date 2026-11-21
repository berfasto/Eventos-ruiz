(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    var now = new Date();
    var viewYear = now.getFullYear();
    var viewMonth = now.getMonth();
    var selectedDate = null;

    function formatLong(date) {
        return date.toLocaleDateString("es-BO", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    function nextSaturdays(count) {
        var list = [];
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        while (list.length < count) {
            if (d.getDay() === 6) list.push(new Date(d.getTime()));
            d.setDate(d.getDate() + 1);
        }
        return list;
    }

    function findEvent(id) {
        return (
            ER.DATA.eventTypes.filter(function (e) {
                return e.id === id;
            })[0] || ER.DATA.eventTypes[0]
        );
    }

    function init() {
        var calMonth = ER.utils.qs("#calMonth");
        var calGrid = ER.utils.qs("#calGrid");
        var calPrev = ER.utils.qs("#calPrev");
        var calNext = ER.utils.qs("#calNext");
        var quickSats = ER.utils.qs("#quickSaturdays");
        var dateBanner = ER.utils.qs("#dateBanner");
        var dateText = ER.utils.qs("#selectedDateText");
        var typeSelect = ER.utils.qs("#bookType");
        var nameInput = ER.utils.qs("#bookName");
        var guestsInput = ER.utils.qs("#bookGuests");
        var venueInput = ER.utils.qs("#bookVenue");
        var notesInput = ER.utils.qs("#bookNotes");
        var submitBtn = ER.utils.qs("#bookSubmit");
        var draftBanner = ER.utils.qs("#importedQuoteBox");

        var passImg = ER.utils.qs("#passImg");
        var passTitle = ER.utils.qs("#passTitle");
        var passDate = ER.utils.qs("#passDate");
        var passClient = ER.utils.qs("#passClient");

        if (!calGrid || !typeSelect) return;

        typeSelect.innerHTML = ER.DATA.eventTypes
            .map(function (ev) {
                return '<option value="' + ev.id + '">' + ev.label + "</option>";
            })
            .join("");

        var paramEvent = ER.utils.getParam("evento");
        var paramDate = ER.utils.getParam("fecha");
        var paramGuests = ER.utils.getParam("invitados");

        if (paramEvent) typeSelect.value = findEvent(paramEvent).id;
        if (paramGuests && guestsInput) guestsInput.value = paramGuests;

        if (paramDate && /^\d{4}-\d{2}-\d{2}$/.test(paramDate)) {
            var parts = paramDate.split("-");
            var parsed = new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );
            var today0 = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            if (parsed >= today0) {
                selectedDate = parsed;
                viewYear = parsed.getFullYear();
                viewMonth = parsed.getMonth();
                dateText.textContent = formatLong(selectedDate);
            }
        }

        var draft = ER.utils.loadDraft("quote");
        if (draft && draftBanner) {
            if (!paramEvent && draft.eventId) typeSelect.value = draft.eventId;
            if (!paramGuests && draft.guests && guestsInput) {
                guestsInput.value = draft.guests;
            }
            draftBanner.hidden = false;
            draftBanner.innerHTML =
                "<div><strong>Cotización vinculada:</strong> " +
                draft.eventId +
                " · Paquete " +
                draft.pkgName +
                " · " +
                draft.guests +
                " invitados · <strong>" +
                ER.utils.money(draft.total) +
                "</strong></div>" +
                '<button type="button" class="btn btn--sm" id="clearDraftBtn">Quitar</button>';

            ER.utils
                .qs("#clearDraftBtn", draftBanner)
                .addEventListener("click", function () {
                    ER.utils.clearDraft("quote");
                    draft = null;
                    draftBanner.hidden = true;
                    ER.utils.toast("Cotización desvinculada");
                });
        }

        function updateLivePass() {
            var ev = findEvent(typeSelect.value);
            if (passImg) {
                passImg.src = ev.heroImage;
                passImg.alt = ev.label;
            }
            if (passTitle) {
                passTitle.textContent =
                    ev.label +
                    (guestsInput && guestsInput.value
                        ? " · " + guestsInput.value + " invitados"
                        : "");
            }
            if (passDate) {
                passDate.textContent = selectedDate
                    ? formatLong(selectedDate)
                    : "Elige una fecha en el calendario";
            }
            if (passClient) {
                var client = nameInput && nameInput.value.trim();
                passClient.textContent = client
                    ? "A nombre de: " + client
                    : "Eventos Ruiz · Zona 23 de Marzo, La Paz";
            }
        }

        if (quickSats) {
            var sats = nextSaturdays(3);
            quickSats.innerHTML = sats
                .map(function (d, i) {
                    var label = d.toLocaleDateString("es-BO", {
                        day: "numeric",
                        month: "short",
                    });
                    return (
                        '<button type="button" class="btn btn--sm" data-sat="' +
                        i +
                        '">Sáb ' +
                        label +
                        "</button>"
                    );
                })
                .join("");

            quickSats.addEventListener("click", function (e) {
                var btn = e.target.closest("[data-sat]");
                if (!btn) return;
                selectedDate = sats[Number(btn.dataset.sat)];
                viewYear = selectedDate.getFullYear();
                viewMonth = selectedDate.getMonth();
                dateBanner.classList.remove("is-error");
                dateText.textContent = formatLong(selectedDate);
                renderCalendar();
                updateLivePass();
            });
        }

        function renderCalendar() {
            var first = new Date(viewYear, viewMonth, 1);
            var offset = (first.getDay() + 6) % 7;
            var totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
            var today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );

            calMonth.textContent = first.toLocaleDateString("es-BO", {
                month: "long",
                year: "numeric",
            });

            var html = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
                .map(function (w) {
                    return '<span class="cal-wd">' + w + "</span>";
                })
                .join("");

            for (var i = 0; i < offset; i++) html += "<span></span>";

            for (var day = 1; day <= totalDays; day++) {
                var current = new Date(viewYear, viewMonth, day);
                var past = current < today;
                var isToday = current.getTime() === today.getTime();
                var isSel =
                    selectedDate &&
                    selectedDate.getTime() === current.getTime();

                var cls = "cal-day mono";
                if (isToday) cls += " is-today";
                if (isSel) cls += " is-selected";

                html +=
                    '<button type="button" class="' +
                    cls +
                    '" data-day="' +
                    day +
                    '"' +
                    (past ? " disabled" : "") +
                    ">" +
                    day +
                    "</button>";
            }

            calGrid.innerHTML = html;
        }

        calPrev.addEventListener("click", function () {
            viewMonth--;
            if (viewMonth < 0) {
                viewMonth = 11;
                viewYear--;
            }
            renderCalendar();
        });

        calNext.addEventListener("click", function () {
            viewMonth++;
            if (viewMonth > 11) {
                viewMonth = 0;
                viewYear++;
            }
            renderCalendar();
        });

        calGrid.addEventListener("click", function (e) {
            var btn = e.target.closest(".cal-day");
            if (!btn || btn.disabled) return;
            selectedDate = new Date(viewYear, viewMonth, Number(btn.dataset.day));
            dateBanner.classList.remove("is-error");
            dateText.textContent = formatLong(selectedDate);
            renderCalendar();
            updateLivePass();
        });

        [typeSelect, nameInput, guestsInput].forEach(function (inp) {
            if (inp) inp.addEventListener("input", updateLivePass);
        });

        submitBtn.addEventListener("click", function (e) {
            if (!selectedDate) {
                dateBanner.classList.add("is-error");
                dateText.textContent = "Selecciona un día en el calendario";
                ER.utils.toast("Elige primero una fecha en el calendario");
                return;
            }

            ER.utils.burstSparkles(e.clientX, e.clientY);

            var name = nameInput.value.trim() || "un cliente";
            var guests = guestsInput ? guestsInput.value.trim() : "";
            var venue = venueInput ? venueInput.value.trim() : "";
            var notes = notesInput ? notesInput.value.trim() : "";

            var favIds = ER.utils.getFavorites();
            var favNames = ER.DATA.gallery
                .filter(function (g) {
                    return favIds.indexOf(g.id) >= 0;
                })
                .map(function (g) {
                    return g.title;
                });

            var msg =
                "Hola Eventos Ruiz (Zona 23 de Marzo), soy " +
                name +
                ". Quiero reservar y consultar disponibilidad para el " +
                formatLong(selectedDate) +
                " — Evento: " +
                typeSelect.value +
                ".";

            if (guests) msg += " Aprox. " + guests + " invitados.";
            if (venue) msg += " Lugar/zona: " + venue + ".";
            if (draft) {
                msg +=
                    " (Cotización web: paquete " +
                    draft.pkgName +
                    ", estimado " +
                    ER.utils.money(draft.total) +
                    (draft.extras && draft.extras.length
                        ? ", extras: " + draft.extras.join(", ")
                        : "") +
                    ").";
            }
            if (favNames.length) {
                msg += " Estilos favoritos: " + favNames.join(", ") + ".";
            }
            if (notes) msg += " Idea/detalles: " + notes;

            ER.utils.openWhatsApp(msg);
        });

        renderCalendar();
        updateLivePass();
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
