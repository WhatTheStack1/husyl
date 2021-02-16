const jwt = require('jsonwebtoken');
const environment = require('dotenv');

const UsersModel = require('../App/Users/model');

environment.config()

const authenticateToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        const user = await UsersModel.findOne({ _id: req.decoded._id }, { password: 0 });
        if (!user) {
          return res.status(401).json({
            status: "Failed",
            message: "Account doesn't exist"
          });
        } else {
          next();
        }
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

// const decryptPasswordToken = async (req, res, next) => {
//     const { verificationCode } = req.body;
//     if (verificationCode) {
//       jwt.verify(verificationCode, process.env.TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//           return res.json({
//             success: false,
//             errCode: 'Request verification is not valid or is Expired'
//           });
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: 'Not authorized, try visiting again from the link in email.'
//       });
//     }
//   }


exports.authenticateToken = authenticateToken
// exports.decryptPasswordToken = decryptPasswordToken;