import styled from 'styled-components';

export const HelpContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 4px;
    background: #3498db;
    margin: 0.5rem auto;
    border-radius: 2px;
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 3rem;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }
  }

  &::before {
    content: '🔍';
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #95a5a6;
  }
`;

export const HelpSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const HelpCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: #3498db;
  }

  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .icon {
    font-size: 1.5rem;
  }
`;

export const FAQSection = styled.div`
  margin-top: 4rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
  }
`;

export const FAQItem = styled.div`
  background: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3498db;
  }
`;

export const FAQQuestion = styled.div`
  padding: 1.25rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #2c3e50;

  span {
    font-size: 1.5rem;
    color: #3498db;
    transition: transform 0.3s ease;
    transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

export const FAQAnswer = styled.div`
  padding: ${(props) => (props.isOpen ? '0 1.25rem 1.25rem' : '0 1.25rem')};
  color: #7f8c8d;
  max-height: ${(props) => (props.isOpen ? '500px' : '0')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  line-height: 1.6;
`;

export const ContactSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-top: 4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  form {
    display: grid;
    gap: 1.25rem;
    max-width: 600px;
    margin: 0 auto;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }
  }

  button {
    padding: 1rem 2rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    width: 100%;

    &:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
