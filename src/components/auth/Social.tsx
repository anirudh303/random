"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
const Social = () => {
  const onClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <CardFooter className="flex flex-col space-y-6 mt-5">
      <div className=" flex flex-shrink-0 justify-between  gap-20">
        <Button
          variant="outline"
          className="px-10"
          onClick={() => onClick("google")}
        >
          {" "}
          <FaGoogle />
        </Button>
        <Button
          variant="outline"
          className="px-10"
          onClick={() => onClick("github")}
        >
          {" "}
          <FaGithub />
        </Button>
      </div>
    </CardFooter>
  );
};

export default Social;
