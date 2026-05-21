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

    const cores = {

        fire:
        "#ff6b35",

        water:
        "#3b82f6",

        grass:
        "#22c55e",

        electric:
        "#facc15",

        psychic:
        "#ec4899",

        ice:
        "#67e8f9",

        dragon:
        "#7c3aed",

        dark:
        "#111827",

        fairy:
        "#f9a8d4",

        fighting:
        "#dc2626",

        ghost:
        "#7e22ce",

        poison:
        "#9333ea",

        rock:
        "#a16207",

        ground:
        "#92400e"

    }

    const cor =
    cores[tipo] || "#3b4cca"

    body.style.background =
    `radial-gradient(circle at top,
    ${cor},
    #111827 70%)`
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
