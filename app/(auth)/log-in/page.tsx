import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[50rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">
            Login to SocialBook
          </h1>
          <div>
            <LoginForm />
            <div>
              <span className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href={"/sign-up"}
                  className="bold text-black dark:text-white hover:underline"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
