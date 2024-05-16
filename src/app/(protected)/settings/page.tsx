import { auth, signOut } from "@/auth";

export default async function Settings() {
  const session = await auth();

  return (
    <div>
      <h1>{`settings page`}</h1>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="bg-black text-white p-2 ">
          SignOut
        </button>
      </form>
    </div>
  );
}
