import React from "react";
import ResultTable from "./Result";

export default function Content() {
  return (
    <div className="w-full h-full">
      <section className="w-full py-12">
        <h2 className="text-2xl font-semibold mb-2">Results</h2>
        <p>Results of Online Vote</p>
      </section>
      <section className="py-5">
        <ResultTable />
      </section>
    </div>
  );
}
