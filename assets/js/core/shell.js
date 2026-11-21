/**
 * Eventos Ruiz — Shell Compartido (Navbar, Menú Móvil, Footer, Cursor y Cortina)
 */
(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    function renderShell() {
        var pageId = document.body.dataset.page || "inicio";
        var brand = ER.DATA.brand;
        var loc = ER.DATA.location;
        var navItems = ER.DATA.nav;

        /* 1. Barra de progreso + Cortina de transición + Cursor interactivo */
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<div class="scroll-bar" id="scrollBar" aria-hidden="true"></div>' +
                '<div class="page-curtain" id="pageCurtain" aria-hidden="true">' +
                '<div class="page-curtain__badge"><img src="' +
                brand.logo +
                '" alt="" /></div>' +
                "</div>" +
                '<div class="cursor-lens" id="cursorLens" aria-hidden="true"><span id="cursorLabel"></span></div>'
        );

        /* 2. Header Unificado */
        var headerMount = ER.utils.qs("#appHeader");
        if (headerMount) {
            headerMount.className = "site-nav";
            headerMount.innerHTML =
                '<div class="container nav__inner">' +
                '<a class="nav-brand" href="index.html">' +
                '<span class="nav-brand__badge"><img src="' +
                brand.logo +
                '" alt="Eventos Ruiz" width="44" height="44" /></span>' +
                '<span><span class="nav-brand__title">' +
                brand.name +
                '</span><span class="nav-brand__sub">' +
                loc.zone +
                " · La Paz</span></span>" +
                "</a>" +
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

        /* 3. Drawer Móvil */
        document.body.insertAdjacentHTML(
            "beforeend",
            '<aside class="mobile-menu" id="mobileMenu" hidden aria-label="Menú móvil">' +
                '<div class="mobile-menu__head">' +
                '<a class="nav-brand" href="index.html">' +
                '<span class="nav-brand__badge"><img src="' +
                brand.logo +
                '" alt="Eventos Ruiz" width="44" height="44" /></span>' +
                '<span><span class="nav-brand__title">' +
                brand.name +
                '</span><span class="nav-brand__sub">' +
                brand.city +
                "</span></span>" +
                "</a>" +
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
                '<a class="btn btn--gold btn--full" href="reservas.html">Reservar mi fecha</a>' +
                '<a class="btn btn--ghost-dark btn--full" href="tel:' +
                brand.phoneHref +
                '">Llamar · ' +
                brand.phone +
                "</a>" +
                "</div>" +
                "</aside>"
        );

        /* 4. Footer Unificado */
        var footerMount = ER.utils.qs("#appFooter");
        if (footerMount) {
            footerMount.className = "site-footer";
            footerMount.innerHTML =
                '<div class="container">' +
                '<div class="footer__top">' +
                "<div>" +
                '<a class="nav-brand" href="index.html">' +
                '<span class="nav-brand__badge"><img src="' +
                brand.logo +
                '" alt="Eventos Ruiz" width="44" height="44" /></span>' +
                '<span><span class="nav-brand__title">' +
                brand.name +
                '</span><span class="nav-brand__sub">' +
                brand.slogan +
                "</span></span>" +
                "</a>" +
                '<p class="footer__bio">Decoración integral para bodas, 15 años, bautizos, licenciamientos, baby showers y galas. Encuéntranos en <strong>' +
                loc.address +
                "</strong>.</p>" +
                "</div>" +
                "<div>" +
                '<h3 class="footer__col-title">Pestañas</h3>' +
                '<ul class="footer__list">' +
                navItems
                    .map(function (item) {
                        return (
                            '<li><a href="' +
                            item.href +
                            '">' +
                            item.label +
                            "</a></li>"
                        );
                    })
                    .join("") +
                "</ul>" +
                "</div>" +
                "<div>" +
                '<h3 class="footer__col-title">Especialidades</h3>' +
                '<ul class="footer__list">' +
                '<li><a href="eventos.html?cat=bodas">Bodas</a></li>' +
                '<li><a href="eventos.html?cat=xv">15 Años</a></li>' +
                '<li><a href="eventos.html?cat=licenciamientos">Licenciamientos</a></li>' +
                '<li><a href="eventos.html?cat=bautizos">Bautizos y Baby Shower</a></li>' +
                '<li><a href="eventos.html?cat=celebraciones">Cumpleaños y Galas</a></li>' +
                "</ul>" +
                "</div>" +
                '<div class="footer__cta-box">' +
                "<strong>¿Tienes fecha para tu celebración?</strong>" +
                "<p>Consulta disponibilidad o calcula tu presupuesto estimado ahora mismo.</p>" +
                '<a class="btn btn--gold btn--sm btn--full" href="reservas.html">Apartar fecha</a>' +
                '<a class="btn btn--ghost-dark btn--sm btn--full" href="tel:' +
                brand.phoneHref +
                '">Tel. ' +
                brand.phone +
                "</a>" +
                "</div>" +
                "</div>" +
                '<div class="footer__bottom">' +
                "<span>© " +
                new Date().getFullYear() +
                " " +
                brand.name +
                " · " +
                brand.slogan +
                "</span>" +
                "<span>" +
                loc.address +
                " · WhatsApp " +
                brand.phone +
                "</span>" +
                "</div>" +
                "</div>";
        }

        /* 5. Dock Flotante y Toast */
        document.body.insertAdjacentHTML(
            "beforeend",
            '<div class="fab-dock">' +
                '<button type="button" class="fab-top" id="fabTop" aria-label="Subir al inicio">' +
                ER.utils.ICONS.up +
                "</button>" +
                '<a class="fab-wa" href="#" data-wa-general aria-label="Escribir por WhatsApp">' +
                ER.utils.ICONS.wa +
                "<span>WhatsApp</span></a>" +
                "</div>" +
                '<div class="toast" id="erToast" role="status" aria-live="polite"></div>'
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
                    "Hola Eventos Ruiz (Zona 23 de Marzo), quisiera consultar disponibilidad y recibir información sobre decoración de eventos."
                );
                return;
            }

            var link = e.target.closest("a[href]");
            if (
                !link ||
                link.target === "_blank" ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey
            ) {
                return;
            }
            var href = link.getAttribute("href");
            if (
                href &&
                /^(Index|eventos|cotizador|reservas|contacto)\.html(\?.*)?(#.*)?$/i.test(
                    href
                )
            ) {
                var currentFile = (
                    window.location.pathname.split("/").pop() || "index.html"
                ).toLowerCase();
                if (href.toLowerCase() === currentFile) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    closeMenu();
                    return;
                }
                e.preventDefault();
                ER.utils.goPage(href);
            }
        });

        window.addEventListener("pageshow", function () {
            var curtain = ER.utils.qs("#pageCurtain");
            if (curtain) curtain.classList.remove("is-active");
        });
    }

    ER.shell = { init: renderShell };
})(window);
