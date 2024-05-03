"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resultData } from "@/data/results";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { limitTextLength } from "@/utils/helpers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResultTable() {
  const [candidateList, setCandidateList] = useState<any[]>([]);

  useEffect(() => {
    getTotalCandidate();
  }, []);

  const { getSigner } = useConnectHook();
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
  return (
    <Table>
      <TableCaption>A List of vote result.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Regular</TableHead>
          <TableHead>VIP</TableHead>
          <TableHead>Executive</TableHead>
          <TableHead>Chairman Voted</TableHead>
          <TableHead className="text-right">Total Vote</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidateList.map((result, id) => (
          <TableRow key={id}>
            <TableCell>{parseInt(result[0])}</TableCell>
            <TableCell className="font-medium">{result[1]}</TableCell>
            <TableCell>{limitTextLength(result[2], 12)}</TableCell>
            <TableCell>{parseInt(result[3])}</TableCell>
            <TableCell>{parseInt(result[4])}</TableCell>
            <TableCell>{parseInt(result[5])}</TableCell>
            <TableCell>{result[7] ? "Voted" : "Not Voted"}</TableCell>
            <TableCell className="text-right">{parseInt(result[6])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
