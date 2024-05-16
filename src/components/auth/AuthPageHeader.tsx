import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthPageHeader() {
  return (
    <div className="flex justify-between items-center w-full h-14  text-white bg-gradient-to-r from-slate-900 to-slate-700">
      <div className=" text-4xl font-semibold pl-3 pt-2">Auth</div>
      <div className="flex flex-shrink-0 px-5 py-2 gap-3">
        <Button
          className=" h-5 text-white font-bold w-30  p-5 bg-inherit  border-2"
          asChild
        >
          <Link href={`/auth/register`}> Register</Link>
        </Button>
        <Button
          className=" h-5 text-white font-bold w-30  p-5 bg-inherit border-2"
          asChild
        >
          <Link href={`/auth/login`}> Login</Link>
        </Button>
      </div>
    </div>
  );
}
