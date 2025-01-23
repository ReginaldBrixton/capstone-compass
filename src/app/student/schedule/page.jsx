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
        prev.map((p) => (p.id === selectedProject.id ? { ...projectData, id: p.id } : p))
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research Schedule
          </h1>
          
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Schedule Cards */}
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Research Project {item}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                10:00 AM - 11:30 AM
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-full">
                  Research
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-sm rounded-full">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Project</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
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
        <div id="modal-overlay" className={`${styles.modalOverlay} modal-overlay`}>
          <div id="modal-content" className={`${styles.modalContent} modal-content-wrapper`}>
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
                  <div className={`${styles.projectDetails} project-details-container`}>
                    <h3 className="project-title">{selectedProject.title}</h3>
                    <p className="project-description">{selectedProject.description}</p>
                    <div className={`${styles.projectMeta} project-metadata`}>
                      <span className="project-deadline">
                        Deadline: {new Date(selectedProject.deadline).toLocaleString()}
                      </span>
                      <span className="project-status">Status: {selectedProject.category}</span>
                    </div>
                    <div className={`${styles.projectActions} project-actions-wrapper`}>
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
                          setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
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
