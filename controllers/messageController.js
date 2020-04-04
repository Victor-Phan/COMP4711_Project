const { messageModel, messageReplyModel, userModel } = require("../models");
const { emailHandler } = require("../utils");

const messagePageCSS = { messagingCSS: true, navbarCSS: true };
const conversationsPageCSS = { conversationsCSS: true, navbarCSS: true };

exports.getSendMessagePage = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (user_id === req.session.user.id) {
      return res.redirect("/messages");
    }
    const userData = await userModel.getUserDetails(user_id);
    if (userData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }
    return res.render("messaging", { user: userData[0], ...messagePageCSS });
  } catch (err) {
    next(err);
  }
};

exports.getUserMessages = async (req, res, next) => {
  try {
    const { id: user_id } = req.session.user;

    const messages = await messageModel.getFirstMessageForUser(user_id);

    return res.redirect(
      `/messages/${messages.length === 0 ? 0 : messages[0].id}`
    );
  } catch (err) {
    next(err);
  }
};

exports.getConversationPage = async (req, res, next) => {
  try {
    const { message_id } = req.params;
    const { id: user_id } = req.session.user;

    if (message_id == 0) {
      return res.render("conversations", conversationsPageCSS);
    }

    const messages = await messageModel.getAllMessagesForUser(user_id);

    const selectedMessageData = await messageModel.getMessage(message_id);

    const rawMessageReplies = await messageReplyModel.getAllMessageReplies(
      message_id
    );

    const messageReplies = [selectedMessageData[0], ...rawMessageReplies];

    return res.render("conversations", {
      messages,
      messageReplies,
      selectedMessage: selectedMessageData[0],
      ...conversationsPageCSS,
    });
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

    const senderData = await userModel.getUserDetails(sender_id);
    if (senderData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }

    const receiverData = await userModel.getUserDetails(recipient_id);
    if (receiverData.length == 0) {
      throw new Error(`User not found: ${user_id}`);
    }

    await messageModel.insertMessage(e);

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
