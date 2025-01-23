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
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥', count: team?.members?.length },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
    { id: 'files', label: 'Files', icon: '📁' },
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
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-red-50 dark:bg-red-900/20 rounded-2xl my-6"
        >
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-red-600 dark:text-red-400 text-xl font-bold mb-2">Team Not Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The team you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/student/teams')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Return to Teams
          </button>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TeamHeader
        team={team}
        onEdit={handleEditTeam}
        onDelete={handleDeleteTeam}
        loading={loading}
      />

      <ContentSection>
        <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
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
              />
            )}

            {activeTab === 'tasks' && <TasksSection teamId={team.id} />}

            {activeTab === 'files' && <FilesSection teamId={team.id} />}
          </motion.div>
        </AnimatePresence>
      </ContentSection>
    </PageContainer>
  );
};

export default TeamDetailsPage;
