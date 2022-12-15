const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('type', {
    id : {
      type: DataTypes.UUID, 
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,        
      allowNull: false,
    },

  });
};