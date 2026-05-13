import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId; // Authenticated user ID
  const chatId = req.params.chatId; // Chat ID from request params
  const text = req.body.text; // Message text from request body

  try {
    // Verify if the chat exists and the user is part of it
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true, // Assuming Chat has a `users` relation
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Check if the authenticated user is part of the chat
    const isUserInChat = chat.users.some((user) => user.id === tokenUserId);
    if (!isUserInChat) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    // Add the new message to the chat
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // Update the chat with the last message and reset seenBy
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: text,
        seenBy: {
          set: [tokenUserId], // Assuming `seenBy` is a list of user IDs
        },
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
