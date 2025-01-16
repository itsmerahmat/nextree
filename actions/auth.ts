"use server";

import { createSession, deleteSession } from "@/lib/session";
import { createUser } from "./user";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function register(formData: FormData) {
  // Prepare data for insertion into database
  const data = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // cek apakah username sudah digunakan
  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // cek apakah email sudah ada
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Call the provider or db to create a user...
  const user = await createUser(data);
  return user;
}

export async function login(formData: FormData) {
  // Implement login logic here
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  // cek apakah username dan password benar
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!user) {
    throw new Error("User not found");
  }
  // cek apakah password benar
  const passwordMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }
  // create session dengan menghapus password
  const payload = { ...user, password: undefined };
  await createSession(payload);
  return user;
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
