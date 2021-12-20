// Import Model UserModel
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.refreshToken = (req, res) => {
	try{
		const refreshToken = req.cookie.refreshToken
		if(!refreshToken) return res.sendStatus(401)
			const user = User.findAll({
				where:{
					refresh_Token: refreshToken
				}
			})
		if(!user[0]) return res.sendStatus(403)
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if(err) return res.sendStatus(403)
				const _id = user[0]._id
				const name = user[0].name
				const email = user[0].email
				const accessToken = jwt.sign(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
					expiresIn: '15s'
				})
				res.json({ accessToken })
		})
	}catch(e){
		console.log(e)
	}

}
