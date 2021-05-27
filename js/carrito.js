const header=document.getElementById('head');
const usuario=document.getElementById('usuario');

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

// Saca un h1 con el nombre del usuario que esta activo
function change() {
  usuario.textContent="Carrito de: "+getCookie("usuario");
}

change()