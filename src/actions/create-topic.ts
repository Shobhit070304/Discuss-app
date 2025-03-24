"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prismaClient";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const createTopicSchema = z.object({
  topic: z
    .string()
    .min(3)
    .regex(/^[A-Za-z.\s_-]+$/),
  description: z.string().min(10),
});

type CreateTopicFormState = {
  errors: {
    topic?: string[];
    description?: string[];
    formError?: string[];
  };
};

export const createTopic = async (
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const result = createTopicSchema.safeParse({
    topic: formData.get("topic"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        formError: ["You must be logged in to create a topic"],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.topic,
        description: result.data.description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["An unexpected error occurred while creating the topic"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(`/topics/${topic.slug}`);
};
