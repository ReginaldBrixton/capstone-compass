'use client';

import styled from 'styled-components';

export const SettingsContainer = styled.div.attrs({ className: 'settings-container' })`
  width: 100%;
  max-width: clamp(300px, 90vw, 1200px);
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
`;

export const TabsContainer = styled.div.attrs({ className: 'settings-tabs' })`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    padding: 1rem 0;
  }
`;

export const Tab = styled.button.attrs({ className: 'settings-tab' })`
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem);
  border: none;
  background: ${(props) => (props.active ? 'var(--primary-color, #007bff)' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'var(--text-color, #333)')};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.active ? 'var(--primary-color, #007bff)' : '#f0f0f0')};
  }
`;

export const SettingsGrid = styled.div.attrs({ className: 'settings-grid' })`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
`;

export const SettingsSection = styled.section.attrs({ className: 'settings-section' })`
  background: white;
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 2rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h2 {
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    color: var(--heading-color, #1a1a1a);
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 0.5rem;
  }
`;

export const SettingRow = styled.div.attrs({ className: 'setting-row' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const SettingLabel = styled.div.attrs({ className: 'setting-label' })`
  flex: 1;

  h3 {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: var(--text-color, #333);
    margin: 0;
  }

  p {
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    color: var(--text-secondary, #666);
    margin: 0.25rem 0 0;
  }
`;

export const Toggle = styled.label.attrs({ className: 'setting-toggle' })`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #e0e0e0;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: var(--primary-color, #007bff);
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

export const Select = styled.select.attrs({ className: 'setting-select' })`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: var(--text-color, #333);
  background: white;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: var(--primary-color, #007bff);
  }
`;

export const Button = styled.button.attrs({ className: 'settings-button' })`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  background: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: clamp(0.875rem, 1.5vw, 1rem);

  &:hover {
    background: var(--primary-dark, #0056b3);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const SaveButtonContainer = styled.div.attrs({ className: 'save-button-container' })`
  position: sticky;
  bottom: 1rem;
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  background: linear-gradient(to top, white 50%, transparent);
`;
