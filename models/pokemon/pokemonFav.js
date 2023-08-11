const {Schema, model} = require('mongoose');

const PokemonFav = Schema({
    _id: {
        type: String,
    },
    pokemons: [{
        id: {
            type: Number,
        },
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        types: {
            type: Array,
        },
    }]
})

PokemonFav.methods.toJSON = function () {
    const { _id, ...pokemonFav } = this.toObject();
    return pokemonFav;
}

module.exports = model('PokemonFav', PokemonFav);