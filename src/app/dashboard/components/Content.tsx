import React, { useState } from "react";
import CreateCandidateForm from "./forms/CreateCandidateForm";
import TransferChairmanForm from "./forms/TransferChairmanForm";
import UpdateRoleForm from "./forms/UpdateRole";
import { Button } from "@/components/ui/button";
import CandidatesList from "./CandidatesList";

export default function Content() {
  return (
    <div className="w-full h-full">
      <section className="w-full py-12">
        <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
        {/* <p>Results of Online Vote</p> */}
        <div className="w-fit flex gap-5 ml-auto">
          <Button variant="success" className="">
            Start Voting
          </Button>
          <Button variant="destructive" className="">
            End Voting
          </Button>
        </div>
      </section>
      <section className="w-full py-5 flex gap-12 justify-between items-start">
        <div className="w-full md:w-1/2">
          <article>
            <h2 className="text-2xl font-semibold">Create Candidate</h2>
            <CreateCandidateForm />
          </article>

          <article className="mt-5">
            <h2 className="text-2xl font-semibold">Candidates</h2>
            <CandidatesList />
          </article>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <article>
            <h2 className="text-2xl font-semibold">Transfer Chairman</h2>
            <TransferChairmanForm />
          </article>
          <article>
            <h2 className="text-2xl font-semibold">Update Role</h2>
            <UpdateRoleForm />
          </article>
        </div>
      </section>
    </div>
  );
}
