const { messageModel, userModel } = require("../models");
const { emailHandler } = require("../utils");

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

exports.sendEmailMessage = async (req, res, next) => {
    try {
        const { id: sender_id } = req.session.user
        const {recipient_id, subject, message} = req.body;
        const e = {sender_id, recipient_id, subject, message};
        await messageModel.insertMessage(e);
        const senderData = await userModel.getUserDetails(sender_id);
        if(senderData.length == 0) {
            throw new Error(`User not found: ${user_id}`);
        }
        const receiverData = await userModel.getUserDetails(recipient_id);
        if(receiverData.length == 0) {
            throw new Error(`User not found: ${user_id}`);
        }
        const mailOptions = {
            to: receiverData[0].email,
            subject: `From: ${senderData[0].email}: ` + e.subject,
            text: e.message
        };
        
        await emailHandler.sendEmail(mailOptions);

        return res.send(`Successfully sent email to user: ${recipient_id}`);
    }catch(err) {
        next(err);
    }
};