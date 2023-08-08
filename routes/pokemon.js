const { Router } = require('express');
const {pokemonGetAll, pokemonGetById, pokemonSearch} = require("../controllers/pokemon");


const router = Router();

router.get('/', pokemonGetAll );
router.get('/search', pokemonSearch)
router.get('/:id', pokemonGetById );


module.exports = router;