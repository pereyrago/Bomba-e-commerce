const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      //allowNull: false,
      isAlphanumeric: true,
    },
    rol: {
      type: DataTypes.ENUM({
        values: ["admin","user", "guest"]}),
        allowNull: false,
    },
    reset:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ban:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    googleId: {
      type: DataTypes.STRING
    },
    facebookId: {
      type: DataTypes.STRING
    }   
  });
};