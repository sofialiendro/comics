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

////////////// CONEXION PARA CAMBIO DE PAGINA

const botonProx = document.querySelector(".proxima-pagina");
let paginaActual = 0;

botonProx.onclick = () => {
  paginaActual++
  console.log("pagina actual", paginaActual)
  buscarComics(paginaActual)
}

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
              <article>
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
