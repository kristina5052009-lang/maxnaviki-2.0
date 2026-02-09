import express from "express";
import courses from "../data/courses.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((item) => item.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Тема не найдена" });
  }
  return res.json(course);
});

export default router;
