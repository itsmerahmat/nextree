"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
  image?: string;
}

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

export async function createUser(data: CreateUserInput): Promise<User> {
  // Hash the password
  data.password = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: { ...data, image: data.image ?? "" },
  });
  return user;
}

export async function updateUser(data: User): Promise<User> {
  const { id, ...updateData } = data;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });
  return user;
}

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
