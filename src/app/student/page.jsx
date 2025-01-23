"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  MetricCard,
  RecentActivity,
  TeamMember,
  ProjectCard,
  NotificationItem,
  SearchBar,
} from "./components/dashboard";
import {
  PlusIcon,
  LayoutDashboardIcon,
  UsersIcon,
  FolderIcon,
  BellIcon,
  BarChartIcon,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div
      className="flex min-h-screen flex-col gap-8 bg-gray-50 p-8"
      id="dashboard-container"
    >
      <header
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        id="dashboard-header"
      >
        <div className="flex flex-col gap-2" id="header-content">
          <h1 className="text-3xl font-bold" id="welcome-message">
            Welcome back, Reginald! 👋
          </h1>
          <p className="text-sm text-gray-600" id="header-subtitle">
            Here&apos;s what&apos;s happening with your projects. Track your
            progress and stay organized.
          </p>
        </div>
        <div className="flex items-center gap-4" id="header-actions">
          <SearchBar />
          <Button className="new-project-btn bg-blue-500 text-white hover:bg-blue-600">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" id="metrics-grid">
        <MetricCard
          title="Total Projects"
          value={12}
          change={8.2}
          icon={<LayoutDashboardIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Tasks"
          value={48}
          change={-2.4}
          icon={<FolderIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Team Members"
          value={24}
          change={12.5}
          icon={<UsersIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Completion Rate"
          value="92%"
          change={5.1}
          icon={<BarChartIcon className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3" id="main-content">
        <div className="lg:col-span-2 space-y-8" id="left-column">
          <Card className="active-projects-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Active Projects
              </CardTitle>
              <Button variant="ghost" size="sm" className="view-all-btn">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2" id="projects-grid">
                <ProjectCard
                  title="Website Redesign"
                  description="Redesigning the main website with modern UI/UX principles"
                  priority="high"
                  status="in progress"
                  progress={75}
                  dueDate="Dec 28"
                  members={[
                    { name: "Alex Smith" },
                    { name: "Maria Garcia" },
                    { name: "John Doe" },
                  ]}
                />
                <ProjectCard
                  title="Mobile App Development"
                  description="Creating a new mobile app for iOS and Android platforms"
                  priority="medium"
                  status="completed"
                  progress={100}
                  dueDate="Dec 24"
                  members={[{ name: "Emma Wilson" }, { name: "Lucas Kim" }]}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="recent-activity-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm" className="view-all-btn">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" id="activity-list">
                <RecentActivity
                  type="commit"
                  username="alexsmith"
                  action="pushed 3 commits to"
                  target="Website Redesign"
                  timestamp={new Date(Date.now() - 30 * 60 * 1000)}
                />
                <RecentActivity
                  type="file"
                  username="mariagarcia"
                  action="uploaded 2 files to"
                  target="Mobile App Development"
                  timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                />
                <RecentActivity
                  type="comment"
                  username="johndoe"
                  action="commented on"
                  target="Database Migration Plan"
                  timestamp={new Date(Date.now() - 4 * 60 * 60 * 1000)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8" id="right-column">
          <Card className="notifications-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" className="mark-read-btn">
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" id="notifications-list">
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
                />
                <NotificationItem
                  username="Emma"
                  action="sent you a"
                  target="message"
                  timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                  type="message"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="team-members-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Team Members
              </CardTitle>
              <Button variant="ghost" size="sm" className="view-all-btn">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" id="team-members-list">
                <TeamMember
                  name="Alex Smith"
                  role="Frontend Developer"
                  status="online"
                />
                <TeamMember
                  name="Maria Garcia"
                  role="UX Designer"
                  status="away"
                />
                <TeamMember
                  name="John Doe"
                  role="Backend Developer"
                  status="offline"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
