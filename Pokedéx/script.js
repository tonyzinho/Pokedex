async function buscarPokemon(){

    const pokemon = document
        .getElementById("pokemonInput")
        .value
        .toLowerCase()

    const url =
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    try{

        const resposta = await fetch(url)

        const dados = await resposta.json()

        document.getElementById("pokemonName")
            .innerText = dados.name

        document.getElementById("pokemonId")
            .innerText = `#${dados.id}`

        document.getElementById("pokemonType")
            .innerText =
            `Tipo: ${dados.types[0].type.name}`

        document.getElementById("pokemonImage")
            .src =
            dados.sprites.front_default

    }

    catch{

        alert("Pokémon não encontrado!")
    }
}