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
          p.id === selectedProject.id
            ? {
                ...projectData,
                id: p.id,
              }
            : p
        )
      );
    } else {
      // Add new project
      setProjects((prev) => [
        ...prev,
        {
          ...projectData,
          id: Date.now(),
        },
      ]);
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
    <div
      className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8"
      data-oid="6cvniae"
    >
      {/* Header Section */}
      <div className="mx-auto max-w-7xl" data-oid=".8k76so">
        <div className="mb-8" data-oid="0pt06av">
          <h1
            className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
            data-oid="8dy57k5"
          >
            Research Schedule
          </h1>

          {/* Actions Bar */}
          <div className="flex flex-col gap-4 sm:flex-row" data-oid="lsfkrrq">
            <div className="flex flex-1 gap-4" data-oid="wul6s0p">
              {/* Search Input */}
              <div className="relative flex-1" data-oid="-qn3h4f">
                <input
                  type="text"
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  data-oid="azv-ui_"
                />
                <Search
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  data-oid="aq3lzb4"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                data-oid="0r8efy4"
              >
                <option value="all" data-oid="gkzn7f7">
                  All Categories
                </option>
                <option value="research" data-oid="y_s7cqw">
                  Research
                </option>
                <option value="meeting" data-oid="wd9a8.v">
                  Meeting
                </option>
                <option value="presentation" data-oid="w-8q.97">
                  Presentation
                </option>
              </select>
            </div>

            {/* New Project Button */}
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
              data-oid="dcmny0r"
            >
              <Plus className="mr-2 h-5 w-5" data-oid="1gs55i-" />
              New Project
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-oid="h-kj.9-">
          {/* Sample Schedule Cards */}
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -4,
              }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              data-oid="axvr395"
            >
              <h3
                className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
                data-oid="uf5yn60"
              >
                Research Project {item}
              </h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400" data-oid="d.bf8ad">
                10:00 AM - 11:30 AM
              </p>
              <p className="text-gray-600 dark:text-gray-300" data-oid="rvy887_">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore.
              </p>
              <div className="mt-4 flex items-center gap-2" data-oid="5vlds8h">
                <span
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  data-oid="1erftqr"
                >
                  Research
                </span>
                <span
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900 dark:text-green-300"
                  data-oid="1j_swpi"
                >
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          data-oid=":e5piig"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800"
            data-oid="zlits6o"
          >
            <div
              className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700"
              data-oid="v22:df6"
            >
              <h2
                className="text-xl font-semibold text-gray-900 dark:text-white"
                data-oid="u8s9oq6"
              >
                New Project
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                data-oid="4rku4xz"
              >
                <X className="h-5 w-5" data-oid="ncgdi9a" />
              </button>
            </div>
            <div className="p-6" data-oid="kmb7qkz">
              <form className="space-y-4" data-oid="sytw0fi">
                <div data-oid="2d60.:l">
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    data-oid="m:xiyrm"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    data-oid="sw.vbt3"
                  />
                </div>
                <div data-oid="1:wvl-b">
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    data-oid="n9b5yph"
                  >
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    data-oid="ujsp4yf"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4" data-oid="kbs6tk5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    data-oid="ued7n3g"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                    data-oid="e3ee5ft"
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
          data-oid="hx-ubr."
        >
          <div
            id="modal-content"
            className={`${styles.modalContent} modal-content-wrapper`}
            data-oid="oqdm4iu"
          >
            <div className={`${styles.modalHeader} modal-header`} data-oid="k:0pz--">
              <h2 className="modal-title" data-oid="tyne469">
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
                data-oid="9b8tr4n"
              >
                ×
              </button>
            </div>
            <div className={`${styles.modalBody} modal-body`} data-oid="8vmzajz">
              {modalType === 'form' ? (
                <ProjectForm
                  onSubmit={handleProjectSubmit}
                  initialData={selectedProject}
                  onClose={() => setIsModalOpen(false)}
                  data-oid="6drphhp"
                />
              ) : (
                selectedProject && (
                  <div
                    className={`${styles.projectDetails} project-details-container`}
                    data-oid="6r2r-x-"
                  >
                    <h3 className="project-title" data-oid="n7yq7ar">
                      {selectedProject.title}
                    </h3>
                    <p className="project-description" data-oid="1yp5ed-">
                      {selectedProject.description}
                    </p>
                    <div className={`${styles.projectMeta} project-metadata`} data-oid="uk8-6.p">
                      <span className="project-deadline" data-oid="._mv712">
                        Deadline: {new Date(selectedProject.deadline).toLocaleString()}
                      </span>
                      <span className="project-status" data-oid="wen77ue">
                        Status: {selectedProject.category}
                      </span>
                    </div>
                    <div
                      className={`${styles.projectActions} project-actions-wrapper`}
                      data-oid="bz00:er"
                    >
                      <button
                        id="edit-project-btn"
                        className={`${styles.submitBtn} edit-project-button`}
                        onClick={() => setModalType('form')}
                        data-oid="qzhiv3v"
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
                        data-oid="mh._mjq"
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
