import { prisma } from "../prisma/client";

export async function transferPoints(
  senderEmail: string,
  receiverEmail: string,
  amount: number
) {
  const [sender, receiver] = await Promise.all([
    prisma.point.findUnique({
      where: { email: senderEmail },
    }),
    prisma.user.findUnique({
      where: { email: receiverEmail },
    }),
  ]);
  if (!sender || !receiver) {
    throw new Error("User not found");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (senderEmail === receiverEmail) {
    throw new Error("You cannot transfer points to yourself");
  }

  if (amount > sender.points) {
    throw new Error("You don't have enough points");
  }

  const transfer = await prisma.$transaction(async (tx) => {
    const sender = await tx.point.update({
      where: { email: senderEmail },
      data: { points: { decrement: amount } },
    });

    const receiver = await tx.point.update({
      where: { email: receiverEmail },
      data: { points: { increment: amount } },
    });

    return { sender, receiver };
  });
  return transfer;
}
