const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Line_Order = sequelize.define('LineOrder', {
    
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false      }
      
    
    });
  };