"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Define refs before conditional returns
  const touchStartDistance = useRef(0);
  const touchStartScale = useRef(1);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });

  // Reset zoom state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setPanning(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 4); // Limit zoom between 0.5x and 4x
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault();
    setPanning(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setPanning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panning) return;
    
    // Calculate the delta between current mouse position and last recorded position
    const deltaX = e.clientX - lastMousePosition.x;
    const deltaY = e.clientY - lastMousePosition.y;
    
    // Update position based on the delta, scaled by zoom level
    setPosition(prev => ({
      x: prev.x + deltaX / scale,
      y: prev.y + deltaY / scale
    }));
    
    // Update last mouse position
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Touch event handlers for mobile pinch zoom and panning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Calculate initial distance between two fingers for pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistance.current = Math.sqrt(dx * dx + dy * dy);
      touchStartScale.current = scale;
    } else if (e.touches.length === 1) {
      // Record the starting position for single-finger pan
      setLastTouchPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while interacting with image
    
    if (e.touches.length === 2) {
      // Pinch zoom logic (unchanged)
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const scaleChange = distance / touchStartDistance.current;
      const newScale = Math.min(Math.max(0.5, touchStartScale.current * scaleChange), 4);
      setScale(newScale);
      
      // Also update touch position for subsequent panning
      setLastTouchPosition({
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      });
    } else if (e.touches.length === 1) {
      // Calculate delta for single-finger pan
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPosition.x;
      const deltaY = touch.clientY - lastTouchPosition.y;
      
      // Apply the pan movement based on delta
      setPosition(prev => ({
        x: prev.x + deltaX / scale,
        y: prev.y + deltaY / scale
      }));
      
      // Update the last touch position
      setLastTouchPosition({
        x: touch.clientX,
        y: touch.clientY
      });
    }
  };

  const handleDoubleClick = () => {
    // Reset zoom on double click
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="relative w-full h-full sm:max-w-[90vw] sm:max-h-[90vh] sm:w-fit sm:h-fit overflow-hidden flex items-center justify-center p-0 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10"
        >
          <X className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white text-xs sm:text-sm bg-black bg-opacity-50 px-2 py-1 rounded z-10">
          {scale.toFixed(1)}x zoom • Double-tap to reset
        </div>
        <img
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full sm:w-auto sm:h-auto object-contain rounded-none sm:rounded-lg sm:min-w-[300px] sm:min-h-[200px] sm:max-h-[90vh] sm:max-w-[90vw] transition-transform duration-100"
          style={{ 
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: scale > 1 ? 'grab' : 'zoom-in',
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onDoubleClick={handleDoubleClick}
          draggable={false}
        />
      </div>
    </div>
  );
};

const SmartGPPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", alt: "" });

  // Add effect to prevent body scrolling when modal is open
  useEffect(() => {
    if (modalOpen) {
      // Save the current overflow value to restore later
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
      
      // Restore original scroll behavior when component unmounts or modal closes
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [modalOpen]);

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
              videoId="AiYehmA-W48" // Replace with your actual YouTube video ID
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
