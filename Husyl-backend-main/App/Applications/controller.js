const SeekerModel = require('../JobSeeker/model');
const JobModel = require('../Jobs/model');
const ApplicationModel = require('../Applications/model');

module.exports = {
    Create: async (req, res) => {
        try {
            const user = req.decoded._id;
            const { job, requirements } = req.body;

            const application = await ApplicationModel.create({
                job: job,
                applicant: user,
                requirements: requirements
            })

            await JobModel.updateOne({ _id: job }, {
                $push: { applicants: user }
            })

            return res.status(200).json({
                status: "Successfull",
                message: "You have successfully applied for the Job.",
                data: application
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
            const id = req.params.id //jobId
            let applications = await ApplicationModel.find({ job: id, flag: true })
            if (applications.length === 0) {
                return res.status(409).json({
                    status: "Failed",
                    message: "You haven't received any applications for this job."
                })
            } else {
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully fetched applications for the job",
                    data: applications
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id
            let application = await ApplicationModel.findOne({ _id: id })
            if (!application) {
                return res.status(409).json({
                    status: "Error",
                    message: "Application doesn't exist"
                })
            }
            application = await ApplicationModel.findOneAndUpdate({ _id: id, flag: true }, { flag: false }, { new: true });
            return res.status(202).json({
                status: "Successfull",
                message: "Application deleted successfully",
                data: application
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    ReadByUser: async (req, res) => {
        try {
            const { user, job } = req.params;
            const application = await ApplicationModel.findOne({
                applicant: user,
                job: job
            });
            return res.status(200).json({
                status: "Successful",
                data: application
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    UpdateStatus: async (req, res) => {
        try {
            const id = req.params.id;
            await ApplicationModel.updateOne({ _id: id }, {
                $set: req.body
            });
            const application = await ApplicationModel.findOne({ _id: id });
            const { status } = req.body;
            if (status === 'Approved') {
                await JobModel.updateOne({ _id: application.job._id }, {
                    $push: {
                        approvedUsers: application.applicant._id
                    }
                });
            }
            return res.status(200).json({
                status: "Successful",
                message: "Successfully updated application status",
                data: application
            });
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    }
}