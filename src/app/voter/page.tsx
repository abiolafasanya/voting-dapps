import Header from "@/ui/shared/Header";
import React, { ReactNode } from "react";
import Candidates from "./components/Candidate";
import VoteStatusBar from "./components/VoteStatusBar";
import VoterRegistrationForm from "./components/voterRegistration";

export default function VoterPage() {
  return (
    <main className="w-full h-full min-h-screen bg-hero-pattern bg-center bg-cover">
      <article className="w-full h-full min-h-full bg-opacity-50 mix-blend-multiply backdrop-blur-md bg-white">
        <div className="max-w-6xl w-full py-5 h-full mx-auto">
          <Header></Header>

          <Content>
            <article>
              <h2 className="text-2xl font-semibold">Register</h2>
              <p>Register to participate in voting</p>
              <VoterRegistrationForm />
            </article>
          </Content>
        </div>
      </article>
    </main>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full">
      <VoteStatusBar />
      {children}
      <Candidates />
    </div>
  );
}
