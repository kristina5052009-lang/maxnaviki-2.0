import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "dev-secret";

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, name: user.name, level: user.level },
    secret,
    { expiresIn: "7d" }
  );
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }

  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.sub, name: payload.name, level: payload.level };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Недействительный токен" });
  }
}
