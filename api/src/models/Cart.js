const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('cart', {
    state: {
      type: DataTypes.ENUM({
        values: ["created","processing","canceled","completed", "pending"]}),
      
      //allowNull: false
    }
    
    
  });
};