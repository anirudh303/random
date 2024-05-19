import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import NewVerificationForm from "@/components/auth/NewVerificationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const NewVerififcationPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="border-2">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="pr-5">Password Reset</CardTitle>
          <CardDescription>Updating your Password</CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewVerififcationPage;
