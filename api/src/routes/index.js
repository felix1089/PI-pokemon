const { Router } = require('express');
const pokemon = require('../controllers/pokemons.js')
const tipos = require('../controllers/types.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
//router.use(cors());
// router.get('/', async(req, res)=>{
//     res.send('hola')
// })



router.use('/pokemons', pokemon)


router.use('/types', tipos)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
