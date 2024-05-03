import Header from "@/ui/shared/Header";
import React from "react";
import Content from "./components/Content";

export default function ResultPage() {
  return (
    <main className="w-full h-full min-h-screen bg-hero-pattern bg-center bg-cover">
      <article className="w-full h-full min-h-screen bg-opacity-50 mix-blend-multiply backdrop-blur-md bg-white">
        <div className="max-w-6xl w-full h-full mx-auto">
          <Header></Header>
          <Content></Content>
        </div>
      </article>
    </main>
  );
}
