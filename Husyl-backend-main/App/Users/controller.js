const UserModel = require('./model');
const SeekerModel = require('../JobSeeker/model');
const JobModel = require('../Jobs/model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const environment = require('dotenv')
const sgMail = require('@sendgrid/mail');

environment.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    Create: async (req, res) => {
        try {
            let {
                userName,
                firstName,
                lastName,
                email,
                password,
            } = req.body;
            email = email.toLowerCase();
            userName = userName.toLowerCase();
            let token = "", user = {};
            let existingAccount = await UserModel.findOne({ email: email });
            if (existingAccount) {
                return res.status(409).json({
                    status: "Error",
                    errorEmail: "Email already taken."
                });
            }
            existingAccount = await UserModel.findOne({ userName: userName }).count();

            if (existingAccount > 0) {
                return res.status(409).json({
                    status: "Error",
                    errUsername: "Username not available."
                });
            }
            user = await UserModel.create({
                userName: userName.toLowerCase(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            token = jwt.sign({ _id: user.id.toString() },
                process.env.TOKEN_SECRET,
                { expiresIn: "7 days" }
            );
            await UserModel.updateOne({ _id: user.id }, {
                token: token
            });
            user = await UserModel.findOne({ _id: user.id }, { password: 0, verificationCode: 0 });

            return res.status(200).json({
                status: "Successful!",
                message: "Successfully Registered as an user",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    Signup: async (req, res) => {
        try {
            let { userName, email, password, firstName, lastName } = req.body;
            let token = "", user = {};
            let existingAccount = await UserModel.findOne({ email: email });
            if (existingAccount) {
                return res.status(409).json({
                    status: "Error",
                    errEmail: "Email already taken."
                });
            }
            existingAccount = await UserModel.findOne({ userName: userName });
            if (existingAccount) {
                return res.status(409).json({
                    status: "Error",
                    errUserName: "Username already taken."
                });
            }
            user = await UserModel.create(
                {
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            )

            token = jwt.sign({ _id: user.id.toString() },
                process.env.TOKEN_SECRET,
                { expiresIn: "7 days" }
            );
            await UserModel.updateOne({ _id: user.id }, {
                token: token
            });

            user = await UserModel.findOne({ _id: user.id }, {
                password: 0
            })

            return res.status(200).json(JSON.stringify({
                status: "Successful!",
                message: "User Registered successfully.",
                data: user
            }))
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    Login: async (req, res) => {
        try {
            let token
            let { email, userName, password } = req.body

            if (email) email = email.toLowerCase()

            let user = await UserModel.findOne({
                $or: [
                    { email: email }, { userName: userName }
                ]
            })
            if (!user) {
                return res.status(409).json({
                    status: "Error",
                    message: "Invalid Email/Username"
                })
            } else {
                let isMatch = await user.comparePassword(password)
                if (!isMatch) {
                    return res.status(409).json({
                        status: "Error",
                        message: "Invalid Password"
                    })
                } else {
                    token = jwt.sign({ _id: user.id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "7 days" })
                }
                await UserModel.updateOne({ _id: user.id }, {
                    token: token,
                    authType: "simple"
                })
                user.token = token
                user.password = undefined
                return res.status(200).json({
                    status: "Successful",
                    message: "Successfully logged In.",
                    data: user
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    ForgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const existingAccount = await UserModel.findOne({ email: email }, { password: 0 })
            if (!existingAccount) {
                return res.status(403).json({
                    status: "Failed",
                    errEmail: "No such email exists."
                })
            }
            else {
                const verificationCode = jwt.sign({ _id: existingAccount._id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "12 hours" })
                await UserModel.updateOne({ _id: existingAccount._id }, {
                    changePasswordCode: verificationCode
                })
                const user = await UserModel.findOne({ _id: existingAccount._id }, { password: 0 })
                let message = ""
                message = '<h2 style="font-weight: 700; text-decoration: underline; text-align:center">Forgot Password Portal</h2><br>';
                message += `<h3><b>Dear ${user.userName}!</b></h3><br>` +
                    `<p>Welcome to Husyl Change Password Portal. Kindly click down to set up your new password within 12 hours otherwise send a new link for registering: ${email}</p>`;
                message += `<a style="background-color: #636cff; padding: 10px 20px; color: white; border: none; border-radius: 8px;" href="${process.env.BASE_URL}/#/changepassword?email=${email}&token=${user.changePasswordCode}" target="_blank">Set Credentials</a>` +
                    '<br><p><b>Regards:</b></p><br><p>Husyl</p><br>';
                const msg = {
                    to: user.email,
                    from: process.env.SENDER_EMAIL,
                    subject: `Husyl: Forgot Password`,
                    text: message,
                    html: message
                };
                await sgMail.send(msg);
                return res.status(200).json({
                    status: "Successfull",
                    message: "Change Password link has been sent to your email. Use the the link to change Password."
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    ChangePassword: async (req, res) => {
        try {
            let { email, password } = req.body
            const newPassword = bcrypt.hashSync(password, 10)
            const user = await UserModel.findOne({ email: email }, { password: 0 })
            if (!user) {
                return res.status(403).json({
                    status: "Failed",
                    errEmail: "No such account registered."
                })
            } else {
                await UserModel.updateOne({ email: email }, {
                    password: newPassword
                })
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully updated password. Please Login with new password."
                })
            }

        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    UpdatePassword: async (req, res) => {
        try {
            const id = req.params.id
            const { oldPassword, newPassword } = req.body
            let user = await UserModel.findOne({ _id: id })
            const isMatch = await user.comparePassword(oldPassword)
            if (!isMatch) {
                return res.status(403).json({
                    status: "Failed",
                    errOldPassword: "Password does not match with old one."
                })
            }
            const password = bcrypt.hashSync(newPassword, 10)
            await UserModel.updateOne({ _id: id }, { password: password })
            user = await UserModel.findOne({ _id: id }, { password: 0 })
            return res.status(200).json({
                status: "Successfull",
                message: "Your new password has been set.",
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    ApplyForJob: async (req, res) => {
        try {
            const { userId, jobId } = req.body
            let requirements = []
            let job = await JobModel.findOne({ _id: jobId })
            requirements = job.requirements
            const user = await SeekerModel.findOneAndUpdate({ seeker: userId }, {
                jobRequirements: requirements
            })
            job = await JobModel.findOneAndUpdate({ _id: jobId }, {
                $push: { applicants: user }
            })
            return res.status(200).json({
                status: "Successfull",
                message: "You have Successfully applied for the Job.",
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id
            let seeker
            let user = {}
            user = await UserModel.findOne({ _id: id })
            if (user.userType == null) {
                user = await UserModel.updateOne({ _id: id }, {
                    $set: req.body
                });
            }
            else if (user.userType === 'Employee') {
                seeker = await SeekerModel.findOne({ seeker: id })
                if (seeker) {
                    user = await SeekerModel.updateOne({ seeker: id }, {
                        $set: req.body
                    })
                }
                else {
                    seeker = await SeekerModel.create(req.body)
                }
            } else {
                user = await UserModel.updateOne({ _id: id }, {
                    $set: req.body
                });
            }
            if (user.ok === 1 || seeker) {
                user = await UserModel.findOne({ _id: id }, { password: 0 });
                return res.status(200).json({
                    status: "Updated",
                    message: "Successfully Updated your Account Information",
                    data: user
                });
            }
            else {
                return res.status(409).json({
                    status: "Failed",
                    message: "Something went wrong"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    Read: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({ _id: id }, { password: 0 });
            return res.status(200).json({
                status: 'Successful',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    GetSeekers: async (req, res) => {
        try {
            const category = req.query.category;
            let users = [];
            let seekers = [];
            if (!category) {
                seekers = await UserModel.find({ role: 'Seeker' });
            }
            else {
                users = await UserModel.find({ role: 'Seeker' });
                seekers = users.filter(user => user.jobSeeker.category === category);
            }
            return res.status(200).json({
                status: 'Successful',
                data: seekers
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    },
    GuestSeekers: async (req, res) => {
        try {
            let seekers = [];
            seekers = await UserModel.find({ role: 'Seeker' }).limit(6);
            return res.status(200).json({
                status: 'Successful',
                data: seekers
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}