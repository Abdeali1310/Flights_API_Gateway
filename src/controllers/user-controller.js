const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function signUp(req, res) {
  try {
    console.log(req.body);

    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.message = error.message;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function signIn(req, res) {
  try {
    // console.log(req.body);

    const user = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    errorResponse.message = error.message;
    return res.status(error.statusCode).json(errorResponse);
  }
}

async function addRoleToUser(req, res) {
  try {
    // console.log(req.body);

    const user = await UserService.addRoleToUser({
      role: req.body.role,
      id: req.body.id,
    });
    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    errorResponse.message = error.message;
    return res.status(error.statusCode).json(errorResponse);
  }
}


module.exports = {
  signUp,
  signIn,
  addRoleToUser
};
