import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-6 md:gap-10 justify-center items-center w-full h-screen bg-black px-4 md:px-0">
        <div className="text-white text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-center">
          Cypher Sheets
        </div>
        <div className=" text-white text-center max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl text-base md:text-lg lg:text-xl 2xl:text-2xl">
          A secure examination paper distribution system to maintain the
          integrity and confidentiality of exams.
        </div>
        <Button variant={"secondary"} className="hover:border border-gray-600">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </main>
    </>
  );
}
