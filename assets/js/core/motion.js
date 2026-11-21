(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});
    var revealObserver = null;

    function reducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initReveals() {
        var nodes = ER.utils.qsa("[data-reveal]");
        if (!nodes.length) return;

        if (!("IntersectionObserver" in window) || reducedMotion()) {
            nodes.forEach(function (n) {
                n.classList.add("is-in");
            });
            return;
        }

        revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-in");
                    } else if (
                        entry.boundingClientRect.top > window.innerHeight ||
                        entry.boundingClientRect.bottom < 0
                    ) {
                        entry.target.classList.remove("is-in");
                    }
                });
            },
            { threshold: 0.06, rootMargin: "40px 0px -24px 0px" },
        );

        nodes.forEach(function (n) {
            revealObserver.observe(n);
        });
    }

    function observeNew(container) {
        var nodes = ER.utils.qsa("[data-reveal]", container);
        if (!nodes.length) return;
        if (!revealObserver) {
            nodes.forEach(function (n) {
                n.classList.add("is-in");
            });
            return;
        }
        nodes.forEach(function (n) {
            revealObserver.observe(n);
        });
    }

    function initCounters() {
        var counters = ER.utils.qsa("[data-counter]");
        if (!counters.length) return;

        function runCounter(el) {
            var target = Number(el.dataset.counter || 0);
            var prefix = el.dataset.prefix || "";
            var suffix = el.dataset.suffix || "";
            ER.utils.animateNumber(el, 0, target, 1200, function (val) {
                return prefix + Math.round(val) + suffix;
            });
        }

        if (!("IntersectionObserver" in window)) {
            counters.forEach(runCounter);
            return;
        }

        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        runCounter(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 },
        );

        counters.forEach(function (c) {
            io.observe(c);
        });
    }

    function initSpotlightAndTilt() {
        if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        document.addEventListener(
            "pointermove",
            function (e) {
                var spot = e.target.closest("[data-spotlight]");
                if (spot) {
                    var r = spot.getBoundingClientRect();
                    spot.style.setProperty("--sx", e.clientX - r.left + "px");
                    spot.style.setProperty("--sy", e.clientY - r.top + "px");
                }

                var tilt = e.target.closest("[data-tilt]");
                if (tilt) {
                    var rect = tilt.getBoundingClientRect();
                    var px = (e.clientX - rect.left) / rect.width - 0.5;
                    var py = (e.clientY - rect.top) / rect.height - 0.5;
                    var strength = Number(tilt.dataset.tilt || 8);
                    tilt.style.transform =
                        "perspective(900px) rotateX(" +
                        (-py * strength).toFixed(2) +
                        "deg) rotateY(" +
                        (px * strength).toFixed(2) +
                        "deg) translateY(-4px)";
                }
            },
            { passive: true },
        );

        document.addEventListener(
            "pointerout",
            function (e) {
                var tilt = e.target.closest("[data-tilt]");
                if (tilt && !tilt.contains(e.relatedTarget)) {
                    tilt.style.transform = "";
                }
            },
            { passive: true },
        );
    }

    function initMagnetic() {
        if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }
        ER.utils.qsa("[data-magnetic]").forEach(function (el) {
            el.addEventListener("pointermove", function (e) {
                var r = el.getBoundingClientRect();
                var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
                var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
                el.style.transform =
                    "translate(" +
                    dx.toFixed(1) +
                    "px, " +
                    dy.toFixed(1) +
                    "px)";
            });
            el.addEventListener("pointerleave", function () {
                el.style.transform = "";
            });
        });
    }

    function initCursorLens() {
        if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }
        var lens = ER.utils.qs("#cursorLens");
        var label = ER.utils.qs("#cursorLabel");
        if (!lens || !label) return;

        var mx = -100;
        var my = -100;
        var cx = -100;
        var cy = -100;
        var visible = false;

        document.addEventListener(
            "pointermove",
            function (e) {
                mx = e.clientX;
                my = e.clientY;
                if (!visible) {
                    visible = true;
                    lens.classList.add("is-ready");
                }
                var target = e.target.closest("[data-cursor]");
                if (target) {
                    label.textContent = target.dataset.cursor;
                    lens.classList.add("is-expanded");
                } else {
                    label.textContent = "";
                    lens.classList.remove("is-expanded");
                }
            },
            { passive: true },
        );

        document.addEventListener("pointerleave", function () {
            lens.classList.remove("is-ready", "is-expanded");
            visible = false;
        });

        function loop() {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            lens.style.transform =
                "translate3d(" +
                cx.toFixed(1) +
                "px, " +
                cy.toFixed(1) +
                "px, 0)";
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    function initBokehCanvas() {
        var canvas = ER.utils.qs("#heroBokeh");
        if (!canvas || reducedMotion()) return;
        var ctx = canvas.getContext("2d");
        if (!ctx) return;

        var w = 0;
        var h = 0;
        var mouse = { x: 0.5, y: 0.5 };
        var particles = [];
        var palette = [
            "242, 188, 76",
            "217, 155, 38",
            "168, 85, 247",
            "124, 58, 237",
            "255, 255, 255",
        ];

        function resize() {
            var parent = canvas.parentElement;
            w = canvas.width = parent.offsetWidth;
            h = canvas.height = parent.offsetHeight;
        }

        function seed() {
            particles = [];
            var count = Math.min(38, Math.max(18, Math.floor(w / 38)));
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: 1.5 + Math.random() * 4.2,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: -0.15 - Math.random() * 0.35,
                    alpha: 0.18 + Math.random() * 0.55,
                    phase: Math.random() * Math.PI * 2,
                    color: palette[i % palette.length],
                });
            }
        }

        resize();
        seed();
        window.addEventListener("resize", function () {
            resize();
            seed();
        });

        canvas.parentElement.addEventListener(
            "pointermove",
            function (e) {
                var r = canvas.getBoundingClientRect();
                mouse.x = (e.clientX - r.left) / Math.max(1, r.width);
                mouse.y = (e.clientY - r.top) / Math.max(1, r.height);
            },
            { passive: true },
        );

        function draw(t) {
            if (!document.hidden) {
                ctx.clearRect(0, 0, w, h);
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.x += p.vx + (mouse.x - 0.5) * 0.35;
                    p.y += p.vy;
                    if (p.y < -12) p.y = h + 12;
                    if (p.x < -12) p.x = w + 12;
                    if (p.x > w + 12) p.x = -12;

                    var twinkle =
                        p.alpha * (0.65 + 0.35 * Math.sin(t * 0.002 + p.phase));
                    var grad = ctx.createRadialGradient(
                        p.x,
                        p.y,
                        0,
                        p.x,
                        p.y,
                        p.r * 3.4,
                    );
                    grad.addColorStop(
                        0,
                        "rgba(" + p.color + ", " + twinkle.toFixed(2) + ")",
                    );
                    grad.addColorStop(1, "rgba(" + p.color + ", 0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }

    function initScrollChrome() {
        var nav = ER.utils.qs("#appHeader");
        var bar = ER.utils.qs("#scrollBar");
        var fabTop = ER.utils.qs("#fabTop");
        var parallaxNodes = ER.utils.qsa("[data-parallax]");
        var ticking = false;

        function update() {
            var y = window.scrollY || window.pageYOffset;
            var max =
                document.documentElement.scrollHeight - window.innerHeight;
            var pct = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

            if (bar) bar.style.transform = "scaleX(" + pct + ")";
            if (nav) nav.classList.toggle("is-scrolled", y > 18);
            if (fabTop) fabTop.classList.toggle("is-visible", y > 360);

            if (!reducedMotion() && parallaxNodes.length) {
                parallaxNodes.forEach(function (el) {
                    var speed = Number(el.dataset.parallax || 0.12);
                    var offset = Math.max(-45, Math.min(45, y * speed));
                    el.style.setProperty("--py", offset.toFixed(1) + "px");
                });
            }

            ticking = false;
        }

        window.addEventListener(
            "scroll",
            function () {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(update);
                }
            },
            { passive: true },
        );

        update();
    }

    ER.motion = {
        init: function () {
            initReveals();
            initCounters();
            initSpotlightAndTilt();
            initMagnetic();
            initBokehCanvas();
            initScrollChrome();
        },
        observeNew: observeNew,
    };
})(window);
