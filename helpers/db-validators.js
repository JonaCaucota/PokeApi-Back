const Role = require("../models/user/role");
const Usuario = require("../models/user/usuario");

const esRoleValido = async (rol = '') => {
    if(rol === undefined) {
        const existeRol = await Role.findOne({rol})
        if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la base de datos`)
        }
    }
}

const existeEmail = async(email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email: ${email}, ya está registrado`)
    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id}, no existe`)
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}