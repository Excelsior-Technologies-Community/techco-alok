const ContactMessage = require("../Models/ContactMsg");

const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting form",
    });
  }
};

const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: "Reply is required",
      });
    }

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    message.reply = reply;
    message.repliedAt = new Date();
    message.status = "Replied";

    await message.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error! Message not sent",
    });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { email } = req.query;

    const messages = await ContactMessage.find({ email }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user messages",
    });
  }
};

const updateMsgStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    res.json(201).json({
      success: true,
      message: "Status Updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status",
    });
  }
};

const deleteMsg = async (req, res) => {
  try {
    const { id } = req.params;

    await ContactMessage.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Message Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
    });
  }
};

module.exports = {
  submitMessage,
  getAllMessage,
  updateMsgStatus,
  deleteMsg,
  replyToMessage,
  getUserMessages,
};
