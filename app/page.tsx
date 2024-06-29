import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black">
        <div className="inter text-white text-5xl font-bold">Cypher Sheets</div>
        <div className="inter text-white text-xl">
          A secure examination paper distribution system to
          maintain the integrity and confidentiality of exam.
        </div>
        <Button variant={"secondary"}>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </main>
    </>
  );
}
