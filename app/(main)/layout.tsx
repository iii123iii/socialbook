import React from "react";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();

  if (!user) redirect("/log-in");

  return <>{children}</>;
};

export default layout;
