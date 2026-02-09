import express from "express";
import { z } from "zod";

import prisma from "../lib/db.js";
import { authRequired } from "../lib/auth.js";

const router = express.Router();

const quizSchema = z.object({
  courseId: z.string().min(1),
  score: z.number().min(0),
  maxScore: z.number().min(1)
});

router.post("/submit", authRequired, async (req, res) => {
  try {
    const data = quizSchema.parse(req.body);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.user.id,
        courseId: data.courseId,
        score: data.score,
        maxScore: data.maxScore
      }
    });

    return res.json(attempt);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error(error);
    return res.status(500).json({ error: "Ошибка сохранения теста" });
  }
});

router.get("/attempts", authRequired, async (req, res) => {
  const attempts = await prisma.quizAttempt.findMany({
    where: { userId: req.user.id }
  });
  res.json(attempts);
});

export default router;
