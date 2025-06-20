"use client";

import React from "react";
// Import is used by PlaceholderImage component
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  // Remove unused imports
} from "@/components/ui/card";
// Remove unused Badge import
import { Separator } from "@/components/ui/separator";
// Remove unused Accordion imports
import { MermaidDiagram } from "@/app/components/MermaidDiagram";

import {
  CheckCircle,
  Code,
  FileText,
  Mic,
  Bot,
  Search,
  // Remove unused ArrowRight
  Server,
  ChevronRight,
} from "lucide-react";

const PlaceholderImage = ({ caption, aspectRatio = "aspect-video" }: { caption: string, aspectRatio?: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-6">
      <div
        className={`w-full ${aspectRatio} bg-muted border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center`}
      >
        <p className="text-muted-foreground text-sm">Placeholder Image</p>
      </div>
      <p className="text-sm text-muted-foreground italic">{caption}</p>
    </div>
  );
};

// Add a new YouTube embed component
const YouTubeEmbed = ({ videoId, caption }: { videoId: string, caption: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-6">
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-sm text-muted-foreground italic">{caption}</p>
    </div>
  );
};

const SmartGPPage = () => {
  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">SmartGP</h1>
        <p className="text-xl text-muted-foreground">
          Empowering clinicians with AI-powered tools to reduce admin burden and enhance patient care
        </p>
      </div>

      {/* Personal Motivation & Background */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Personal Motivation & Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-center md:text-left">Why I Built SmartGP</h3>
            <p className="text-muted-foreground">
              My journey to building SmartGP is rooted in personal experience. I
              spent months struggling to get a diagnosis for haemochromatosis and
              was misdiagnosed along the way. Navigating the healthcare system as
              a patient, I saw firsthand how short appointment times and
              administrative pressures can impact care.
            </p>
            <p className="text-muted-foreground">
              My partner&apos;s experiences as a GP also highlighted the reality
              of 10-15 minute GP appointments, where there&apos;s barely enough time
              to focus on the patient, let alone all the admin tasks. These
              challenges inspired me to use my background in data science,
              bioinformatics, and software engineering to build a tool that could
              genuinely help both clinicians and patients.
            </p>
          </div>
          <div>
            {/* Replace the placeholder with YouTube embed */}
            <YouTubeEmbed 
              videoId="ZIsaEkMZYcg" // Replace with your actual YouTube video ID
              caption="Inspired by real-world challenges in primary care" 
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Project Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Project Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">GPs don&apos;t have enough time for patients.</p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <CheckCircle className="text-red-500 h-5 w-5" />
                  <span>
                    93% of GPs believe their workload negatively affects care
                    quality.
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="text-red-500 h-5 w-5" />
                  <span>42% are considering leaving the profession.</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">The Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">SmartGP is an AI-powered assistant designed to:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span>Automate medical note-taking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span>Generate guideline-compliant referrals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span>Provide real-time clinical insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span>Reduce administrative burden</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <MermaidDiagram
            chart={`
flowchart LR
    Patient(Patient) <--> Doctor(Doctor)
    Doctor --> Transcription(Speech-to-Text)
    Transcription --> Summary(Patient Summary)
    Summary --> Questions(Doctor Questions)
    Questions --> Insights(Clinical Insights)
    Summary --> Referral(Referral Letter)
    
    style Patient fill:#f9d6d6
    style Doctor fill:#d6e5f9
    style Transcription fill:#d6f9f2,stroke:#0fb
    style Summary fill:#d6f9f2,stroke:#0fb
    style Insights fill:#d6f9f2,stroke:#0fb
    style Referral fill:#d6f9f2,stroke:#0fb
            `}
            caption="SmartGP streamlines the clinical workflow by automating transcription, summarization, information retrieval, and referral generation"
          />
        </div>
      </section>

      <Separator />

      {/* Technical Implementation */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Technical Implementation</h2>
        <h3 className="text-2xl font-semibold text-center">Architecture and Approach</h3>
        
        <p className="text-muted-foreground mb-6 text-center">All components are hosted locally for privacy and control.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Mic className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Speech-to-Text</h4>
                <p className="text-muted-foreground">
                  Uses Whisper for accurate, local transcription of consultations.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Speaker Diarization</h4>
                <p className="text-muted-foreground">
                  Separates patient and GP voices for clear summaries.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Bot className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Medical Notes</h4>
                <p className="text-muted-foreground">
                  Uses a vector Retrieval-Augmented Generation (RAG) database to
                  inform the language model and help generate high-quality medical
                  notes.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Referral Letters</h4>
                <p className="text-muted-foreground">
                  Referral generation uses a RAG-based system to read official
                  guidelines on writing effective referral letters.
                </p>
                <p className="text-muted-foreground mt-1">
                  In the future, users will be able to upload their own referral
                  letters to personalize and mimic their preferred style.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Search className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Question Function</h4>
                <p className="text-muted-foreground">
                  This feature was the most technically challenging. It uses a
                  large language model to read the patient summary and doctor&apos;s
                  question, then generates Google search queries to find relevant
                  information before presenting it to the GP as an alternative to
                  manual searching.
                </p>
              </div>
            </div>
          </div>
        </div>

        <PlaceholderImage caption="SmartGP technical architecture" />
      </section>

      <Separator />

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Mic className="h-5 w-5" />
                Smart Transcription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center">
              <p>Whisper-based speech-to-text</p>
              <p>Speaker separation for clarity</p>
              <PlaceholderImage
                caption="Automatic, speaker-labelled transcripts"
                aspectRatio="aspect-[4/3]"
              />
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                Guideline-Driven Referrals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center">
              <p>Referral letters generated using official guidelines</p>
              <p>Future: Personalized letter styles</p>
              <PlaceholderImage
                caption="One-click, guideline-based referrals"
                aspectRatio="aspect-[4/3]"
              />
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                Clinical Q&A System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center">
              <p>
                LLM reads the patient summary and doctor&apos;s question, then
                formulates Google search queries to find relevant information for
                the GP
              </p>
              <PlaceholderImage
                caption="Instant answers, powered by search"
                aspectRatio="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Tech Stack */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Tech Stack</h2>
        <p className="text-muted-foreground mb-6 text-center">Everything is hosted locally:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Mic className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Speech-to-Text</p>
              <p className="text-sm text-muted-foreground">Whisper</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Speaker Diarization</p>
              <p className="text-sm text-muted-foreground">Hugging Face models</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Vector Database</p>
              <p className="text-sm text-muted-foreground">LangChain</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Bot className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">LLM</p>
              <p className="text-sm text-muted-foreground">Llama-3</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Backend</p>
              <p className="text-sm text-muted-foreground">FastAPI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Code className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Frontend</p>
              <p className="text-sm text-muted-foreground">Next.js, Tailwind CSS, DaisyUI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Deployment</p>
              <p className="text-sm text-muted-foreground">Docker Compose</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Future Enhancements */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Future Enhancements</h2>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <ChevronRight className="h-5 w-5 text-primary" />
            <p>
              Add user-uploaded referral letter templates for personalized style
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ChevronRight className="h-5 w-5 text-primary" />
            <p>Multi-modal input (text + voice)</p>
          </div>

          <div className="flex items-center gap-3">
            <ChevronRight className="h-5 w-5 text-primary" />
            <p>Predictive analytics dashboard</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartGPPage;
