"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/global.css";

const DeadlineIndicator = ({ isOverdue, children }) => (
  <span
    className={`text-sm ${
      isOverdue
        ? "text-red-500 dark:text-red-400"
        : "text-gray-600 dark:text-gray-300"
    }`}
    data-oid="l:vs_t6"
  >
    {children}
  </span>
);

export default function ProjectsLayout({ children }) {
  const pathname = usePathname();
  const projectProgress = {
    overallProgress: 45,
    nextDeadline: "2024-02-15",
  };
  const navigationItems = [
    {
      name: "Proposal",
      path: "/student/projects/proposal",
    },
    {
      name: "Capstone 1",
      path: "/student/projects/capstone-one/1",
    },
    {
      name: "Capstone 2",
      path: "/student/projects/capstone-two/1",
    },
    {
      name: "Defense",
      path: "/student/projects/capstone-one/1/defense",
    },
  ];
  const isDeadlineOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div
      className="container mx-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4"
      data-oid="yjt8vrr"
    >
      <nav
        className="bg-gray-50 dark:bg-gray-900 p-2.5 shadow"
        data-oid="t7d1:so"
      >
        <div
          className="flex justify-between items-center"
          data-oid="k.i6-da"
        >
          <div className="flex items-center gap-2.5" data-oid="lpib3a1">
            <span
              className="text-gray-800 dark:text-gray-300"
              data-oid="tdnrpra"
            >
              Progress
            </span>
            <div
              className="w-40 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden"
              data-oid="qn93nnf"
            >
              <div
                style={{ width: `${projectProgress.overallProgress}%` }}
                className="h-full bg-blue-500 transition-all duration-300"
                data-oid="049dttv"
              />
            </div>
            <span data-oid="k:_c9um">
              {projectProgress.overallProgress}%
            </span>
          </div>

          <div
            className="hidden md:flex gap-2.5 items-center"
            data-oid="bb-90n7"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                data-oid="jxf2dk9"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <DeadlineIndicator
            isOverdue={isDeadlineOverdue(projectProgress.nextDeadline)}
            data-oid=":9hy9ia"
          >
            Next Deadline:{" "}
            {new Date(projectProgress.nextDeadline).toLocaleDateString()}
          </DeadlineIndicator>
        </div>
      </nav>

      <main className="my-4" data-oid="fs6t36c">
        {children}
      </main>

      <nav
        className="bg-gray-50 dark:bg-gray-900 p-2.5 shadow md:hidden"
        data-oid="b4oxbb0"
      >
        <div className="grid grid-cols-4 gap-1" data-oid="93fz-e3">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-0.5 text-xs p-1 rounded transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              data-oid="tzr5m2_"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
