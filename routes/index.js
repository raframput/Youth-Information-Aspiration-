const express = require("express");
const bodyParser = require('body-parser')
const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// creates a new router instance.
const router = express.Router();

const userRoutes = require("./UsersRoute");
const usergroupRoutes = require("./UserGroupsRoute");
const categoriesRoutes = require("./CategoriesRoute");
const aspirationRoutes = require("./AspirationsRoute");
const discussionRoutes = require("./DiscussionsRoute");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/logo/assassinscode.png"));
});

router.get("/", (req, res) => {
  let ready =  `<div class="" align="center">
  <h1>Welcome to Our Final Development Project</h1>
    <br>
    <h2>by Assassin's Code Teams</h2>
    <br>
    <img src="/image.png">
  </div>
    `
  

  res.status(200).send(ready);
});

        //cek cors
        router.use(cors());

        // Add headers
        router.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });


router.use("/users", userRoutes)
router.use("/user-groups", usergroupRoutes)

router.use("/categories", categoriesRoutes)

router.use("/aspirations", aspirationRoutes)
router.use("/discussions", discussionRoutes)

module.exports = router;