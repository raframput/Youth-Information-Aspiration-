'use strict';
const express = require("express");
const favicon = require('express-favicon');

const methods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';

const bodyParser = require('body-parser')
const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// creates a new router instance.
const router = express.Router();
const server = http.createServer(router)

const User = require('../models/UsersModel');
const Discussion = require("../models/DiscussionsModel");
const CommentsModel = require("../models/CommentsModel");
const {Timestamp} = require('../helpers/timestamphelper');

const userRoutes = require("./UsersRoute");
const usergroupRoutes = require("./UserGroupsRoute");
const categoriesRoutes = require("./CategoriesRoute");
const aspirationRoutes = require("./AspirationsRoute");
const discussionRoutes = require("./DiscussionsRoute");
const newsRoutes = require("./NewsRoute");
const commentRoutes = require("./CommentsRoute");
const configurationRoutes = require("./ConfigurationsRoute");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/logo/assassinscode.png"));
});

router.use(favicon(__dirname + '../assets/logo/assassinscode.png'));

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
            res.setHeader('Access-Control-Allow-Methods', methods);

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });


const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: [methods],
    credentials: true
  }
});

let aspirationUserOnline = 1;

// Aspiration
io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ aspirationId }) => {
    socket.join(aspirationId);
    aspirationUserOnline++;
    io.emit("User Online", aspirationUserOnline);
    console.log("A user joined aspirationRoom: " + aspirationId);
  });

  socket.on("leaveRoom", ({ aspirationId }) => {
    socket.leave(aspirationId);
    aspirationUserOnline--;
    io.emit("User Online", aspirationUserOnline);
    console.log("A user left aspirationRoom: " + aspirationId);
  });

  socket.on("aspirationRoomMessage", async ({ aspirationId, discussion_description }) => {
    if (discussion_description.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newDiscussion = new Discussion({
        aspiration_id: aspirationId,
        user_id: socket.userId,
        discussion_description,
      });
      io.to(aspirationId).emit("newDiscussion", {
        discussion_description,
        name: user.name,
        userId: socket.userId,
      });
      await newDiscussion.save();
    }
  });
});

// 

router.use("/users", userRoutes)
router.use("/user-groups", usergroupRoutes)

router.use("/categories", categoriesRoutes)
router.use("/configuration", configurationRoutes)

router.use("/news", newsRoutes)
router.use("/comments", commentRoutes)

router.use("/aspirations", aspirationRoutes)
router.use("/discussions", discussionRoutes)

setInterval(()=>{
     io.to("clock-room").emit("time", new Date())
},1000)

module.exports = router;