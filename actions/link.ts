"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { Link } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CreateLinkInput {
  title: string;
  url: string;
  image?: string;
  userId: number;
}

export interface UpdateLinkInput {
  id: number;
  title?: string;
  url?: string;
  image?: string;
  userId?: number;
  isActive?: boolean;
}

export async function getLinks(): Promise<Link[]> {
  const session = await verifySession();
  const userRole = session?.user?.role;
  if (userRole !== "ADMIN") {
    return await prisma.link.findMany({
      where: { userId: session?.user?.id },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });
  }
  return await prisma.link.findMany({
    include: {
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });
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
  const response = await prisma.link.create({
    data: { ...data, image: data.image ?? "" },
  });
  revalidatePath("/admin/links");
  return response;
}

export async function updateLink(data: UpdateLinkInput): Promise<Link> {
  const { id, ...updateData } = data;
  const response = await prisma.link.update({
    where: { id: Number(id) },
    data: updateData,
  });
  revalidatePath("/admin/links");
  return response;
}

export async function deleteLink(id: number): Promise<Link> {
  const response = prisma.link.delete({ where: { id } });
  if (!response) {
    throw new Error("Link not found");
  }
  revalidatePath("/admin/links");
  return response;
}
