import { Request, Response } from "express";
import Message from "../models/message.js";
import { messageValidationSchema } from "../validators/messageValidators.js";

export const submitMessage = async (req: Request, res: Response) => {
  try {
    const validationResponse = messageValidationSchema.safeParse(req.body);

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validationResponse.error.format(),
      });
    }
    const { name, email, phone, message } = validationResponse.data;

    await Message.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting message",
      error,
    });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error,
    });
  }
};
