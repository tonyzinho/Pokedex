let shiny = false

let pokemonAtual = null

async function buscarPokemon(){

    const pokemon = document
    .getElementById("pokemonInput")
    .value
    .toLowerCase()

    const url =
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    try{

        const resposta =
        await fetch(url)

        const dados =
        await resposta.json()

        pokemonAtual = dados

        mostrarPokemon()
       
        buscarEvolucao(dados)   
    }

    catch{

        alert(
            "Pokémon não encontrado!"
        )
    }
}

function mostrarPokemon(){

    const dados = pokemonAtual

    document.getElementById("pokemonName")
    .innerText = dados.name

    document.getElementById("pokemonId")
    .innerText = `#${dados.id}`

    const tipo =
    dados.types[0].type.name

    const typeElement =
    document.getElementById("pokemonType")

    typeElement.innerText =
    `Tipo: ${tipo}`

    trocarCor(tipo)

    if(shiny){

        document.getElementById(
            "pokemonImage"
        ).src =
        dados.sprites.front_shiny

    }

    else{

        document.getElementById(
            "pokemonImage"
        ).src =
        dados.sprites.front_default
    }

    document.getElementById("hpBar")
    .style.width =
    `${dados.stats[0].base_stat}%`

    document.getElementById("attackBar")
    .style.width =
    `${dados.stats[1].base_stat}%`

    document.getElementById("defenseBar")
    .style.width =
    `${dados.stats[2].base_stat}%`

    tocarCry(dados)
}

function toggleShiny(){

    shiny = !shiny

    if(pokemonAtual){

        mostrarPokemon()
    }
}

function tocarCry(dados){

    const cry =
    document.getElementById(
        "pokemonCry"
    )

    cry.src =
    dados.cries.latest

    cry.play()
}

function trocarCor(tipo){

    const body =
    document.body

    const efeitos = {

        fire:
        `
        radial-gradient(circle at top,
        #ff6b35,
        #111827 70%)
        `,

        water:
        `
        radial-gradient(circle at top,
        #3b82f6,
        #111827 70%)
        `,

        grass:
        `
        radial-gradient(circle at top,
        #22c55e,
        #111827 70%)
        `,

        electric:
        `
        radial-gradient(circle at top,
        #facc15,
        #111827 70%)
        `,

        ghost:
        `
        radial-gradient(circle at top,
        #7e22ce,
        #111827 70%)
        `,

        psychic:
        `
        radial-gradient(circle at top,
        #ec4899,
        #111827 70%)
        `
    }

    body.style.background =
    efeitos[tipo] ||

    `
    radial-gradient(circle at top,
    #3b4cca,
    #111827 70%)
    `
}

document
.getElementById("pokemonInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        buscarPokemon()
    }
})

let favoritos = []

function favoritarPokemon(){

    if(!pokemonAtual){

        return
    }

    favoritos.push(
        pokemonAtual.name
    )

    alert(
        `${pokemonAtual.name} foi favoritado!`
    )

    console.log(favoritos)
}

async function buscarEvolucao(dados){

    const speciesResponse =
    await fetch(
        dados.species.url
    )

    const speciesData =
    await speciesResponse.json()

    const evolutionResponse =
    await fetch(
        speciesData.evolution_chain.url
    )

    const evolutionData =
    await evolutionResponse.json()

    let evolucao =

        evolutionData.chain.species.name

    if(
        evolutionData.chain.evolves_to.length > 0
    ){

        evolucao +=
        " → " +

        evolutionData
        .chain
        .evolves_to[0]
        .species
        .name
    }

    document.getElementById(
        "evolutionBox"
    ).innerText =

    `Evolução: ${evolucao}`
}

let capturados = []

function capturarPokemon(){

    if(!pokemonAtual){

        return
    }

    const chance =
    Math.random()

    if(chance > 0.5){

        capturados.push(
            pokemonAtual.name
        )

        alert(
            `${pokemonAtual.name} foi capturado!`
        )

    }else{

        alert(
            `${pokemonAtual.name} escapou!`
        )
    }

    console.log(capturados)
}

async function batalharPokemon(){

    const aleatorio =

    Math.floor(Math.random() * 151) + 1

    const resposta =
    await fetch(
        `https://pokeapi.co/api/v2/pokemon/${aleatorio}`
    )

    const inimigo =
    await resposta.json()

    const ataquePlayer =
    pokemonAtual.stats[1].base_stat

    const ataqueInimigo =
    inimigo.stats[1].base_stat

    if(ataquePlayer > ataqueInimigo){

        alert(
            `${pokemonAtual.name} venceu ${inimigo.name}!`
        )

    }else{

        alert(
            `${pokemonAtual.name} perdeu para ${inimigo.name}!`
        )
    }
}