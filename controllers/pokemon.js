const { response, request } = require('express');
const fetch = require('node-fetch');
const {getPokemon} = require("../helpers/getPokemon");

const pokemonGetAll = async (req = request, res = response) => {
    const limit = 60;
    try {
        const pokemonPromises = [];
        for (let i = 1; i <= limit; i++) {
            pokemonPromises.push(getPokemon(i));
        }

        const pokemons = await Promise.all(pokemonPromises);
        res.json(pokemons);
    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
        res.status(500).json({ error: "Error al obtener los datos de la API de Pokémon" });
    }
};

const pokemonGetById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemon(id);
        res.json(pokemon);
    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
        res.status(500).json({ error: "Error al obtener los datos de la API de Pokémon" });
    }
}

module.exports = {
    pokemonGetAll,
    pokemonGetById
};