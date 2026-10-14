const D=(m,d)=>new Date(2027,m-1,d);
const C=[
    {id:1,n:"Competencias",c:"#E5A912",r:"-2deg"},
    {id:2,n:"Identidades",c:"#D96B27",r:"1.5deg"},
    {id:3,n:"CR Shorts Lab",c:"#8FB496",r:"-1deg"}
];
const E=[
 {k:1,a:D(1,31),t:"Cierre de inscripción",x:"Último día para inscribir tu corto en FilmFreeway o Festhome (fecha extendida)."},
 {k:2,a:D(2,24),t:"Cierre Identidades",x:"Último día para enviar el formulario de inscripción."},
 {k:2,a:D(2,25),b:D(2,26),t:"Notificación y anuncio",x:"El 25 se notifica a cada representante y el 26 se anuncian públicamente los participantes."},
 {k:1,a:D(2,22),b:D(2,28),t:"Selección oficial",x:"Se anuncia en la última semana de febrero por las plataformas, correo y el sitio web del festival."},
 {k:2,a:D(3,1),b:D(3,30),t:"Realización del corto",x:"Ventana para grabar y producir tu cortometraje de máximo 5 minutos."},
 {k:3,a:D(3,15),t:"Cierre del Lab",x:"Hasta las 23:59, hora de Costa Rica."},
 {k:3,a:D(3,22),t:"Proyectos seleccionados",x:"Se anuncian los 16 proyectos que participarán en el laboratorio."},
 {k:3,a:D(4,12),b:D(4,16),t:"Laboratorio presencial",x:"Cinco días de talleres: guion, storyboard, producción, dirección, sonido, montaje y distribución."},
 {k:1,a:D(4,14),b:D(4,24),t:"Festival Shorts Costa Rica",x:"Funciones en salas de cine y espacios alternativos en las siete provincias del país."},
 {k:2,a:D(4,24),b:D(4,25),t:"Ganadores y estreno online",x:"El 24 se anuncian los ganadores en el festival. Desde el 25 todos los cortos se ven gratis en línea."}
].sort((a,b)=>a.a-b.a);
const $=id=>document.getElementById(id),on=new Set([1,2,3]);
const col=e=>C.find(c=>c.id===e.k);
const mon=d=>d.toLocaleDateString("es-CR",{month:"long"});
const vis=()=>E.filter(e=>on.has(e.k));
let sel=vis().find(e=>e.a>=new Date())||E[0];
const day=e=>e.b?e.a.getDate()+"–"+e.b.getDate():e.a.getDate();
const month=e=>e.b&&e.b.getMonth()!==e.a.getMonth()?mon(e.a)+" y "+mon(e.b):mon(e.a);

function render(){
 $("chips").innerHTML="";
 C.forEach(c=>{const b=document.createElement("button");b.className="chip";b.style.cssText=`--c:${c.c}`;b.textContent=c.n;b.setAttribute("aria-pressed",on.has(c.id));
  b.onclick=()=>{on.has(c.id)?on.delete(c.id):on.add(c.id);if(!on.size)on.add(c.id);if(!on.has(sel.k))sel=vis()[0];render()};$("chips").appendChild(b)});
 const c=col(sel),v=$("viewer");v.style.setProperty("--c",c.c);
 v.innerHTML=`<div class="big num">${day(sel)}<small>${month(sel)} 2027</small></div><div><span class="who">${c.n}</span><h3>${sel.t}</h3><p>${sel.x}</p></div>`;
 const list=vis(),i=list.indexOf(sel);$("prev").disabled=i<1;$("next").disabled=i>=list.length-1;
 $("track").innerHTML="";
 list.forEach((e,j)=>{const k=col(e),b=document.createElement("button");b.className="frame";b.setAttribute("aria-pressed",e===sel);
  b.style.cssText=`--p:${k.c};rotate:${j%2?".8deg":"-.8deg"}`;
  b.innerHTML=`<span class="d">${day(e)}</span><span class="m">${month(e)}</span><span class="t">${e.t}</span><span class="c">${k.n}</span>`;
  b.onclick=()=>{sel=e;render()};$("track").appendChild(b);
 
if (e === sel) {
  requestAnimationFrame(() => {
    const film = document.querySelector(".film");
    const track = $("track");

    if (!film || !track) return;
    const left =
      b.offsetLeft +
      track.offsetLeft -
      (film.clientWidth - b.clientWidth) / 2;

    film.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });
  });
}});
}
const step=n=>{const l=vis(),i=l.indexOf(sel)+n;if(l[i]){sel=l[i];render()}};
$("prev").onclick=()=>step(-1);$("next").onclick=()=>step(1);
render();
document.querySelectorAll("[data-close]").forEach(el=>{
 const [y,m,d]=el.dataset.close.split("-").map(Number),n=Math.ceil((new Date(y,m-1,d)-new Date())/864e5);
 el.innerHTML=n>0?`<span><b>${n}</b>días para<br>cerrar</span>`:`<span>Convocatoria<br>cerrada</span>`;
});

const bg=$("burger"),mn=$("menu");
const toggle=o=>{mn.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);
    bg.setAttribute("aria-label",o?"Cerrar menú":"Abrir menú")};
    bg.onclick=()=>toggle(!mn.classList.contains("open"));
    mn.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>toggle(false)));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")toggle(false)});
    matchMedia("(min-width:821px)").addEventListener("change",e=>{if(e.matches)toggle(false)});