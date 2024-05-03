"use client";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CandidatesList() {
  const { getSigner } = useConnectHook();
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    getTotalCandidate();
  }, []);

  async function getTotalCandidate() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.getTotalCandidate();
      setCandidates(tx);
      console.log("fetch all candidate", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  return (
    <div>
      <ul>
        {candidates.map((candidate: any, i: number) => {
          const id = i +1;
          return (
            <li key={i} className="flex space-x-2 font-semibold">
              <span>Candidate {i+1}</span>:<span>{candidate[1]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
