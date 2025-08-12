/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon } from "@/components/icons";
import { Code, Server, ChevronRight, FileJson, Database } from "lucide-react";

export default function AIGameCategoryBackendPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Game Category Backend</h1>
        <p className="text-xl text-muted-foreground">
          This project is a backend service for generating creative MASH game categories and options using a local LLM (Ollama).
        </p>
      </div>

      {/* Personal Motivation & Background */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Personal Motivation & Background</h2>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-semibold text-center">Why I Built This Backend</h3>
          <p className="text-muted-foreground">
            I wanted to deepen my understanding of modern Python web frameworks, especially <span className="font-semibold">FastAPI</span> and <span className="font-semibold">Pydantic</span>. My focus was on designing robust API endpoints and learning how to structure backend logic for AI-driven applications. I worked on the backend only, integrating with a frontend I did not build.
          </p>
          <p className="text-muted-foreground">
            The main challenge was orchestrating a local Ollama LLM (like llama3) with FastAPI and Pydantic to generate and validate creative game outputs. I had to ensure the backend could reliably call the LLM, parse its responses, and use Pydantic models to enforce structure and handle errors—especially since the frontend was out of my control.
          </p>
          <p className="text-muted-foreground">
            <span className="font-semibold">Note:</span> I did not create the frontend for this project. My main goal was to learn how to use <span className="font-semibold">FastAPI</span> and <span className="font-semibold">Pydantic</span> to control and validate backend outputs, and to orchestrate a local LLM (Ollama) for reliable, creative responses.
          </p>
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
              <p className="font-medium">The problem was learning how to validate unpredictable AI outputs for a game system.</p>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Needed to design and validate API outputs for a frontend I did not control.</span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Wanted to learn how to use Pydantic and FastAPI to host and validate AI outputs.</span>
                </p>
                <p className="flex items-start gap-2">
                  <ChevronRight className="text-red-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Dealing with unpredictable AI outputs that needed to conform to specific structures.</span>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">The Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">A backend service using modern Python tools:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Used FastAPI to quickly build and document RESTful endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Leveraged Pydantic for strict data validation and output schemas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Created endpoints where users can input a theme and receive creative game categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Implemented robust parsing of AI outputs to ensure consistent game options</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture / Workflow */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">How It Works</h2>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground">
            The backend exposes a <span className="font-semibold">POST /categories</span> endpoint. When a request is received, FastAPI calls the Ollama LLM (via HTTP) to generate creative categories and options for the MASH game, based on the user-supplied theme. The raw LLM output is parsed and validated using Pydantic models before being returned to the client.
          </p>
          <div className="bg-muted rounded-md p-4 text-left text-sm font-mono overflow-x-auto">
            {`POST /categories
{
  "theme": "space",
  "num_categories": 4,
  "num_options": 4
}

# Response
{
  "theme": "space",
  "categories": [
    {
      "title": "Planet",
      "options": [
        {"title": "Mars", "state": "waiting"},
        {"title": "Venus", "state": "waiting"},
        ...
      ]
    },
    ...
  ]
}`}
          </div>
          <p className="text-muted-foreground">
            <span className="font-semibold">.env configuration</span> is required to point the backend to the correct Ollama model and URL. Docker Compose is recommended for seamless local development.
          </p>
        </div>
      </section>
      <Separator/>
      {/* GitHub Link */}
      <section className="space-y-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
        <p className="text-muted-foreground mb-6">
          Explore the code and documentation on GitHub to learn more about the AI Game Category Backend.
        </p>
        <div className="flex justify-center">
          <Button size="lg" asChild>
            <Link href="https://github.com/adrianB1996/mash_monorepo" target="_blank">
              <GitHubIcon className="mr-2 h-5 w-5" /> View on GitHub
            </Link>
          </Button>
        </div>
      </section>
      <Separator />
      {/* Tech Stack */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Tech Stack</h2>
        <p className="text-muted-foreground mb-6 text-center">Modern Python backend technologies:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Code className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">API Framework</p>
              <p className="text-sm text-muted-foreground">FastAPI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <FileJson className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Data Validation</p>
              <p className="text-sm text-muted-foreground">Pydantic</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Server</p>
              <p className="text-sm text-muted-foreground">Uvicorn</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Database className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">Python 3.11</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
            <Server className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">LLM Host</p>
              <p className="text-sm text-muted-foreground">Ollama</p>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      {/* Lessons Learned */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Lessons Learned</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <p>
            <strong>Handling AI Unpredictability:</strong> I learned effective strategies for constraining and validating unpredictable LLM outputs using Pydantic models, making the system more reliable and robust.
          </p>
          <p>
            <strong>API Structure for AI Systems:</strong> Creating well-defined schemas and validation rules for both inputs and outputs proved essential when working with AI components that have inherent variability.
          </p>
          <p>
            <strong>Local LLM Integration:</strong> Orchestrating Ollama as a local LLM provider taught me about the trade-offs between cloud-based and local AI solutions, and how to create resilient connections between services.
          </p>
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
              <p className="font-medium">Automated Testing</p>
              <p className="text-muted-foreground">
                Add more automated tests for endpoints and data validation to catch edge cases and regressions.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">Deployment Automation</p>
              <p className="text-muted-foreground">
                Set up CI/CD pipelines for automated deployment and integration testing.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium">API Documentation</p>
              <p className="text-muted-foreground">
                Expand and improve API documentation for easier integration with future frontends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
