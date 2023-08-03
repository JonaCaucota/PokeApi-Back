const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../database/config");

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3000;
        this.pokemonPath = '/pokeapi/pokemon'
        this.usuariosPath = '/pokeapi/usuarios';
        this.authPath = '/pokeapi/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
        }) );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.pokemonPath, require('../routes/pokemon'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
