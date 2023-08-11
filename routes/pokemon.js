const { Router } = require('express');
const {pokemonGetAll, pokemonGetById, pokemonSearch, saveFavPokemon} = require("../controllers/pokemon");


const router = Router();

router.get('/', pokemonGetAll );
router.get('/search', pokemonSearch);
router.post('/favourite/save', saveFavPokemon);
router.get('/:id', pokemonGetById );


module.exports = router;