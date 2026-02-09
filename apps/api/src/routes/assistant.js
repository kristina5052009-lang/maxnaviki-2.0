import express from "express";
import courses from "../data/courses.js";

const router = express.Router();

router.get("/hint", (req, res) => {
  const { courseId, stepId } = req.query;

  if (!courseId || !stepId) {
    return res.status(400).json({ error: "Нужны courseId и stepId" });
  }

  const course = courses.find((item) => item.id === courseId);
  if (!course) {
    return res.status(404).json({ error: "Тема не найдена" });
  }

  const step = course.steps.find((item) => item.id === stepId);
  if (!step) {
    return res.status(404).json({ error: "Шаг не найден" });
  }

  return res.json({
    hint: step.help,
    expectedAction: step.expectedAction
  });
});

export default router;
