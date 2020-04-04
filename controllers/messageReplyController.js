const { messageReplyModel } = require("../models");

exports.addMessageReply = async (req, res, next) => {
  try {
    const reply = req.body;
    await messageReplyModel.insertMessageReply(reply);
    return res.redirect(`/messages/${reply.message_id}`);
  } catch (err) {
    next(err);
  }
};
