(function (root) {
    "use strict";

    var ER = (root.ER = root.ER || {});

    ER.DATA = {
        brand: {
            name: "Eventos Ruiz",
            slogan: "Calidad y presencia",
            city: "23 de Marzo · La Paz, Bolivia",
            phone: "67044713",
            phoneHref: "+59167044713",
            whatsapp: "59167044713",
            logo: "assets/IMG/Logo.jpg",
        },

        nav: [
            { id: "inicio", label: "Inicio", href: "index.html", num: "01" },
            {
                id: "eventos",
                label: "Eventos y Galería",
                href: "eventos.html",
                num: "02",
            },
            {
                id: "cotizador",
                label: "Paquetes y Cotizador",
                href: "cotizador.html",
                num: "03",
            },
            {
                id: "reservas",
                label: "Reservas",
                href: "reservas.html",
                num: "04",
            },
            {
                id: "contacto",
                label: "Ubicación y Contacto",
                href: "contacto.html",
                num: "05",
            },
        ],

        location: {
            name: "Eventos Ruiz",
            zone: "Zona 23 de Marzo",
            address: "Zona 23 de Marzo, La Paz, Bolivia",
            query: "23 de Marzo, La Paz, Bolivia",
            customLink: "",
            hours: "Lunes a Sábado · 09:00 a 19:30",
            coverage:
                "Zona 23 de Marzo, La Paz, Zona Sur, Sopocachi, Miraflores y El Alto",
        },

        categories: [
            { id: "todo", label: "Todos", color: "#0f121a" },
            { id: "bodas", label: "Bodas", color: "#d99b26" },
            { id: "xv", label: "15 Años", color: "#d99b26" },
            {
                id: "bautizos",
                label: "Bautizos y Baby Shower",
                color: "#d99b26",
            },
            {
                id: "licenciamientos",
                label: "Licenciamientos",
                color: "#d99b26",
            },
            {
                id: "celebraciones",
                label: "Cumpleaños y Galas",
                color: "#d99b26",
            },
        ],

        eventTypes: [
            {
                id: "Boda",
                label: "Bodas",
                category: "bodas",
                categoryLabel: "Bodas",
                color: "#d99b26",
                base: 2500,
                perGuest: 22,
                icon: "rings",
                heroImage: "assets/IMG/6.jpeg",
                tagline:
                    "Telas en techo, follaje natural y luz cálida en todo el salón",
                description:
                    "Vestimos tanto la ceremonia como el salón de recepción: mesa de novios, telas en el techo, flores y luces.",
                includes: [
                    "Mesa principal de novios y fondo decorado",
                    "Telas colgadas en techo con luces cálidas",
                    "Centros de mesa con flores y velas",
                    "Armado previo y recojo al terminar el evento",
                ],
            },
            {
                id: "15 años",
                label: "15 Años",
                category: "xv",
                categoryLabel: "15 Años",
                color: "#d99b26",
                base: 1600,
                perGuest: 16,
                icon: "crown",
                heroImage: "assets/IMG/10.jpeg",
                tagline:
                    "Pista blanca, cielo de telas y mesa principal a gusto de la quinceañera",
                description:
                    "Armamos todo según los colores que elija la quinceañera: entrada para fotos, mesa de torta y decoración completa del salón.",
                includes: [
                    "Entrada y fondo para fotos",
                    "Mesa de torta con panel de lentejuelas o flores",
                    "Telas de color en techo e iluminación del salón",
                    "Decoración de mesa dulce y pista",
                ],
            },
            {
                id: "Licenciamiento",
                label: "Licenciamientos",
                category: "licenciamientos",
                categoryLabel: "Licenciamientos",
                color: "#c8963e",
                base: 1200,
                perGuest: 13,
                icon: "medal",
                heroImage: "assets/IMG/8.jpeg",
                tagline:
                    "Salones bien vestidos y sobrios para celebrar este gran logro en familia",
                description:
                    "Decoración sobria y ordenada para licenciamientos y graduaciones, con fondos personalizados y buena iluminación.",
                includes: [
                    "Fondo personalizado con nombre o temática del licenciamiento",
                    "Telas en tonos sobrios con guirnaldas de luz",
                    "Mesa principal y espacio para brindis",
                    "Mantelería, sillas vestidas y centros de mesa",
                ],
            },
            {
                id: "Bautizo",
                label: "Bautizos",
                category: "bautizos",
                categoryLabel: "Bautizos",
                color: "#c49442",
                base: 650,
                perGuest: 10,
                icon: "leaf",
                heroImage: "assets/IMG/5.jpg",
                tagline:
                    "Tonos claros, flores suaves y mesas listas para compartir en familia",
                description:
                    "Montajes limpios y claros para reuniones de día, tanto en salón, jardín o en casa.",
                includes: [
                    "Mesa principal en tonos blanco, crema o celeste",
                    "Arreglos florales delicados y prolijos",
                    "Rincón para torta, recuerdos y fotos",
                    "Instalación puntual y recojo al finalizar",
                ],
            },
            {
                id: "Baby shower",
                label: "Baby Shower",
                category: "bautizos",
                categoryLabel: "Baby Shower",
                color: "#d49c3d",
                base: 600,
                perGuest: 9,
                icon: "cloud",
                heroImage: "assets/IMG/4.jpg",
                tagline:
                    "Cortina con luces, arco de globos y mesa dulce para recibir al bebé",
                description:
                    "Decoración en celeste, rosa o tonos neutros con globos, cortinas iluminadas y mesas para bocaditos.",
                includes: [
                    "Cortina iluminada con letrero de Baby Shower",
                    "Arco de globos en los colores elegidos",
                    "Mesa de dulces y bases para postres",
                    "Montaje tanto en casa como en salón",
                ],
            },
            {
                id: "Cumpleaños",
                label: "Cumpleaños",
                category: "celebraciones",
                categoryLabel: "Cumpleaños",
                color: "#cf9334",
                base: 700,
                perGuest: 11,
                icon: "sparkle",
                heroImage: "assets/IMG/1.jpg",
                tagline:
                    "Panel personalizado, arco de globos y bases para la torta",
                description:
                    "Desde cumpleaños pequeños en casa hasta eventos grandes en salón, adaptado a la edad y los colores que pidas.",
                includes: [
                    "Panel personalizado con nombre o frase",
                    "Arco de globos combinado con hojas o flores",
                    "Pedestales y mesas para torta y bocaditos",
                    "Colores y temática a pedido",
                ],
            },
            {
                id: "Evento corporativo",
                label: "Corporativos y Galas",
                category: "celebraciones",
                categoryLabel: "Corporativos",
                color: "#c28c32",
                base: 1900,
                perGuest: 15,
                icon: "grid",
                heroImage: "assets/IMG/2.jpg",
                tagline:
                    "Aniversarios, cenas de fin de año y eventos institucionales",
                description:
                    "Preparamos salones completos para cenas, aniversarios o lanzamientos con horarios puntuales de armado y retiro.",
                includes: [
                    "Iluminación de salón y cortinajes",
                    "Sector lounge y mesas vestidas",
                    "Centros de mesa y fondo de escenario",
                    "Puntualidad en el armado y retiro",
                ],
            },
        ],

        gallery: [
            {
                id: "boda-botanica",
                title: "Boda con telas champagne y follaje",
                category: "bodas",
                categoryLabel: "Bodas",
                eventType: "Boda",
                src: "assets/IMG/6.jpeg",
                desc: "Telas champagne colgadas del techo con enredaderas verdes, sillas doradas y centros florales altos.",
            },
            {
                id: "salon-gala",
                title: "Salón de gala nocturno",
                category: "celebraciones",
                categoryLabel: "Galas y Corporativos",
                eventType: "Evento corporativo",
                src: "assets/IMG/2.jpg",
                desc: "Cortinas blancas, araña de cristal central, luces en columnas y sector lounge al fondo.",
            },
            {
                id: "quince-pista",
                title: "Salón y pista de 15 años",
                category: "xv",
                categoryLabel: "15 Años",
                eventType: "15 años",
                src: "assets/IMG/10.jpeg",
                desc: "Techo cubierto con telas lila y blanco, araña central y pista blanca armada al aire libre.",
            },
            {
                id: "cielo-licenciamiento",
                title: "Telas azul noche con luces",
                category: "licenciamientos",
                categoryLabel: "Licenciamientos",
                eventType: "Licenciamiento",
                src: "assets/IMG/8.jpeg",
                desc: "Telas azul marino combinadas con guirnaldas de luz cálida, muy pedidas para licenciamientos y cenas.",
            },
            {
                id: "cumple-rosa-oro",
                title: "Cumpleaños en rosa, crema y dorado",
                category: "celebraciones",
                categoryLabel: "Cumpleaños",
                eventType: "Cumpleaños",
                src: "assets/IMG/1.jpg",
                desc: "Panel beige con letras doradas, arco de globos en crema y fucsia y pedestal metálico para la torta.",
            },
            {
                id: "recepcion-candelabros",
                title: "Salón con candelabros y luces",
                category: "bodas",
                categoryLabel: "Bodas",
                eventType: "Boda",
                src: "assets/IMG/7.jpeg",
                desc: "Tres candelabros colgados entre telas marfil, follaje verde y guirnaldas de focos cálidos.",
            },
            {
                id: "boda-jardin",
                title: "Recepción de día bajo carpa",
                category: "bautizos",
                categoryLabel: "Bautizos y Jardín",
                eventType: "Bautizo",
                src: "assets/IMG/5.jpg",
                desc: "Mesas redondas con mantelería blanca, lazos rosa pálido en sillas doradas y arreglos florales bajos.",
            },
            {
                id: "quince-shimmer",
                title: "Mesa principal de 15 años en morado y plata",
                category: "xv",
                categoryLabel: "15 Años",
                eventType: "15 años",
                src: "assets/IMG/3.jpg",
                desc: "Fondo de lentejuelas plateado, globos cromados, base acrílica con nombre y mesas laterales de bocaditos.",
            },
            {
                id: "baby-shower-celeste",
                title: "Baby shower celeste y blanco",
                category: "bautizos",
                categoryLabel: "Baby Shower",
                eventType: "Baby shower",
                src: "assets/IMG/4.jpg",
                desc: "Cortina con luces cálidas, medallón central, arco de globos celestes y mesa armada para dulces.",
            },
            {
                id: "celebracion-velas",
                title: "Salón íntimo con velas y letrero neón",
                category: "licenciamientos",
                categoryLabel: "Licenciamientos y Cenas",
                eventType: "Licenciamiento",
                src: "assets/IMG/9.jpeg",
                desc: "Mesas redondas con velas, aros con follaje en las paredes, telas en techo y letrero luminoso al frente.",
            },
        ],

        comparisons: [
            {
                id: "dia-noche",
                label: "De día vs. de noche",
                leftLabel: "Evento de día",
                rightLabel: "Salón de noche",
                leftImg: "assets/IMG/5.jpg",
                rightImg: "assets/IMG/2.jpg",
                note: "Mueve el control para ver la diferencia entre un evento luminoso de día y un salón iluminado de noche.",
            },
            {
                id: "botanico-cristal",
                label: "Follaje vs. candelabros",
                leftLabel: "Telas y follaje",
                rightLabel: "Candelabros y luces",
                leftImg: "assets/IMG/6.jpeg",
                rightImg: "assets/IMG/7.jpeg",
                note: "Dos estilos muy pedidos para bodas: telas champagne con verde colgante o candelabros con guirnaldas.",
            },
            {
                id: "xv-glam",
                label: "Mesa principal vs. salón",
                leftLabel: "Mesa de torta XV",
                rightLabel: "Techo y pista XV",
                leftImg: "assets/IMG/3.jpg",
                rightImg: "assets/IMG/10.jpeg",
                note: "Desde el armado de la mesa principal de torta hasta la decoración completa del techo y la pista.",
            },
        ],

        moods: [
            {
                id: "botanico",
                title: "Champagne y follaje verde",
                subtitle: "Bodas · Recepciones",
                eventType: "Boda",
                color: "#d9a85b",
                image: "assets/IMG/6.jpeg",
                swatches: ["#d9a85b", "#f3e5cc", "#355e3b"],
            },
            {
                id: "noche-gala",
                title: "Lila, cristal y pista blanca",
                subtitle: "15 Años · Galas",
                eventType: "15 años",
                color: "#9b6bd6",
                image: "assets/IMG/10.jpeg",
                swatches: ["#9b6bd6", "#efe9fa", "#1c2033"],
            },
            {
                id: "moderno",
                title: "Rosa, crema y dorado",
                subtitle: "Cumpleaños · Baby Shower",
                eventType: "Cumpleaños",
                color: "#e14d7c",
                image: "assets/IMG/1.jpg",
                swatches: ["#e14d7c", "#f4dfc2", "#d99b26"],
            },
            {
                id: "azul-noche",
                title: "Azul noche y luces cálidas",
                subtitle: "Licenciamientos · Cenas",
                eventType: "Licenciamiento",
                color: "#2563eb",
                image: "assets/IMG/8.jpeg",
                swatches: ["#1e3a5f", "#f2bc4c", "#e2e8f0"],
            },
            {
                id: "sobrio",
                title: "Marfil, velas y verde",
                subtitle: "Bautizos · Cenas íntimas",
                eventType: "Bautizo",
                color: "#4a7c59",
                image: "assets/IMG/9.jpeg",
                swatches: ["#f5e8cc", "#4a7c59", "#2a2826"],
            },
        ],

        packages: [
            {
                name: "Esencial",
                level: "Nivel 01",
                multiplier: 1,
                fromPrice: 1100,
                summary:
                    "Para reuniones en casa o salones pequeños donde quieres que la mesa principal destaque.",
                features: [
                    "Decoración de la mesa principal",
                    "Colores según tu elección",
                    "Detalles decorativos y bases",
                    "Llevamos, armamos y recogemos todo",
                ],
                featured: false,
            },
            {
                name: "Premium",
                level: "Nivel 02",
                multiplier: 1.6,
                fromPrice: 2200,
                summary:
                    "El que más nos piden: buena vista para las fotos, iluminación cálida y mesa dulce armada.",
                features: [
                    "Todo lo del paquete Esencial",
                    "Fondo o panel principal personalizado",
                    "Luces decorativas cálidas",
                    "Mesa de dulces y bocaditos",
                    "Coordinación previa de colores",
                ],
                featured: true,
            },
            {
                name: "Gala Total",
                level: "Nivel 03",
                multiplier: 2.4,
                fromPrice: 3900,
                summary:
                    "Para bodas, 15 años o salones grandes donde vestimos techo, entrada y todas las mesas.",
                features: [
                    "Todo lo del paquete Premium",
                    "Arreglos florales y follaje en cantidad",
                    "Telas en techo y entrada decorada",
                    "Iluminación completa del salón",
                    "Revisión en el lugar el día del evento",
                ],
                featured: false,
            },
        ],

        extras: [
            { name: "Arco de globos", price: 350 },
            { name: "Mesa de dulces", price: 450 },
            { name: "Iluminación extra", price: 600 },
            { name: "Fondo floral o lentejuelas", price: 800 },
            { name: "Mantelería y sillas", price: 500 },
            { name: "Letras o letrero luminoso", price: 400 },
        ],

        faqs: [
            {
                q: "¿Dónde están ubicados y hasta dónde van?",
                a: "Estamos en la Zona 23 de Marzo, La Paz. Llevamos e instalamos decoración en toda la ciudad de La Paz, Zona Sur, Sopocachi, Miraflores y El Alto.",
            },
            {
                q: "¿Qué tipos de eventos decoran?",
                a: "Decoramos bodas, 15 años, bautizos, licenciamientos, baby showers, cumpleaños y eventos para empresas o instituciones.",
            },
            {
                q: "¿Con cuánto tiempo antes debo reservar la fecha?",
                a: "Lo mejor es avisarnos con 3 a 6 semanas de anticipación, sobre todo si tu evento cae sábado. Si falta poco, escríbenos igual al 67044713 para revisar agenda.",
            },
            {
                q: "¿Ustedes llevan todo y luego lo recogen?",
                a: "Sí. Nosotros trasladamos el material, dejamos todo armado antes de que lleguen tus invitados y pasamos a recogerlo cuando termina el evento.",
            },
            {
                q: "¿Se pueden cambiar los colores o pedir una temática propia?",
                a: "Sí, cada montaje se adapta a los colores, el tamaño del salón y el presupuesto que tengas.",
            },
        ],
    };
})(window);
