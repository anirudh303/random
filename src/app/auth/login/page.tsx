import { LoginForm } from "@/components/auth/LoginForm";
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
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="border-2">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="pr-5">Login</CardTitle>
          <CardDescription>Login in with credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

// function RegisterButton(){

//    const isPending =  useFormStatus()

//    return({isPending ? })
// }
