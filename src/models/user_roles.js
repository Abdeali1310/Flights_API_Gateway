'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Roles.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Users',  // name of the User model
        key: 'id'        // key in the Users model
      },
    },
    roleId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Roles',  // name of the Role model
        key: 'id'        // key in the Roles model
      },
    },
  }, {
    sequelize,
    modelName: 'User_Roles',
  });
  return User_Roles;
};