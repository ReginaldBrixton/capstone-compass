'use client';

import React from 'react';
import styled from 'styled-components';
import '../styles/global.css';
const TrackerContainer = styled.div`
  margin: 2rem 0;
`;
const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--border-color);
    z-index: 1;
  }
`;
const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    width: 2rem;
    height: 2rem;
    background: ${(props) =>
      props.isCompleted
        ? 'var(--success-color)'
        : props.isActive
          ? 'var(--primary-color)'
          : 'white'};
    border: 2px solid
      ${(props) =>
        props.isCompleted
          ? 'var(--success-color)'
          : props.isActive
            ? 'var(--primary-color)'
            : 'var(--border-color)'};
    border-radius: 50%;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  &::after {
    content: '✓';
    position: absolute;
    top: 0.5rem;
    color: white;
    font-size: 0.875rem;
    opacity: ${(props) => (props.isCompleted ? 1 : 0)};
  }
`;
const StepLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.isActive ? 'var(--primary-color)' : 'var(--text-secondary)')};
  text-align: center;
  max-width: 120px;
`;
const ProgressTracker = ({ steps, currentStep }) => {
  return (
    <TrackerContainer data-oid="3swjv4e">
      <StepsContainer data-oid="rf-3.6p">
        {steps.map((step, index) => (
          <Step
            key={step.id}
            isCompleted={index < currentStep}
            isActive={index === currentStep}
            data-oid="4hipf6."
          >
            <StepLabel isActive={index === currentStep} data-oid="flb4hv7">
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </StepsContainer>
    </TrackerContainer>
  );
};
export default ProgressTracker;
