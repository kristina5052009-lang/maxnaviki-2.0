import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";
import prisma from "../src/lib/db.js";

const canRun = Boolean(process.env.DATABASE_URL);

test("регистрация и вход", async (t) => {
  if (!canRun) {
    t.skip("DATABASE_URL не задан");
    return;
  }

  const email = `user_${Date.now()}@example.ru`;
  const password = "Test1234";

  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({ name: "Тест", email, password });

  assert.equal(registerRes.statusCode, 201);
  assert.ok(registerRes.body.token);

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ login: email, password });

  assert.equal(loginRes.statusCode, 200);
  assert.ok(loginRes.body.token);

  await prisma.user.deleteMany({ where: { email } });
});
