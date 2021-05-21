const foot=document.querySelector('.footer')
const divGrupo=document.createElement('div')
divGrupo.className="grupo"
//Columna1
const divColumn1=document.createElement('div')
divColumn1.className="colum"
const h31=document.createElement('h3')
h31.textContent="Redes Sociales"
const div1_1=document.createElement('div')
const img1_1=document.createElement('img')
img1_1.src="css/img/Instagram.PNG";img1_1.width=15
div1_1.textContent="prior_es";div1_1.appendChild(img1_1)
const div1_2=document.createElement('div')
const img1_2=document.createElement('img')
img1_2.src="css/img/Facebok.PNG";img1_2.width=15
div1_2.textContent="prior";div1_2.appendChild(img1_2)
const div1_3=document.createElement('div')
const img1_3=document.createElement('img')
img1_3.src="css/img/Twiter.PNG";img1_3.width=15
div1_3.textContent="_prior";div1_3.appendChild(img1_3)
divColumn1.appendChild(h31);divColumn1.appendChild(div1_1);divColumn1.appendChild(div1_2);divColumn1.appendChild(div1_3);
//Columna2
const divColumn2=document.createElement('div')
divColumn2.className="colum"
const h32=document.createElement('h3')
h32.textContent="Mas Prior"
const div2_1=document.createElement('div')
div2_1.textContent="App Movil"
const div2_2=document.createElement('div')
div2_2.textContent="Tarjeta Regalo"
const div2_3=document.createElement('div')
div2_3.textContent="Black Friday"
divColumn2.appendChild(h32);divColumn2.appendChild(div2_1);divColumn2.appendChild(div2_2);divColumn2.appendChild(div2_3);
//Columna3
const br=document.createElement('br')

const divColumn3=document.createElement('div')
divColumn3.className="colum"
const h33=document.createElement('h3')
h33.textContent="Compra en"
const div3_1=document.createElement('div')
const img3_1=document.createElement('img')
img3_1.src='css/img/España.PNG';img3_1.width=15
div3_1.textContent="España";div3_1.appendChild(img3_1)
divColumn3.appendChild(h33);divColumn3.appendChild(div3_1)

divGrupo.appendChild(divColumn1);divGrupo.appendChild(divColumn2);divGrupo.appendChild(divColumn3);

const divFin=document.createElement('div')
divFin.className="fin"
const divFinal=document.createElement('div')
divFinal.innerHTML="&copy; 2021 Prior <span>Privacidad|Accesibilidad</span> ";
divFin.appendChild(divFinal)


foot.appendChild(divGrupo);foot.appendChild(br);
foot.appendChild(divFin)