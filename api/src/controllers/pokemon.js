const {Pokemon, Type}= require('../db');
const axios = require('axios');
const {getPokemons}= require('../url');

const getinfo = async () => {
    const infoapi1 = await axios.get(getPokemons);
    const infoapi2 = await axios.get(infoapi1.data.next);
    const infoapi = infoapi1.data.results.concat(infoapi2.data.results);

    try {
        const resultado = infoapi.map(e => axios.get(e.url))
        let poke = Promise.all(resultado)
        .then(e => {
            let poke1 = e.map(e => e.data);
            let pokeAlls = [];
            poke1.map(e => {
                pokeAlls.push({
                    id: e.id,
                    name: e.name,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    types: e.types.length === 1 ? [{name :e.types[0].type.name}] : [{name :e.types[0].type.name}, {name :e.types[1].type.name}]
                })
                
            })

            return pokeAlls
        })
            return poke
    }catch (err) {
        next(err);
        console.log(err)
    }
};

const getInfodb = async () => {
    return await Pokemon.findAll({
        incluide: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes:[],

            },
        },
    });
};

const getAllinfo = async () => {
    const apiInfo = getinfo();
    const dbInfo = getInfodb();
    const totalInfo = dbInfo.concat(apiInfo);
};

const getClone =


module.exports = {
    getinfo,
    getAllinfo,
    getInfodb,
}


