// 'use client';

// import styled, { keyframes } from 'styled-components';

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const pulse = keyframes`
//   0% {
//     transform: scale(0.95);
//     box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
//   }

//   70% {
//     transform: scale(1);
//     box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
//   }

//   100% {
//     transform: scale(0.95);
//     box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
//   }
// `;

// export const DashboardContainer = styled.div`
//   min-height: 100vh;
//   padding: clamp(1rem, 3vw, 2.5rem);
//   background: #f9fafb;
//   color: #111827;
// `;

// export const DashboardContent = styled.div`
//   max-width: 1280px;
//   margin: 0 auto;
//   display: grid;
//   gap: 1.5rem;

//   @media (min-width: 1024px) {
//     grid-template-columns: 1fr 350px;
//   }
// `;

// export const MainContent = styled.div`
//   display: grid;
//   gap: 1.5rem;
// `;

// export const Header = styled.header`
//   background: linear-gradient(135deg, #2563eb, #1e40af);
//   padding: 1.5rem;
//   border-radius: 1rem;
//   color: white;
//   margin-bottom: 1.5rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

//   h1 {
//     font-size: 1.875rem;
//     font-weight: 700;
//     margin: 0;
//     line-height: 1.2;
//     letter-spacing: -0.02em;
//   }

//   p {
//     font-size: 1.125rem;
//     opacity: 0.9;
//     margin: 0.5rem 0 0;
//   }
// `;

// export const HeaderActions = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
//   flex-wrap: wrap;

//   @media (min-width: 1024px) {
//     margin-top: 1.5rem;
//   }
// `;

// export const SearchContainer = styled.div`
//   flex: 1;
//   min-width: 300px;
// `;

// export const Card = styled.div`
//   background: white;
//   border-radius: 0.75rem;
//   padding: 1.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   transition: all 0.2s ease;
//   border: 1px solid #f3f4f6;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//   }
// `;

// export const StatsGrid = styled.div`
//   display: grid;
//   gap: 1.5rem;
//   grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
// `;

// export const ProjectsSection = styled.section`
//   h2 {
//     font-size: 1.5rem;
//     color: #111827;
//     margin-bottom: 1.5rem;
//     font-weight: 600;
//     letter-spacing: -0.02em;
//   }
// `;

// export const ProjectsGrid = styled.div`
//   display: grid;
//   gap: 1.5rem;
//   grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
// `;

// export const Sidebar = styled.aside`
//   display: grid;
//   gap: 1.5rem;
//   height: max-content;

//   @media (min-width: 1024px) {
//     position: sticky;
//     top: 1.5rem;
//   }
// `;

// export const LoadingOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(255, 255, 255, 0.9);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
// `;

// export const LoadingSpinner = styled.div`
//   width: 40px;
//   height: 40px;
//   border: 3px solid #e5e7eb;
//   border-top-color: #3b82f6;
//   border-radius: 50%;
//   animation: ${rotate} 1s linear infinite;
// `;

// export const FilterBar = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// export const FilterButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: ${(props) => (props.$active ? '#eff6ff' : 'white')};
//   color: ${(props) => (props.$active ? '#1d4ed8' : '#374151')};
//   border: 1px solid ${(props) => (props.$active ? '#bfdbfe' : '#e5e7eb')};
//   border-radius: 9999px;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: ${(props) => (props.$active ? '#dbeafe' : '#f9fafb')};
//   }
// `;

// export const EmptyState = styled.div`
//   text-align: center;
//   padding: 3rem;
//   color: #6b7280;

//   svg {
//     width: 48px;
//     height: 48px;
//     margin-bottom: 1rem;
//     color: #9ca3af;
//   }

//   h3 {
//     font-size: 1.25rem;
//     color: #111827;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     font-size: 1rem;
//     color: #6b7280;
//     margin-bottom: 1.5rem;
//   }
// `;
