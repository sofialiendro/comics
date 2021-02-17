// let comics=[]

// fetch("http://gateway.marvel.com/v1/public/comics?apikey=4d140645edcdb0c22d45f34f5fd8098a")
// .then(res=>res.json())
// .then((data)=>{
//     console.log(data)
//     const portadasComic=document.getElementById("comics");
//     comics = data.data.results

//     comics.map((comic)=>{
//         portadasComic.innerHTML+=`
//         <article>
//         <div class="portada-comic">
//         <img src="${comic.thumbnail.path}.jpg"></img>
//         <div>
//         <div class="info-portada">${comic.title}<div>
//         </div>
//         </article>
        
//         `
//     })
   
// })

let offset = 0

const botonProx = document.querySelector(".proxima-pagina");
const botonPrevio = document.querySelector(".previa-pagina");
const botonPrimera = document.querySelector(".primera-pagina");
const botonUltima = document.querySelector(".ultima-pagina");
let paginaActual = 0;
let resultsCount = 0
const $ = (query) => document.querySelector(query)


////////////// CONEXION PARA CAMBIO DE PAGINA

const paginado = () => {


  botonProx.onclick = () => {
    paginaActual++
    console.log("pagina actual", paginaActual)
    buscarComics(paginaActual)
  }


  botonPrevio.onclick = () => {
    paginaActual--
    console.log("pagina actual", paginaActual)
    buscarComics(paginaActual)
  }

  botonPrimera.onclick = () => {
    
    offset = 0;
    paginaActual = 0;
    console.log("vamos a la primera", paginaActual)
    buscarComics(paginaActual)
  }

  botonUltima.onclick = () => {
    
    offset = 2420;
    paginaActual = 2420;
    console.log("vamos a la ultima", paginaActual)
    buscarComics(paginaActual)
  }

}

paginado()

const botonesPaginas = () => {
  if (offset === 0) {
    botonPrimera.disabled = true;
    botonPrevio.disabled = true;
  } 
  else {
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
  }

  if (offset === 48400) {
    botonUltima.disabled = true;
    botonProx.disabled = true;
  } else {
    botonUltima.disabled = false;
    botonProx.disabled = false;
  }
}
botonesPaginas()


const comicsPorPagina = 20;

const buscarComics = () => {
  console.log("buscando comics...")
  fetch(`https://gateway.marvel.com/v1/public/comics?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset=${paginaActual * comicsPorPagina}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
    comics = data.data.results
    const seccion = document.querySelector("#comics")
    seccion.innerHTML = ""
    comics.map((comic) => {
      seccion.innerHTML += `
              <article class="tarjeta-comic">
              <div class="portada-comic">
              <img src="${comic.thumbnail.path}.jpg"></img>
              <div>
              <div class="info-portada">${comic.title}<div>
              </div>
              </article>
              
              `
    })
    
  })
}

buscarComics()

