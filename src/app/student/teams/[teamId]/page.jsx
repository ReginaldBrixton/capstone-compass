'use client';

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { teamsData } from '../data/teamsData';
import FilesSection from './components/FilesSection';
import MembersList from './components/MembersList';
import TasksSection from './components/TasksSection';
import TeamHeader from './components/TeamHeader';
import TabNavigation from './components/ui/TabNavigation';
import { PageContainer, ContentSection } from './components/TeamLayout';
const TeamDetailsPage = ({ params }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  // Use React.use() to handle params
  const teamId = React.use(params).teamId;

  // Find team data
  const team = teamsData.find((t) => t.id.toString() === teamId) || null;
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📊',
    },
    {
      id: 'members',
      label: 'Members',
      icon: '👥',
      count: team?.members?.length,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: '✅',
    },
    {
      id: 'files',
      label: 'Files',
      icon: '📁',
    },
  ];
  const handleEditTeam = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Edit clicked');
      setLoading(false);
    }, 1000);
  };
  const handleDeleteTeam = () => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Delete clicked');
        router.push('/student/teams');
      }, 1000);
    }
  };
  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Remove member:', memberId);
        setLoading(false);
      }, 1000);
    }
  };
  const handlePromoteToLeader = (memberId) => {
    if (window.confirm('Are you sure you want to promote this member to team leader?')) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Promote to leader:', memberId);
        setLoading(false);
      }, 1000);
    }
  };
  if (!team) {
    return (
      <PageContainer data-oid="k49l5bh">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="my-6 rounded-2xl bg-red-50 p-12 text-center dark:bg-red-900/20"
          data-oid="wczj:23"
        >
          <div className="mb-4 text-5xl" data-oid="o3l-o:1">
            ⚠️
          </div>
          <h3 className="mb-2 text-xl font-bold text-red-600 dark:text-red-400" data-oid="n_npj90">
            Team Not Found
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300" data-oid="ewkeows">
            The team you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/student/teams')}
            className="rounded-lg bg-red-600 px-6 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700"
            data-oid="uv2a78o"
          >
            Return to Teams
          </button>
        </motion.div>
      </PageContainer>
    );
  }
  return (
    <PageContainer data-oid="0701njv">
      <TeamHeader
        team={team}
        onEdit={handleEditTeam}
        onDelete={handleDeleteTeam}
        loading={loading}
        data-oid="mbthp7h"
      />

      <ContentSection data-oid="8dm8lnw">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          data-oid="phjb4xv"
        />

        <AnimatePresence mode="wait" data-oid=".ynhd7-">
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.2,
            }}
            data-oid="v-m-sx7"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6" data-oid="ch10shr">
                <h2
                  className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white"
                  data-oid="ojjtcq6"
                >
                  📊 Overview
                </h2>
                {/* Overview content */}
              </div>
            )}

            {activeTab === 'members' && (
              <MembersList
                members={team.members}
                onRemove={handleRemoveMember}
                onPromote={handlePromoteToLeader}
                data-oid="417eh--"
              />
            )}

            {activeTab === 'tasks' && <TasksSection teamId={team.id} data-oid="rc:5tii" />}

            {activeTab === 'files' && <FilesSection teamId={team.id} data-oid="3t3uogu" />}
          </motion.div>
        </AnimatePresence>
      </ContentSection>
    </PageContainer>
  );
};
export default TeamDetailsPage;
