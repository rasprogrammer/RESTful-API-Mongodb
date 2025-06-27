const fs = require("fs");

const logReqRes = async (req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
        (err, data) => {
            next();
        }
    )
}

module.exports = { logReqRes };