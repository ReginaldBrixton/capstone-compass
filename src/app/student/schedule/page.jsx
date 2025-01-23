'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, X } from 'lucide-react';

import { Calendar, Modal, ProjectForm } from './components';

const ResearchCalendar = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const fetchProjects = async () => {
      // Mock data
      const mockProjects = [
        {
          id: 1,
          title: 'Research Proposal',
          description: 'Initial research proposal submission',
          deadline: '2024-01-15T14:00',
          category: 'pending',
          attachments: [],
        },
        // Add more mock projects as needed
      ];
      setProjects(mockProjects);
    };

    fetchProjects();
  }, []);

  const handleProjectSubmit = (projectData) => {
    if (selectedProject) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id ? { ...projectData, id: p.id } : p
        )
      );
    } else {
      // Add new project
      setProjects((prev) => [...prev, { ...projectData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setModalType('form');
    setIsModalOpen(true);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === 'all' || project.category === categoryFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Research Schedule
          </h1>

          {/* Actions Bar */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="all">All Categories</option>
                <option value="research">Research</option>
                <option value="meeting">Meeting</option>
                <option value="presentation">Presentation</option>
              </select>
            </div>

            {/* New Project Button */}
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Project
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample Schedule Cards */}
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Research Project {item}
              </h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                10:00 AM - 11:30 AM
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  Research
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900 dark:text-green-300">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Project
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {isModalOpen && (
        <div
          id="modal-overlay"
          className={`${styles.modalOverlay} modal-overlay`}
        >
          <div
            id="modal-content"
            className={`${styles.modalContent} modal-content-wrapper`}
          >
            <div className={`${styles.modalHeader} modal-header`}>
              <h2 className="modal-title">
                {modalType === 'form'
                  ? selectedProject
                    ? 'Edit Project'
                    : 'New Project'
                  : 'Project Details'}
              </h2>
              <button
                id="modal-close-btn"
                className={`${styles.cancelBtn} modal-close-button`}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={`${styles.modalBody} modal-body`}>
              {modalType === 'form' ? (
                <ProjectForm
                  onSubmit={handleProjectSubmit}
                  initialData={selectedProject}
                  onClose={() => setIsModalOpen(false)}
                />
              ) : (
                selectedProject && (
                  <div
                    className={`${styles.projectDetails} project-details-container`}
                  >
                    <h3 className="project-title">{selectedProject.title}</h3>
                    <p className="project-description">
                      {selectedProject.description}
                    </p>
                    <div className={`${styles.projectMeta} project-metadata`}>
                      <span className="project-deadline">
                        Deadline:{' '}
                        {new Date(selectedProject.deadline).toLocaleString()}
                      </span>
                      <span className="project-status">
                        Status: {selectedProject.category}
                      </span>
                    </div>
                    <div
                      className={`${styles.projectActions} project-actions-wrapper`}
                    >
                      <button
                        id="edit-project-btn"
                        className={`${styles.submitBtn} edit-project-button`}
                        onClick={() => setModalType('form')}
                      >
                        Edit
                      </button>
                      <button
                        id="delete-project-btn"
                        className={`${styles.cancelBtn} delete-project-button`}
                        onClick={() => {
                          setProjects((prev) =>
                            prev.filter((p) => p.id !== selectedProject.id)
                          );
                          setIsModalOpen(false);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchCalendar;
