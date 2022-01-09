const dotenv = require("dotenv")
dotenv.config()

const express = require("express")

const routes = require("./routes")
const openDBConnection = require("./helpers/db")
const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI || "mongodb+srv://assassincode:assassincode170845@cluster0.abmvz.mongodb.net/db_yia?retryWrites=true&w=majority"

// const dbOptions = {
//     user: process.env.MONGO_USER,
//     pass: process.env.MONGO_PASS
// }

async function main() {
    try {
        // mastikan database connect, baru kita jalankan app.
        await openDBConnection(uri)

        const app = express()

        app.use(express.json()) // biar kita bisa ambil request body.

        // parsing requests data menjadi content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));

        app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

        app.use(routes)

        app.listen(port, () => {
            console.log("server is listening on port", port)
        })
        
    } catch (error) {
        console.log("main:", error)
    }
}

main() // menjalankan main.

