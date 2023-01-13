const {Router} = require('express')
const router =  Router()
const axios = require('axios')
const {Type} = require('../db')


router.get('/', async (req, res) => {
    try{
        const type2create = await axios('https://pokeapi.co/api/v2/type', { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }).then(e => e.data.results);
        const typeCreate = await type2create.map(element => Type.findOrCreate({where: element.name}))
        const typeCreatedb = await Type.findAll()
        res.send(typeCreatedb)
    }catch(error){
        res.status(404).send({error: error.message});
    }
})


module.exports = router