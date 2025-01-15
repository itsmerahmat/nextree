"use server";

import { prisma } from "@/lib/prisma";
import { SocialMedia } from "@prisma/client";

interface CreateSocialInput {
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
  return await prisma.socialMedia.findMany();
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
  return await prisma.socialMedia.create({
    data: data,
  });
}

export async function updateSocial(
  data: UpdateSocialInput
): Promise<SocialMedia> {
  const { id, ...updateData } = data;
  return await prisma.socialMedia.update({
    where: { id: Number(id) },
    data: updateData,
  });
}

export async function deleteSocial(id: number): Promise<void> {
  await prisma.socialMedia.delete({ where: { id } });
}
