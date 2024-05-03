"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { ethers } from "ethers";
import { toast } from "sonner";
import VoterRegistrationForm from "./voterRegistration";

export default function Candidates() {
  const { getSigner } = useConnectHook();
  const [candidatesList, setCandidatesList] = useState<any[]>([]);
  useEffect(() => {
    getTotalCandidate();
  }, []);
  async function getTotalCandidate() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.getTotalCandidate();
      setCandidatesList(tx);
      // console.log("fetch all candidate", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  return (
    <section className="flex h-full flex-col my-14 justify-between items-center">
      <h2 className="text-2xl font-semibold">Cast your vote</h2>
      <p>
        Place your vote. Please note, you can only vote once. You will not be
        allowed to change your vote.
      </p>

      <article className="grid grid-cols-4 justify-between gap-10 my-5">
        <Candidate candidates={candidatesList} />
      </article>
    </section>
  );
}

function Candidate({ candidates }: { candidates: any[] }) {
  const { getSigner } = useConnectHook();
  async function voteCandidate(id: number) {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.voteCandidate(id);
      console.log("vote candidate", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }
  return (
    <>
      {candidates.map((candidate, i) => (
        <Card className="w-full py-3" key={i}>
          <CardContent className="p-3 flex gap-2 flex-col items-center justify-center">
            <Image
              src={"/candidate.png"}
              width={200}
              height={200}
              alt="icon"
              className="bg-white object-cover object-center w-[150px] h-[150px] rounded-full"
            />
            <CardDescription className="font-semibold ">
              {candidate[1]}
            </CardDescription>
            <Button
              size={"icon"}
              className="w-36"
              onClick={async () => await voteCandidate(candidate[0])}
            >
              Vote
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
