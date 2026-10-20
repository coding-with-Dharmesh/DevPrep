/**
 * DevPrep Storage Service
 * Abstraction layer over localStorage mimicking future API / DB interactions.
 * Security notice: Never stores plain or sensitive passwords.
 */

const STORAGE_KEYS = {
  USER: 'devprep_user',
  AUTH_TOKEN: 'devprep_auth_token',
  SOLVED_PROBLEMS: 'devprep_solved_problems',
  BOOKMARKED_PROBLEMS: 'devprep_bookmarked_problems',
  PROBLEM_NOTES: 'devprep_problem_notes',
  BOOKMARKED_QUESTIONS: 'devprep_bookmarked_questions',
  MASTERED_QUESTIONS: 'devprep_mastered_questions',
  ROADMAP_PROGRESS: 'devprep_roadmap_progress',
  JOB_APPLICATIONS: 'devprep_job_applications',
  MOCK_INTERVIEWS: 'devprep_mock_history',
  DAILY_GOALS: 'devprep_daily_goals',
  USER_STATS: 'devprep_user_stats',
  THEME: 'devprep_theme'
};

export const storageService = {
  // --- AUTH ---
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading user:', e);
      return null;
    }
  },

  setUser: (user) => {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      return;
    }
    // Safe storage - ensure password field is stripped
    const safeUser = { ...user };
    delete safeUser.password;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `devprep_token_${Date.now()}`);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // --- SOLVED PROBLEMS ---
  getSolvedProblems: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOLVED_PROBLEMS);
      return data ? JSON.parse(data) : ['two-sum', 'valid-anagram', 'reverse-linked-list', 'invert-binary-tree'];
    } catch {
      return ['two-sum', 'valid-anagram'];
    }
  },

  setSolvedProblems: (problems) => {
    localStorage.setItem(STORAGE_KEYS.SOLVED_PROBLEMS, JSON.stringify(problems));
  },

  toggleProblemSolved: (problemId) => {
    const solved = storageService.getSolvedProblems();
    const updated = solved.includes(problemId)
      ? solved.filter(id => id !== problemId)
      : [...solved, problemId];
    storageService.setSolvedProblems(updated);
    return updated;
  },

  // --- BOOKMARKED PROBLEMS ---
  getBookmarkedProblems: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_PROBLEMS);
      return data ? JSON.parse(data) : ['trapping-rain-water', 'coin-change', 'course-schedule'];
    } catch {
      return [];
    }
  },

  toggleProblemBookmark: (problemId) => {
    const bookmarks = storageService.getBookmarkedProblems();
    const updated = bookmarks.includes(problemId)
      ? bookmarks.filter(id => id !== problemId)
      : [...bookmarks, problemId];
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_PROBLEMS, JSON.stringify(updated));
    return updated;
  },

  // --- INTERVIEW QUESTIONS ---
  getBookmarkedQuestions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS);
      return data ? JSON.parse(data) : ['js-event-loop', 'dbms-acid', 'os-deadlock'];
    } catch {
      return [];
    }
  },

  toggleQuestionBookmark: (qId) => {
    const bookmarks = storageService.getBookmarkedQuestions();
    const updated = bookmarks.includes(qId)
      ? bookmarks.filter(id => id !== qId)
      : [...bookmarks, qId];
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS, JSON.stringify(updated));
    return updated;
  },

  getMasteredQuestions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MASTERED_QUESTIONS);
      return data ? JSON.parse(data) : ['java-jvm', 'js-closures', 'oop-solid'];
    } catch {
      return [];
    }
  },

  toggleQuestionMastered: (qId) => {
    const mastered = storageService.getMasteredQuestions();
    const updated = mastered.includes(qId)
      ? mastered.filter(id => id !== qId)
      : [...mastered, qId];
    localStorage.setItem(STORAGE_KEYS.MASTERED_QUESTIONS, JSON.stringify(updated));
    return updated;
  },

  // --- ROADMAP CHECKLISTS ---
  getRoadmapProgress: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      return data ? JSON.parse(data) : {
        'frontend': ['fe-html', 'fe-css-layout', 'fe-js-basics', 'fe-react-components'],
        'dsa': ['dsa-big-o', 'dsa-arrays', 'dsa-binary-search'],
        'backend': ['be-node-intro', 'be-express-routing'],
        'fullstack': ['fs-git', 'fs-react-node'],
        'beginner': ['beg-cs-fundamentals', 'beg-git-basics', 'beg-js-syntax']
      };
    } catch {
      return {};
    }
  },

  toggleRoadmapItem: (roadmapId, itemId) => {
    const progress = storageService.getRoadmapProgress();
    const currentList = progress[roadmapId] || [];
    const updatedList = currentList.includes(itemId)
      ? currentList.filter(id => id !== itemId)
      : [...currentList, itemId];
    
    const updatedProgress = { ...progress, [roadmapId]: updatedList };
    localStorage.setItem(STORAGE_KEYS.ROADMAP_PROGRESS, JSON.stringify(updatedProgress));
    return updatedProgress;
  },

  // --- JOB TRACKER ---
  getJobApplications: (initialDefault = []) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS);
      return data ? JSON.parse(data) : initialDefault;
    } catch {
      return initialDefault;
    }
  },

  saveJobApplications: (jobs) => {
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(jobs));
  },

  // --- MOCK INTERVIEWS ---
  getMockHistory: (initialDefault = []) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOCK_INTERVIEWS);
      return data ? JSON.parse(data) : initialDefault;
    } catch {
      return initialDefault;
    }
  },

  saveMockSession: (session) => {
    const current = storageService.getMockHistory();
    const updated = [session, ...current];
    localStorage.setItem(STORAGE_KEYS.MOCK_INTERVIEWS, JSON.stringify(updated));
    return updated;
  },

  // --- DAILY GOALS & STATS ---
  getDailyGoals: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_GOALS);
      return data ? JSON.parse(data) : {
        problemsTarget: 3,
        hoursTarget: 2,
        interviewsTarget: 1,
        completedToday: {
          problems: 2,
          hours: 1.5,
          interviews: 0
        },
        streakDays: 14
      };
    } catch {
      return {
        problemsTarget: 3,
        hoursTarget: 2,
        interviewsTarget: 1,
        completedToday: { problems: 2, hours: 1.5, interviews: 0 },
        streakDays: 14
      };
    }
  },

  setDailyGoals: (goals) => {
    localStorage.setItem(STORAGE_KEYS.DAILY_GOALS, JSON.stringify(goals));
  },

  // --- DATA RESET & EXPORT ---
  exportAllData: () => {
    const exportObj = {};
    for (const key of Object.values(STORAGE_KEYS)) {
      exportObj[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devprep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  resetAllData: () => {
    Object.values(STORAGE_KEYS).forEach(k => {
      if (k !== STORAGE_KEYS.THEME) {
        localStorage.removeItem(k);
      }
    });
  }
};
