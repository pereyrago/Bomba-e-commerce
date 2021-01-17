const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('checkout', {
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
      },
    apartament: {
        type: DataTypes.STRING,
        allowNull: false
      },
    street: {
        type: DataTypes.STRING,
        allowNull: false
      },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true
      },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
  });
};