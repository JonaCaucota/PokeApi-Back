const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
})

UsuarioSchema.methods.toJSON = function () {
    const {password,__v, _id,
        ...usuario} = this.toObject();
    usuario.userId = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);