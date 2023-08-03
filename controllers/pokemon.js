const { response, request } = require('express');
const fetch = require('node-fetch');
const {getPokemon} = require("../helpers/getPokemon");

const pokemonGetAll = async (req = request, res = response) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60';
    const limit = 60;
    let pokemons = [];
    try {
            for (let i = 1; i <= limit; i++) {
                pokemons.push(await getPokemon(i));
            }
        res.json(pokemons);
    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
        res.status(500).json({ error: "Error al obtener los datos de la API de Pokémon" });
    }
};

const pokemonGetById = async (req = request, res = response) => {
    const id = req.params.id;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        res.json(data);
    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
        res.status(500).json({ error: "Error al obtener los datos de la API de Pokémon" });
    }
}

module.exports = {
    pokemonGetAll,
    pokemonGetById
};