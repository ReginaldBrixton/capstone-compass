'use client';

import React from 'react';
import styled from 'styled-components';

const AssignmentsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AssignmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AssignmentCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  background-color: ${(props) => {
    switch (props.status) {
      case 'Due Soon':
        return '#ffeb3b';
      case 'Submitted':
        return '#4caf50';
      case 'Late':
        return '#f44336';
      default:
        return '#e0e0e0';
    }
  }};
`;

// Sample assignments data
const sampleAssignments = [
  {
    id: 1,
    title: 'Math Homework - Chapter 5',
    subject: 'Mathematics',
    dueDate: 'December 25, 2023',
    status: 'Due Soon',
  },
  {
    id: 2,
    title: 'English Essay - Shakespeare',
    subject: 'English',
    dueDate: 'December 28, 2023',
    status: 'Not Started',
  },
  {
    id: 3,
    title: 'Science Lab Report',
    subject: 'Science',
    dueDate: 'December 20, 2023',
    status: 'Submitted',
  },
];

export default function AssignmentsPage() {
  return (
    <AssignmentsContainer>
      <Title>My Assignments</Title>

      <AssignmentList>
        {sampleAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} className="assignment-card">
            <div>
              <h2>{assignment.title}</h2>
              <p>{assignment.subject}</p>
              <p>Due: {assignment.dueDate}</p>
            </div>
            <StatusBadge status={assignment.status}>
              {assignment.status}
            </StatusBadge>
          </AssignmentCard>
        ))}
      </AssignmentList>
    </AssignmentsContainer>
  );
}
