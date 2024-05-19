import React from "react";

import Social from "@/components/auth/Social";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResetForm } from "@/components/auth/ResetForm";
const ResetPasswordPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="border-2">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="pr-5">Forgot Password</CardTitle>
          <CardDescription>Reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
