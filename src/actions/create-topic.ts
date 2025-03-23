"use server";

export const createTopic = async (formData: FormData) => {
  const topic = formData.get("topic");
  const description = formData.get("description");

  console.log(topic, description);
};
