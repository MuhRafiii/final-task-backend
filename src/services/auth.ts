import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function register(
  name: string,
  email: string,
  role: string,
  picture: string,
  password: string
) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await prisma.user.create({
    data: { name, email, role, picture, password: hashedPassword },
  });

  if (user.role === "user") {
    await prisma.point.create({
      data: { email, points: 0 },
    });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    picture: user.picture,
  };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token };
}

export async function updateUser(id: number, name: string, picture: string) {
  const update = await prisma.user.update({
    where: { id },
    data: { name, picture },
  });

  return { name: update.name, picture: update.picture };
}
