const header=document.querySelector('.header');
const nav=document.createElement('nav');
nav.className="menu";
const ul=document.createElement('ul');
ul.className="menu__list";
const fragment=document.createDocumentFragment();

const bot=document.createElement('div');
bot.id="oscuro";
bot.className="";
bot.innerHTML='<i class="bi bi-toggle-on"></i>';
nav.appendChild(bot);

const li0=document.createElement('li');
li0.className="menu__item";
const a0=document.createElement('a');
const img0=document.createElement('img');
a0.href="index.html";
img0.src="css/img/Prior.PNG";img0.style.height="27px";img0.style.border="1px solid";
a0.appendChild(img0);
li0.appendChild(a0);
fragment.appendChild(li0);

const li1=document.createElement('li');
li1.className="menu__item";
const a1=document.createElement('a');
a1.href="productosHombre.html";
a1.textContent="Hombre";
li1.appendChild(a1);
fragment.appendChild(li1);

const li2=document.createElement('li');
li2.className="menu__item";
const a2=document.createElement('a');
a2.href="productosMujer.html";
a2.textContent="Mujer";
li2.appendChild(a2);
fragment.appendChild(li2);

const li3=document.createElement('li');
li3.className="menu__item";
const a3=document.createElement('a');
a3.href="contacto.html";
a3.textContent="Contacto";
li3.appendChild(a3);
fragment.appendChild(li3);

const li4=document.createElement('li');
li4.className="menu__item";
const a4=document.createElement('a');
a4.href="info.html";
a4.textContent="Info";
li4.appendChild(a4);
fragment.appendChild(li4);

const li5=document.createElement('li');
li5.id="sesion";
fragment.appendChild(li5);

const li6=document.createElement('li');
const button6=document.createElement('button');
button6.className="inicio";
const a6=document.createElement('a');
a6.href="formulario.html?#";
a6.textContent="Iniciar Sesion";
button6.appendChild(a6);
li6.appendChild(button6);
fragment.appendChild(button6);

const li7=document.createElement('li');
const button7=document.createElement('button');
button7.className="cierre";
const a7=document.createElement('a');
a7.href="index.html";
a7.textContent="Cerrar Sesion";
button7.appendChild(a7);
li7.appendChild(button7);
fragment.appendChild(button7);

const li8=document.createElement('div');
const a8=document.createElement('a');
a8.innerHTML='<i class="bi bi-bag"></i>';
li8.className="carrito";
li8.id="carrito";
a8.href="carrito.html";
li8.appendChild(a8);
fragment.appendChild(li8);

const hamb=document.createElement('label');
hamb.innerHTML="<span>&#9776;</span>";
hamb.className="hamburguesa";
fragment.appendChild(hamb);

ul.appendChild(fragment);
nav.appendChild(ul);
header.appendChild(nav);

const hamburguesa=document.querySelector('.hamburguesa');
const menu=document.querySelector('.menu');
const main=document.querySelector('.main');

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

hamburguesa.addEventListener('click', ()=>{
    if(window.innerWidth<767){
        if( menu.style.height==="75px"){
            header.style.height="100%";
            menu.style.height="100%";
            main.style.marginTop="0px";
            li0.style.visibility="visible"
            li1.style.visibility="visible";
            li2.style.visibility="visible";
            li3.style.visibility="visible";
            li4.style.visibility="visible";
        }
        else{
            header.style.height="75px";
            menu.style.height="75px";
            main.style.marginTop="-250px";
            li0.style.visibility="hidden"
            li1.style.visibility="hidden";
            li2.style.visibility="hidden";
            li3.style.visibility="hidden";
            li4.style.visibility="hidden";   
        }
    }
})

window.addEventListener("resize",() => {
    if (this.window.innerWidth>767) {
        main.style.marginTop="0px";
        li0.style.visibility="visible";
        li1.style.visibility="visible";
        li2.style.visibility="visible";
        li3.style.visibility="visible";
        li4.style.visibility="visible";
    }   
    else{
        header.style.height="75px";
        main.style.marginTop="-250px";
        li0.style.visibility="hidden"
        li1.style.visibility="hidden";
        li2.style.visibility="hidden";
        li3.style.visibility="hidden";
        li4.style.visibility="hidden";
    }
})  

function InicioSesion() {
    if(getCookie("usuario")==""){
        button7.style.display="none";
        button6.style.display="block";
        a8.style.display="none";
    }
    else if(getCookie("usuario")=="root"){
        button7.style.display="block";
        button6.style.display="none";
        a8.style.display="none";
    }
    else{
        button7.style.display="block";
        button6.style.display="none";
        a8.style.display="block";
    }
}
InicioSesion()

button7.addEventListener('click', ()=>{
    deleteCookie('usuario');
    deleteCookie('contraseña');
    deleteCookie('rol');
})