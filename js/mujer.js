const caja=document.getElementById("cajilla");
const formulario_precio=document.querySelector('.formulario_precio');
const nombreProducto=document.getElementById('nombreProducto');

const euro=document.querySelector('.form-control');
let prod = {
    id_producto: 0,
    nombre_producto: "",
    color: "",
    marca: "",
    imagen: "",
    precio: 0,
    categoria: {
        id_categoria: 0,
        nombre_categoria: ""
    }
};

fetch('http://localhost:8080/sudaderas-tomcat/producto/2')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const fragment=document.createDocumentFragment()
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].categoria.id_categoria)
            const div=document.createElement('div')
            const cabezera = document.createElement('h5')
            const cuerpo =document.createElement('p')
            const img=document.createElement('img'); img.width=200;img.height=200;
            const precio=document.createElement('p')
            const añadir =document.createElement('button')
            const borrar=document.createElement('button')
            const editar=document.createElement('a')
            cabezera.textContent = `${data[i].nombre_producto}`
            img.src= `${data[i].imagen}`
            precio.textContent=`${data[i].precio}€`
            cuerpo.textContent=`${data[i].marca} - ${data[i].color}`
            añadir.id=`${data[i].id_producto}`;añadir.className="btn btn-primary";
            añadir.textContent="Añadir"
            borrar.id=`${data[i].id_producto}`;borrar.className="btn btn-danger";borrar.style.margin="5px"
            borrar.textContent="Borrar"
            editar.id=`${data[i].id_producto}`;editar.className="btn btn-success";editar.href="#INICIO"
            editar.textContent="Editar"
            borrar.addEventListener('click', ()=>{
                // Este fecth borra el producto por esa id al hacer click
                fetch('http://localhost:8080/sudaderas-tomcat/producto/borrar/'+borrar.id)
                .then(res => res.json())
                .then(data => {
                    location.reload();
                    
                })    
                .catch(err=> console.log(`error: ${err.status}`))
            })
            editar.addEventListener('click', ()=>{
                // Este fecth coge el producto por esa id al hacer click
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
                    console.log(prod);
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
                        console.log(prod)
                            // Este fetch edita el precio cuando lo cambiamos
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
                            });
                    })
                })    
                .catch(err=> console.log(`error: ${err.status}`))
            })
            if(getCookie("rol")!=1){
                añadir.style.display="none";
            }
            if(getCookie("rol")!=2){
                borrar.style.display="none";
                editar.style.display="none"
            }
            div.className="sudaderasHombre"
            div.id=`ficha ${data[i].id_producto}`
            div.appendChild(cabezera)
            div.appendChild(cuerpo)
            div.appendChild(img)
            div.appendChild(precio)
            div.appendChild(añadir)
            div.appendChild(borrar)
            div.appendChild(editar)
            fragment.appendChild(div)
        }
        caja.appendChild(fragment)
    })
    .catch(err=> console.log(`error: ${err.status}`))