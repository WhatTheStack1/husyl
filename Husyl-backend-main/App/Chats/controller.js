const ChatModel = require('./model');
const MessageModel = require('../Messages/model');

module.exports = {
    Create: async (req, res) => {
        try {
            let chat = {}
            chat = await ChatModel.findOne({
                $or: [
                    {
                        $and: [
                            {
                                to: req.body.to
                            },
                            {
                                from: req.body.from
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                to: req.body.from
                            },
                            {
                                from: req.body.to
                            }
                        ]
                    }
                ]
            })
            if (chat) {
                return res.status(200).json({
                    status: "Successfull",
                    data: chat
                });
            }
            chat = await ChatModel.create(req.body);
            if (chat) {
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully created a chat",
                    data: chat
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to create a chat"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    Read: async (req, res) => {
        try {
            const id = req.params.id;
            const chat = await ChatModel.findOne({ _id: id });
            const user = req.decoded._id;
            await MessageModel.updateMany({
                chatId: id,
                user: {
                    $ne: user
                }
            }, {
                read: 'Yes'
            });
            // await Notification.updateMany({
            //     chat: id
            // }, {
            //     read: 'Yes'
            // });
            if (chat) {
                return res.status(200).json({
                    status: "Successfull",
                    data: chat
                });
            } else {
                return res.status(403).json({
                    status: "Failed",
                    message: "Chat not found"
                });
            }
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
            const update = await ChatModel.updateOne({ _id: id }, {
                $set: req.body
            });
            if (update.ok === 1) {
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully updated this chat"
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to update this chat"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            const remove = await ChatModel.remove({ _id: id }, {
                $set: req.body
            });
            if (remove.ok === 1) {
                return res.status(200).json({
                    status: "Successful;",
                    message: "Successfully deleted this chat"
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to delete this chat"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    List: async (req, res) => {
        try {
            const chats = await ChatModel.find({});
            return res.status(200).json({
                status: "Successful",
                data: chats
            })
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}