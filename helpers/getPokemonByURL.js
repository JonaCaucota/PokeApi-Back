const fetch = require("node-fetch");
const Pokemon = require('../models/pokemon/pokemon');
const getPokemonByID = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const descriptionURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    try {
        const [resp, descriptionResponse] = await Promise.all([fetch(url), fetch(descriptionURL)]);
        const [data, descriptionData] = await Promise.all([resp.json(), descriptionResponse.json()]);

        const description = descriptionData.flavor_text_entries[5].flavor_text;
        const { name, height, weight } = data;
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;
        const image = data.sprites.other.dream_world.front_default;
        const types = data.types.map(t => t.type.name);
        return new Pokemon({ id, name, image, hp, types, attack, defense, speed, height, weight, description });

    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
    }
}

module.exports = {
    getPokemon: getPokemonByID
}
