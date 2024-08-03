const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { UserService } = require("../services");

const validateAuthRequest = (req, res, next) => {
  if (!req.body.email) {
    errorResponse.message = "Something broke while Creating Booking";
    errorResponse.error = new AppError(
      "Email is required",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.password) {
    errorResponse.message = "Something broke while Creating Booking";
    errorResponse.error = new AppError(
      "Password is required",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

async function checkAuth(req, res, next){
  try {
    const response = await UserService.isAuthenticated(req.headers['x-access-token']);
    if (response) {
      req.user = response; //for future use, to know the user id just like session variable
      next();
    }
  } catch (error) {
    console.log('middleware error',error);
    
    return res.status(error.statusCode).json(error);
  }
};

async function isAdmin(req,res,next){
  const response = await UserService.isAdmin(req.user);
  if(!response){
    return res.status(StatusCodes.UNAUTHORIZED).json('User not Authorized for this action');
  }
  next();
}
module.exports = { validateAuthRequest, checkAuth,isAdmin };
