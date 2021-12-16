const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors");

const routes = require("./routes")
const openDBConnection = require("./helpers/db")

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

        //memastikan cors berjalan dengan baik
        var corsOptions = {
          origin: `http://localhost:${port}`
        };

        //cek cors
        app.use(cors(corsOptions));

        app.use(express.json()) // biar kita bisa ambil request body.

        // parsing requests data menjadi content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));

        app.use(routes)

        app.listen(port, () => {
            console.log("server is listening on port", port)
        })
        
    } catch (error) {
        console.log("main:", error)
    }
}

main() // menjalankan main.

