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


// let resultsCount = 0
// const $ = (query) => document.querySelector(query)


// const botonPrevio = document.querySelector(".previa-pagina");

// const updatePaginationCallback = (callback) => {
//   $('.primera-pagina').onclick = () => {
//     offset = 0
//     callback()
//   }

//   $('.previa-pagina').onclick = () => {
//     offset -= 20
//     if (offset < 0) {
//       offset = 0
//     }
//     callback()
//   }

//   $('.proxima-pagina').onclick = () => {
//     offset += 20
//     callback()
//   }

//   $('.ultima-pagina').onclick = () => {
//     const isExact = resultsCount % 20 === 0
//     const pages = Math.floor(resultsCount / 20)
//     offset = (isExact ? pages - 1 : pages) * 20
//     callback()
//   }
// }

// updatePaginationCallback()

// const updatePagination = () => {
//   if (offset === 0) {
//     $('.primera-pagina').disabled = true
//     $('.previa-pagina').disabled = true
//   } else {
//     $('.primera-pagina').disabled = false
//     $('.previa-pagina').disabled = false
//   }

//   if (offset + 20 >= resultsCount) {
//     $('.ultima-pagina').disabled = true
//     $('.proxima-pagina').disabled = true
//   } else {
//     $('.ultima-pagina').disabled = false
//     $('.proxima-pagina').disabled = false
//   }
// }
// updatePagination()

// const botonProx = document.querySelector(".proxima-pagina");
// const urlBase = "https://gateway.marvel.com/v1/public/"
// const apiKey = "4d140645edcdb0c22d45f34f5fd8098a"
// const comicsPorPagina = 20;
// let paginaActual = 0;

// botonProx.onclick = () => {
//   paginaActual++
//   console.log("pagina actual", paginaActual)
//   buscarComics(paginaActual)
// }

// const buscarComics = (url, paginaActual, nombre) => {
//   console.log("buscando comics...")
//   fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
//   .then((res) => {
//     return res.json()
//   })
//   .then((data) => {
//     console.log(data)
//     personajes = data.data.results
//     const seccion = document.getElementById("comics")
//     seccion.innerHTML = ''
//     personajes.map((personaje) => {
//       seccion.innerHTML += `<p>${personaje[nombre]}</p>`
//     })
    
//   })
// }



// buscarComics("comics", paginaActual, "title")
// buscarComics("characters", paginaActual, "name")
