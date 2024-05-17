import { RegisterForm } from "@/components/auth/RegisterForm";
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

export default function RegisterPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 pt-80">
      <Card className="border-2">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="pr-5">Register</CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <Social />
        </CardContent>
      </Card>
    </div>
  );
}

// function RegisterButton(){

//    const isPending =  useFormStatus()

//    return({isPending ? })
// }
