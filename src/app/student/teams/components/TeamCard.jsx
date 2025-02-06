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
  },
};

// Component Parts
const ActionsMenu = ({
  team,
  showActions,
  actionsRef,
  handleActionClick,
  handleEdit,
  handleDelete,
  router,
}) => (
  <div
    className="team-actions-section absolute right-4 top-4 z-10 flex gap-2"
    ref={actionsRef}
    id={`team-actions-section-${team.id}`}
    data-oid="3hrzbee"
  >
    <button
      onClick={handleActionClick}
      className="team-actions-button rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Team actions"
      aria-expanded={showActions}
      aria-haspopup="true"
      id={`team-actions-button-${team.id}`}
      data-oid="bk43d2."
    >
      ⋮
    </button>
    {showActions && (
      <div
        className="team-actions-menu absolute right-0 top-full mt-1 min-w-[200px] rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:shadow-xl"
        role="menu"
        aria-label="Team actions menu"
        id={`team-actions-menu-${team.id}`}
        data-oid="uyi7cie"
      >
        <div
          className="team-menu-items-section"
          id={`team-menu-items-${team.id}`}
          data-oid="ukh7u3r"
        >
          <button
            onClick={handleEdit}
            className="team-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            role="menuitem"
            id={`team-menu-edit-${team.id}`}
            data-oid="m_b58rk"
          >
            ✏️ Edit Team
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/members`)}
            className="team-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            role="menuitem"
            id={`team-menu-members-${team.id}`}
            data-oid="4m75hks"
          >
            👥 Manage Members
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/tasks`)}
            className="team-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            role="menuitem"
            id={`team-menu-tasks-${team.id}`}
            data-oid="cll0x3o"
          >
            📋 View Tasks
          </button>
          <button
            onClick={() => router.push(`/student/teams/${team.id}/meetings`)}
            className="team-menu-item flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            role="menuitem"
            id={`team-menu-meetings-${team.id}`}
            data-oid="aim.41_"
          >
            📅 Schedule Meeting
          </button>
          <button
            onClick={handleDelete}
            className="team-menu-item-delete flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
            role="menuitem"
            id={`team-menu-delete-${team.id}`}
            data-oid="6dqifbt"
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
    className="team-header-section mb-4 flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80 md:mb-5 md:gap-4"
    id={`team-header-section-${team.id}`}
    data-oid="2ak7m3f"
  >
    <div
      className="team-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-xl dark:bg-gray-800 md:h-12 md:w-12"
      aria-hidden="true"
      data-oid="seuv8jo"
    >
      {team.icon}
    </div>
    <div className="team-title-section" data-oid="oayvv8c">
      <h2
        className="team-name text-lg font-semibold text-gray-900 dark:text-white md:text-xl"
        id={`team-name-${team.id}`}
        data-oid="k5_5-vq"
      >
        {team.name}
      </h2>
      <span
        className="team-course text-sm text-gray-600 dark:text-gray-400 md:text-base"
        id={`team-course-${team.id}`}
        data-oid="p0zek0u"
      >
        {team.course}
      </span>
    </div>
  </div>
);
const TeamContent = ({ team }) => (
  <div
    className="team-content-section space-y-4"
    id={`team-content-section-${team.id}`}
    data-oid="vrd1doy"
  >
    <p
      className="team-description text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base"
      id={`team-description-${team.id}`}
      data-oid="g5cf64a"
    >
      {team.description}
    </p>
    <TeamInfo team={team} data-oid="l:i0yq8" />
    <TeamMembers team={team} data-oid="ch0ccn7" />
    <TeamStats team={team} data-oid="f94io:6" />
  </div>
);
const TeamInfo = ({ team }) => (
  <div
    className="team-info-section space-y-6"
    id={`team-info-section-${team.id}`}
    data-oid="g_cc971"
  >
    {team.tags && team.tags.length > 0 && (
      <div
        className="team-tags-section flex flex-wrap gap-2"
        role="list"
        aria-label="Team tags"
        id={`team-tags-section-${team.id}`}
        data-oid="n-qwfoj"
      >
        {team.tags.map((tag) => (
          <span
            key={tag}
            className="team-tag rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            role="listitem"
            id={`team-tag-${tag}`}
            data-oid="4sh8tjt"
          >
            #{tag}
          </span>
        ))}
      </div>
    )}

    {team.milestones && team.milestones.length > 0 && (
      <div
        className="team-milestones-section space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50"
        role="list"
        aria-label="Team milestones"
        id={`team-milestones-section-${team.id}`}
        data-oid="30:o7b:"
      >
        <h3
          className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          data-oid="d7r-gj7"
        >
          Milestones
        </h3>
        {team.milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="team-milestone flex items-center gap-3 rounded-lg p-2"
            role="listitem"
            id={`team-milestone-${milestone.id}`}
            data-oid="dqj1:4q"
          >
            <input
              type="checkbox"
              checked={milestone.completed}
              readOnly
              className="milestone-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
              aria-label={`Milestone: ${milestone.title}`}
              id={`team-milestone-checkbox-${milestone.id}`}
              data-oid="wqt3axj"
            />
            <span
              className={`milestone-title flex-1 text-sm ${milestone.completed ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
              id={`team-milestone-title-${milestone.id}`}
              data-oid="u_r_oqn"
            >
              {milestone.title}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500" data-oid="hzq2nsr">
              {milestone.dueDate}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);
const TeamMembers = ({ team }) => (
  <div
    className="team-members-section"
    role="list"
    aria-label="Team members"
    id={`team-members-section-${team.id}`}
    data-oid="d7c925j"
  >
    <AvatarGroup
      avatars={team.members.map((member) => ({
        id: member.id,
        name: member.name,
        status: member.role === 'Leader' ? 'online' : 'offline',
        className: member.role === 'Leader' ? 'ring-2 ring-yellow-400' : '',
      }))}
      max={4}
      size="sm"
      rounded={true}
      bordered={true}
      className="mb-2"
      showCounter={true}
      overlap="md"
      direction="row"
      data-oid="v_jjy33"
    />
  </div>
);
const TeamStats = ({ team }) => (
  <div
    className="team-stats-section mt-4 flex gap-4 border-t border-gray-100 pt-4 dark:border-gray-800"
    id={`team-stats-section-${team.id}`}
    data-oid="m0pltjl"
  >
    <div
      className="team-meetings-stat flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
      id={`team-meetings-stat-${team.id}`}
      data-oid="l7ykm6o"
    >
      <span aria-hidden="true" data-oid="-mhp8g8">
        📅
      </span>
      <span data-oid="-dl093w">{team.meetings} meetings</span>
    </div>
    <div
      className="team-tasks-stat flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
      id={`team-tasks-stat-${team.id}`}
      data-oid="tam6jef"
    >
      <span aria-hidden="true" data-oid="sdg8x5o">
        📋
      </span>
      <span data-oid="4a79uii">{team.tasks} tasks</span>
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
      className="team-card-container relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-gray-900 dark:shadow-lg md:p-6"
      data-oid=":fcj0qe"
    >
      <ActionsMenu
        team={team}
        showActions={showActions}
        actionsRef={actionsRef}
        handleActionClick={(e) => ActionHandlers.handleActionClick(e, showActions, setShowActions)}
        handleEdit={(e) => ActionHandlers.handleEdit(e, team, onEditTeam, setShowActions)}
        handleDelete={(e) => ActionHandlers.handleDelete(e, team, onDeleteTeam, setShowActions)}
        router={router}
        data-oid="w6iwl3."
      />
      <TeamHeader team={team} router={router} data-oid="eq38aq7" />
      <TeamContent team={team} data-oid="h3x6ktw" />
    </div>
  );
};
export default TeamCard;
