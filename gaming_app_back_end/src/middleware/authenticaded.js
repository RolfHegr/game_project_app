import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;
    const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = authenticatedUser;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};

export { authenticated };
