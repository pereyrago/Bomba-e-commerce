const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('payment', {
    
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    status: {
        type: DataTypes.STRING,
        allowNull: false
      },
    preference_id	: {
        type: DataTypes.STRING,
        allowNull: false
      },
    merchant_order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false      
          }   
    })   
  };