fetch("http://gateway.marvel.com/v1/public/comics?ts=1&apikey=4d140645edcdb0c22d45f34f5fd8098a")
.then((data)=>{
return data.json()
})
.then((info)=>{
    console.log(info)

const portadaComic=document.querySelector("article");

portadaComic.innerHTML=`
<div class="portada-comic">
<img src="img/wonder-woman.jpg"></img>
<div>
<div class="info-portada">Hola soy una portada de ejemplo<div>
</div>

` 
});
