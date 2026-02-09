import courses from "../data/courses.js";
import prisma from "./db.js";

const achievementDefs = [
  {
    code: "FIRST_STEP",
    title: "Первый шаг",
    description: "Вы завершили первый шаг обучения."
  },
  {
    code: "FIRST_THEME",
    title: "Первая тема",
    description: "Вы полностью прошли одну тему базового уровня."
  },
  {
    code: "ALL_BASIC",
    title: "База освоена",
    description: "Вы завершили все темы базового уровня."
  },
  {
    code: "ADVANCED_THEME",
    title: "Расширенный уровень",
    description: "Вы завершили расширенный уровень хотя бы одной темы."
  }
];

export async function evaluateAchievements(userId) {
  const progress = await prisma.progress.findMany({
    where: { userId, status: "COMPLETED" }
  });

  const completedSet = new Set(
    progress.map((item) => `${item.courseId}:${item.stepId}`)
  );

  const hasAnyStep = completedSet.size > 0;

  const courseCompletion = courses.map((course) => {
    const basicSteps = course.steps.filter((step) => step.level === "BASIC");
    const advancedSteps = course.steps.filter((step) => step.level === "ADVANCED");

    const basicComplete = basicSteps.length > 0
      ? basicSteps.every((step) => completedSet.has(`${course.id}:${step.id}`))
      : false;

    const advancedComplete = advancedSteps.length > 0
      ? advancedSteps.every((step) => completedSet.has(`${course.id}:${step.id}`))
      : false;

    return { courseId: course.id, basicComplete, advancedComplete };
  });

  const firstTheme = courseCompletion.some((course) => course.basicComplete);
  const allBasic = courseCompletion.every((course) => course.basicComplete);
  const advancedTheme = courseCompletion.some((course) => course.advancedComplete);

  const toUnlock = [];
  if (hasAnyStep) toUnlock.push("FIRST_STEP");
  if (firstTheme) toUnlock.push("FIRST_THEME");
  if (allBasic) toUnlock.push("ALL_BASIC");
  if (advancedTheme) toUnlock.push("ADVANCED_THEME");

  const existing = await prisma.achievement.findMany({
    where: { userId }
  });
  const existingCodes = new Set(existing.map((item) => item.code));

  const newAchievements = achievementDefs
    .filter((item) => toUnlock.includes(item.code))
    .filter((item) => !existingCodes.has(item.code));

  if (newAchievements.length === 0) {
    return existing;
  }

  await prisma.achievement.createMany({
    data: newAchievements.map((item) => ({
      userId,
      code: item.code,
      title: item.title,
      description: item.description
    }))
  });

  return prisma.achievement.findMany({ where: { userId } });
}

export { achievementDefs };
