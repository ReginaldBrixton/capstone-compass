'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheck, FiSave, FiSend } from 'react-icons/fi';
import styled from 'styled-components';

const ProposalContainer = styled.div`
  width: min(90%, 900px);
  margin: 0 auto;
  padding: clamp(1rem, 2vw, 1.5rem);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormContainer = styled(motion.div)`
  background: var(--card-bg, white);
  border-radius: clamp(0.5rem, 1vw, 0.75rem);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: clamp(1.25rem, 3vw, 2rem);
  margin: clamp(0.75rem, 2vw, 1.5rem) auto;
`;

const PageHeader = styled.header`
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  text-align: center;

  h1 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 0.375rem;
    font-weight: 700;
  }

  p {
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    color: var(--text-secondary);
  }
`;

const Form = styled.form`
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
  max-width: 100%;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: clamp(0.75rem, 2vw, 1rem);
  border: 2px solid var(--border-color, #e2e8f0);
  border-radius: 0.5rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  width: 100%;
  transition: all 0.2s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }

  &.error {
    border-color: var(--error-color);
    background-color: var(--error-light);
  }

  &.success {
    border-color: var(--success-color);
    background-color: var(--success-light);
  }
`;

const TextArea = styled.textarea`
  padding: clamp(0.75rem, 2vw, 1rem);
  border: 2px solid var(--border-color, #e2e8f0);
  border-radius: 0.5rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  width: 100%;
  min-height: clamp(120px, 20vh, 200px);
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`;

const Select = styled.select`
  padding: clamp(0.75rem, 2vw, 1rem);
  border: 2px solid var(--border-color, #e2e8f0);
  border-radius: 0.5rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  width: 100%;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1rem);
  margin-top: clamp(1rem, 2vw, 1.5rem);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.primary {
    background-color: var(--primary-color);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background-color: white;
    border: 2px solid var(--border-color);
    color: var(--text-primary);

    &:hover:not(:disabled) {
      background-color: var(--background-hover);
      transform: translateY(-1px);
    }
  }
`;

const researchAreas = [
  'Artificial Intelligence',
  'Data Science',
  'Software Engineering',
  'Cybersecurity',
  'Network Systems',
  'Human-Computer Interaction',
  'Other',
];

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ValidationMessage = styled.span`
  font-size: var(--text-xs);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.error {
    color: var(--error-color);
  }

  &.success {
    color: var(--success-color);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: var(--background-color);
  border-radius: 2px;
  margin: 2rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
`;

const FormSection = styled(motion.div)`
  padding: var(--space-sm);
  margin-bottom: var(--space-md);

  &.active {
    background-color: var(--background-hover);
  }
`;

export default function NewProposal() {
  const [formData, setFormData] = useState({
    title: '',
    researchArea: '',
    problemStatement: '',
    objectives: '',
    methodology: '',
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.length < 10 ? 'Title must be at least 10 characters long' : '';
      case 'problemStatement':
        return value.length < 50 ? 'Problem statement must be at least 50 characters long' : '';
      case 'objectives':
        return value.length < 50 ? 'Objectives must be at least 50 characters long' : '';
      case 'methodology':
        return value.length < 50 ? 'Methodology must be at least 50 characters long' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Update progress
    const fields = Object.keys(formData);
    const filledFields = fields.filter((field) => formData[field].length > 0);
    setProgress((filledFields.length / fields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement actual submission logic
      console.log('Submitted:', formData);
    } catch (error) {
      console.error('Error submitting proposal:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement draft saving logic
      console.log('Saved as draft:', formData);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProposalContainer className="proposal-page">
      <FormContainer
        initial="hidden"
        animate="visible"
        variants={formAnimation}
        className="proposal-form-container glass"
      >
        <PageHeader className="proposal-header">
          <h1 className="text-gradient">New Research Proposal</h1>
          <p>Fill out the details of your research proposal</p>
        </PageHeader>

        <ProgressBar className="proposal-progress">
          <Progress style={{ width: `${progress}%` }} className="proposal-progress-bar" />
        </ProgressBar>

        <Form onSubmit={handleSubmit} className="proposal-form">
          <FormSection
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`proposal-section ${formData.title ? 'active' : ''}`}
          >
            <FormGroup className="proposal-field">
              <Label className="proposal-label" htmlFor="title">
                Research Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your research title"
                required
                className={`proposal-input ${errors.title ? 'error' : formData.title ? 'success' : ''}`}
              />
              {errors.title && (
                <ValidationMessage className="validation-message error">
                  <FiAlertCircle /> {errors.title}
                </ValidationMessage>
              )}
              {!errors.title && formData.title && (
                <ValidationMessage className="validation-message success">
                  <FiCheck /> Looks good!
                </ValidationMessage>
              )}
            </FormGroup>
          </FormSection>

          <FormGroup className="proposal-field">
            <Label className="proposal-label" htmlFor="researchArea">
              Research Area
            </Label>
            <Select
              id="researchArea"
              name="researchArea"
              value={formData.researchArea}
              onChange={handleChange}
              required
              className="proposal-select"
            >
              <option value="">Select a research area</option>
              {researchAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup className="proposal-field">
            <Label className="proposal-label" htmlFor="problemStatement">
              Problem Statement
            </Label>
            <TextArea
              id="problemStatement"
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              placeholder="Describe the problem your research aims to solve"
              required
              className="proposal-textarea"
            />
          </FormGroup>

          <FormGroup className="proposal-field">
            <Label className="proposal-label" htmlFor="objectives">
              Research Objectives
            </Label>
            <TextArea
              id="objectives"
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              placeholder="List your research objectives"
              required
              className="proposal-textarea"
            />
          </FormGroup>

          <FormGroup className="proposal-field">
            <Label className="proposal-label" htmlFor="methodology">
              Methodology
            </Label>
            <TextArea
              id="methodology"
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
              placeholder="Describe your research methodology"
              required
              className="proposal-textarea"
            />
          </FormGroup>

          <ButtonGroup className="proposal-actions">
            <Button
              type="submit"
              className="proposal-button primary hover-lift"
              disabled={isSaving}
            >
              <FiSend />
              {isSaving ? 'Submitting...' : 'Submit Proposal'}
            </Button>
            <Button
              type="button"
              className="proposal-button secondary hover-lift"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <FiSave />
              Save as Draft
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </ProposalContainer>
  );
}
