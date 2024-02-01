import NotFound from "../errors/NotFound.js";

function notFoundHandler(req, res, next) {
  const notFound = new NotFound();
  next(notFound);
}

export default notFoundHandler;
