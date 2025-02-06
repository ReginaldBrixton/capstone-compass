'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
const ProjectContext = createContext();

// Action Types
const PROJECT_ACTIONS = {
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  SET_CHAPTER_STATUS: 'SET_CHAPTER_STATUS',
  UPDATE_DEFENSE_STATUS: 'UPDATE_DEFENSE_STATUS',
  SET_DEADLINE: 'SET_DEADLINE',
  UPDATE_PANEL_MEMBER: 'UPDATE_PANEL_MEMBER',
  SAVE_DRAFT: 'SAVE_DRAFT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// Initial State
const initialState = {
  projectId: null,
  phases: {
    proposal: {
      status: 'not-started',
      progress: 0,
      deadline: null,
      lastModified: null,
    },
    capstoneOne: {
      status: 'not-started',
      progress: 0,
      deadline: null,
      chapters: {
        one: {
          status: 'not-started',
          progress: 0,
        },
        two: {
          status: 'not-started',
          progress: 0,
        },
        three: {
          status: 'not-started',
          progress: 0,
        },
      },
      defense: {
        status: 'not-scheduled',
        date: null,
        panelMembers: [],
      },
    },
    capstoneTwo: {
      status: 'not-started',
      progress: 0,
      deadline: null,
      chapters: {
        four: {
          status: 'not-started',
          progress: 0,
        },
        five: {
          status: 'not-started',
          progress: 0,
        },
      },
      defense: {
        status: 'not-scheduled',
        date: null,
        panelMembers: [],
      },
    },
  },
  overallProgress: 0,
  drafts: {},
  loading: false,
  error: null,
};

// Reducer
function projectReducer(state, action) {
  switch (action.type) {
    case PROJECT_ACTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        phases: {
          ...state.phases,
          [action.payload.phase]: {
            ...state.phases[action.payload.phase],
            progress: action.payload.progress,
          },
        },
      };
    case PROJECT_ACTIONS.SET_CHAPTER_STATUS:
      return {
        ...state,
        phases: {
          ...state.phases,
          [action.payload.phase]: {
            ...state.phases[action.payload.phase],
            chapters: {
              ...state.phases[action.payload.phase].chapters,
              [action.payload.chapter]: {
                ...state.phases[action.payload.phase].chapters[action.payload.chapter],
                status: action.payload.status,
                progress: action.payload.progress,
              },
            },
          },
        },
      };
    case PROJECT_ACTIONS.UPDATE_DEFENSE_STATUS:
      return {
        ...state,
        phases: {
          ...state.phases,
          [action.payload.phase]: {
            ...state.phases[action.payload.phase],
            defense: {
              ...state.phases[action.payload.phase].defense,
              ...action.payload.defenseData,
            },
          },
        },
      };
    case PROJECT_ACTIONS.SET_DEADLINE:
      return {
        ...state,
        phases: {
          ...state.phases,
          [action.payload.phase]: {
            ...state.phases[action.payload.phase],
            deadline: action.payload.deadline,
          },
        },
      };
    case PROJECT_ACTIONS.UPDATE_PANEL_MEMBER:
      const phase = state.phases[action.payload.phase];
      const updatedPanelMembers = phase.defense.panelMembers.map((member) =>
        member.id === action.payload.memberId
          ? {
              ...member,
              ...action.payload.updates,
            }
          : member
      );
      return {
        ...state,
        phases: {
          ...state.phases,
          [action.payload.phase]: {
            ...phase,
            defense: {
              ...phase.defense,
              panelMembers: updatedPanelMembers,
            },
          },
        },
      };
    case PROJECT_ACTIONS.SAVE_DRAFT:
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [action.payload.key]: {
            content: action.payload.content,
            lastSaved: new Date().toISOString(),
          },
        },
      };
    case PROJECT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROJECT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Provider Component
export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Calculate overall progress whenever phases change
  useEffect(() => {
    const phases = Object.values(state.phases);
    const totalProgress = phases.reduce((sum, phase) => sum + phase.progress, 0);
    const overallProgress = Math.round(totalProgress / phases.length);
    if (overallProgress !== state.overallProgress) {
      dispatch({
        type: PROJECT_ACTIONS.UPDATE_PROGRESS,
        payload: {
          overall: overallProgress,
        },
      });
    }
  }, [state.phases]);

  // Helper functions
  const updateProgress = (phase, progress) => {
    dispatch({
      type: PROJECT_ACTIONS.UPDATE_PROGRESS,
      payload: {
        phase,
        progress,
      },
    });
  };
  const setChapterStatus = (phase, chapter, status, progress) => {
    dispatch({
      type: PROJECT_ACTIONS.SET_CHAPTER_STATUS,
      payload: {
        phase,
        chapter,
        status,
        progress,
      },
    });
  };
  const updateDefenseStatus = (phase, defenseData) => {
    dispatch({
      type: PROJECT_ACTIONS.UPDATE_DEFENSE_STATUS,
      payload: {
        phase,
        defenseData,
      },
    });
  };
  const setDeadline = (phase, deadline) => {
    dispatch({
      type: PROJECT_ACTIONS.SET_DEADLINE,
      payload: {
        phase,
        deadline,
      },
    });
  };
  const updatePanelMember = (phase, memberId, updates) => {
    dispatch({
      type: PROJECT_ACTIONS.UPDATE_PANEL_MEMBER,
      payload: {
        phase,
        memberId,
        updates,
      },
    });
  };
  const saveDraft = (key, content) => {
    dispatch({
      type: PROJECT_ACTIONS.SAVE_DRAFT,
      payload: {
        key,
        content,
      },
    });
  };
  const value = {
    state,
    updateProgress,
    setChapterStatus,
    updateDefenseStatus,
    setDeadline,
    updatePanelMember,
    saveDraft,
  };
  return (
    <ProjectContext.Provider value={value} data-oid="i:k4hfv">
      {children}
    </ProjectContext.Provider>
  );
}

// Custom Hook
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
