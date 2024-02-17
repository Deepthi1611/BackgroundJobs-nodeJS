let host = process.env.REDIS_HOST
let port = process.env.REDIS_PORT

module.exports = {
    url: `redis://${host}:${port}`,
    host: host,
    port: port,
    db:0
}