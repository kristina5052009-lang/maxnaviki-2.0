import express from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

import prisma from "../lib/db.js";
import { signToken, authRequired } from "../lib/auth.js";

const router = express.Router();

const registerSchema = z
  .object({
    name: z.string().min(2, "Введите имя"),
    password: z.string().min(6, "Минимум 6 символов"),
    email: z.string().email("Некорректный email").optional(),
    phone: z.string().min(10, "Некорректный телефон").optional(),
    snils: z.string().min(11, "Некорректный СНИЛС").max(14).optional(),
    level: z.enum(["BASIC", "ADVANCED"]).optional()
  })
  .refine((data) => data.email || data.phone || data.snils, {
    message: "Укажите телефон, email или СНИЛС",
    path: ["contact"]
  });

const loginSchema = z
  .object({
    login: z.string().min(3, "Введите телефон, email или СНИЛС"),
    password: z.string().min(6, "Введите пароль")
  });

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          data.email ? { email: data.email } : undefined,
          data.phone ? { phone: data.phone } : undefined,
          data.snils ? { snils: data.snils } : undefined
        ].filter(Boolean)
      }
    });

    if (existing) {
      return res.status(409).json({ error: "Пользователь уже существует" });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        snils: data.snils,
        passwordHash,
        level: data.level || "BASIC"
      }
    });

    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        snils: user.snils,
        level: user.level
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error(error);
    return res.status(500).json({ error: "Ошибка регистрации" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.login },
          { phone: data.login },
          { snils: data.login }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        snils: user.snils,
        level: user.level
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error(error);
    return res.status(500).json({ error: "Ошибка входа" });
  }
});

router.get("/me", authRequired, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    snils: user.snils,
    level: user.level
  });
});

export default router;
