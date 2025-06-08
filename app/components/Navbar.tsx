"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const projects = [
  {
    title: "SmartGP",
    href: "/projects/smartgp",
    description: "AI-powered platform to enhance GP workflows and improve patient care.",
  },
  {
    title: "Aesthetics Website",
    href: "/projects/aesthetics",
    description: "Modern, responsive website for an aesthetics clinic with booking functionality.",
  },
  {
    title: "Health Knowledge Graph",
    href: "/projects/knowledge-graph",
    description: "Comprehensive health data visualization using knowledge graph technology.",
  },
];

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-background z-50 border-b shadow-sm">
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Adrian Bourke | Data & AI Engineering</h1>
          <div className="relative">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                  <NavigationMenuContent className="right-0 w-[200px] md:w-[250px] lg:w-[200px] max-w-[90vw]">
                    <ul className="">
                      {projects.map((project) => (
                        <li key={project.title} className="p-2">
                          <NavigationMenuLink asChild>
                            <Link href={project.href}>
                              <div className="text-sm font-medium leading-none">{project.title}</div>
                              <p className="text-muted-foreground text-sm leading-snug">
                                {project.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">About Me</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
