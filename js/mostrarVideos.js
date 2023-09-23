import { conectaAPI } from "../js/conectaAPI.js"

const lista = document.querySelector("[data-lista]")
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]")


function constroiCard(titulo, descricao, url, imagem){
    const video = document.createElement("li")
    video.className = "videos__item"
    video.innerHTML = `<iframe width="100%" height="72%" src="${url}"
    title="${titulo}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
<div class="descricao-video">
    <img src="${imagem}" alt="logo canal alura">
    <h3>${titulo}</h3>
    <p>${descricao}</p>
</div>`

return video;
}

async function listaDeVideos (){
const listaApi = await conectaAPI.listaDeVideos()
try{
listaApi.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))   
} catch{
    lista.innerHTML = `<h2 class="mensagem__titulo"> Não foi possível carregar os vídeos</h2>`
}

}


listaDeVideos()

/* função de busca */

async function buscarVideos(video){
    video.preventDefault()
    const barraDePesquisa = document.querySelector("[data-pesquisa]").value
    const busca = await conectaAPI.procuraVideos(barraDePesquisa)

    const lista = document.querySelector("[data-lista]")
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }
    
    busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))

    if(busca.length == 0){
        lista.innerHTML = `<h2 class="mensagem__titulo"> Não existe vídeos com esse termo</h2>`
    }
}

botaoDePesquisa.addEventListener("click", video => buscarVideos(video))







