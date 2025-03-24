"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

type CreateCommentState = {
  errors: {
    content?: string[];
    formErrors?: string[];
  };
};

const createComment = async (
  {
    postId,
    parentId,
  }: {
    postId: string;
    parentId?: string;
  },
  prevState: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> => {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: { formErrors: ["You need to be signed in to comment"] },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        userId: session.user.id,
        parentId: parentId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { formErrors: [error.message] },
      };
    } else {
      return {
        errors: { formErrors: ["An unexpected error occurred"] },
      };
    }
  }

  const slug = await prisma.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });
  revalidatePath(`/topics/${slug}/posts/${postId}`);
  return {
    errors: {},
  };
};

export default createComment;
