const ChatModel = require('../Chats/model');
const MessageModel = require('./model');

module.exports = {
    Create: async (req, res) => {
        try {
            const { text, user, chatId } = req.body
            const message = await MessageModel.create({ chatId: chatId, user: user, text: text })

            if (message) {
                await MessageModel.updateMany({
                    chatId: chatId,
                    user: {
                        $ne: user._id
                    }
                }, {
                    read: 'Yes'
                })
                await ChatModel.updateOne({ _id: chatId }, {
                    $push: {
                        messages: message.id
                    }
                })
                const responseMessage = await MessageModel.findOne({ _id: message.id });
                return res.status(200).json({
                    status: "Successful",
                    message: "Successfully created a message",
                    data: responseMessage
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to create a message"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    List: async (req, res) => {
        try {
            const messages = await MessageModel.find({});
            if (messages) {
                return res.status(200).json({
                    status: "Successful",
                    data: messages
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to fetch messages"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    ListByChat: async (req, res) => {
        try {
            const chat = req.params.chatId
            const messages = await MessageModel.find({ chatId: chat });
            if (messages) {
                return res.status(200).json({
                    status: "Successful",
                    data: messages
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to fetch messages"
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
            const id = req.params.id
            const message = await MessageModel.findOne({ _id: id })
            const remove = await MessageModel.remove({ _id: id }, {
                $set: req.body
            })

            if (remove.ok === 1) {
                await ChatModel.updateOne({ _id: message.chatId }, {
                    $pull: {
                        messages: id
                    }
                })
                return res.status(200).json({
                    status: "Successful",
                    message: "Successfully deleted this message"
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Unable to deleted this message"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
    Update: async (req, res) => {
        try {
            const chat = req.params.id;
            const user = req.decoded._id;
            let messages = await MessageModel.updateMany({
                chatId: chat,
                user: user
            }, {
                read: 'Yes'
            });
            return res.status(200).json({
                data: messages,
                message: 'Message read.'
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    }
}