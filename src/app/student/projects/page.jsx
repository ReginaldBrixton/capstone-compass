"use client";

import React from "react";
import Link from "next/link";
import { FiAlertCircle, FiCheckCircle, FiClock, FiZap } from "react-icons/fi";

const ProjectPhases = [
  {
    id: "proposal",
    title: "Research Proposal",
    description: "Submit and defend your research proposal",
    route: "/student/projects/proposal",
    status: "Not Started",
    progress: 0,
    icon: <FiZap className="w-5 h-5" />,
  },
  {
    id: "capstone-one",
    title: "Capstone One",
    description: "Complete chapters 1-3 of your thesis",
    route: "/student/projects/capstone-one/new",
    status: "Not Started",
    progress: 0,
    icon: <FiClock className="w-5 h-5" />,
  },
  {
    id: "capstone-two",
    title: "Capstone Two",
    description: "Complete chapters 4-5 and final defense",
    route: "/student/projects/capstone-two/new",
    status: "Not Started",
    progress: 0,
    icon: <FiCheckCircle className="w-5 h-5" />,
  },
];

export default function ProjectsPage() {
  const [phases] = React.useState(ProjectPhases);

  const getStatusStyles = (status) => {
    const base = "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2";
    switch (status) {
      case "In Progress":
        return `${base} bg-blue-500/10 text-blue-600 dark:text-blue-400`;
      case "Completed":
        return `${base} bg-green-500/10 text-green-600 dark:text-green-400`;
      case "Not Started":
        return `${base} bg-rose-500/10 text-rose-600 dark:text-rose-400`;
      default:
        return `${base} bg-gray-500/10 text-gray-600 dark:text-gray-400`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Research Journey
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Navigate through your research milestones with guided progression
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase) => (
              <Link href={phase.route} key={phase.id}>
                <div className="group relative h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-blue-900/50">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                        {phase.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {phase.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {phase.description}
                    </p>

                    <div className="space-y-3">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className={getStatusStyles(phase.status)}>
                          {phase.status === "Not Started" && <FiAlertCircle className="w-4 h-4" />}
                          {phase.status === "In Progress" && <FiClock className="w-4 h-4" />}
                          {phase.status === "Completed" && <FiCheckCircle className="w-4 h-4" />}
                          {phase.status}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 font-medium">
                          {phase.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
          `,
        }}
      />
    </div>
  );
}
