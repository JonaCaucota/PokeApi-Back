const {Schema, model} = require('mongoose');

const TypeSchema = Schema({
    name:{
        type: String
    }
})

module.exports = model('Pokemon', TypeSchema);