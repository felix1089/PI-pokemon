const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Pokemon, Type} = require('../db');



router.get('/', async(req, res) =>{// estoy accediendo a /pokemons/
    const {name} = req.query;
    try{
        if(name){
         //   console.log(0)
            const reSultado = await Pokemon.findOne({where: {name: name.toLowerCase()}},{
                include:{
                    model: Type,
                    attributes:['name'],
                    through:{attributes: []}
                    
                }
            })
       //     console.log(1)
            
        if(reSultado !== null)res.send(reSultado)

        else{
            const poKe = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`).then(e => e.data).then(e => {
                let poKe1 = {
                    id: e.id,
                    name: e.name,
                    image: e.sprites.other.home.front_default,
                    attack: e.stats[1].base_stat,
                    types: e.types.map(r => r.type)
                }
                return poKe1
            })
                res.send(poKe)
        }
        }
        else{
           // console.log(2)
            const infoApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0', { 
                headers: { "Accept-Encoding": "gzip,deflate,compress" } 
            }).then(e => {
                //console.log(e.data);
                return e.data
            }).then(e => e.results);
         //   console.log(3)
            const poKe2 = infoApi.map((e) => axios(e.url,{ 
                headers: { "Accept-Encoding": "gzip,deflate,compress" } 
            })
            .then(e => e.data).then(e => {
                let poKe1 = {
                    id: e.id,
                    name: e.name,
                    image: e.sprites.other.home.front_default,
                    attack: e.stats[1].base_stat,
                    types: e.types.map(r => r.type)
                }
                return poKe1
            }))
         //   console.log(4)
        
            const prome = await Promise.all(poKe2)
           // console.log(5)
            const pokeDb = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes:['name'],
                    through:{
                        attributes:[] 
                    }
                }
            })
        
        //    console.log(6)
            const allPoke = prome.concat(pokeDb)
          //  console.log(7)

            res.status(200).send(allPoke)
        }
        
    }catch(error){
       // console.log(error)
        res.status(404).send({mensaje: error.message})
    }
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try{
        if(id > 905){
            const vaLor1 = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: { attributes: [] },
                },
            });
            res.send(vaLor1);
        }else{
            const vaLor2 = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(e => e.data)
            .then(e => { 
                let poKe3 = {
                    id: e.id,
                    name: e.name,
                    image: e.sprites.other.home.front_default,
                    types: e.map(r => r.type),
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight, 
                }
                return poKe3;
            })
            res.send(vaLor2);
        }
    }catch(error){
        res.status(404).send(error.message);
    }
})

let id = 906;

router.post('/', async (req, res) => {
    const {id, name, hp, attack, defense, speed, height, weight, image, createInD, type } = req.body;
    if(!name) res.status(404).send('Faltan Completar los Datos Obligatorios');
    try{
        const creaNewpoke = await Pokemon.create({id, name, hp, attack, defense, speed, height, weight, image, createInD});
         id++;
        const tiposdb = await type?.map(t => Type.findOne({where: {name:t}}))
        const mosTrardb = Promise.all(tiposdb)
        mosTrardb?.map(t => creaNewpoke.addType(t))
        const poKendb = await Pokemon.findOne({where: {name : name},
            include:{
                model: Type,
                attributes:['name'],
                throug:{
                   attributes:[]
                }
              
            }
          })
          res.status(201).send(poKendb);
    }catch(error){
        res.status(404).send(error.message)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Pokemon.destroy({ where: { id: id } });
    res.status(200).send("pokemon is delete");
  });



module.exports = router