const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
  });


};








