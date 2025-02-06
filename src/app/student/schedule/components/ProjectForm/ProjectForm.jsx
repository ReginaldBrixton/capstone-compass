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
      data-oid="-z:93v4"
    >
      <div className={`${styles.formGroup} project-form__group`} data-oid="1ey2wmt">
        <label htmlFor="title" className="project-form__label" data-oid="b9ea3pk">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          required
          aria-required="true"
          placeholder="Enter project title"
          className="project-form__input"
          data-oid="854dvx1"
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`} data-oid="wwwk2f2">
        <label htmlFor="description" className="project-form__label" data-oid="fo4h048">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required
          aria-required="true"
          placeholder="Enter project description"
          rows={4}
          className="project-form__textarea"
          data-oid="en7nmx8"
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`} data-oid="i1jfrw5">
        <label htmlFor="deadline" className="project-form__label" data-oid="-phjy57">
          Deadline
        </label>
        <input
          type="datetime-local"
          id="deadline"
          value={formData.deadline}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              deadline: e.target.value,
            }))
          }
          required
          aria-required="true"
          className={`${styles.dateInput} project-form__date-input`}
          data-oid="w8:5p9s"
        />
      </div>

      <div className={`${styles.formGroup} project-form__group`} data-oid="3-7h2.n">
        <label htmlFor="category" className="project-form__label" data-oid="4a5h4-e">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          className={`${styles.select} project-form__select`}
          data-oid="qe62fd:"
        >
          <option value="pending" className="project-form__option" data-oid="xk3l.f7">
            Pending
          </option>
          <option value="in-progress" className="project-form__option" data-oid="qbfkl3v">
            In Progress
          </option>
          <option value="completed" className="project-form__option" data-oid=".vgm7rm">
            Completed
          </option>
        </select>
      </div>

      <div className={`${styles.formGroup} project-form__group`} data-oid="xled9b-">
        <label htmlFor="attachments" className="project-form__label" data-oid="g2v0:9-">
          Attachments
        </label>
        <div className={`${styles.fileInputWrapper} project-form__file-wrapper`} data-oid="74q4rkb">
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleFileChange}
            className={`${styles.fileInput} project-form__file-input`}
            data-oid=":cw5zjy"
          />
          <div className={`${styles.fileInputLabel} project-form__file-label`} data-oid="utd18xa">
            Choose Files
          </div>
        </div>
        {formData.attachments.length > 0 && (
          <div
            className={`${styles.attachmentList} project-form__attachment-list`}
            data-oid="q6_khiu"
          >
            {formData.attachments.map((file, index) => (
              <div
                key={index}
                className={`${styles.attachmentItem} project-form__attachment-item`}
                data-oid="bo.5z:i"
              >
                <span className={`${styles.fileName} project-form__file-name`} data-oid="efhivq4">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: prev.attachments.filter((_, i) => i !== index),
                    }))
                  }
                  className={`${styles.removeBtn} project-form__remove-btn`}
                  aria-label={`Remove ${file.name}`}
                  data-oid="t--pfnh"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`${styles.formActions} project-form__actions`} data-oid="9qm4lys">
        <button
          type="button"
          onClick={onClose}
          className={`${styles.cancelBtn} project-form__cancel-btn`}
          data-oid="rxnp8pl"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.submitBtn} project-form__submit-btn`}
          data-oid="1oo55-z"
        >
          {initialData ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};
export default ProjectForm;
