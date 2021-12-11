const express = require("express")



// creates a new router instance.
const router = express.Router()

router.get("/ping", (req, res) => {
    const ready = {
        status: "server is ready"
    }

    res.status(200).send(ready)
})



module.exports = router