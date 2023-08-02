const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El nombre es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    image: {
        type: String,
    },
    hp: {
        type: Number,
        required: [true],
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
    }
})

module.exports = model('Usuario', UsuarioSchema);