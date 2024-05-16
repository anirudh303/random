import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <h1>Heya</h1>
        <div className=" flex flex-shrink-0  ">
          <Button
            className=" h-5 text-white font-bold w-30 bg-black p-5"
            asChild
          >
            <Link href={`/auth`}> To Auth App</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
