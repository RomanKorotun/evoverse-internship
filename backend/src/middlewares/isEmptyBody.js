import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  if (!req.body || typeof req.body !== "object") {
    return next(HttpError(400, "missing body"));
  }

  const items = Object.keys(req.body);

  if (items.length === 0) {
    return next(HttpError(400, "missing fields"));
  }

  next();
};

export default isEmptyBody;
