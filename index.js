

let offset = 0

const botonProx = document.querySelector(".proxima-pagina");
const botonPrevio = document.querySelector(".previa-pagina");
const botonPrimera = document.querySelector(".primera-pagina");
const botonUltima = document.querySelector(".ultima-pagina");
let paginaActual = 0;
const $ = (query) => document.querySelector(query)
const ApiKey = "4d140645edcdb0c22d45f34f5fd8098a";
let seccion = document.querySelector("#comics")
const URLbase = 'https://gateway.marvel.com/v1/public'
const comicPortadas = document.querySelectorAll(".imagen-comic")
const comicsPorPagina = 20;
const personajesPorPagina = 20;
const tarjetaComics = document.querySelectorAll(".tarjeta-comic")
const formulario = document.querySelector(".formulario")
const numeroResultadosMostrados = document.querySelector('.cantidad-mostrada')



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
      <article data-id=${comic.id} class="tarjeta-comic comic-principal">
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
      contarComicsMostrados()
      
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
      nombresGuionistas += escritor.name+", "
    })
    nombresGuionistas = nombresGuionistas.substring(0,nombresGuionistas.length-2)

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
      let seccionPersonajes = document.querySelector("#comics")

      seccionPersonajes.innerHTML = ""
      personajes.map((personaje) => { 
        seccionPersonajes.innerHTML += `<article class="character-article" data-id="${personaje.id}">
        <div class="tarjeta-personaje">
          <img class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
              alt="">
          <div class="background-char-title">
              <h3 class="character-title">${personaje.name}</h3>
          </div>
        </div>
      </article>`

      })

      let articlesPersonajes = Array.from(document.getElementsByClassName("character-article"))

      const clickPersonajes = () => {

      
        articlesPersonajes.forEach((articlePersonajes) => {
          articlePersonajes.addEventListener('click', verPersonajes)

        })
      }
      clickPersonajes()
      contarPersonajesMostrados()
     
      
    })
    

}


const verPersonajes = (e) => {

  
  fetch(`https://gateway.marvel.com/v1/public/characters/${e.target.dataset.id}?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=name&offset= ${paginaActual * personajesPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let personaje = data.data.results[0];

      

      let seccionPersonajes = document.querySelector("#comics")
      seccionPersonajes.innerHTML = ""
      seccionPersonajes.innerHTML = `<article class="character-article" data-id="${personaje.id}">
      <div class="tarjeta-personaje">
        <img class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
            alt="">
        <div class="background-char-title">
            <p class="character-title">${personaje.name}</p>
        </div>
        <div class="background-char-title">
            <p class="character-title">${personaje.description}</p>
        </div>
      </div>
    </article>`

    })
}



const noMostrar = () => {
  seccion.classList.add('hidden')
  $('.section-characters').classList.add('hidden')
}


const busqueda = () => {
  noMostrar()

  if ($('#tipo').value === 'comics') {
    buscarComics()
  }

  if ($('#tipo').value === 'characters') {
    buscarPersonajes()
  }
}

const actualizarFiltros = () => {
  if ($('#tipo').value === 'comics') {
    $('#orden').innerHTML = `                  
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
      <option value="-focDate">Newer</option>
      <option value="focDate">Older</option>
    `
  }
  if ($('#tipo').value === 'characters') {
    $('#orden').innerHTML = `                  
      <option value="name">A-Z</option>
      <option value="-name">Z-A</option>
    `
  }
}

const iniciar = () => {
  $('.boton-buscar').onclick = () => {
    busqueda()
    paginadoPersonajes(busqueda)
  }

  $('#tipo').onchange = actualizarFiltros

  actualizarFiltros()
  paginadoPersonajes(busqueda)
  busqueda()
}

window.onload = iniciar





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

////////// RESULTADOS



const contarComicsMostrados = () => {
  
  numeroResultadosMostrados.textContent = 48449
}

const contarPersonajesMostrados = () => {
  
  numeroResultadosMostrados.textContent = 1493
}
