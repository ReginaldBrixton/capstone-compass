'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import './styles/global.css';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopNav = styled.nav`
  background: white;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--background-color);
  }
  &.active {
    background: var(--primary-color);
    color: white;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 150px;
  height: 0.375rem;
  background: var(--background-color);
  border-radius: 0.125rem;
  overflow: hidden;
  div {
    height: 100%;
    background: var(--primary-color);
    width: ${(props) => props.progress}%;
    transition: width 0.3s ease;
  }
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
`;

const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--border-color);
  padding: 0.5rem;
  display: none;
  z-index: 50;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
`;

const MobileNavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  text-decoration: none;
  color: var(--text-primary);
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  &.active {
    color: var(--primary-color);
    background: var(--background-color);
  }
`;

const DeadlineIndicator = ({ isOverdue, children }) => (
  <span className={`deadline-indicator ${isOverdue ? 'overdue' : ''}`}>
    {children}
  </span>
);

export default function ProjectsLayout({ children }) {
  const pathname = usePathname();

  const projectProgress = {
    overallProgress: 45,
    nextDeadline: '2024-02-15',
  };

  const navigationItems = [
    { name: 'Proposal', path: '/student/projects/proposal' },
    { name: 'Capstone 1', path: '/student/projects/capstone-one/1' },
    { name: 'Capstone 2', path: '/student/projects/capstone-two/1' },
    { name: 'Defense', path: '/student/projects/capstone-one/1/defense' },
  ];

  const isDeadlineOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <LayoutContainer>
      <TopNav>
        <NavContent>
          <ProgressIndicator>
            <span>Progress</span>
            <ProgressBar progress={projectProgress.overallProgress}>
              <div />
            </ProgressBar>
            <span>{projectProgress.overallProgress}%</span>
          </ProgressIndicator>

          <NavLinks>
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                href={item.path}
                className={pathname === item.path ? 'active' : ''}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinks>

          <DeadlineIndicator
            isOverdue={isDeadlineOverdue(projectProgress.nextDeadline)}
          >
            Next Deadline:{' '}
            {new Date(projectProgress.nextDeadline).toLocaleDateString()}
          </DeadlineIndicator>
        </NavContent>
      </TopNav>

      <MainContent>{children}</MainContent>

      <MobileNav>
        <MobileNavGrid>
          {navigationItems.map((item) => (
            <MobileNavItem
              key={item.path}
              href={item.path}
              className={pathname === item.path ? 'active' : ''}
            >
              {/* You can add icons here */}
              {item.name}
            </MobileNavItem>
          ))}
        </MobileNavGrid>
      </MobileNav>
    </LayoutContainer>
  );
}
