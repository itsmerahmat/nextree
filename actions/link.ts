"use server";

import { prisma } from "@/lib/prisma";
import { Link } from "@prisma/client";

interface CreateLinkInput {
  title: string;
  url: string;
  image?: string;
  userId: number;
}

interface UpdateLinkInput {
  id: number;
  title?: string;
  url?: string;
  image?: string;
  userId?: number;
  isActive?: boolean;
}

export async function getLinks(): Promise<Link[]> {
  return await prisma.link.findMany();
}

export async function getLinkById(id: number): Promise<Link> {
  const link = await prisma.link.findUnique({ where: { id } });
  if (!link) {
    throw new Error("Link not found");
  }
  return link;
}

export async function getLinkByUserId(userId: number): Promise<Link[]> {
  return await prisma.link.findMany({ where: { userId } });
}

export async function createLink(data: CreateLinkInput): Promise<Link> {
  return await prisma.link.create({
    data: { ...data, image: data.image ?? "" },
  });
}

export async function updateLink(data: UpdateLinkInput): Promise<Link> {
  const { id, ...updateData } = data;
  return await prisma.link.update({
    where: { id: Number(id) },
    data: updateData,
  });
}

export async function deleteLink(id: number): Promise<void> {
  await prisma.link.delete({ where: { id } });
}
