"use client";

import Hero from "@/components/Hero";
import FeaturedLands from "@/components/FeaturedLands";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Hero />
      <FeaturedLands />
      <Features />
    </main>
  );
}
