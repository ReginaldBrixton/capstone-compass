'use client';

import React from 'react';
import styled from 'styled-components';
const ResourcesContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;
const SearchBar = styled.div`
  margin-bottom: 30px;

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;
const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
const ResourceCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    color: #666;
    font-size: 14px;
    margin: 0;
  }
`;
const ResourceType = styled.span`
  display: inline-block;
  padding: 5px 10px;
  background: ${(props) => {
    switch (props.type) {
      case 'PDF':
        return '#ff4444';
      case 'Video':
        return '#4CAF50';
      case 'Link':
        return '#2196F3';
      default:
        return '#9e9e9e';
    }
  }};
  color: white;
  border-radius: 15px;
  font-size: 12px;
  margin-bottom: 10px;
`;
const FilterTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;
const FilterTab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${(props) => (props.active ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#e0e0e0')};
  }
`;

// Sample resources data
const sampleResources = [
  {
    id: 1,
    title: 'Introduction to Calculus',
    type: 'PDF',
    subject: 'Mathematics',
    description: 'Comprehensive guide to basic calculus concepts',
  },
  {
    id: 2,
    title: 'Chemistry Lab Safety',
    type: 'Video',
    subject: 'Science',
    description: 'Video tutorial on laboratory safety procedures',
  },
  {
    id: 3,
    title: 'World History Timeline',
    type: 'Link',
    subject: 'History',
    description: 'Interactive timeline of major historical events',
  },
  {
    id: 4,
    title: 'English Literature Notes',
    type: 'PDF',
    subject: 'English',
    description: "Study notes for Shakespeare's plays",
  },
];
export default function ResourcesPage() {
  return (
    <ResourcesContainer data-oid="j.rfwzr">
      <Title data-oid="na4zye5">Learning Resources</Title>

      <SearchBar data-oid="f6r7s2h">
        <input type="text" placeholder="Search for resources..." data-oid="ruwjq8:" />
      </SearchBar>

      <FilterTabs data-oid="9jmu77h">
        <FilterTab active data-oid="3b4xj_a">
          All Resources
        </FilterTab>
        <FilterTab data-oid="8enh6n1">PDFs</FilterTab>
        <FilterTab data-oid="2d_5dp9">Videos</FilterTab>
        <FilterTab data-oid="z61qypl">Links</FilterTab>
      </FilterTabs>

      <ResourceGrid data-oid="38cea5_">
        {sampleResources.map((resource) => (
          <ResourceCard key={resource.id} className="resource-card" data-oid="_w5vqzk">
            <ResourceType type={resource.type} data-oid="96ny.pe">
              {resource.type}
            </ResourceType>
            <h3 data-oid="g7t56ae">{resource.title}</h3>
            <p data-oid="ii7l7cs">{resource.subject}</p>
            <p data-oid="osf8cu_">{resource.description}</p>
          </ResourceCard>
        ))}
      </ResourceGrid>
    </ResourcesContainer>
  );
}
