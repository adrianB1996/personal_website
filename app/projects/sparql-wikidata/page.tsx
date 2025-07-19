"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon } from "@/components/icons";
import { Code, Database,Server, ChevronRight, X, FileJson, Bot } from "lucide-react";
import { MermaidDiagram } from "@/app/components/MermaidDiagram";

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
  // Move these hook calls before any conditional returns
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
    e.stopPropagation();  // Add this line to prevent event bubbling
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
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

export default function SparqlWikidataPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">SPARQL Wikidata Explorer</h1>
        <p className="text-xl text-muted-foreground">
          An intuitive interface that leverages small, offline LLMs to transform natural language into SPARQL queries, 
          making Wikidata's knowledge graph accessible without specialized expertise.
        </p>
      </div>

      {/* Personal Motivation & Background */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Personal Motivation & Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-center md:text-left">Why I Built This Tool</h3>
            <p className="text-muted-foreground">
              This project was an exploration of possibilities - I wanted to see if I could create a simple UI that could effectively query Wikidata using locally hosted LLM models running on less than 8GB of RAM. The goal was to democratize access to knowledge graph exploration without requiring specialized SPARQL expertise and see if genAI like this could be used locally for offline applications on laptops or phones.
            </p>
            <p className="text-muted-foreground">
              As someone with a background in data science and knowledge graphs, I was curious to test the boundaries of what lightweight LLMs could achieve in interpreting natural language and generating complex SPARQL queries, making semantic web technologies more accessible to everyone. I&apos;ve explained more about the project and linked the code repo below!
            </p>
          </div>
          <div>
            <div className="relative w-full mb-8 bg-muted rounded-lg overflow-hidden flex justify-center">
              <Image 
                src="/sparql-wikidata.png" 
                alt="SPARQL Wikidata Explorer Interface" 
                width={800}
                height={450}
                className="cursor-pointer object-contain max-w-full max-h-full"
                priority
                quality={100}
                onClick={() => openModal("/sparql-wikidata.png", "SPARQL Wikidata Explorer Interface")}
              />
            </div>
            <p className="text-sm text-muted-foreground italic text-center">
              A example of a query asking the population of London - click to enlarge
            </p>
          </div>
        </div>
      </section>
      <Separator/>
            {/* Project Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Project Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">SPARQL&apos;s complexity limits accessibility for non-experts.</p>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>
                    Most people can&apos;t search knowledge bases easily using spoken language.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>SPARQL has a steep learning curve that excludes non-technical users.</span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>The semantic web&apos;s power remains inaccessible to many potential users.</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">The Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">A dual-LLM approach for accessibility:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Small, coding-focused LLM (Qwen2.5) to translate natural language to SPARQL</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>General-purpose LLM (Qwen3) to interpret results in natural language</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Transparent reasoning by showing all possible results with explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Fully local operation for privacy and offline use</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Explores the application of offline AI in mobile phone apps</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <Separator/>
            {/* GitHub Link */}
      <section className="space-y-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
        <p className="text-muted-foreground mb-6">
          Explore the code and documentation on GitHub to learn more about the SPARQL Wikidata Explorer.
        </p>
        <div className="flex justify-center">
          <Button size="lg" asChild>
            <Link href="https://github.com/adrianB1996/sparql_wikidata" target="_blank">
              <GitHubIcon className="mr-2 h-5 w-5" /> View on GitHub
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Tech Stack - Updated position and content */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Tech Stack</h2>
        <p className="text-muted-foreground mb-6 text-center">Simple and lightweight for local deployment:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Code className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Frontend</p>
              <p className="text-sm text-muted-foreground">Dash, dash-bootstrap-components</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Backend</p>
              <p className="text-sm text-muted-foreground">Flask (via Dash)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Database className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Data Access</p>
              <p className="text-sm text-muted-foreground">SPARQL, SPARQLWrapper</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Bot className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Query Generation</p>
              <p className="text-sm text-muted-foreground">Qwen2.5 Coder LLM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Bot className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Result Processing</p>
              <p className="text-sm text-muted-foreground">Qwen3 LLM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Model Hosting</p>
              <p className="text-sm text-muted-foreground">Ollama, Custom Modelfiles</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Deployment</p>
              <p className="text-sm text-muted-foreground">Docker, Docker Compose</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <FileJson className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">HTTP Client</p>
              <p className="text-sm text-muted-foreground">Requests</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* LLM Workflow */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">LLM Query Workflow</h2>
        <p className="text-muted-foreground text-center mb-8">
          Leveraging lightweight LLMs to translate natural language into SPARQL and interpret complex results
        </p>
        
        <div className="mt-8">
          <MermaidDiagram
            chart={`
flowchart TB
    User(User Query) --> NLProc["Natural Language<br>Processing"]
    NLProc --> Qwen25[Qwen2.5 Coder LLM]
    Qwen25 -->|Generates| SPARQL[SPARQL Query]
    SPARQL -->|Query| Wikidata[Wikidata Endpoint]
    Wikidata -->|Raw Results| Results[Query Results]
    
    subgraph ResultInt[" "]
        Results --> MultiCheck{Multiple Answers?}
        MultiCheck -->|Yes| Qwen3Reasoning[Qwen3 Reasoning]
        Qwen3Reasoning -->|Select Best Match| FinalAnswer
        MultiCheck -->|No| Qwen3Simple[Qwen3 Simple Interpretation]
        Qwen3Simple --> FinalAnswer[Final Answer]
    end
    
    FinalAnswer --> Response[User Response]
    
    style User fill:#f9d6d6
    style Qwen25 fill:#d6e5f9,stroke:#0fb
    style Qwen3Reasoning fill:#d6e5f9,stroke:#0fb
    style Qwen3Simple fill:#d6e5f9,stroke:#0fb
    style Wikidata fill:#f9ecd6
            `}
            caption="SPARQL Wikidata Explorer processes natural language using lightweight LLMs: Qwen2.5 Coder generates SPARQL queries, while Qwen3 intelligently interprets and reasons about query results"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Query Generation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">Qwen2.5 Coder LLM</p>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>
                    Parses natural language to identify entities and relationships
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Transforms user intent into proper SPARQL syntax</span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Optimizes queries for performance and accuracy</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Result Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">Qwen3 LLM</p>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>
                    Processes raw Wikidata result sets into natural language
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>When multiple results exist, employs reasoning to select most relevant answer</span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Provides explanations of why certain results were selected over others</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      <Separator />

      {/* Skills Gained */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Skills Gained</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Technical Skills</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Docker containerization and Docker Compose orchestration</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Dash/Flask web application development</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ollama model configuration and custom Modelfile creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Multi-model LLM system integration and orchestration</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Domain Knowledge</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>SPARQL query language and Wikidata structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Prompt engineering for specialized tasks like query generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Natural language to formal query translation techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Lightweight LLM deployment for resource-constrained environments</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Future Enhancements */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Future Enhancements</h2>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Wikidata Schema Integration</p>
              <p className="text-muted-foreground">
                Dynamically obtain and cache the complete Wikidata schema to enable comprehensive graph 
                traversal and handle arbitrary queries across the entire knowledge base.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Conversational Chatbot Interface</p>
              <p className="text-muted-foreground">
                Implement a more natural, conversational experience that maintains context across 
                multiple queries and helps users refine their questions through dialogue.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Advanced Visualization Options</p>
              <p className="text-muted-foreground">
                Add interactive graph visualization with zoom, filter, and exploration capabilities to 
                make the knowledge graph structure more intuitive and discoverable.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Multi-Knowledge Base Support</p>
              <p className="text-muted-foreground">
                Extend beyond Wikidata to support other knowledge bases and SPARQL endpoints, 
                creating a unified interface for semantic web exploration.
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}