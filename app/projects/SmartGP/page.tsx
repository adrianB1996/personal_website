"use client";

import React, { useState } from "react";
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
  X,
} from "lucide-react";


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

// Image Modal component
const ImageModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  imageSrc: string; 
  imageAlt: string; 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X className="h-8 w-8" />
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const SmartGPPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", alt: "" });

  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage({ src: "", alt: "" });
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageSrc={modalImage.src}
        imageAlt={modalImage.alt}
      />
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

        <div className="flex flex-col items-center gap-2 my-6">
          <img 
            src="/SmartGP.jpg" 
            alt="SmartGP home page screenshot"
            className="w-full max-w-4xl rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => openModal("/SmartGP.jpg", "SmartGP home page screenshot")}
          />
          <p className="text-sm text-muted-foreground italic">SmartGP Home Page</p>
        </div>
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
              <div className="flex flex-col items-center gap-2 my-6">
                <img 
                  src="/transcription.jpg" 
                  alt="Automatic, speaker-labelled transcripts"
                  className="w-3/4 max-w-xs aspect-[4/3] object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openModal("/transcription.jpg", "Automatic, speaker-labelled transcripts")}
                />
                <p className="text-sm text-muted-foreground italic">Automatic, patient summary</p>
              </div>
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
              <div className="flex flex-col items-center gap-2 my-6">
                <img 
                  src="/refferal_letter.jpg" 
                  alt="One-click, guideline-based referrals"
                  className="w-3/4 max-w-xs aspect-[4/3] object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openModal("/refferal_letter.jpg", "One-click, guideline-based referrals")}
                />
                <p className="text-sm text-muted-foreground italic">One-click, guideline-based referrals</p>
              </div>
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
              <div className="flex flex-col items-center gap-2 my-6">
                <img 
                  src="/chat-bot.jpg" 
                  alt="Instant answers, powered by search"
                  className="w-3/4 max-w-xs aspect-[4/3] object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openModal("/chat-bot.jpg", "Instant answers, powered by search")}
                />
                <p className="text-sm text-muted-foreground italic">Instant answers, powered by search</p>
              </div>
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
