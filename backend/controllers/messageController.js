import { Conversation } from "../models/conversationalModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let getConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!getConversation) {
      getConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      getConversation.message.push(newMessage._id);
    }

    await Promise.all([getConversation.save(), newMessage.save()]);
  } catch (error) {}
};
