const { Router } = require('express');
const {pokemonGetAll, pokemonGetById} = require("../controllers/pokemon");


const router = Router();

router.get('/', pokemonGetAll );
router.get('/:id', pokemonGetById );


module.exports = router;