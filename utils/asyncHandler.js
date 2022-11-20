module.exports = promise => {
  return (req, res, next) => {
    promise(req, res, next).catch(err => next(err));
  };
};
