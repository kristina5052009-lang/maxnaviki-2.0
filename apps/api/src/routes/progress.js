import express from "express";
import { z } from "zod";

import prisma from "../lib/db.js";
import { authRequired } from "../lib/auth.js";
import courses from "../data/courses.js";
import { evaluateAchievements } from "../lib/achievements.js";

const router = express.Router();

const progressSchema = z.object({
  courseId: z.string().min(1),
  stepId: z.string().min(1),
  status: z.enum(["IN_PROGRESS", "COMPLETED"]).optional()
});

router.get("/", authRequired, async (req, res) => {
  const progress = await prisma.progress.findMany({
    where: { userId: req.user.id }
  });
  res.json(progress);
});

router.post("/", authRequired, async (req, res) => {
  try {
    const data = progressSchema.parse(req.body);

    const course = courses.find((item) => item.id === data.courseId);
    if (!course) {
      return res.status(404).json({ error: "Тема не найдена" });
    }

    const step = course.steps.find((item) => item.id === data.stepId);
    if (!step) {
      return res.status(404).json({ error: "Шаг не найден" });
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_courseId_stepId: {
          userId: req.user.id,
          courseId: data.courseId,
          stepId: data.stepId
        }
      },
      update: {
        status: data.status || "COMPLETED"
      },
      create: {
        userId: req.user.id,
        courseId: data.courseId,
        stepId: data.stepId,
        status: data.status || "COMPLETED"
      }
    });

    const achievements = await evaluateAchievements(req.user.id);

    return res.json({ progress, achievements });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error(error);
    return res.status(500).json({ error: "Ошибка сохранения прогресса" });
  }
});

export default router;
