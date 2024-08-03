'use strict';
const {
  Model
} = require('sequelize');
const { enums } = require('../utils/common');
const {CUSTOMER,ADMIN,FLIGHT_COMPANY} = enums.USER_ROLES;

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Users,{through:'User_Roles',as:'users'})

    }
  }
  Roles.init({
    name: {
      type:DataTypes.ENUM,
      values:[CUSTOMER,ADMIN,FLIGHT_COMPANY],
      defaultValue:CUSTOMER,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};