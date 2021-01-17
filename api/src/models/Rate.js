const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('rate', {
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    }


  });
};
