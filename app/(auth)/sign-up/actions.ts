"use server";

import prisma from "@/lib/prisma";
import { SignUpSchema, SignUpValues } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hash } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

export const signUp = async (values: SignUpValues) => {
  try {
    const { email, username, password } = SignUpSchema.parse(values);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) return { error: "Username already exists." };

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) return { error: "Email already exists." };

    const hashedPassword = await hash(password);

    const userId = generateIdFromEntropySize(10);

    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        displayName: username,
        passwordHash: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);

    return {
      error: "Somthing went went wrong please try again.",
    };
  }
};
