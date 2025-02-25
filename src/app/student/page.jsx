'use client';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  MetricCard,
  RecentActivity,
  TeamMember,
  ProjectCard,
  NotificationItem,
  SearchBar,
} from './components/dashboard';
import {
  PlusIcon,
  LayoutDashboardIcon,
  UsersIcon,
  FolderIcon,
  BellIcon,
  BarChartIcon,
  ArrowRightIcon,
  CalendarIcon,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div
      className="flex min-h-screen flex-col gap-6 bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-900"
      id="dashboard-container"
    >
      {/* Header Section with Welcome Message and Actions */}
      <header
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        id="dashboard-header"
      >
        <div className="flex flex-col gap-2" id="header-content">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100" id="welcome-message">
            Welcome back, Reginald! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400" id="header-subtitle">
            Here's what's happening with your projects. Track your progress and stay organized.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3" id="header-actions">
          <SearchBar />
          <Button
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </header>

      {/* Metrics Cards Section */}
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        id="metrics-grid"
      >
        <MetricCard
          title="Total Projects"
          value={12}
          change={8.2}
          icon={<LayoutDashboardIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          description="Active projects across all teams"
        />

        <MetricCard
          title="Active Tasks"
          value={48}
          change={-2.4}
          icon={<FolderIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          description="Tasks requiring attention"
        />

        <MetricCard
          title="Team Members"
          value={24}
          change={12.5}
          icon={<UsersIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          description="Collaborators across projects"
        />

        <MetricCard
          title="Completion Rate"
          value="92%"
          change={3.2}
          icon={<BarChartIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          description="Average task completion rate"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Section - Takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Active Projects
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectCard
              title="Website Redesign"
              description="Modernize the company website with new branding and improved user experience."
              priority="high"
              status="in progress"
              progress={65}
              dueDate="2023-12-15"
              members={[
                { name: "Alex Smith" },
                { name: "Maria Garcia" },
                { name: "John Doe" },
                { name: "Sarah Johnson" }
              ]}
            />

            <ProjectCard
              title="Mobile App Development"
              description="Create a cross-platform mobile application for customer engagement."
              priority="medium"
              status="in progress"
              progress={42}
              dueDate="2024-01-20"
              members={[
                { name: "Emma Wilson" },
                { name: "James Brown" },
                { name: "Olivia Davis" }
              ]}
            />

            <ProjectCard
              title="Data Migration"
              description="Transfer all customer data to the new CRM system with zero downtime."
              priority="high"
              status="delayed"
              progress={28}
              dueDate="2023-11-30"
              members={[
                { name: "Michael Johnson" },
                { name: "Sophia Martinez" }
              ]}
            />

            <ProjectCard
              title="Marketing Campaign"
              description="Launch Q4 digital marketing campaign across all social platforms."
              priority="low"
              status="completed"
              progress={100}
              dueDate="2023-10-31"
              members={[
                { name: "Daniel Lee" },
                { name: "Isabella Wang" },
                { name: "William Taylor" },
                { name: "Ava Brown" }
              ]}
            />
          </div>

          {/* Recent Activity Section */}
          <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-800 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Activity
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="inline h-3 w-3 mr-1" />
                  Last 24 hours
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 h-8 w-8 p-0 rounded-full"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                  <span className="sr-only">View all activity</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-4 divide-y divide-gray-100 dark:divide-gray-700">
              <div className="py-2">
                <RecentActivity
                  type="commit"
                  username="Alex Smith"
                  action="pushed to"
                  target="website-redesign/main"
                  timestamp={new Date(Date.now() - 25 * 60 * 1000)}
                />
              </div>
              <div className="py-2">
                <RecentActivity
                  type="file"
                  username="Maria Garcia"
                  action="uploaded"
                  target="design-mockups.zip"
                  timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                />
              </div>
              <div className="py-2">
                <RecentActivity
                  type="comment"
                  username="John Doe"
                  action="commented on"
                  target="API Integration Plan"
                  timestamp={new Date(Date.now() - 5 * 60 * 60 * 1000)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Takes 1/3 of the width on large screens */}
        <div className="space-y-6">
          {/* Notifications Card */}
          <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-800 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BellIcon className="h-4 w-4 text-blue-500" />
                Notifications
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent className="px-6 py-4 space-y-3 max-h-[350px] overflow-y-auto">
              <NotificationItem
                username="Alex"
                action="mentioned you in"
                target="Website Redesign project"
                timestamp={new Date(Date.now() - 5 * 60 * 1000)}
                type="mention"
              />

              <NotificationItem
                username="System"
                action="New version of"
                target="Mobile App deployed"
                timestamp={new Date(Date.now() - 30 * 60 * 1000)}
                type="update"
                isRead={true}
              />

              <NotificationItem
                username="Emma"
                action="sent you a"
                target="message"
                timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                type="message"
              />
            </CardContent>
          </Card>

          {/* Team Members Card */}
          <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-800 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-blue-500" />
                Team Members
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="px-6 py-4 space-y-3 max-h-[350px] overflow-y-auto">
              <TeamMember
                name="Alex Smith"
                role="Frontend Developer"
                status="Available"
                skills={["React", "Tailwind", "TypeScript"]}
                isOnline={true}
              />

              <TeamMember
                name="Maria Garcia"
                role="UX Designer"
                status="Away"
                skills={["Figma", "UI/UX", "Prototyping"]}
                isOnline={true}
              />

              <TeamMember
                name="John Doe"
                role="Backend Developer"
                status="Offline"
                skills={["Node.js", "MongoDB", "Express"]}
                isOnline={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
