

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
const comicPortadas = document.querySelectorAll(".imagen-comic")
const comicsPorPagina = 20;

const formulario = document.querySelector(".formulario")

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
      <article data-id=${comic.id} class="tarjeta-comic">
      <div class="portada-comic">
        <img class="imagen-comic" data-id=${comic.id} src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" />
      </div>
      <h3 data-id=${comic.id} class="comic-title">${comic.title}</h3>
      </article>`
      })

      let articles = Array.from(document.getElementsByClassName("tarjeta-comic"))

      const clickComics = () => {


        articles.forEach((article) => {
          article.addEventListener('click', verComic)

        })
      }
      clickComics()

    })
}


buscarComics()



////// VER DETALLE DEL COMIC


const verComic = (e) => {

  //console.log(e.target.dataset.id)
  fetch(`https://gateway.marvel.com/v1/public/comics/${e.target.dataset.id}?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset= ${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let comic = data.data.results[0]



      const seccion = document.querySelector("#comics")
      seccion.innerHTML = ""
      seccion.innerHTML = `
        <article class="tarjeta-comic">
        <div class="portada-comic info-comic">
        <img src="${comic.thumbnail.path}.jpg"></img>
        <div>
        <strong><div class="info-portada">${comic.title}<div></strong>
        </div>
        <strong><div>Publishing Date:</strong> ${comic.dates[0].date}<div>
        </div>
        <strong><div>Writers:</strong> ${obtenerNombresDeGuionistas(comic)}<div>
        </div>
        <strong><div> Description:</strong> ${comic.description}<div>
        </div>
        </article>

      `

    })
}

obtenerNombresDeGuionistas = (comic) => {

  let nombresGuionistas = ""

  let escritores = comic.creators.items.filter((persona) => {
    return persona.role === "writer"
  })

  if (escritores.length === 0) {
    nombresGuionistas = "No information"

  } else {

    escritores.forEach((escritor) => {
      nombresGuionistas += escritor.name + ", "
    })
    nombresGuionistas = nombresGuionistas.substring(0, nombresGuionistas.length - 2)

  }

  return nombresGuionistas;

}

const buscarPersonajes = () => {
  console.log("buscando personajes...")
  fetch(`https://gateway.marvel.com/v1/public/characters?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=name&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      personajes = data.data.results
      const seccionPersonajes = document.querySelector("#comics")
      seccion.innerHTML = ""
      personajes.map((personaje) => {
        seccionPersonajes.innerHTML += `<article class="character-article" data-id="${personaje.id}">
        <img data-id="${personaje.id}" class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
            alt="">
        <div class="background-char-title">
            <p data-id="${personaje.id}" class="character-title">${personaje.name}</p>
        </div>
      </article>`

      })

      let articlesPersonajes = Array.from(document.getElementsByClassName("character-article"))


        articlesPersonajes.forEach((articlePersonajes) => {
          articlePersonajes.addEventListener('click', verPersonajes)

        })
   

    })
}


const verPersonajes = (e) => {


  fetch(`https://gateway.marvel.com/v1/public/characters/${e.target.dataset.id}?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=name&offset= ${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let personaje = data.data.results[0]
      //Borro los demas personajes
      const seccion= document.querySelector("#comics")
      seccion.innerHTML = ""
      //Agrego article de personaje seleccionado
      const seccionPersonajes = document.querySelector(".section-characters")
     
      seccionPersonajes.innerHTML = `<article class="character-article" data-id="${personaje.id}">
      <img class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
          alt="">
      <div class="background-char-title">
          <p class="character-title">${personaje.name}</p>
          
      </div>
    </article>`

    })
}


const buscarComicPorTitulo = (titulo, orden) => {
  fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&titleStartsWith=${titulo}&apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      comics = data.data.results

      if (orden === "title") {
        comics = ordenarAZ(comics)
      } else if (orden === "-title") {
        comics = ordenarZA(comics)
      } else if (orden === "-focDate") {
        comics = ordenarMasNuevosAMasViejos(comics)

      } else {
        comics = ordenarMasViejosAMasNuevos(comics)
      }
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


const ordenarAZ = (comics) => {
  comics = comics.sort((a, b) => {
    if (a.title > b.title) {
      return -1;
    }
    if (a.title < b.title) {
      return 1;
    }
    return 0;

  })
  return comics
}

const ordenarZA = (comics) => {
  comics = comics.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;

  })

  return comics
}

const ordenarMasNuevosAMasViejos = (comics) => {
  comics = comics.sort((a, b) => {
    if (a.dates[1].date > b.dates[1].date) {
      return -1;
    }
    if (a.dates[1].date < b.dates[1].date) {
      return 1;
    }
    return 0;

  })
  return comics

}
const ordenarMasViejosAMasNuevos = (comics) => {
  comics = comics.sort((a, b) => {
    if (a.dates[1].date > b.dates[1].date) {
      return 1;
    }
    if (a.dates[1].date < b.dates[1].date) {
      return -1;
    }
    return 0;

  })
  return comics

}


/////////// FILTROS


const hideDetails = () => {
  $('#comics').classList.add('hidden')
  $('.section-characters').classList.add('hidden')
}


const search = () => {
  //hideDetails()


  let tipo = $('#tipo').value
  let orden = $('#orden').value
  let input = $('#buscar-productos').value

  if (input != "") {
    if (tipo === "comics") {
      buscarComicPorTitulo(input, orden)

    }
    else {
      // buscarPersonajePorNombre(input,orden)
    }
  }
  else {
    if (tipo === "comics") {
      buscarComics()
    }
    else {
      buscarPersonajes()

    }

  }
}

const updateSortDropdown = () => {
  if ($('#tipo').value === 'comics') {
    $('#orden').innerHTML = `                  
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
      <option value="-focDate">Más nuevos</option>
      <option value="focDate">Más viejos</option>
    `
  }
  if ($('#tipo').value === 'characters') {
    $('#orden').innerHTML = `                  
      <option value="name">A-Z</option>
      <option value="-name">Z-A</option>
    `
  }
}

const initialize = () => {
  $('.boton-buscar').onclick = () => {
    search()
    paginadoPersonajes(search)
  }

  $('#tipo').onchange = updateSortDropdown

  updateSortDropdown()
  paginadoPersonajes(search)
  search()
}

window.onload = initialize





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


const paginadoPersonajes = () => {


  botonProx.onclick = () => {
    paginaActual++
    console.log("pagina actual", paginaActual)
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarPersonajes(paginaActual)
  }


  botonPrevio.onclick = () => {
    paginaActual--
    console.log("pagina actual", paginaActual)
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarPersonajes(paginaActual)
  }

  botonPrimera.onclick = () => {

    offset = 0;
    paginaActual = 0;
    console.log("vamos a la primera", paginaActual)
    botonPrimera.disabled = true;
    botonPrevio.disabled = true;
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarPersonajes(paginaActual)
  }

  botonUltima.onclick = () => {

    offset = 74;
    paginaActual = 74;
    console.log("vamos a la ultima", paginaActual)
    botonUltima.disabled = true;
    botonProx.disabled = true;
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarPersonajes(paginaActual)
  }

}

///// PERSONAJES

// const agregarPersonajesConComics = () => {
//   seccionPersonajes.innerHTML = `
//   <img src="" alt="" class="character-portrait">
//   <div class="character-details">
//     <h2 class="character-name">LALALALA</h2>
//     <p class="character-description"></p>
//   </div>

//   `
// }