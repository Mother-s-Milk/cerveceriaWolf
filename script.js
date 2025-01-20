let menuController = {
    bebidas: [],
    categorias: [],
    bebidasPorPagina: 4,
    paginaActual: 1,
    totalPaginas: 0,
    solicitarBebidas: () => {
        fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            menuController.bebidas = data.bebidas;
            /*menuController.totalPaginas = Math.ceil(menuController.bebidas.length / menuController.bebidasPorPagina);
            menuController.categorias = data.categorias;*/
            menuController.mostrarBebidas(menuController.bebidas); // Mostrar cervezas
            //menuController.mostrarPaginacion(); // Mostrar paginación
        })
        .catch(error => console.error('Error cargando el JSON:', error));
    },
    mostrarBebidas: (cervezasPagina) => {
        let gridMenu = document.getElementById("grid-carta");
        gridMenu.innerHTML = ''; // Limpiar el contenido previo

        if (menuController.bebidas.length === 0) {
            gridMenu.innerHTML = '<p class="text-muted">No se encontraron cervezas registradas</p>';
            return;
        }

        // Calcular el índice de inicio y fin de las cervezas para la página actual
        /*let inicio = (menuController.paginaActual - 1) * menuController.bebidasPorPagina;
        let fin = inicio + menuController.bebidasPorPagina;*/
        
        // Obtener las cervezas de la página actual
        /*let cervezasPagina = menuController.bebidas.slice(inicio, fin);*/
        
        // Iterar sobre las cervezas de la página actual
        cervezasPagina.forEach(cerveza => {
            let tarjetaCerveza = `
                <div class="tarjeta-bebida tarjeta-menu">
                    <img src="${cerveza.imgPath}" alt="${cerveza.nombre}" loading="lazy">
                    <h2>${cerveza.nombre}</h2>
                    <div class="info-bebida">
                        <span>${cerveza.categoria}</span>
                        <span>|</span>
                        <span>${cerveza.alcohol}%</span>
                        <span>|</span>
                        <span>${cerveza.amargor} IBU</span>
                    </div>
                    <footer class="acciones-tarjeta">
                        <button type="button" class="btn-carrito" 
                            data-id="${cerveza.id}" data-nombre="${cerveza.nombre}" 
                            data-precio="${cerveza.precio}" 
                            dataimgPath="${cerveza.imgPath}" 
                            aria-label="Agregar ${cerveza.nombre} al carrito">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button type="button" class="btn-mas-info">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </footer>
                </div>
            `;
            gridMenu.insertAdjacentHTML('beforeend', tarjetaCerveza);
        });
    }/*,
    mostrarPaginacion: () => {
        let paginacion = document.getElementById("paginacion");
        paginacion.innerHTML = ''; // Limpiar la paginación previa

        // Botón de "Anterior"
        let btnAnterior = `
            <button class="paginacion-btn" data-pagina="${menuController.paginaActual - 1}" ${menuController.paginaActual === 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>
        `;
        paginacion.insertAdjacentHTML('beforeend', btnAnterior);

        // Botones de número de página
        for (let i = 1; i <= menuController.totalPaginas; i++) {
            let btnPagina = `<button class="paginacion-btn ${i === menuController.paginaActual ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
            paginacion.insertAdjacentHTML('beforeend', btnPagina);
        }

        // Botón de "Siguiente"
        let btnSiguiente = `
            <button class="paginacion-btn" data-pagina="${menuController.paginaActual + 1}" ${menuController.paginaActual === menuController.totalPaginas ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>
        `;
        paginacion.insertAdjacentHTML('beforeend', btnSiguiente);

        // Añadir evento de click a los botones de paginación
        document.querySelectorAll('.paginacion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                let paginaSeleccionada = parseInt(e.target.dataset.pagina);
                if (paginaSeleccionada !== menuController.paginaActual) {
                    menuController.paginaActual = paginaSeleccionada;
                    menuController.mostrarBebidas(); // Actualizar cervezas
                    menuController.mostrarPaginacion(); // Actualizar paginación
                }
            });
        });
    }*/
}

document.addEventListener("DOMContentLoaded", () => {
    menuController.solicitarBebidas();

    document.getElementById("btn-menu-desplegable").addEventListener("click", () => {
        const navMenu = document.getElementById("nav-menu");
        const iconoMenu = document.getElementById("icono-menu");
    
        navMenu.classList.toggle("active");
    
        //Cambia el ícono de hamburguesa a "X" y viceversa
        if (navMenu.classList.contains("active")) {
            iconoMenu.classList.remove("fa-bars");
            iconoMenu.classList.add("fa-times");
        } else {
            iconoMenu.classList.remove("fa-times");
            iconoMenu.classList.add("fa-bars");
        }
    });
    
    // Cerrar el menú al hacer clic en un enlace
    const enlacesMenu = document.querySelectorAll(".nav-menu ul li a");
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", () => {
            const navMenu = document.getElementById("nav-menu");
            const iconoMenu = document.getElementById("icono-menu");

            // Esconde el menú y vuelve al ícono de hamburguesa
            navMenu.classList.remove("active");
            iconoMenu.classList.remove("fa-times");
            iconoMenu.classList.add("fa-bars");
        });
    });

    window.addEventListener("load", () => {
        const preloader = document.querySelector(".preloader");
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        setTimeout(() => {
            preloader.style.display = "none"; // Remueve el elemento completamente
        }, 500); // Tiempo que coincide con la transición de CSS
    });
    
});