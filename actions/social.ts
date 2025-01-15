"use server";

import { prisma } from "@/lib/prisma";
import { SocialMedia } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CreateSocialInput {
  platform: string;
  url: string;
  userId: number;
  isActive: boolean;
}

interface UpdateSocialInput {
  id: number;
  platform?: string;
  url?: string;
  userId?: number;
  isActive?: boolean;
}

export async function getSocials(): Promise<SocialMedia[]> {
  return await prisma.socialMedia.findMany({
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

export async function getSocialById(id: number): Promise<SocialMedia> {
  const socialMedia = await prisma.socialMedia.findUnique({ where: { id } });
  if (!socialMedia) {
    throw new Error("Social media not found");
  }
  return socialMedia;
}

export async function getSocialByUserId(
  userId: number
): Promise<SocialMedia[]> {
  return await prisma.socialMedia.findMany({ where: { userId } });
}

export async function createSocial(
  data: CreateSocialInput
): Promise<SocialMedia> {
  const response = await prisma.socialMedia.create({
    data: data,
  });
  revalidatePath("/admin/social-media");
  return response;
}

export async function updateSocial(
  data: UpdateSocialInput
): Promise<SocialMedia> {
  const { id, ...updateData } = data;
  const response = await prisma.socialMedia.update({
    where: { id: Number(id) },
    data: updateData,
  });
  revalidatePath("/admin/social-media");
  return response;
}

export async function deleteSocial(id: number): Promise<SocialMedia> {
  const response = prisma.socialMedia.delete({ where: { id } });
  revalidatePath("/admin/social-media");
  return response;
}
