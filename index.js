let comics=[]

fetch("http://gateway.marvel.com/v1/public/comics?apikey=4d140645edcdb0c22d45f34f5fd8098a")
.then((res)=>{
return res.json()
})
.then((data)=>{
    console.log(data)
    const portadaComic=document.querySelector("article");
    comics = data.data.results

    console.log(comics)

    comics.map((comic)=>{
        portadaComic.innerHTML+=`
        <div class="portada-comic">
        <img src="${comic.thumbnail.path}.jpg"></img>
        <div>
        <div class="info-portada">${comic.title}<div>
        </div>
        
        `

    })
    console.log(seccion)

/* const portadaComic=document.querySelector("article");

portadaComic.innerHTML=`
<div class="portada-comic">
<img src="${data.thumbnail}.jpg"></img>
<div>
<div class="info-portada">${data.title}<div>
</div>

`  */
})

