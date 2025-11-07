import React from "react";
import Navbar from "@/components/features/homepage/navbar";
import Hero from "@/components/features/homepage/hero";
import PayrollSteps from "@/components/features/homepage/payroll-steps";
import Features from "@/components/features/homepage/features";
import TimelineSolution from "@/components/features/homepage/timeline-solution";
import Footer from "@/components/features/homepage/footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <TimelineSolution />
      <Features />
      <PayrollSteps />
      <Footer />
    </div>
  );
};

export default Page;
