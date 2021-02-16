const JobSeeker = require('./model');
const Users = require('../Users/model');

module.exports = {
    Create: async (req, res) => {
        try {
            const userId = req.decoded._id;
            const jobSeeker = await JobSeeker.create(req.body);
            await Users.updateOne({ _id: userId }, {
                $set: {
                    jobSeeker: jobSeeker.id,
                    role: 'Seeker'
                }
            });
            const user = await Users.findOne({ _id: userId }, { password: 0 });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully added job seeker details.",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    Update: async (req, res) => {
        try {
            const id = req.params.id;
            await JobSeeker.updateOne({ _id: id }, {
                $set: req.body
            });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully updated your seeker details."
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}