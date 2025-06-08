import React from "react";

const SmartGP = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SmartGP</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Problem Statement</h2>
        <p>
          GPs have too little time per patient, leading to stress, burnout, and
          reduced care quality.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Solution Overview</h2>
        <p>
          SmartGP is an AI-powered assistant that automates admin tasks for GPs.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="list-disc pl-5">
          <li>AI-powered transcription and summarization of consultations</li>
          <li>Real-time patient insights and treatment suggestions</li>
          <li>Automated referral letter generation</li>
          <li>Secure patient record management</li>
          <li>
            Future: predictive analytics, semantic data management, personalized
            tools, AI triage
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Market Opportunity</h2>
        <p>
          Addresses NHS GP workload crisis, improves outcomes, and reduces
          burnout.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Competitive Advantage</h2>
        <p>
          More comprehensive and targeted than current tools, focused on
          actionable insights for NHS GPs.
        </p>
      </section>
    </div>
  );
};

export default SmartGP;
