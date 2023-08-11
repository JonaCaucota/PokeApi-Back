const { response, request } = require('express');
const fetch = require('node-fetch');
const {getPokemon} = require("../helpers/getPokemonByID");
const PokemonFav = require('../models/pokemon/pokemonFav');

const pokemonGetAll = async (req = request, res = response) => {
    const limit = 151;
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

const pokemonSearch = async (req = request, res = response) => {
    const {search} = req.query;
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
    try{
        const data = await fetch(url);
        const {results} = await data.json();

        const filteredPokemons = results.filter(poke => poke.name.includes(search));

        const pokemonPromises = [];
        for (let i = 0; i < filteredPokemons.length; i++) {
            pokemonPromises.push(getPokemon(filteredPokemons[i].name));
        }
        const pokemons = await Promise.all(pokemonPromises);

        res.json(pokemons);
    } catch (error) {
        console.log("No se pudo conectar con la API de Pokémon oficial");
        res.status(500).json({ error: "Error al obtener los datos de la API de Pokémon" });
    }

}

const saveFavPokemon = async (req = request, res = response) => {
    const {userId, pokemon} = req.body;
    try{
        const user = await PokemonFav.findById(userId);
        if(user !== null){
            for (const poke of user.pokemons) {
                if(poke.id == pokemon.id ){
                    console.log("Error pokemon ya existente en favoritos")
                    return res.status(500).json({
                        Error: "Ya tiene este pokemon en favoritos"
                    })
                }
            }
            user.pokemons.push(pokemon);
            const userUpdated = await PokemonFav.findByIdAndUpdate(userId, user, { new: true });
            return res.json({
                userUpdated
            })
        }
        const favPokemon = new PokemonFav({
            _id: userId,
            pokemons: pokemon
        });

        await favPokemon.save();

        res.json({
            favPokemon
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al guardar el pokemon favorito'
        });
    }
}

const getAllFavouritePokemonsByUserId = async (req = request, res = response) => {
    try{
        const userId = req.params.id;
        const user = await PokemonFav.findById(userId.toString());
        if(user !== null){
            return res.json(
                user.pokemons
            )
        }
    }catch (error){
        console.log(error)
        res.status(500).json({
            message: 'Error al guardar el pokemon favorito'
        });
    }
}

module.exports = {
    pokemonGetAll,
    pokemonGetById,
    pokemonSearch,
    saveFavPokemon,
    getAllFavouritePokemonsByUserId
};