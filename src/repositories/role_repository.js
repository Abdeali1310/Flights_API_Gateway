const CrudRepository = require("./crud-repository");
const AppError = require("../utils/error/app-error");

const { Roles } = require("../models");

class RolesRepository extends CrudRepository {
  constructor() {
    super(Roles);
  }

  async getRoleByName(name) {
    const role = await Roles.findOne({ where: { name: name } });
    return role;
  }
}

module.exports = RolesRepository;
