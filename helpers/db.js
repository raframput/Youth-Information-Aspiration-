const mongoose = require("mongoose")

async function openDBConnection(uri, options) {
    return mongoose.connect(uri, options);
}

module.exports = openDBConnection