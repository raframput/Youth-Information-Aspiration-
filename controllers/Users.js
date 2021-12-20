// Import Model UserModel
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = (req, res) => {
  try{
    User.find({
      where:{
        email: req.body.email
      }
    })
    const match = bcrypt.compare(req.body.password, User[0].password)
    if(!match) return res.status(400).json({msg: "Wrong Password"})
      const _id = User[0]._id
      const name = User[0].name
      const email = User[0].email
      const accessToken = jwt.sign({_id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '20s'
      })
      const refreshToken = jwt.sign({_id, name, email}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
      })
      User.findOneAndUpdate({refresh_token: refreshToken},{
        where:{
          _id: _id
        }
      })
      res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken })
  }catch(e){
    res.status(404).json({msg: "Email tidak ditemukan"})
  }

};

exports.Logout = (req, res) => {
  const refreshToken = req.cookie.refreshToken
  if(!refreshToken) return res.status(204)
      const user = User.find({
        where:{
          refresh_Token: refreshToken
        }
      })
  if(!user[0]) return res.status(204)

  const _id = user[0]._id
  User.findOneAndUpdate({refresh_Token: null},{
    where:{
      _id: _id
    }
  })
  res.clearCookie('refreshToken')
  return res.status(200)
};

// Baca semua data
exports.listAllUsers = (req, res) => {
  User.find({}, (err, User) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(User);
  }).populate('user_group');
};

// Tambah data dengan validasi
exports.createNewUser = (req, res) => {
  const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      user_group: req.body.user_group,  
  });

  newUser.save((err, newUser) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(newUser);
  });

};

// Baca data berdasarkan id
exports.readUser = (req, res) => {
  User.findById(req.params.userid, (err, User) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(User);
  });
};

// Ubah data berdasarkan id
exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userid },
    req.body,
    { new: true },
    (err, User) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: 'User successfully Updated' });
    }
  );
};

// Hapus data berdasarkan id
exports.deleteUser = (req, body) => {
  User.remove({ _id: req.params.userid }, (err, User) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'User successfully deleted' });
  });
};
