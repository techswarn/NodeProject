//try catch and async-await || use promise everywhere
module.exports = fn => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
