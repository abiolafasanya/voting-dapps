import { Button } from "@/components/ui/button";
import Header from "@/ui/shared/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen bg-hero-pattern bg-center bg-cover">
      <article className="w-full min-h-screen bg-opacity-50 mix-blend-multiply backdrop-blur-md bg-white">
        <div className="max-w-6xl w-full mx-auto">
          <Header></Header>
          <Content></Content>
        </div>
      </article>
    </main>
  );
}

function Content() {
  return (
    <div className="w-full h-full mt-20 gap-10 flex items-center justify-between">
      <section className="w-full">
        <h2 className="text-4xl font-semibold">
          DeVote is a Real-Time live Voting Software platform
        </h2>
        <p className="text-pretty my-5">
          Designed specifically for higher institutions of learning, DeVote
          offers a clean, attractive, and user-friendly voting interface. It
          seamlessly runs on all internet-enabled devices, allowing voters to
          cast their ballots from any location. With its straightforward tools
          and affordable subscription-based model, DeVote simplifies the voting
          process for educational institutions. 🗳️📚
        </p>
        <Button>Get Started</Button>
      </section>
      <section className="w-full">
        <Image src={"/Voting-amico.svg"} alt="image" width={400} height={400} />
      </section>
    </div>
  );
}
