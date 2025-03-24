"use server";
import { prisma } from "../prismaClient";
import type { Post } from "@prisma/client";

export type PostWithData = Post & {
  topic: { slug: string };
  _count: { comments: number };
  user: { name: string | null };
};

export async function getSlugPosts(slug: string): Promise<PostWithData[]> {
  return await prisma.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } },
    },
  });
}

export async function getAllPosts(): Promise<PostWithData[]> {
  return await prisma.post.findMany({
    orderBy: [
      {
        comments: { _count: "desc" },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } },
    },
    take: 5,
  });
}

export async function getPostsBySearch(term: string): Promise<PostWithData[]> {
  return await prisma.post.findMany({
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}
