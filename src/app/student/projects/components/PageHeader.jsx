'use client';

import React from 'react';
import styled from 'styled-components';
import { useProject } from '../context/ProjectContext';
import { formatDate } from '../utils/dateUtils';
import { calculateTimeRemaining } from '../utils/projectUtils';
import '../styles/global.css';
const HeaderContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1rem 0 2rem;
  box-shadow: var(--card-shadow);

  @media (max-width: 768px) {
    border-radius: 0;
    margin: -1rem -1rem 1rem -1rem;
    padding: 1rem;
  }
`;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const TitleSection = styled.div`
  flex: 1;
  min-width: 0; // Prevents flex item from overflowing
`;
const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  line-height: 1.2;
  overflow-wrap: break-word;
`;
const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: clamp(0.875rem, 4vw, 1rem);
  line-height: 1.5;
`;
const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  white-space: nowrap;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &.primary {
    background: var(--primary-color);
    color: white;

    &:hover {
      background: var(--primary-dark);
    }
  }

  &.secondary {
    background: white;
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--background-color);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;
const ProgressSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding-top: 1rem;
  }
`;
const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ProgressItem = styled.div`
  background: var(--background-color);
  padding: 1rem;
  border-radius: 0.375rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;
const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.875rem;
  }

  strong {
    color: ${(props) => (props.progress >= 100 ? 'var(--success-color)' : 'var(--text-primary)')};
  }
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;

  div {
    height: 100%;
    background: ${(props) =>
      props.progress >= 100 ? 'var(--success-color)' : 'var(--primary-color)'};
    width: ${(props) => props.progress}%;
    transition: width 0.3s ease;
  }
`;
const TimeRemaining = ({ timeRemaining, deadline }) => (
  <MetaItem data-oid="u1w.4a_">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-oid="cougg:q"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-oid="cagt.uj" />
      <line x1="16" y1="2" x2="16" y2="6" data-oid="78xu_tk" />
      <line x1="8" y1="2" x2="8" y2="6" data-oid="wsi9p3y" />
      <line x1="3" y1="10" x2="21" y2="10" data-oid="ecu8kvx" />
    </svg>
    <span data-oid="kiyj.4f">Deadline:</span>
    <span
      className={`time-remaining ${timeRemaining?.isOverdue ? 'overdue' : ''}`}
      data-oid="zzsl47x"
    >
      {formatDate(deadline)} ({timeRemaining?.timeString})
    </span>
  </MetaItem>
);
const PageHeader = ({
  title,
  description,
  metadata,
  actions,
  deadline,
  timeRemaining,
  ...props
}) => {
  const { state } = useProject();
  return (
    <HeaderContainer {...props} data-oid="13hezwi">
      <HeaderContent data-oid="83nb:2u">
        <TitleSection data-oid="2hgs4t2">
          <Title data-oid="752:ut-">{title}</Title>
          <Description data-oid="q0_7a88">{description}</Description>

          <MetaInfo data-oid="lig..rl">
            {metadata.wordCount && (
              <MetaItem data-oid="o2fag3q">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  data-oid="h1im34z"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" data-oid="z7-zidu" />
                  <path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                    data-oid="mue0qnw"
                  />
                </svg>
                <span data-oid="7f4.78n">Words:</span>
                <strong data-oid="agh2pjv">{metadata.wordCount.toLocaleString()}</strong>
              </MetaItem>
            )}

            {metadata.lastModified && (
              <MetaItem data-oid="wqy0j5n">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  data-oid="nbx984-"
                >
                  <circle cx="12" cy="12" r="10" data-oid="o.k0br0" />
                  <path d="M12 6v6l4 2" data-oid=":_liukc" />
                </svg>
                <span data-oid="kfsaagj">Modified:</span>
                <strong data-oid="yj_4z3d">{formatDate(metadata.lastModified)}</strong>
              </MetaItem>
            )}

            {deadline && (
              <TimeRemaining timeRemaining={timeRemaining} deadline={deadline} data-oid="b_xy5k3" />
            )}
          </MetaInfo>
        </TitleSection>

        <ActionButtons data-oid="onerxho">
          {actions.secondaryAction && (
            <Button
              className="secondary"
              onClick={actions.secondaryAction.onClick}
              data-oid="3d6y_.4"
            >
              {actions.secondaryAction.icon && (
                <span data-oid="v1.2:pe">{actions.secondaryAction.icon}</span>
              )}
              {actions.secondaryAction.label}
            </Button>
          )}

          {actions.primaryAction && (
            <Button className="primary" onClick={actions.primaryAction.onClick} data-oid="qgihf2g">
              {actions.primaryAction.icon && (
                <span data-oid="efr.i-5">{actions.primaryAction.icon}</span>
              )}
              {actions.primaryAction.label}
            </Button>
          )}
        </ActionButtons>
      </HeaderContent>

      {metadata.progressItems && metadata.progressItems.length > 0 && (
        <ProgressSection data-oid="pqruv.w">
          <h3 data-oid=".vvw_v7">Progress Overview</h3>
          <ProgressGrid data-oid="y9-w.5w">
            {metadata.progressItems.map((item, index) => (
              <ProgressItem key={index} data-oid="u3z7dp_">
                <ProgressHeader progress={item.progress} data-oid="jqudo9g">
                  <span data-oid="eqx7_00">{item.label}</span>
                  <strong data-oid="2fks9ar">{item.progress}%</strong>
                </ProgressHeader>
                <ProgressBar progress={item.progress} data-oid="5qx_:5f">
                  <div data-oid="g.xd091" />
                </ProgressBar>
              </ProgressItem>
            ))}
          </ProgressGrid>
        </ProgressSection>
      )}
    </HeaderContainer>
  );
};
export default PageHeader;
