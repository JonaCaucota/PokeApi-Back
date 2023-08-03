const fetch = require("node-fetch");
const Pokemon = require('../models/pokemon/pokemon');
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const {name, height, weight} = data;
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;
        const image = data.sprites.other.home.front_default;
        const types = data.types.map(t => t.type.name);
        return new Pokemon({id, name, image, hp, types, attack, defense, speed, height, weight});

    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
    }
}

module.exports = {
    getPokemon
}
