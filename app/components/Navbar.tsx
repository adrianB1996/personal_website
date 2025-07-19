"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "SmartGP",
    href: "/projects/SmartGP",
    description: "AI-powered platform to enhance GP workflows and improve patient care.",
  },
  {
    title: "SPARQL Wikidata Explorer",
    href: "/projects/sparql-wikidata",
    description: "Tool for querying and exploring the potential of small local offline LLMs for SPARQL query generation",
  },
  // {
  //   title: "Aesthetics Website",
  //   href: "/projects/aesthetics",
  //   description: "Modern, responsive website for an aesthetics clinic with booking functionality.",
  // },
  // {
  //   title: "Health Knowledge Graph",
  //   href: "/projects/knowledge-graph",
  //   description: "Comprehensive health data visualization using knowledge graph technology.",
  // },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-background z-50 border-b shadow-sm">
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center">
          {/* Logo/Name - full title even on mobile */}
          <h1 className="text-sm sm:text-lg md:text-xl font-bold leading-tight">
            Adrian Bourke | <span className="inline">Data & AI Engineering</span>
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block relative">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">About Me</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                  <NavigationMenuContent className="right-0 w-[200px] md:w-[250px] lg:w-[300px] max-w-[90vw]">
                    <ul className="p-2">
                      {projects.map((project) => (
                        <li key={project.title} className="p-2">
                          <NavigationMenuLink asChild>
                            <Link href={project.href}>
                              <div className="text-sm font-medium leading-none mb-1">{project.title}</div>
                              <p className="text-muted-foreground text-xs leading-snug">
                                {project.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="px-2 py-1 hover:bg-muted rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Me
            </Link>
            
            <div className="space-y-1">
              <h3 className="px-2 font-semibold">Projects</h3>
              {projects.map((project) => (
                <Link 
                  key={project.title}
                  href={project.href}
                  className="block px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="font-medium">{project.title}</div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
