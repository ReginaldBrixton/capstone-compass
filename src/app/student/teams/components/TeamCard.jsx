'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useClickOutside } from '../hooks/useClickOutside';
import AvatarGroup from '@/components/Avatar/AvatarGroup';

// Helper Functions
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Action Handlers
const ActionHandlers = {
  handleTeamClick: (e, router, team) => {
    if (e.target.closest('.team-actions')) return;
    router.push(`/student/teams/${team.id}`);
  },

  handleActionClick: (e, showActions, setShowActions) => {
    e.stopPropagation();
    setShowActions(!showActions);
  },

  handleEdit: (e, team, onEditTeam, setShowActions) => {
    e.stopPropagation();
    onEditTeam?.(team);
    setShowActions(false);
  },

  handleDelete: (e, team, onDeleteTeam, setShowActions) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this team?')) {
      onDeleteTeam?.(team.id);
    }
    setShowActions(false);
  }
};

// Component Parts
const ActionsMenu = ({ team, showActions, actionsRef, handleActionClick, handleEdit, handleDelete, router }) => (
  <div className="team-actions-section absolute top-4 right-4 flex gap-2 z-10" ref={actionsRef} id={`team-actions-section-${team.id}`}>
    <button
      onClick={handleActionClick}
      className="team-actions-button p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Team actions"
      aria-expanded={showActions}
      aria-haspopup="true"
      id={`team-actions-button-${team.id}`}
    >
      ⋮
    </button>
    {showActions && (
      <div
        className="team-actions-menu absolute top-full right-0 mt-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-xl p-2 min-w-[200px] border border-gray-100 dark:border-gray-800"
        role="menu"
        aria-label="Team actions menu"
        id={`team-actions-menu-${team.id}`}
      >
        <div className="team-menu-items-section" id={`team-menu-items-${team.id}`}>
          <button
            onClick={handleEdit}
            className="team-menu-item w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center gap-2"
            role="menuitem"
            id={`team-menu-edit-${team.id}`}
          >
            ✏️ Edit Team
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/members`)}
            className="team-menu-item w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center gap-2"
            role="menuitem"
            id={`team-menu-members-${team.id}`}
          >
            👥 Manage Members
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/tasks`)}
            className="team-menu-item w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center gap-2"
            role="menuitem"
            id={`team-menu-tasks-${team.id}`}
          >
            📋 View Tasks
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/meetings`)}
            className="team-menu-item w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm flex items-center gap-2"
            role="menuitem"
            id={`team-menu-meetings-${team.id}`}
          >
            📅 Schedule Meeting
          </button>
          <button
            onClick={handleDelete}
            className="team-menu-item-delete w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            role="menuitem"
            id={`team-menu-delete-${team.id}`}
          >
            🗑️ Delete Team
          </button>
        </div>
      </div>
    )}
  </div>
);

const TeamHeader = ({ team, router }) => (
  <div 
    onClick={() => router.push(`/student/teams/${team.id}`)}
    className="team-header-section flex items-center gap-3 md:gap-4 mb-4 md:mb-5 cursor-pointer hover:opacity-80 transition-opacity" 
    id={`team-header-section-${team.id}`}
  >
    <div className="team-icon w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl text-xl" aria-hidden="true">
      {team.icon}
    </div>
    <div className="team-title-section">
      <h2 className="team-name text-lg md:text-xl font-semibold text-gray-900 dark:text-white" id={`team-name-${team.id}`}>
        {team.name}
      </h2>
      <span className="team-course text-sm md:text-base text-gray-600 dark:text-gray-400" id={`team-course-${team.id}`}>
        {team.course}
      </span>
    </div>
  </div>
);

const TeamContent = ({ team }) => (
  <div className="team-content-section space-y-4" id={`team-content-section-${team.id}`}>
    <p className="team-description text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed" id={`team-description-${team.id}`}>
      {team.description}
    </p>
    <TeamInfo team={team} />
    <TeamMembers team={team} />
    <TeamStats team={team} />
  </div>
);

const TeamInfo = ({ team }) => (
  <div className="team-info-section space-y-6" id={`team-info-section-${team.id}`}>
    {team.tags && team.tags.length > 0 && (
      <div 
        className="team-tags-section flex flex-wrap gap-2" 
        role="list" 
        aria-label="Team tags" 
        id={`team-tags-section-${team.id}`}
      >
        {team.tags.map((tag) => (
          <span 
            key={tag}
            className="team-tag px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 
              text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
            role="listitem"
            id={`team-tag-${tag}`}
          >
            #{tag}
          </span>
        ))}
      </div>
    )}

    {team.milestones && team.milestones.length > 0 && (
      <div 
        className="team-milestones-section space-y-3 bg-gray-50 dark:bg-gray-800/50 
          rounded-xl p-4" 
        role="list" 
        aria-label="Team milestones" 
        id={`team-milestones-section-${team.id}`}
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Milestones
        </h3>
        {team.milestones.map((milestone) => (
          <div 
            key={milestone.id}
            className="team-milestone flex items-center gap-3 p-2 rounded-lg" 
            role="listitem"
            id={`team-milestone-${milestone.id}`}
          >
            <input
              type="checkbox"
              checked={milestone.completed}
              readOnly
              className="milestone-checkbox h-4 w-4 rounded border-gray-300 
                dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              aria-label={`Milestone: ${milestone.title}`}
              id={`team-milestone-checkbox-${milestone.id}`}
            />
            <span 
              className={`milestone-title text-sm flex-1 ${
                milestone.completed 
                  ? 'text-gray-400 dark:text-gray-500 line-through'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              id={`team-milestone-title-${milestone.id}`}
            >
              {milestone.title}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {milestone.dueDate}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const TeamMembers = ({ team }) => (
  <div className="team-members-section" role="list" aria-label="Team members" id={`team-members-section-${team.id}`}>
    <AvatarGroup
      avatars={team.members.map(member => ({
        id: member.id,
        name: member.name,
        status: member.role === 'Leader' ? 'online' : 'offline',
        className: member.role === 'Leader' ? 'ring-2 ring-yellow-400' : ''
      }))}
      max={4}
      size="sm"
      rounded={true}
      bordered={true}
      className="mb-2"
      showCounter={true}
      overlap="md"
      direction="row"
    />
  </div>
);

const TeamStats = ({ team }) => (
  <div className="team-stats-section flex gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-gray-800" id={`team-stats-section-${team.id}`}>
    <div className="team-meetings-stat flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" id={`team-meetings-stat-${team.id}`}>
      <span aria-hidden="true">📅</span>
      <span>{team.meetings} meetings</span>
    </div>
    <div className="team-tasks-stat flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" id={`team-tasks-stat-${team.id}`}>
      <span aria-hidden="true">📋</span>
      <span>{team.tasks} tasks</span>
    </div>
  </div>
);

// Main Component
const TeamCard = ({ team, onEditTeam, onDeleteTeam }) => {
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef(null);

  useClickOutside(actionsRef, () => setShowActions(false));

  return (
    <div
      role="article"
      id={`team-card-container-${team.id}`}
      className="team-card-container bg-white dark:bg-gray-900 rounded-2xl p-5 md:p-6 shadow-md dark:shadow-lg relative overflow-hidden border border-gray-100 dark:border-gray-800"
    >
      <ActionsMenu
        team={team}
        showActions={showActions}
        actionsRef={actionsRef}
        handleActionClick={(e) => ActionHandlers.handleActionClick(e, showActions, setShowActions)}
        handleEdit={(e) => ActionHandlers.handleEdit(e, team, onEditTeam, setShowActions)}
        handleDelete={(e) => ActionHandlers.handleDelete(e, team, onDeleteTeam, setShowActions)}
        router={router}
      />
      <TeamHeader team={team} router={router} />
      <TeamContent team={team} />
    </div>
  );
};

export default TeamCard;
