const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user/usuario');
const {validationResult} = require("express-validator");

const usuariosGet = async (req = request, res = response) => {

    const {limite, desde} = req.query;
    const query = {state: true}

    const [usuarios,total ] = await  Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    try {
        const { name, lastName, email, password, rol } = req.body;

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        const encryptedPassword = bcryptjs.hashSync(password, salt);

        const user = new Usuario({
            name, lastName, email, password: encryptedPassword, rol
        });

        // Guardo usuario
        await user.save();

        res.json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear usuario'
        });
    }
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {state: false})

    res.json({
        usuario,
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}