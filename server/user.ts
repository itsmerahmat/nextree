"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id: number): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function createUser(data: User): Promise<User> {
  const user = await prisma.user.create({ data });
  revalidatePath("/users");
  return user;
}

export async function updateUser(data: User): Promise<User> {
  const { id, ...updateData } = data;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });
  revalidatePath("/users");
  return user;
}

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/users");
}
