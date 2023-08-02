const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user/usuario');
const {validationResult} = require("express-validator");

const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const {limite, desde} = req.query;
    const query = {estado: true}

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

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({
        nombre, correo, password, rol
    });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardo usuario
    usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
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

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

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