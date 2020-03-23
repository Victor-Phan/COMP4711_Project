const { messageModel, userModel } = require("../models");

exports.getSendMessagePage = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const userData = await userModel.getUserDetails(user_id);
        if(userData.length == 0) {
            throw new Error(`User not found: ${user_id}`);
        }
        //return res.render('messaging', {userData});
        return res.send(userData[0]);
    } catch (err) {
      next(err);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { id: sender_id } = req.session.user
        const {recipient_id, subject, message} = req.body;
        const e = {sender_id, recipient_id, subject, message};
        const result = await messageModel.insertMessage(e);
        return res.send(`Successfully sent message to user: ${recipient_id}`);
    } catch (err) {
      next(err);
    }
};