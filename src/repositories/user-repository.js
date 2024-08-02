const CrudRepository = require("./crud-repository");
const AppError = require("../utils/error/app-error");

const { Users } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(Users);
  }
}

module.exports = UserRepository;
