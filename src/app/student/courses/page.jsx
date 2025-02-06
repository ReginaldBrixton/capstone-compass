'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
const CoursesContainer = styled.div`
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
const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
const CourseCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;
const CourseImage = styled.div`
  height: 160px;
  background: ${(props) => props.color || '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;
const CourseContent = styled.div`
  padding: 20px;

  h2 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 18px;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-size: 14px;
  }
`;
const ProgressBar = styled.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 6px;
  margin: 15px 0;
  overflow: hidden;
`;
const Progress = styled.div`
  background: #4caf50;
  height: 100%;
  width: ${(props) => props.value}%;
  transition: width 0.3s ease;
`;
const CourseStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
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

// Sample courses data
const sampleCourses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    progress: 75,
    assignments: 12,
    icon: '📐',
    color: '#ffebee',
    students: 28,
  },
  {
    id: 2,
    title: 'Physics 101',
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu - 11:00 AM',
    progress: 60,
    assignments: 8,
    icon: '⚡',
    color: '#e3f2fd',
    students: 32,
  },
  {
    id: 3,
    title: 'World Literature',
    instructor: 'Ms. Emily Brown',
    schedule: 'Mon, Wed - 2:00 PM',
    progress: 90,
    assignments: 15,
    icon: '📚',
    color: '#f3e5f5',
    students: 25,
  },
  {
    id: 4,
    title: 'Computer Science',
    instructor: 'Dr. James Wilson',
    schedule: 'Tue, Thu - 1:00 PM',
    progress: 85,
    assignments: 10,
    icon: '💻',
    color: '#e8f5e9',
    students: 30,
  },
];
export default function CoursesPage() {
  const [filter, setFilter] = useState('all');
  return (
    <CoursesContainer data-oid="q85m-qn">
      <Title data-oid="qkki26f">My Courses</Title>

      <SearchBar data-oid="yc_0wfu">
        <input type="text" placeholder="Search courses..." data-oid="jbgb-9x" />
      </SearchBar>

      <FilterTabs data-oid=":62zuvw">
        <FilterTab active={filter === 'all'} onClick={() => setFilter('all')} data-oid="a1w174h">
          All Courses
        </FilterTab>
        <FilterTab
          active={filter === 'ongoing'}
          onClick={() => setFilter('ongoing')}
          data-oid="t-urzlf"
        >
          Ongoing
        </FilterTab>
        <FilterTab
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
          data-oid="_0je7ik"
        >
          Completed
        </FilterTab>
      </FilterTabs>

      <CourseGrid data-oid="jdmr4jr">
        {sampleCourses.map((course) => (
          <CourseCard key={course.id} className="course-card" data-oid="4.l.6dz">
            <CourseImage color={course.color} data-oid="lmtt62_">
              {course.icon}
            </CourseImage>
            <CourseContent data-oid="09vivx4">
              <h2 data-oid="5ph2:ew">{course.title}</h2>
              <p data-oid="n58h.5e">{course.instructor}</p>
              <p data-oid="w:0b7r7">{course.schedule}</p>
              <ProgressBar data-oid="2ik::dg">
                <Progress value={course.progress} data-oid="w:k2v16" />
              </ProgressBar>
              <CourseStats data-oid="e8_oheb">
                <span data-oid="o0x__jj">{course.assignments} Assignments</span>
                <span data-oid="552cnxl">{course.students} Students</span>
              </CourseStats>
            </CourseContent>
          </CourseCard>
        ))}
      </CourseGrid>
    </CoursesContainer>
  );
}
