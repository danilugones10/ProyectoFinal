const imagen = document.getElementById('imagen');
const texto = document.getElementById('nombreImagen');
const precio = document.getElementById('precio');

let imagenes = ["css/img/imagenes/1.jpg","css/img/imagenes/2.jpg","css/img/imagenes/3.jpg","css/img/imagenes/4.jpg","css/img/imagenes/5.jpg","css/img/imagenes/6.jpg"]
let textos = ["Versace","Hugo Boss","Tommy Hilfiger","Balenciaga", "Gucci","Stranger Things"]
let precios = ["19.99€","39.95€","30.95€","29.95€", "45.95€","27.95€"]

const flecha1 = document.getElementById('flecha1');
const flecha2 = document.getElementById('flecha2');

let numero = 0;

// CADA 5 SEGUNDOS QUE AVANCE DE IMAGEN
setInterval(function(){ avanzar() }, 5000);

function avanzar() {
    if(numero == 5) {
       numero = 0;
       imagen.src = imagenes[numero];
       texto.textContent = textos[numero];
       precio.textContent=precios[numero]
   }
    else {
       numero ++;
       imagen.src = imagenes[numero];
       texto.textContent = textos[numero];
       precio.textContent=precios[numero]
   }
}

function retroceder() {
    if(numero == 0) {
       numero = 5;
       imagen.src = imagenes[numero];
       texto.textContent = textos[numero]
       precio.textContent=precios[numero]
    }
    else {
       numero--;
       imagen.src = imagenes[numero];
       texto.textContent = textos[numero];
       precio.textContent=precios[numero]
    }
}
flecha1.addEventListener('click', () => {
    retroceder()
})
flecha2.addEventListener('click', () => {
    avanzar()
}) 