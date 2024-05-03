"use client";
import { Button } from "@/components/ui/button";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { ErrorDescription, Typed, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { EthereumCallExceptionError } from "@/types";
import { errorToJSON } from "next/dist/server/render";

const status = [
  { name: "Candidate", value: 0 },
  { name: "Regular", value: 0 },
  { name: "VIP", value: 0 },
  { name: "Executive", value: 0 },
];

type Status = (typeof status)[0];

interface Error extends EthereumCallExceptionError {}

export default function VoteStatusBar() {
  const { getSigner } = useConnectHook();
  const [votingStatus, setVotngStatus] = useState(false);
  const [candidateList, setCandidateList] = useState<any[]>([]);
  const [votersList, setVotersList] = useState<any[]>([]);
  async function getVotingStatus() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const tx = await contract.votingStarted();
    setVotngStatus(tx);
    console.log(tx);
  }

  async function startVoting() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.startVoting();
      setVotngStatus(tx);
      console.log("start voting", tx);
      if (tx?.error) {
        // toast(tx.message);
        throw new Error(tx.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage);
        toast(error.shortMessage);
      }
    }
  }

  async function getTotalCandidate() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.getTotalCandidate();
      setCandidateList(tx);
      console.log("fetch all candidate", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  async function getTotalVoters() {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.getTotalVoters();
      setVotersList(tx);
      console.log("fetch all voters", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  useEffect(() => {
    getVotingStatus();
    getTotalCandidate();
    getTotalVoters();
  }, []);

  return (
    <section className="w-full flex min-h-full h-full my-14 justify-between items-center">
      <menu className="flex items-center justify-between w-[60%]">
        <Status candidates={candidateList} voters={votersList} />
      </menu>
      <menu className="flex space-x-5">
        <div className="flex flex-col items-center">
          <Button
            variant={votingStatus ? "success" : "destructive"}
            className="w-24 h-12 text-balance text-white text-center"
            onClick={startVoting}
          >
            InActive
          </Button>
          <span>Voting</span>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant="success"
            className="w-28 h-12 text-balance text-white text-center"
          >
            InActive
          </Button>
          <span>Result</span>
        </div>
      </menu>
    </section>
  );
}

function Status({ candidates, voters }: { candidates: any[]; voters: any[] }) {
  const statusData = [
    {
      name: "Candidates",
      value: candidates.length,
    },
    { name: "Voters", value: voters.length },
  ];
  return (
    <>
      {statusData.map((stat, i) => (
        <StatusBar key={i} name={stat.name} value={stat.value} />
      ))}
    </>
  );
}

function StatusBar({ name, value }: { name: string; value: number }) {
  return (
    <div className="font-semibold ">
      <span>{name}</span>:<span>{value}</span>
    </div>
  );
}

const styles = {
  voting: {
    active: "",
    nonActive: "",
  },
};
