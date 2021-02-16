const JobModel = require('./model');
const UserModel = require('../Users/model');
const getHours = require('../../Functions/getHours');

module.exports = {
    Create: async (req, res) => {
        try {
            let job = {}
            const user = await UserModel.findOne({ _id: req.decoded._id });

            req.body.user = user.id;
            job = await JobModel.create(req.body);

            return res.status(200).json({
                status: "Successful!",
                message: "Job posted successfully.",
                data: job
            })

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    List: async (req, res) => {
        try {
            let jobs = [];
            jobs = await JobModel.find({});
            return res.status(200).json({
                status: "Successful",
                data: jobs
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    ListByUser: async (req, res) => {
        try {
            const userId = req.decoded._id
            let jobs = [];
            jobs = await JobModel.find({ user: userId })
            return res.status(200).json({
                status: "Successfull.",
                message: "Following are your posted jobs:",
                data: jobs
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Read: async (req, res) => {
        try {
            const jobId = req.params.id
            const job = await JobModel.findOne({ _id: jobId })
            if (!job) {
                return res.status(409).json({
                    status: "Error",
                    message: "Invalid ID. No such data exists."
                })
            }
            return res.status(200).json({
                status: "Successful.",
                message: "Here's the job you asked for:",
                data: job
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Search: async (req, res) => {
        try {
            const { searchString } = req.body
            let searchedJobs = await JobModel.find({
                flag: true,
                $text: { $search: searchString }
            })

            if (searchedJobs.length === 0) {
                return res.status(409).json({
                    status: "Error",
                    message: "Couldn't find related jobs."
                })
            }
            return res.status(200).json({
                status: "Successfull.",
                message: "Here's the jobs you asked for:",
                data: searchedJobs
            })

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            let job = await JobModel.findOne({ _id: id });
            if (!job) {
                return res.status(409).json({
                    status: "Error",
                    message: "Job not found."
                })
            }
            job = await JobModel.findOneAndUpdate({ _id: id, flag: true }, { flag: false, status: 'Deleted' }, { new: true });
            return res.status(202).json({
                status: "Successfull",
                message: "Job deleted successfully",
                data: job
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Update: async (req, res) => {
        try {
            let id = req.params.id;
            let job = {};
            job = await JobModel.findOne({ _id: id, flag: true })
            if (job.applicants === 0) {
                job = await JobModel.updateOne({ _id: id, flag: true }, {
                    $set: req.body
                });
                if (job.ok === 1) {
                    user = await JobModel.findOne({ _id: id });
                    return res.status(200).json({
                        status: "Updated",
                        message: "Successfully Updated Job Information.",
                        data: job
                    });
                }
                else {
                    return res.status(409).json({
                        status: "Failed",
                        message: "Something went wrong"
                    });
                }
            } else {
                return res.status(409).json({
                    status: "Failed",
                    message: "Cannot change information now."
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    GuestJobs: async (req, res) => {
        try {
            let jobs = [];
            jobs = await JobModel.find({}).limit(6);
            return res.status(200).json({
                status: 'Successful',
                data: jobs
            })
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}