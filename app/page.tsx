"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Linkedin, Calendar, ExternalLink } from "lucide-react";

const AboutPage = () => {
	return (
		<div className="container mx-auto px-4 py-24 space-y-10">
			{/* Let's Connect - Moved to top */}


			{/* Hero Section with Photo */}
			<div className="flex flex-col lg:flex-row items-center gap-8">
				<div className="w-full lg:w-1/3 flex flex-col items-center">
					<div className="rounded-full border-4 border-primary overflow-hidden h-40 w-40 md:h-60 md:w-60">
						<Image
							src="/profile.jpg"
							alt="Adrian Bourke"
							width={240}
							height={240}
							className="h-full w-full object-cover"
							priority
						/>
					</div>
					{/* Location moved under photo */}
					<div className="flex items-center gap-2 mt-4">
						<MapPin className="h-5 w-5 text-primary" />
						<span>Derby, England, UK</span>
					</div>
				</div>
				<div className="w-full lg:w-2/3">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Hi, I'm Adrian
					</h1>
					<p className="text-lg text-muted-foreground mb-4">
						I started my journey in science with a degree in Biotechnology at
						Dublin City University, where I developed a strong interest in
						applying technology to real-world challenges. I followed this up with
						a PhD in Synthetic Biology and Bioinformatics at the University of
						Sheffield (in collaboration with Merck), where my thesis focused on
						designing synthetic genetic units for controlled gene expression.
					</p>
					<p className="text-lg text-muted-foreground">
						Through this project, I discovered my real passion for computational
						work—solving problems through data, code, and automation was even
						more rewarding for me than working at the lab bench.
					</p>
				</div>
			</div>

			<Separator />

      			<Card>
				<CardHeader className="text-center">
					<CardTitle>Let's Connect!</CardTitle>
				</CardHeader>
				<CardContent className="text-center">
					<p className="mb-6">
						I'm passionate about building digital health solutions and AI-powered
						tools that help clinicians and engineers work smarter. I love
						collaborating on projects at the intersection of data science and
						software, and I'm always open to new challenges.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button asChild>
							<a href="mailto:rianbourke@gmail.com">
								<Mail className="mr-2 h-4 w-4" /> Email Me
							</a>
						</Button>
						<Button variant="outline" asChild>
							<a
								href="https://www.linkedin.com/in/adrian-bourke"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Linkedin className="mr-2 h-4 w-4" /> LinkedIn
							</a>
						</Button>
					</div>
				</CardContent>
			</Card>
      
			{/* Skills & Technologies */}
			<div>
				<h2 className="text-2xl font-bold mb-6 text-center">Skills & Technologies</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">Programming</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2 justify-center">
								{["Python", "TypeScript", "JavaScript", "R", "Bash"].map(
									(skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									)
								)}
							</div>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">Frameworks & Tools</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2 justify-center">
								{[
									"React",
									"Next.js",
									"FastAPI",
									"Node.js",
									"REST APIs",
									"SQL",
									"MongoDB",
									"Neo4j",
									"Docker",
									"Azure",
								].map((skill) => (
									<Badge key={skill} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">
								Data Science & Bioinformatics
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2 justify-center">
								{[
									"RNA-seq",
									"genomics",
									"transcriptomics",
									"metabolomics",
									"proteomics",
									"machine learning",
									"NLP",
								].map((skill) => (
									<Badge key={skill} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">Visualization</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2 justify-center">
								{["Dash", "Power BI", "Pandas", "NumPy", "Matplotlib"].map(
									(skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									)
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Experience Timeline */}
			<div>
				<h2 className="text-2xl font-bold mb-6">Experience</h2>
				<div className="space-y-6">
					{/* Rolls-Royce SMR */}
					<Card>
						<CardHeader>
							<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
								<CardTitle>Digital and Data Engineer</CardTitle>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<CardDescription>Feb 2024 – Present</CardDescription>
								</div>
							</div>
							<CardDescription className="text-base font-medium">
								Rolls-Royce SMR
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-5 space-y-2">
								<li>
									Designing and prototyping data-driven services for
									next-generation power stations
								</li>
								<li>
									Building Document Retrieval-Augmented Generation (RAG)
									systems using Azure architecture to deliver targeted,
									business-focused solutions
								</li>
								<li>
									Leading team upskilling in TypeScript, React, and Next.js
								</li>
								<li>
									Developing a company-wide time booking application (Next.js
									frontend, FastAPI backend, SQL database)
								</li>
								<li>
									Conducting large-scale data auditing and analytics solution
									development
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Capgemini */}
					<Card>
						<CardHeader>
							<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
								<CardTitle>Data and AI Engineer | Bioinformatician</CardTitle>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<CardDescription>Oct 2022 – Feb 2024</CardDescription>
								</div>
							</div>
							<CardDescription className="text-base font-medium">
								Capgemini Engineering
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-5 space-y-2">
								<li>Optimized omics pipelines for drug discovery</li>
								<li>Built knowledge graph systems with Neo4j and NLP</li>
								<li>Created interactive dashboards and implemented Azure CI/CD pipelines</li>
							</ul>
						</CardContent>
					</Card>

					{/* Eli Lilly */}
					<Card>
						<CardHeader>
							<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
								<CardTitle>Upstream TSMS Intern</CardTitle>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<CardDescription>Apr 2017 – Sep 2017</CardDescription>
								</div>
							</div>
							<CardDescription className="text-base font-medium">
								Eli Lilly
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-5 space-y-2">
								<li>
									Automated data extraction and analysis for process
									optimization
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Side Projects & Certifications */}
			<div>
				<h2 className="text-2xl font-bold mb-6 text-center">
					Side Projects & Certifications
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">AI Healthcare Tool</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<p className="mb-4">
								Developed a proof-of-concept AI healthcare tool (Next.js,
								DaisyUI, FastAPI, Hugging Face, LangChain)
							</p>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">RNA-seq Analysis Course</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<p className="mb-4">
								Created an RNA-seq analysis course during lockdown, attracting
								over 500 students
							</p>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader className="text-center">
							<CardTitle className="text-lg">AZ-900 Certification</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<p className="mb-4">
								Microsoft Azure Fundamentals certified
							</p>
							<div className="flex justify-center">
								<Badge>Azure</Badge>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
