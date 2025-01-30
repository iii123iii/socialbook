import Link from "next/link";
import React from "react";
import SignupForm from "./SignupForm";

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[40rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">Sign up</h1>
          <div className="space-y-5">
            <SignupForm />
            <div>
              <span className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href={"/log-in"}
                  className="bold text-black dark:text-white hover:underline"
                >
                  Log in
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
