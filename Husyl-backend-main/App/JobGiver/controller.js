const JobGiver = require('./model');
const Users = require('../Users/model');

module.exports = {
    Create: async (req, res) => {
        try {
            const userId = req.decoded._id;
            const jobGiver = await JobGiver.create(req.body);
            await Users.updateOne({ _id: userId }, {
                $set: {
                    jobGiver: jobGiver.id,
                    role: 'Giver'
                }
            });
            const user = await Users.findOne({ _id: userId }, { password: 0 });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully added job giver details.",
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
            await JobGiver.updateOne({ _id: id }, {
                $set: req.body
            });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully updated your giver details."
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}