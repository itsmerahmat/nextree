"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
  image?: string;
}

export interface UpdateUserInput {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
}

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUserById(id: number): Promise<User> {
  const response = await prisma.user.findUnique({ where: { id } });
  if (!response) {
    throw new Error("User not found");
  }
  return response;
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const response = await prisma.user.findUnique({
    where: { username },
    include: { links: true, socials: true },
  });
  if (!response) return null;
  return response;
}

export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  const response = await prisma.user.create({
    data: { ...data, password: hashedPassword, image: data.image ?? "" },
  });
  revalidatePath("/admin/users");
  return response;
}

export async function updateUser(data: UpdateUserInput): Promise<User> {
  const { id, ...updateData } = data;
  if ([undefined, null, ""].includes(updateData.password)) {
    delete updateData.password;
  } else {
    updateData.password = await hashPassword(updateData.password!);
  }
  const response = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });
  revalidatePath("/admin/users");
  return response;
}

export async function deleteUser(id: number): Promise<User> {
  const response = await prisma.user.delete({ where: { id } });
  if (!response) {
    throw new Error("User not found");
  }
  revalidatePath("/admin/users");
  return response;
}
