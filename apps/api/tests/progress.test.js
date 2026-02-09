import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";
import prisma from "../src/lib/db.js";

const canRun = Boolean(process.env.DATABASE_URL);

test("сохранение прогресса", async (t) => {
  if (!canRun) {
    t.skip("DATABASE_URL не задан");
    return;
  }

  const email = `progress_${Date.now()}@example.ru`;
  const password = "Test1234";

  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({ name: "Тест", email, password });

  const token = registerRes.body.token;

  const progressRes = await request(app)
    .post("/api/progress")
    .set("Authorization", `Bearer ${token}`)
    .send({ courseId: "smartphone", stepId: "power", status: "COMPLETED" });

  assert.equal(progressRes.statusCode, 200);
  assert.equal(progressRes.body.progress.courseId, "smartphone");

  await prisma.progress.deleteMany({
    where: { user: { email } }
  });
  await prisma.user.deleteMany({ where: { email } });
});
