import express from "express";
import { z } from "zod";

import prisma from "../lib/db.js";
import { authRequired } from "../lib/auth.js";
import courses from "../data/courses.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: req.user.id, status: "COMPLETED" }
  });
  const achievements = await prisma.achievement.findMany({
    where: { userId: req.user.id }
  });

  const completedSet = new Set(
    progress.map((item) => `${item.courseId}:${item.stepId}`)
  );

  const level = user.level;

  const perCourse = courses.map((course) => {
    const steps = course.steps.filter((step) => {
      if (level === "ADVANCED") return true;
      return step.level === "BASIC";
    });

    const completed = steps.filter((step) =>
      completedSet.has(`${course.id}:${step.id}`)
    );

    return {
      courseId: course.id,
      title: course.title,
      completed: completed.length,
      total: steps.length
    };
  });

  const totalCompleted = perCourse.reduce((acc, item) => acc + item.completed, 0);
  const totalSteps = perCourse.reduce((acc, item) => acc + item.total, 0);

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      level: user.level
    },
    stats: {
      totalCompleted,
      totalSteps,
      perCourse
    },
    achievements
  });
});

const levelSchema = z.object({ level: z.enum(["BASIC", "ADVANCED"]) });

router.patch("/level", authRequired, async (req, res) => {
  try {
    const data = levelSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { level: data.level }
    });
    return res.json({ level: user.level });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error(error);
    return res.status(500).json({ error: "Ошибка обновления уровня" });
  }
});

export default router;
