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
        members: [{ id: 1, name: 'You', role: 'Leader' }],
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
      <TeamsContainer className="teams-container" id="teams-container">
        <ErrorMessage className="error-message" id="error-message">
          {error}
        </ErrorMessage>
      </TeamsContainer>
    );
  }

  return (
    <TeamsContainer className="teams-container" id="teams-container">
      <Title className="teams-title" id="teams-title">
        My Teams
      </Title>

      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        className="search-and-filters"
        id="search-and-filters"
      />

      {isLoading ? (
        <LoadingSpinner className="loading-spinner" id="loading-spinner" />
      ) : filteredTeams.length > 0 ? (
        <TeamsGrid className="teams-grid" id="teams-grid">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} className="team-card" id={`team-card-${team.id}`} />
          ))}
        </TeamsGrid>
      ) : (
        <EmptyState className="empty-state" id="empty-state">
          <div className="icon" id="empty-state-icon">
            🤝
          </div>
          <h3 className="empty-state-title" id="empty-state-title">
            No Teams Found
          </h3>
          <p className="empty-state-message" id="empty-state-message">
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
      >
        +
      </CreateTeamButton>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
        className="create-team-modal"
        id="create-team-modal"
      />
    </TeamsContainer>
  );
};

export default TeamsPage;
