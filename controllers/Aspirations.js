const AspirationModel = require("../models/AspirationModel");
const { validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

class Aspirations {
  // static async createNewAspiration(req, res) {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     console.log("err: ", errors);
  //     res.status(400).json({
  //       message: "Request error",
  //       data: null,
  //     });
  //     return;
  //   }
  //   try {
  //     const body = req.body;
  //     const user_id = body.user_id;
  //     const category_id = body.category_id;
  //     const aspiration_description = body.aspiration_description;
  //     const aspiration_title = body.aspiration_title;
  //     const aspiration_image = body.aspiration_image;
  //     const aspiration = new AspirationModel({
  //       user_id: user_id,
  //       category_id: category_id,
  //       aspiration_title: aspiration_title,
  //       aspiration_description: aspiration_description,
  //       aspiration_image: aspiration_image,
  //     });
  //     const saved = await aspiration.save();
  //     res.status(201).send(saved);
  //   } catch (error) {
  //     res.status(500).send({ err: error });
  //   }
  // }

  static async createNewAspiration(req, res) {
    try {
      AspirationModel.create(req.body).then(function (dbAspiration) {
        res.json(dbAspiration);
      });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async createNewAspirationByUserId(req, res) {
    try {
      UserModel.create(req.body)
        .then(function (dbUser) {
          return AspirationModel.findOneAndUpdate(
            { _id: req.params.id },
            { user_id: dbUser._id },
            { new: true }
          );
        })
        .then(function (dbAspiration) {
          res.json(dbAspiration);
        });
    } catch (error) {
      res.json(error);
    }
  }

  static async getAllAspiration(req, res) {
    try {
      const aspirationList = await AspirationModel.find();
      res.status(200).send(aspirationList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  // static async getAspirationByID(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const aspirationList = await AspirationModel.findOne({
  //       _id: id,
  //     }).populate("user_id");
  //     res.status(200).send(aspirationList);
  //   } catch (error) {
  //     res.status(500).send({ err: error });
  //   }
  // }

  static async getAspirationByUserID(req, res) {
    try {
      AspirationModel.findOne({ _id: req.params.id })
        .populate("user_id")
        .then(function (dbAspiration) {
          res.json(dbAspiration);
        });
    } catch (error) {
      res.json(error);
    }
  }

  // static async updateAspiration(req, res) {
  //   try {
  //     // Ambil ID dari parameter
  //     const id = req.params.id;
  //     const body = req.body;
  //     const aspiration_description = body.aspiration_description;
  //     const aspiration_title = body.aspiration_title;
  //     const aspiration_image = body.aspiration_image;
  //     await AspirationModel.updateOne({
  //       aspiration_title: aspiration_title,
  //       aspiration_description: aspiration_description,
  //       aspiration_image: aspiration_image,
  //     });
  //     res.status(200).send({ message: "success" });
  //   } catch (error) {
  //     res.status(500).send({ err: error });
  //   }
  // }

  static async deleteAspiration(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await AspirationModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted ` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}
module.exports = Aspirations;
