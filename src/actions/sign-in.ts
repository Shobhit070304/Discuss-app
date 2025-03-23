"use server";
import { signIn } from "@/auth";

export async function SignIn() {
  return signIn();
}
