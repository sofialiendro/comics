

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
let comicsPorPagina = 20;
const numeroResultadosMostrados = document.querySelector('.cantidad-mostrada')
const formulario = document.querySelector(".formulario")
let numeroDeResultados=document.querySelector(".numero-de-resultados")
let seccionResultadosComicsYPersonajes = document.querySelector(".contenedor-comcis-personajes-resultados")


//////// CONEXION 


const buscarComics = (orden) => {
  console.log("buscando comics...")
  fetch(`https://gateway.marvel.com/v1/public/comics?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=${orden}&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      comics = data.data.results

      const seccionPersonajes = document.querySelector(".section-characters")
      seccionPersonajes.innerHTML= ""

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
      agregarEventoClick("tarjeta-comic",verComic)
      contarComicsMostrados()
      
    })
}

const agregarEventoClick=(clase,funcion)=>{
  let articles = Array.from(document.getElementsByClassName(clase))
  articles.forEach((article) => {
    article.addEventListener('click', funcion)

  })
  


}

////// VER DETALLE DEL COMIC


const verComic = (e) => {

  //console.log(e.target.dataset.id)
  fetch(`https://gateway.marvel.com/v1/public/comics/${e.target.dataset.id}?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset= ${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let comic = data.data.results[0]
      let contenedorResultados=document.querySelector(".contenedor-resultados")
      contenedorResultados.innerHTML=""


      const seccion = document.querySelector("#comics")
      seccion.innerHTML = ""
      seccion.innerHTML = `
        <article class="tarjeta-comic-detalle">
        <div class="portada-comic-detalle info-comic">
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
      fetch(`https://gateway.marvel.com/v1/public/comics/${e.target.dataset.id}/characters?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=name&offset= ${paginaActual * comicsPorPagina}`)
      .then((res) => {
        return res.json()
      })
      .then((dataPersonajes) => {
        let personajes = dataPersonajes.data.results
    


        const seccionPersonajes = document.querySelector(".section-characters")
        seccionPersonajes.innerHTML = ""
        mostrarResultadosDeLaBusqueda(personajes.length)


        personajes.map((personaje) => {
          seccionPersonajes.innerHTML += `<article class="character-article" data-id="${personaje.id}">
          <div class="imagen-comic-personaje">
          <img data-id="${personaje.id}" class="comic-thumbnail imagen-tamaño" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
              alt="">
          <div class="background-char-title">
              <h3 data-id="${personaje.id}" class="character-title">${personaje.name}</h3>
          </div>
          </div>
        </article>`
  
        })
  
        agregarEventoClick("character-article",verPersonajes)
        deshabilitarPaginado()

      })
    
   
   })
  

}

const deshabilitarPaginado = () => {
  botonUltima.disabled = true;
    botonProx.disabled = true;
    botonPrimera.disabled = true;
    botonPrevio.disabled = true;
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

const buscarPersonajes = (orden) => {
  console.log("buscando personajes...")
  fetch(`https://gateway.marvel.com/v1/public/characters?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=${orden}&offset=${paginaActual * comicsPorPagina}`)
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
        <div class="tarjeta-personaje">
        <img data-id="${personaje.id}" class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
            alt="">
        <div class="background-char-title">
            <h3 data-id="${personaje.id}" class="character-title">${personaje.name}</h3>
        </div>
        </div>
      </article>`

      })

      agregarEventoClick("character-article",verPersonajes)
      contarPersonajesMostrados()
      
    })
}


const verPersonajes = (e) => {


  fetch(`https://gateway.marvel.com/v1/public/characters/${e.target.dataset.id}?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=name&offset= ${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let personaje = data.data.results[0]
      //Borro el total
      let contenedorResultados=document.querySelector(".contenedor-resultados")
      contenedorResultados.innerHTML=""
      //Borro los demas personajes
      const seccion = document.querySelector("#comics")
      seccion.innerHTML = ""

      //Agrego article de personaje seleccionado

      seccion.innerHTML = `<article class="character-article" data-id="${personaje.id}">
      <img data-id="${personaje.id}" class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
          alt="">
      <div data-id="${personaje.id}" class="background-char-title">
          <h3 class="character-title">${personaje.name}</h3>   
      </div>
    </article>`

    fetch(`https://gateway.marvel.com/v1/public/characters/${e.target.dataset.id}/comics?apikey=4d140645edcdb0c22d45f34f5fd8098a&orderBy=title&offset= ${paginaActual * comicsPorPagina}`)
      .then((res) => {
        return res.json()
      })
      .then((dataComics) => {
        let comics = dataComics.data.results

        const seccion = document.querySelector(".section-characters")
        seccion.innerHTML=""
        
        mostrarResultadosDeLaBusqueda(comics.length)
      
        comics.map((comic) => {
          seccion.innerHTML += `
        <article data-id=${comic.id} class="tarjeta-comic comic-principal">
  
          <img data-id=${comic.id} src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" />

        <h3 data-id=${comic.id} class="comic-title">${comic.title}</h3>
        </article>        
                `
        })
  
        agregarEventoClick("tarjeta-comic",verComic)
        deshabilitarPaginado()

      })
    })
}


const buscarComicPorTitulo = (titulo, orden) => {
  fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&titleStartsWith=${titulo}&orderBy=${orden}&apikey=4d140645edcdb0c22d45f34f5fd8098a&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      comics = data.data.results

      const seccionPersonajes = document.querySelector(".section-characters")
      seccionPersonajes.innerHTML= ""

      const seccion = document.querySelector("#comics")
      seccion.innerHTML = ""

      comics.map((comic) => {
        seccion.innerHTML += `
      <article data-id=${comic.id} class="tarjeta-comic comic-principal">
      <div class="portada-comic">
        <img data-id=${comic.id} src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" />
      </div>
      <h3 data-id=${comic.id} class="comic-title">${comic.title}</h3>
      </article>        
              `
      })

      agregarEventoClick("tarjeta-comic",verComic)
      const decirQueNoHayResultados = () => {
        if (comics.length === 0) {
        $('.contenedor-resultados').innerHTML =
          '<h2 class="no-results">No se han encontrado resultados</h2>'

        }
      }
      decirQueNoHayResultados()
    })
}

const buscarPersonajePorNombre = (nombre, orden) => {
  fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nombre}&orderBy=${orden}&apikey=4d140645edcdb0c22d45f34f5fd8098a&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      let personajes = data.data.results

      const seccionPersonajes = document.querySelector(".section-characters")
      seccionPersonajes.innerHTML= ""

      const seccion = document.querySelector("#comics")
      seccion.innerHTML = ""
      personajes.map((personaje) => {
        seccion.innerHTML += `<article class="character-article" data-id="${personaje.id}">
        <div class="tarjeta-personaje">
        <img data-id="${personaje.id}" class="comic-thumbnail" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
            alt="">
        <div class="background-char-title">
            <h3 data-id="${personaje.id}" class="character-title">${personaje.name}</h3>
            
        </div>
        </div>
      </article>`
        
      })

      agregarEventoClick("character-article",verPersonajes)

      const decirQueNoHayResultados = () => {
        if (personajes.length === 0) {
        $('.contenedor-resultados').innerHTML =
          '<h2 class="no-results">No se han encontrado resultados</h2>'

        }
      }
      decirQueNoHayResultados()
      

    })
}


/////////// FILTROS


const ocultar = () => {
  $('#comics').classList.add('hidden')
  $('.section-characters').classList.add('hidden')
}


const search = () => {
  //ocultar()


  let tipo = $('#tipo').value
  let orden = $('#orden').value
  let input = $('#buscar-productos').value

  if (input != "") {
    if (tipo === "comics") {
      buscarComicPorTitulo(input, orden)

    }
    else {
      buscarPersonajePorNombre(input, orden)
    }
  }
  else {
    if (tipo === "comics") {
      buscarComics(orden)
    }
    else {
      buscarPersonajes(orden)

    }

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
    search()
    // paginadoPersonajes()
    paginado()
  }

  $('#tipo').onchange = actualizarFiltros

  actualizarFiltros()
  // paginadoPersonajes()
  paginado()
  search()
}

window.onload = iniciar





const paginado = () => {


  botonProx.onclick = () => {
    paginaActual++
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarComics()
  }


  botonPrevio.onclick = () => {
    paginaActual--
 
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarComics()
  }

  botonPrimera.onclick = () => {

    offset = 0;
    paginaActual = 0;
    console.log("vamos a la primera", paginaActual)
    botonPrimera.disabled = true;
    botonPrevio.disabled = true;
    botonUltima.disabled = false;
    botonProx.disabled = false;
    buscarComics()
  }

  botonUltima.onclick = () => {
   const resto = total % comicsPorPagina
   if (resto > 0) {
     paginaActual = (total - (total % comicsPorPagina)) / comicsPorPagina
   }
   else {
     paginaActual ((total - (total % comicsPorPagina)) / comicsPorPagina) - comicsPorPagina
   }

    
    botonUltima.disabled = true;
    botonProx.disabled = true;
    botonPrimera.disabled = false;
    botonPrevio.disabled = false;
    buscarComics()
  }

}

// paginado()


////////////// CONEXION PARA CAMBIO DE PAGINA


// const paginado = () => {


//   botonProx.onclick = () => {
//     paginaActual++
//     console.log("pagina actual", paginaActual)
//     botonPrimera.disabled = false;
//     botonPrevio.disabled = false;
//     buscarComics(paginaActual)
//   }


//   botonPrevio.onclick = () => {
//     paginaActual--
//     console.log("pagina actual", paginaActual)
//     botonUltima.disabled = false;
//     botonProx.disabled = false;
//     buscarComics(paginaActual)
//   }

//   botonPrimera.onclick = () => {

//     offset = 0;
//     paginaActual = 0;
//     console.log("vamos a la primera", paginaActual)
//     botonPrimera.disabled = true;
//     botonPrevio.disabled = true;
//     botonUltima.disabled = false;
//     botonProx.disabled = false;
//     buscarComics(paginaActual)
//   }

//   botonUltima.onclick = () => {

//     offset = 2420;
//     paginaActual = 2420;
//     console.log("vamos a la ultima", paginaActual)
//     botonUltima.disabled = true;
//     botonProx.disabled = true;
//     botonPrimera.disabled = false;
//     botonPrevio.disabled = false;
//     buscarComics(paginaActual)
//   }

// }

// // paginado()


// const paginadoPersonajes = () => {


//   botonProx.onclick = () => {
//     paginaActual++
//     console.log("pagina actual", paginaActual)
//     botonPrimera.disabled = false;
//     botonPrevio.disabled = false;
//     buscarPersonajes(paginaActual)
//   }


//   botonPrevio.onclick = () => {
//     paginaActual--
//     console.log("pagina actual", paginaActual)
//     botonUltima.disabled = false;
//     botonProx.disabled = false;
//     buscarPersonajes(paginaActual)
//   }

//   botonPrimera.onclick = () => {

//     offset = 0;
//     paginaActual = 0;
//     console.log("vamos a la primera", paginaActual)
//     botonPrimera.disabled = true;
//     botonPrevio.disabled = true;
//     botonUltima.disabled = false;
//     botonProx.disabled = false;
//     buscarPersonajes(paginaActual)
//   }

//   botonUltima.onclick = () => {

//     offset = 74;
//     paginaActual = 74;
//     console.log("vamos a la ultima", paginaActual)
//     botonUltima.disabled = true;
//     botonProx.disabled = true;
//     botonPrimera.disabled = false;
//     botonPrevio.disabled = false;
//     buscarPersonajes(paginaActual)
//   }

// }

// // paginadoPersonajes()

////////// RESULTADOS

const mostrarResultadosDeLaBusqueda=(numero)=>{

  numeroDeResultados.textContent=numero
  return numero


}

const contarComicsMostrados = () => {
  
  numeroResultadosMostrados.textContent = 48449
}

const contarPersonajesMostrados = () => {
  
  numeroResultadosMostrados.textContent = 1493
}


// const contarComicsMostrados = (count) => {
//   numeroResultadosMostrados.innerHTML = count
//   resultsCount = count
// }

// const updateResultsTitle = (title) => {
//   $('.resultados').innerHTML = title
// }
