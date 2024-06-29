import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-black h-screen">
      <div className="flex justify-center py-24">
        <SignIn />
      </div>
    </div>
  );
}
