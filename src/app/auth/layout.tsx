import AuthPageHeader from "@/components/auth/AuthPageHeader";

export default function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <AuthPageHeader />
      <div className="w-full h-full">{children}</div>
    </main>
  );
}
