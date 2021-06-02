const baseDeDatos=[];
const filtro=[];
let carrito = [];
let total = 0;
let hombre=0;
let len=0;
const sexo=document.getElementById('hombre');
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.getElementById('boton-vaciar');
const ir=document.getElementById('ir');
const miLocalStorage = window.localStorage;
const formulario_precio=document.querySelector('.formulario_precio');
const nombreProducto=document.getElementById('nombreProducto');
const euro=document.getElementById('precioInput');
const fragmen=document.createDocumentFragment();
const continuar=document.getElementById('boton-continuar');
const nombre=document.getElementById('nombre');
const buscador=document.querySelector('.buscador');
const store=window.localStorage;
let vacio=[];
let usu=getCookie('usuario');

if (sexo.value==0) {
    hombre=0;
}
else{
    hombre=1;
}

function filtrando() {
    for (let i = 0; i < filtro.length; i++) {
        var name=nombre.value.toUpperCase();
        console.log(name)
        if(filtro[i].nombre_producto.includes(name)){
            baseDeDatos.push(filtro[i])
        }
    } 
    console.log(baseDeDatos)
}

function getCookie(cname) {
    let decodedCookie = decodeURIComponent(document.cookie);
    // En decodedCookie tengo las cookies en formato cadena
    // console.log(decodedCookie);
    //En ca tengo todas las cookies como array
    let ca = decodedCookie.split(';');
    // console.log(ca);
    // recorro el array
    for(let i = 0; i <ca.length; i++) {
        // quito espacios por si los hubiera
        let c = ca[i].trim();
        // busco el igual, antes de él tengo el nombre y después su valor
        let igual=c.search("=")
        // Extraigo el nombre (desde el principio al igual)
        let nombre=c.substring(0, igual)
        // console.log(nombre)
        // Si es la cookie que busco
        if (nombre==cname){
        // extraigo el valor (del igual al final)
        let cookie=c.substring(igual+1,c.length)
        return cookie
        // no busco mas, salgo del for
        break;
        }
    }
    // si no la encuentro devuelvo una cadana vacía
    return "";
}

// Hago un fetch para coger todos los productos
fetch('http://localhost:8080/sudaderas-tomcat/productos')
.then(res => res.json())
.then(data => {

    for (let i = 0; i < data.length; i++) {
            filtro.push(data[i])
    }

    filtrando()

    buscador.addEventListener('click', () =>{
        for (let i = 0; i < filtro.length; i++) {
            baseDeDatos.pop()
        }
        filtrando();
        let nodos=document.querySelectorAll('.miNodo');
        for (element of nodos) {
            element.remove();
        }
        renderizarProductos();
        cargarCarritoDeLocalStorage();
        renderizarCarrito();
        calcularTotal();
    })
        
        function renderizarProductos(){
            for(let i=0; i<data.length; i++){
                
            // Si estoy en la pagina de hombres saca los productos masculinos
            if (hombre==0) {
            if ((baseDeDatos[i].categoria.id_categoria==1)) {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-12');
            miNodo.className="color__claro miNodo";
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('p');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = baseDeDatos[i].nombre_producto;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', baseDeDatos[i].imagen);miNodoImagen.style.width="250px";miNodoImagen.style.height="250px"
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = baseDeDatos[i].precio + '€';
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Añadir';
            miNodoBoton.id=baseDeDatos[i].id_producto;
            miNodoBoton.setAttribute('marcador', baseDeDatos[i].id_producto);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            const borrar = document.createElement('button');
            borrar.id=`${data[i].id_producto}`;borrar.className="btn btn-danger";borrar.style.margin="5px"
            borrar.textContent="Borrar"
            const editar=document.createElement('a');
            editar.id=`${data[i].id_producto}`;editar.className="btn btn-success";editar.href="#INICIO"
            editar.textContent="Editar"

            borrar.addEventListener('click', ()=>{
                // Borra el producto con esa id al hacer click
                fetch('http://localhost:8080/sudaderas-tomcat/producto/borrar/'+borrar.id)
                .then(res => res.json())
                .then(data => {
                    location.reload();
                })    
                .catch(err=> console.log(`error: ${err.status}`))
            })
            editar.addEventListener('click', ()=>{
                // Coge el producto por esa id al hacer click con sus datos
                fetch('http://localhost:8080/sudaderas-tomcat/product/'+editar.id)
                .then(res => res.json())
                .then(data => {
                    prod={
                        id_producto: data.id_producto,
                        nombre_producto: data.nombre_producto,
                        color: data.color,
                        marca: data.marca,
                        imagen: data.imagen,
                        precio: data.precio,
                        categoria:{
                            id_categoria: data.categoria.id_categoria,
                            nombre_categoria: data.categoria.nombre_categoria
                        }
                    }
                    console.log(editar.id)
                    formulario_precio.style.display="block";
                    nombreProducto.textContent=data.nombre_producto;
                    euro.value=data.precio;
                    const cancelar=document.querySelector('.cancelar');
                    const cambiar=document.querySelector('.cambiar');
                    cancelar.addEventListener('click', ()=>{
                        formulario_precio.style.display="none";
                    })
                    cambiar.addEventListener('click', ()=>{
                        formulario_precio.style.display="none";
                        prod={
                            id_producto: data.id_producto,
                            nombre_producto: data.nombre_producto,
                            color: data.color,
                            marca: data.marca,
                            imagen: data.imagen,
                            precio: euro.value,
                            categoria:{
                                id_categoria: data.categoria.id_categoria,
                                nombre_categoria: data.categoria.nombre_categoria
                            }
                        }
                            // Añade el producto que editamos
                            fetch('http://localhost:8080/sudaderas-tomcat/aniadir', {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(prod)
                            })
                            .then(res => res.json())
                            .then(res=> {
                                location.reload();
                            })
                            .catch(err=> console.log(`error: ${err.status}`))
                    })
                })    
                
                .catch(err=> console.log(`error: ${err.status}`))
            })

            if(getCookie("rol")!=1){
                miNodoBoton.style.display="none";
            }
            if(getCookie("rol")!=2){
                borrar.style.display="none";
                editar.style.display="none"
            }
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(borrar);
            miNodoCardBody.appendChild(editar);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
            }
            }

            // Si estoy en la pagina de mujeres saca los productos femeninos
            if (hombre==1) {
                if ((baseDeDatos[i].categoria.id_categoria==2)) {
                // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-sm-12');
                miNodo.className="color__claro miNodo";
                // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');
                // Titulo
                const miNodoTitle = document.createElement('p');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = baseDeDatos[i].nombre_producto;
                // Imagen
                const miNodoImagen = document.createElement('img');
                miNodoImagen.classList.add('img-fluid');
                miNodoImagen.setAttribute('src', baseDeDatos[i].imagen);miNodoImagen.style.width="250px";miNodoImagen.style.height="250px"
                // Precio
                const miNodoPrecio = document.createElement('p');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = baseDeDatos[i].precio + '€';
                // Boton 
                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-primary');
                miNodoBoton.textContent = 'Añadir';
                miNodoBoton.id=baseDeDatos[i].id_producto;
                miNodoBoton.setAttribute('marcador', baseDeDatos[i].id_producto);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                const borrar = document.createElement('button');
                borrar.id=`${data[i].id_producto}`;borrar.className="btn btn-danger";borrar.style.margin="5px"
                borrar.textContent="Borrar"
                const editar=document.createElement('a');
                editar.id=`${data[i].id_producto}`;editar.className="btn btn-success";editar.href="#INICIO"
                editar.textContent="Editar"
    
                borrar.addEventListener('click', ()=>{
                    // Borra el producto con esa id al hacer click
                    fetch('http://localhost:8080/sudaderas-tomcat/producto/borrar/'+borrar.id)
                    .then(res => res.json())
                    .then(data => {
                        location.reload();
                    })    
                    .catch(err=> console.log(`error: ${err.status}`))
                })
                editar.addEventListener('click', ()=>{
                    // Coge el producto por esa id al hacer click con sus datos
                    fetch('http://localhost:8080/sudaderas-tomcat/product/'+editar.id)
                    .then(res => res.json())
                    .then(data => {
                        prod={
                            id_producto: data.id_producto,
                            nombre_producto: data.nombre_producto,
                            color: data.color,
                            marca: data.marca,
                            imagen: data.imagen,
                            precio: data.precio,
                            categoria:{
                                id_categoria: data.categoria.id_categoria,
                                nombre_categoria: data.categoria.nombre_categoria
                            }
                        }
                        console.log(editar.id)
                        formulario_precio.style.display="block";
                        nombreProducto.textContent=data.nombre_producto;
                        euro.value=data.precio;
                        const cancelar=document.querySelector('.cancelar');
                        const cambiar=document.querySelector('.cambiar');
                        cancelar.addEventListener('click', ()=>{
                            formulario_precio.style.display="none";
                        })
                        cambiar.addEventListener('click', ()=>{
                            formulario_precio.style.display="none";
                            prod={
                                id_producto: data.id_producto,
                                nombre_producto: data.nombre_producto,
                                color: data.color,
                                marca: data.marca,
                                imagen: data.imagen,
                                precio: euro.value,
                                categoria:{
                                    id_categoria: data.categoria.id_categoria,
                                    nombre_categoria: data.categoria.nombre_categoria
                                }
                            }
                                // Añade el producto que editamos
                                fetch('http://localhost:8080/sudaderas-tomcat/aniadir', {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(prod)
                                })
                                .then(res => res.json())
                                .then(res=> {
                                    location.reload();
                                })
                                .catch(err=> console.log(`error: ${err.status}`))
                        })
                    })    
                    
                    .catch(err=> console.log(`error: ${err.status}`))
                })
    
                if(getCookie("rol")!=1){
                    miNodoBoton.style.display="none";
                }
                if(getCookie("rol")!=2){
                    borrar.style.display="none";
                    editar.style.display="none"
                }
                // Insertamos
                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodoCardBody.appendChild(borrar);
                miNodoCardBody.appendChild(editar);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
                }
                }
            }
        }  
    renderizarProductos();    
    cargarCarritoDeLocalStorage();
    renderizarCarrito();
    calcularTotal();
})
.catch(err=> console.log(`error: ${err.status}`))

function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {
    console.log(carrito)
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = filtro.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id_producto === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        const miNodoImg = document.createElement('img');
        const miNodoP = document.createElement('p');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodoImg.src=`${miItem[0].imagen}`;
        miNodoP.textContent=`${numeroUnidadesItem} x ${miItem[0].nombre_producto} - ${miItem[0].precio}€`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miNodoImg);
        miNodo.appendChild(miNodoP);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

// Borrar un item del carrito
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    // volvemos a renderizar
    renderizarCarrito();
    // location.reload();
    // Calculamos de nuevo el precio
    calcularTotal();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
    if(store[usu].length===2){
        continuar.style.display="none";
    }
}

// Calcula el precio total teniendo en cuenta los productos repetidos
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id_producto === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

// Varia el carrito y vuelve a dibujarlo
function vaciarCarrito() {
    // Limpiamos los productos guardados
    let vacio=[]
    miLocalStorage.setItem(getCookie('usuario'), JSON.stringify(vacio));
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
    // Borra LocalStorage
}

if(store[usu].length===2){
    continuar.style.display="none";
}

function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem(getCookie('usuario'), JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem(getCookie('usuario')) !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem(getCookie('usuario')));
    }
}

continuar.addEventListener('click', ()=>{
    const alert=document.querySelector('.alert-success');
    const car=document.querySelector('.containerCarrito');
    const tot=document.getElementById('tot');
    tot.textContent="Pedido realizado por valor de: "+total+"€";
    alert.style.display="block";
    car.style.display="none";
    store.setItem(getCookie('usuario'), JSON.stringify(vacio));
})

DOMbotonVaciar.addEventListener('click',()=>{
    vaciarCarrito();
    location.reload();
})