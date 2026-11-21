(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    function brandHTML(logo) {
        return (
            '<a class="nav-brand" href="index.html">' +
            '<span class="nav-brand__badge"><img src="' +
            logo +
            '" alt="Eventos Ruiz" width="44" height="44" /></span>' +
            '<span class="nav-brand__title">Eventos <b>Ruiz</b></span>' +
            "</a>"
        );
    }

    function renderShell() {
        var pageId = document.body.dataset.page || "inicio";
        var brand = ER.DATA.brand;
        var loc = ER.DATA.location;
        var navItems = ER.DATA.nav;

        document.body.insertAdjacentHTML(
            "afterbegin",
            '<div class="scroll-bar" id="scrollBar" aria-hidden="true"></div>',
        );

        var headerMount = ER.utils.qs("#appHeader");
        if (headerMount) {
            headerMount.className = "site-nav";
            headerMount.innerHTML =
                '<div class="container nav__inner">' +
                brandHTML(brand.logo) +
                '<nav class="nav-tabs" aria-label="Navegación principal">' +
                navItems
                    .map(function (item) {
                        var active = item.id === pageId ? " is-active" : "";
                        return (
                            '<a class="nav-tab' +
                            active +
                            '" href="' +
                            item.href +
                            '">' +
                            item.label +
                            "</a>"
                        );
                    })
                    .join("") +
                "</nav>" +
                '<div class="nav-actions">' +
                '<a class="btn btn--gold btn--sm" data-magnetic href="reservas.html">Reservar fecha</a>' +
                '<button type="button" class="nav-burger" id="navBurger" aria-label="Abrir menú" aria-expanded="false">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h12"/></svg>' +
                "</button>" +
                "</div>" +
                "</div>";
        }

        document.body.insertAdjacentHTML(
            "beforeend",
            '<aside class="mobile-menu" id="mobileMenu" hidden aria-label="Menú móvil">' +
                '<div class="mobile-menu__head">' +
                brandHTML(brand.logo) +
                '<button type="button" class="icon-circle" id="navClose" aria-label="Cerrar menú">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
                "</button>" +
                "</div>" +
                '<nav class="mobile-menu__links">' +
                navItems
                    .map(function (item) {
                        var active = item.id === pageId ? " is-active" : "";
                        return (
                            '<a class="mobile-menu__link' +
                            active +
                            '" href="' +
                            item.href +
                            '">' +
                            item.label +
                            "<span>" +
                            item.num +
                            "</span></a>"
                        );
                    })
                    .join("") +
                "</nav>" +
                '<div class="mobile-menu__foot">' +
                '<a class="btn btn--gold btn--full" href="reservas.html">Reservar fecha</a>' +
                '<a class="btn btn--ghost-dark btn--full" href="tel:' +
                brand.phoneHref +
                '">Llamar · ' +
                brand.phone +
                "</a>" +
                "</div>" +
                "</aside>",
        );

        var footerMount = ER.utils.qs("#appFooter");
        if (footerMount) {
            footerMount.className = "site-footer";
            footerMount.innerHTML =
                '<div class="container">' +
                '<div class="footer__main">' +
                '<div class="footer__brand-block">' +
                brandHTML(brand.logo) +
                '<p class="footer__tagline">Decoración de bodas, 15 años, bautizos, licenciamientos, baby showers y cumpleaños en La Paz.</p>' +
                '<div class="footer__contact-row">' +
                '<a class="footer__phone" href="tel:' +
                brand.phoneHref +
                '">' +
                brand.phone +
                "</a>" +
                '<span style="color:var(--ink-on-dark-muted)">' +
                loc.address +
                "</span>" +
                "</div>" +
                "</div>" +
                '<nav class="footer__nav" aria-label="Enlaces del pie">' +
                navItems
                    .map(function (item) {
                        return (
                            '<a href="' + item.href + '">' + item.label + "</a>"
                        );
                    })
                    .join("") +
                "</nav>" +
                "</div>" +
                '<div class="footer__bottom">' +
                "<span>© " +
                new Date().getFullYear() +
                " " +
                brand.name +
                " · " +
                brand.slogan +
                "</span>" +
                '<div class="footer__bottom-links">' +
                '<a href="#" data-wa-general>WhatsApp</a>' +
                '<a href="contacto.html">Mapa</a>' +
                '<a href="reservas.html">Agenda</a>' +
                "</div>" +
                "</div>" +
                "</div>";
        }

        document.body.insertAdjacentHTML(
            "beforeend",
            '<div class="fab-dock">' +
                '<button type="button" class="fab-top" id="fabTop" aria-label="Subir">' +
                ER.utils.ICONS.up +
                "</button>" +
                '<a class="fab-wa" href="#" data-wa-general aria-label="Escribir por WhatsApp">' +
                ER.utils.ICONS.wa +
                "<span>WhatsApp</span></a>" +
                "</div>" +
                '<div class="toast" id="erToast" role="status" aria-live="polite"></div>',
        );

        bindShellEvents();
    }

    function bindShellEvents() {
        var burger = ER.utils.qs("#navBurger");
        var closeBtn = ER.utils.qs("#navClose");
        var menu = ER.utils.qs("#mobileMenu");

        function openMenu() {
            if (!menu) return;
            menu.hidden = false;
            document.body.style.overflow = "hidden";
            requestAnimationFrame(function () {
                menu.classList.add("is-open");
            });
            if (burger) burger.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            if (!menu) return;
            menu.classList.remove("is-open");
            document.body.style.overflow = "";
            if (burger) burger.setAttribute("aria-expanded", "false");
            setTimeout(function () {
                if (!menu.classList.contains("is-open")) menu.hidden = true;
            }, 340);
        }

        if (burger) burger.addEventListener("click", openMenu);
        if (closeBtn) closeBtn.addEventListener("click", closeMenu);
        window.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && menu && !menu.hidden) closeMenu();
        });

        var fabTop = ER.utils.qs("#fabTop");
        if (fabTop) {
            fabTop.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        document.addEventListener("click", function (e) {
            var waTrigger = e.target.closest("[data-wa-general]");
            if (waTrigger) {
                e.preventDefault();
                ER.utils.openWhatsApp(
                    "Hola Eventos Ruiz, quisiera consultar disponibilidad y precios para decorar un evento.",
                );
            }
        });
    }

    ER.shell = { init: renderShell };
})(window);
