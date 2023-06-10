const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generar-jwt");


const login = async(req = request, res = response) => {
    const { correo, password} = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - correo incorrecto'
            })
        }

        // Si el usuario esta activo

        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - estado: false'
            })
        }

        // Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - password: incorrecto'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)



        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: "Hable con el administrador"
        })
    }



}


module.exports = {
    login
}