const nombre_usuario=document.getElementById('first-name');
const password=document.getElementById('password');
const enviando=document.getElementById('enviando');
// const sesion=document.getElementById('sesion');
// console.log(sesion)

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}

function login() {
    fetch('http://localhost:8080/usuarios-tomcat/usuario')
    .then(res => res.json())
    .then(data => {
        let valor=0;
        let rol
        console.log(data)
        
        for (let i = 0; i < data.length; i++) {
            if(nombre_usuario.value===data[i].nombre_usuario){
                valor=1;
                if(password.value===data[i].password){
                    valor=2;
                    rol=data[i].rol;
                }
            }
        }
        if(valor==2){
            console.log("inicio sesion")
            window.location="/index.html";
            
            setCookie("usuario", nombre_usuario.value, 5)
            setCookie("contraseña", password.value, 5)
            setCookie("rol", rol, 5)
        }
        else if(valor==1){
            alert("contraseña incorrecta")
        }
        else{
            alert("nombre de usuario incorrecto")
        }
    })
    .catch(err=> console.log(`error: ${err.status}`))
}