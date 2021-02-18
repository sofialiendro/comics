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
const $ = (query) => document.querySelector(query)
const ApiKey = "4d140645edcdb0c22d45f34f5fd8098a";
const seccion = document.querySelector("#comics")
const URLbase = 'https://gateway.marvel.com/v1/public'
const comicsPorPagina = 20;


//////// CONEXION 


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
        <img src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" />
      </div>
      <h3 class="comic-title">${comic.title}</h3>
      </article>        
              `
    })
    
  })
}

buscarComics()

// const buscarPersonajes = () => {
//   console.log("buscando personajes...")
//   fetch(`https://gateway.marvel.com/v1/public/characters?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset=${paginaActual * comicsPorPagina}`)
//   .then((res) => {
//     return res.json()
//   })
//   .then((data) => {
//     console.log(data)
//     personajes = data.data.results
//     const seccionPersonajes = document.querySelector(".section-characters")
//     seccionPersonajes.innerHTML = ""
//     comics.map((personaje) => {
//       seccionPersonajes.innerHTML += `<div class="character-img-container">
//               <img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="" class="character-thumbnail" />
//             </div>
//             <div class="character-name-container">
//               <h3 class="character-name">${character.name}</h3>
//             </div>
//               `
//     })
    
//   })
// }

// buscarPersonajes()


////////////// CONEXION PARA CAMBIO DE PAGINA

const paginado = () => {


  botonProx.onclick = () => {
    paginaActual++
    console.log("pagina actual", paginaActual)
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarComics(paginaActual)
  }


  botonPrevio.onclick = () => {
    paginaActual--
    console.log("pagina actual", paginaActual)
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarComics(paginaActual)
  }

  botonPrimera.onclick = () => {
    
    offset = 0;
    paginaActual = 0;
    console.log("vamos a la primera", paginaActual)
    botonPrimera.disabled = true;
    botonPrevio.disabled = true;
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarComics(paginaActual)
  }

  botonUltima.onclick = () => {

    offset = 2420;
    paginaActual = 2420;
    console.log("vamos a la ultima", paginaActual)
    botonUltima.disabled = true;
    botonProx.disabled = true;
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarComics(paginaActual)
  }

}

paginado()
