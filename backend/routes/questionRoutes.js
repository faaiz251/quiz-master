import express from "express";
import genAI from "../config/gemini.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const questionRoutes = express.Router();

questionRoutes.post("/get-question", authenticateUser, async (req, res) => {
  const { level } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const COST = 5;
    if (user.currency < COST) {
      return res.status(403).json({ message: "Not enough currency" });
    }

    user.currency -= COST;
    await user.save();

    const difficultyPrompt = {
      easy: "Create a very simple multiple-choice general knowledge question with 4 options.",
      medium:
        "Create a medium-level multiple-choice question related to science or history with 4 options.",
      hard: "Create a tough multiple-choice question with 4 options.",
    };

    const prompt = difficultyPrompt[level] || difficultyPrompt.medium;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const aiQuestion = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiQuestion) {
      return res.status(500).json({ message: "Failed to generate question" });
    }

    res.status(200).json({ question: aiQuestion, currency: user.currency });
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to generate question", error: err.message });
  }
});

export default questionRoutes;
