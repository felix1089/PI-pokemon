const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// [ ] Pokemon con las siguientes propiedades:
// 1 - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// 2 - Nombre *
// 3 - Vida
// 4 - Ataque -
// 5 - Defensa -
// 6 - Velocidad -
// 7 - Altura -
// 8 - Peso

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id : {
      type: DataTypes.INTEGER, 
      allowNull: false, //
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp:{
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    speed:{
      type: DataTypes.INTEGER,
    },
    height:{
      type: DataTypes.INTEGER,
    },
    weight:{
      type: DataTypes.INTEGER,
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createInDb:{
      type: DataTypes.BOOLEAN, // esta propiedad me va servir para llamar a db(distincion de db/api)
      defaultValue: true, 
      allowNull: true,  
    }
  });
};
