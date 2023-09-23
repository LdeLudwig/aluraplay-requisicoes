async function listaDeVideos(){
    const endPointAPI = await fetch("http://localhost:3000/videos")
    const respostaAPI = await endPointAPI.json()
    
    return respostaAPI
}

async function criaVideo(titulo, descricao, url, imagem){
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    })
    if(!conexao.ok){
        throw new Error("Não foi possível eviar o video")
    }

        const conexaoConvertida = await conexao.json()
        return conexaoConvertida
}

async function procuraVideos(pesquisa){
    const converteConexao = await fetch(`http://localhost:3000/videos?q=${pesquisa}`)
    const conexaoConvertida = converteConexao.json()

    return conexaoConvertida
}

export const conectaAPI = {
    listaDeVideos, 
    criaVideo,
    procuraVideos
}