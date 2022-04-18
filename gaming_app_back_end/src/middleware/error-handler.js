import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((errorsObj) => errorsObj.message)
      .join(", ");
    // defaultError.msg = err.message
  } if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  // res.status(defaultError.statusCode).json({ msg: err });
};

export default errorHandlerMiddleware;
