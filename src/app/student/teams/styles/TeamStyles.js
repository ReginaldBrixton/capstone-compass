'use client';

import styled from 'styled-components';

export const TeamsContainer = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  max-width: min(95vw, 1400px);
  margin: 0 auto;
  background: ${({ theme }) =>
    theme === 'dark'
      ? 'linear-gradient(to bottom, #1a1a1a, #121212)'
      : 'linear-gradient(to bottom, #fafafa, #ffffff)'};
  min-height: 100vh;
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};
`;

export const Title = styled.h1`
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: clamp(40px, 8vw, 80px);
    height: 4px;
    background: linear-gradient(90deg, #007bff, #00bcd4);
    border-radius: 2px;
  }
`;

export const SearchBar = styled.div`
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  position: relative;

  input {
    width: 100%;
    padding: clamp(0.875rem, 2vw, 1rem) clamp(2.5rem, 4vw, 3rem)
      clamp(0.875rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem);
    border: 2px solid
      ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#eef2f6')};
    border-radius: 16px;
    font-size: clamp(0.875rem, 2vw, 1rem);
    transition: all 0.2s ease;
    background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#ffffff')};
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: ${({ theme }) => (theme === 'dark' ? '#6b7280' : '#94a3b8')};
    }
  }

  &:before {
    content: '🔍';
    position: absolute;
    right: clamp(1rem, 2vw, 1.25rem);
    top: 50%;
    transform: translateY(-50%);
    font-size: clamp(1rem, 2vw, 1.25rem);
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#f1f5f9')};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#cbd5e1')};
    border-radius: 2px;
  }
`;

export const FilterTab = styled.button`
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  border-radius: 12px;
  font-size: clamp(0.875rem, 1.8vw, 1rem);
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  background: ${(props) =>
    props.$active ? '#007bff' : props.theme === 'dark' ? '#2d2d2d' : '#f8fafc'};
  color: ${(props) =>
    props.$active ? '#ffffff' : props.theme === 'dark' ? '#e2e8f0' : '#64748b'};
  border: 1px solid
    ${(props) =>
      props.$active
        ? '#007bff'
        : props.theme === 'dark'
          ? '#3d3d3d'
          : '#e2e8f0'};

  &:hover {
    background: ${(props) =>
      props.$active
        ? '#0056b3'
        : props.theme === 'dark'
          ? '#3d3d3d'
          : '#f1f5f9'};
    border-color: ${(props) =>
      props.$active
        ? '#0056b3'
        : props.theme === 'dark'
          ? '#4a4a4a'
          : '#cbd5e1'};
  }
`;

export const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(1.5rem, 3vw, 2rem);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.div`
  background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : 'white')};
  border-radius: 20px;
  padding: clamp(1.25rem, 3vw, 1.5rem);
  box-shadow: ${({ theme }) =>
    theme === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 20px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#eef2f6')};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: ${({ theme }) =>
      theme === 'dark'
        ? '0 12px 24px rgba(0, 0, 0, 0.3)'
        : '0 12px 24px rgba(0, 0, 0, 0.08)'};
  }

  .team-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 1;
    transform: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  &:hover .team-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .action-button {
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : 'white')};
    border: none;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.25rem;
    color: ${({ theme }) => (theme === 'dark' ? '#e2e8f0' : '#64748b')};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => (theme === 'dark' ? '#3d3d3d' : '#f1f5f9')};
      color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};
    }
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 2vw, 1.25rem);
  padding-right: 2rem;

  h2 {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
    font-weight: 600;
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};
    margin: 0;
    line-height: 1.4;
  }

  .course {
    font-size: clamp(0.875rem, 2vw, 1rem);
    color: ${({ theme }) => (theme === 'dark' ? '#94a3b8' : '#64748b')};
  }
`;

export const TeamIcon = styled.div`
  width: clamp(2.5rem, 5vw, 3rem);
  height: clamp(2.5rem, 5vw, 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.color || (props.theme === 'dark' ? '#2d2d2d' : '#f1f5f9')};
  border-radius: 12px;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
`;

export const TeamContent = styled.div`
  p {
    color: ${({ theme }) => (theme === 'dark' ? '#e2e8f0' : '#475569')};
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.6;
    margin-bottom: clamp(1rem, 2vw, 1.25rem);
  }

  .team-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#f1f5f9')};
    color: ${({ theme }) => (theme === 'dark' ? '#94a3b8' : '#64748b')};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  }

  .milestones {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .milestone {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: clamp(0.875rem, 2vw, 1rem);
    color: ${({ theme }) => (theme === 'dark' ? '#e2e8f0' : '#475569')};
  }
`;

export const TeamStats = styled.div`
  display: flex;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(1rem, 2vw, 1.25rem);
  padding-top: clamp(1rem, 2vw, 1.25rem);
  border-top: 1px solid
    ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#eef2f6')};

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => (theme === 'dark' ? '#94a3b8' : '#64748b')};
    font-size: clamp(0.875rem, 2vw, 1rem);
  }

  .icon {
    opacity: 0.7;
  }
`;

export const MembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const MemberChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#f8fafc')};
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  color: ${({ theme }) => (theme === 'dark' ? '#e2e8f0' : '#475569')};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#3d3d3d' : '#eef2f6')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => (theme === 'dark' ? '#3d3d3d' : '#f1f5f9')};
    border-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e2e8f0')};
  }
`;

export const MemberAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => (theme === 'dark' ? '#3d3d3d' : '#e2e8f0')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: ${({ theme }) => (theme === 'dark' ? '#94a3b8' : '#64748b')};
  font-weight: 500;
`;

export const PopupMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : 'white')};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme === 'dark'
      ? '0 10px 25px rgba(0, 0, 0, 0.3)'
      : '0 10px 25px rgba(0, 0, 0, 0.1)'};
  padding: 0.5rem;
  min-width: 200px;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#eef2f6')};
`;

export const PopupMenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: ${(props) =>
    props.$danger ? '#ef4444' : props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  font-size: 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$danger
        ? props.theme === 'dark'
          ? '#7f1d1d'
          : '#fee2e2'
        : props.theme === 'dark'
          ? '#2d2d2d'
          : '#f8fafc'};
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#f1f5f9')};
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: clamp(1rem, 3vw, 1.5rem) auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: ${({ theme }) => (theme === 'dark' ? '#7f1d1d' : '#fef2f2')};
  color: ${({ theme }) => (theme === 'dark' ? '#fecaca' : '#ef4444')};
  padding: clamp(1rem, 2vw, 1.25rem);
  border-radius: 12px;
  margin: clamp(1rem, 3vw, 1.5rem) 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#991b1b' : '#fee2e2')};

  &:before {
    content: '⚠️';
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: clamp(2rem, 5vw, 3rem);
  color: ${({ theme }) => (theme === 'dark' ? '#94a3b8' : '#64748b')};

  .icon {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    opacity: 0.7;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#1a1a1a')};
    margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
    font-weight: 600;
  }

  p {
    font-size: clamp(0.875rem, 2vw, 1rem);
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CreateTeamButton = styled.button`
  position: fixed;
  bottom: clamp(1.5rem, 4vw, 2.5rem);
  right: clamp(1.5rem, 4vw, 2.5rem);
  width: clamp(3.5rem, 8vw, 4rem);
  height: clamp(3.5rem, 8vw, 4rem);
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  font-size: clamp(1.5rem, 3vw, 1.75rem);
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
    background: #0056b3;
    box-shadow: 0 8px 30px rgba(0, 123, 255, 0.4);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
  }

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
  }
`;
