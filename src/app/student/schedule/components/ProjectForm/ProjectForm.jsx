'use client';

import React, { useState } from 'react';

import styles from './styles/project-form.module.css';

const ProjectForm = ({ onSubmit, initialData, onClose }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      deadline: '',
      category: 'pending',
      attachments: [],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.projectForm} project-form`}
      id="project-form"
    >
      <div className={`${styles.formGroup} project-form__group`}>
        <label htmlFor="title" className="project-form__label">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          aria-required="true"
          placeholder="Enter project title"
          className="project-form__input"
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`}>
        <label htmlFor="description" className="project-form__label">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
          aria-required="true"
          placeholder="Enter project description"
          rows={4}
          className="project-form__textarea"
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`}>
        <label htmlFor="deadline" className="project-form__label">
          Deadline
        </label>
        <input
          type="datetime-local"
          id="deadline"
          value={formData.deadline}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, deadline: e.target.value }))
          }
          required
          aria-required="true"
          className={`${styles.dateInput} project-form__date-input`}
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`}>
        <label htmlFor="category" className="project-form__label">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className={`${styles.select} project-form__select`}
        >
          <option value="pending" className="project-form__option">
            Pending
          </option>
          <option value="in-progress" className="project-form__option">
            In Progress
          </option>
          <option value="completed" className="project-form__option">
            Completed
          </option>
        </select>
      </div>

      <div className={`${styles.formGroup} project-form__group`}>
        <label htmlFor="attachments" className="project-form__label">
          Attachments
        </label>
        <div
          className={`${styles.fileInputWrapper} project-form__file-wrapper`}
        >
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleFileChange}
            className={`${styles.fileInput} project-form__file-input`}
          />
          <div className={`${styles.fileInputLabel} project-form__file-label`}>
            Choose Files
          </div>
        </div>
        {formData.attachments.length > 0 && (
          <div
            className={`${styles.attachmentList} project-form__attachment-list`}
          >
            {formData.attachments.map((file, index) => (
              <div
                key={index}
                className={`${styles.attachmentItem} project-form__attachment-item`}
              >
                <span className={`${styles.fileName} project-form__file-name`}>
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: prev.attachments.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                  className={`${styles.removeBtn} project-form__remove-btn`}
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`${styles.formActions} project-form__actions`}>
        <button
          type="button"
          onClick={onClose}
          className={`${styles.cancelBtn} project-form__cancel-btn`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.submitBtn} project-form__submit-btn`}
        >
          {initialData ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
