const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('image', {

      imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
};


