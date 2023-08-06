const {Schema, model} = require('mongoose');

const PokemonSchema = Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        unique: true
    },
    image: {
        type: String,
    },
    hp: {
        type: Number,
        required: [true],
    },
    types: {
        type: Array,
    },
    attack: {
        type: Number,
        default: true
    },
    defense: {
        type: Number,
        default: false
    },
    speed: {
        type: Number,
        default: false
    },
    height: {
        type: Number,
        default: false
    },
    weight: {
        type: Number,
        default: false
    },
    description: {
        type: String
    }
})

PokemonSchema.methods.toJSON = function () {
    const {password,__v, _id, uid,
        ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Pokemon', PokemonSchema);