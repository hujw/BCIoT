module.exports = function ErrorDecorator (f) {
  return async function (req, res, next) {
    try {
      await f(req, res)
    } catch (err) {
      next(err)
    }
  }
}
