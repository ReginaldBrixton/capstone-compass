'use client';

import React, { useCallback, useState } from 'react';
import CreateTeamModal from './components/CreateTeamModal';
import SearchAndFilters from './components/SearchAndFilters';
import TeamCard from './components/TeamCard';
import { teamsData } from './data/teamsData';
import {
  CreateTeamButton,
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
  TeamsContainer,
  TeamsGrid,
  Title,
} from './styles/TeamStyles';
const TeamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Teams');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState(teamsData);
  const handleCreateTeam = useCallback(
    (teamData) => {
      // In a real app, this would be an API call
      const newTeam = {
        id: teams.length + 1,
        ...teamData,
        members: [
          {
            id: 1,
            name: 'You',
            role: 'Leader',
          },
        ],
        meetings: 0,
        tasks: 0,
      };
      setTeams([...teams, newTeam]);
    },
    [teams]
  );
  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.course.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    switch (activeFilter) {
      case 'My Teams':
        return team.members.some((m) => m.name === 'You');
      case 'Leading':
        return team.members.some((m) => m.name === 'You' && m.role === 'Leader');
      case 'Member':
        return team.members.some((m) => m.name === 'You' && m.role === 'Member');
      default:
        return true;
    }
  });
  if (error) {
    return (
      <TeamsContainer className="teams-container" id="teams-container" data-oid="ly6rxpk">
        <ErrorMessage className="error-message" id="error-message" data-oid="894488i">
          {error}
        </ErrorMessage>
      </TeamsContainer>
    );
  }
  return (
    <TeamsContainer className="teams-container" id="teams-container" data-oid="oxe2et.">
      <Title className="teams-title" id="teams-title" data-oid="n0c9nh2">
        My Teams
      </Title>

      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        className="search-and-filters"
        id="search-and-filters"
        data-oid="qgl3jo5"
      />

      {isLoading ? (
        <LoadingSpinner className="loading-spinner" id="loading-spinner" data-oid="sld-v.d" />
      ) : filteredTeams.length > 0 ? (
        <TeamsGrid className="teams-grid" id="teams-grid" data-oid="_s:s.44">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              className="team-card"
              id={`team-card-${team.id}`}
              data-oid="j9k6aig"
            />
          ))}
        </TeamsGrid>
      ) : (
        <EmptyState className="empty-state" id="empty-state" data-oid="r7kwi6b">
          <div className="icon" id="empty-state-icon" data-oid="wdqjbt9">
            🤝
          </div>
          <h3 className="empty-state-title" id="empty-state-title" data-oid="9m2-kzk">
            No Teams Found
          </h3>
          <p className="empty-state-message" id="empty-state-message" data-oid="jk5oeku">
            {searchQuery
              ? 'No teams match your search criteria'
              : "You haven't joined any teams yet"}
          </p>
        </EmptyState>
      )}

      <CreateTeamButton
        onClick={() => setIsModalOpen(true)}
        aria-label="Create new team"
        className="create-team-button"
        id="create-team-button"
        data-oid="q_n23zc"
      >
        +
      </CreateTeamButton>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
        className="create-team-modal"
        id="create-team-modal"
        data-oid="w7ce204"
      />
    </TeamsContainer>
  );
};
export default TeamsPage;
