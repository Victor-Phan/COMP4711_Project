const { messageModel, userModel } = require("../models");
const { emailHandler } = require("../utils");

const messagePageCSS = { messagingCSS: true, navbarCSS: true };

exports.getSendMessagePage = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const userData = await userModel.getUserDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }
    return res.render("messaging", { user: userData[0], ...messagePageCSS });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { id: sender_id } = req.session.user;
    const { user_id: recipient_id } = req.params;
    const { subject, message } = req.body;
    const e = { sender_id, recipient_id, subject, message };
    await messageModel.insertMessage(e);
    return res.redirect(`/sendmessage/${recipient_id}`);
  } catch (err) {
    next(err);
  }
};

exports.sendEmailMessage = async (req, res, next) => {
  try {
    const { id: sender_id } = req.session.user;
    const { subject, message } = req.body;
    const { user_id: recipient_id } = req.params;
    const e = { sender_id, recipient_id, subject, message };
    await messageModel.insertMessage(e);
    const senderData = await userModel.getUserDetails(sender_id);
    if (senderData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }
    const receiverData = await userModel.getUserDetails(recipient_id);
    if (receiverData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }

    const mailOptions = {
      to: receiverData[0].email,
      subject: `From: ${senderData[0].email}: ` + e.subject,
      text: e.message,
    };

    await emailHandler.sendEmail(mailOptions);

    return res.redirect(`/profile/${recipient_id}`);
  } catch (err) {
    next(err);
  }
};
