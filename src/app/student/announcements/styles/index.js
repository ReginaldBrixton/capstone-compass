import { motion } from 'framer-motion';
import styled from 'styled-components';

// Page Layout
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  color: #1a202c;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: #718096;
  font-size: 1.125rem;
`;

export const AnnouncementList = styled(motion.div)`
  display: grid;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Card Styles
export const Card = styled(motion.article)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 16px;
  color: #718096;
  font-size: 0.875rem;
`;

export const CardContent = styled.div`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
`;

// Modal Styles
export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 24px;
    width: 95%;
  }
`;

// Search and Filter Styles
export const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4299e1;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? '#4299e1' : '#e2e8f0')};
  color: ${(props) => (props.active ? 'white' : '#4a5568')};
  border: none;

  &:hover {
    background: ${(props) => (props.active ? '#3182ce' : '#cbd5e0')};
  }
`;
