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
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div
      className="flex min-h-screen flex-col gap-8 bg-white p-8 dark:bg-slate-900"
      id="dashboard-container"
      data-oid="tkghpvs"
    >
      <header
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        id="dashboard-header"
        data-oid=".nxe551"
      >
        <div className="flex flex-col gap-2" id="header-content" data-oid="cjtub47">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100" id="welcome-message" data-oid="56kbc._">
            Welcome back, Reginald! 👋
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400" id="header-subtitle" data-oid="p7y41ae">
            Here's what's happening with your projects. Track your progress and stay organized.
          </p>
        </div>
        <div className="flex items-center gap-4" id="header-actions" data-oid="apobe2d">
          <SearchBar data-oid="kd.34n_" />
          <Button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-800"
            data-oid=".t5b333"
          >
            <PlusIcon className="mr-2 h-4 w-4" data-oid="n9-3aru" />
            New Project
          </Button>
        </div>
      </header>

      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        id="metrics-grid"
        data-oid="yzqr2my"
      >
        <MetricCard
          title="Total Projects"
          value={12}
          change={8.2}
          icon={<LayoutDashboardIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          data-oid="cy7xlft"
        />

        <MetricCard
          title="Active Tasks"
          value={48}
          change={-2.4}
          icon={<FolderIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          data-oid="dx6.5wb"
        />

        <MetricCard
          title="Team Members"
          value={24}
          change={12.5}
          icon={<UsersIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          data-oid="4pkpsab"
        />

        <MetricCard
          title="Completion Rate"
          value="92%"
          change={5.1}
          icon={<BarChartIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          data-oid="a_8vnei"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3" id="main-content" data-oid="61_kaak">
        <div className="space-y-6 lg:col-span-2" id="left-column" data-oid="w2hlr:p">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Active Projects
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="px-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ProjectCard
                  title="Website Redesign"
                  description="Redesigning the main website with modern UI/UX principles"
                  priority="high"
                  status="in progress"
                  progress={75}
                  dueDate="Dec 28"
                  members={[
                    { name: 'Alex Smith' },
                    { name: 'Maria Garcia' },
                    { name: 'John Doe' },
                  ]}
                />

                <ProjectCard
                  title="Mobile App Development"
                  description="Creating a new mobile app for iOS and Android platforms"
                  priority="medium"
                  status="completed"
                  progress={100}
                  dueDate="Dec 24"
                  members={[
                    { name: 'Emma Wilson' },
                    { name: 'Lucas Kim' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Recent Activity
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
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

        <div className="space-y-6" id="right-column" data-oid="1hmqk3x">
          <Card className="border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Notifications
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
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

          <Card className="border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Team Members
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
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
