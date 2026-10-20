import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { MOCK_DSA_PROBLEMS } from '../data/mockDsaProblems';
import { INITIAL_JOB_APPLICATIONS } from '../data/mockJobs';
import { INITIAL_MOCK_HISTORY } from '../data/mockMockInterviews';
import { INITIAL_ANALYTICS_DATA } from '../data/initialStats';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { success, info } = useToast();

  // DSA Solved & Bookmarks
  const [solvedProblems, setSolvedProblems] = useState(() => storageService.getSolvedProblems());
  const [bookmarkedProblems, setBookmarkedProblems] = useState(() => storageService.getBookmarkedProblems());

  // Interview Library
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(() => storageService.getBookmarkedQuestions());
  const [masteredQuestions, setMasteredQuestions] = useState(() => storageService.getMasteredQuestions());

  // Roadmaps Progress
  const [roadmapProgress, setRoadmapProgress] = useState(() => storageService.getRoadmapProgress());

  // Job Tracker
  const [jobApplications, setJobApplications] = useState(() =>
    storageService.getJobApplications(INITIAL_JOB_APPLICATIONS)
  );

  // Mock Interviews History
  const [mockHistory, setMockHistory] = useState(() =>
    storageService.getMockHistory(INITIAL_MOCK_HISTORY)
  );

  // Daily Goals & Streak
  const [dailyGoals, setDailyGoals] = useState(() => storageService.getDailyGoals());

  // Toggle problem solved
  const toggleSolveProblem = (problemId) => {
    const isNowSolved = !solvedProblems.includes(problemId);
    const updated = storageService.toggleProblemSolved(problemId);
    setSolvedProblems(updated);

    if (isNowSolved) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback if canvas-confetti is not rendered
      }
      success('Problem marked as Solved! Keep up the momentum! 🎉');

      // Update daily goal
      setDailyGoals(prev => {
        const next = {
          ...prev,
          completedToday: {
            ...prev.completedToday,
            problems: prev.completedToday.problems + 1
          }
        };
        storageService.setDailyGoals(next);
        return next;
      });
    } else {
      info('Problem removed from solved list.');
    }
  };

  // Toggle problem bookmark
  const toggleBookmarkProblem = (problemId) => {
    const updated = storageService.toggleProblemBookmark(problemId);
    setBookmarkedProblems(updated);
    if (updated.includes(problemId)) {
      success('Problem added to bookmarks.');
    } else {
      info('Problem removed from bookmarks.');
    }
  };

  // Toggle question bookmark
  const toggleQuestionBookmark = (qId) => {
    const updated = storageService.toggleQuestionBookmark(qId);
    setBookmarkedQuestions(updated);
  };

  // Toggle question mastered
  const toggleQuestionMastered = (qId) => {
    const isNowMastered = !masteredQuestions.includes(qId);
    const updated = storageService.toggleQuestionMastered(qId);
    setMasteredQuestions(updated);
    if (isNowMastered) {
      success('Question marked as Mastered! 🧠');
    }
  };

  // Toggle roadmap checklist item
  const toggleRoadmapItem = (roadmapId, itemId) => {
    const updated = storageService.toggleRoadmapItem(roadmapId, itemId);
    setRoadmapProgress(updated);
  };

  // Add Job Application
  const addJobApplication = (jobData) => {
    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      appliedDate: jobData.appliedDate || new Date().toISOString().slice(0, 10)
    };
    const updated = [newJob, ...jobApplications];
    setJobApplications(updated);
    storageService.saveJobApplications(updated);
    success(`Added application for ${jobData.company}! 💼`);
  };

  // Update Job Application
  const updateJobApplication = (jobId, updatedFields) => {
    const updated = jobApplications.map(j =>
      j.id === jobId ? { ...j, ...updatedFields } : j
    );
    setJobApplications(updated);
    storageService.saveJobApplications(updated);
    success('Job application updated.');
  };

  // Update Job Status directly
  const updateJobStatus = (jobId, newStatus) => {
    const updated = jobApplications.map(j =>
      j.id === jobId ? { ...j, status: newStatus } : j
    );
    setJobApplications(updated);
    storageService.saveJobApplications(updated);
    success(`Status updated to "${newStatus}".`);
  };

  // Delete Job Application
  const deleteJobApplication = (jobId) => {
    const updated = jobApplications.filter(j => j.id !== jobId);
    setJobApplications(updated);
    storageService.saveJobApplications(updated);
    info('Job application deleted.');
  };

  // Add Mock Session
  const addMockSession = (session) => {
    const newSession = {
      ...session,
      id: `mock-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10)
    };
    const updated = storageService.saveMockSession(newSession);
    setMockHistory(updated);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {}
    success('Mock interview saved to your history! 🎯');

    // Update daily mock count
    setDailyGoals(prev => {
      const next = {
        ...prev,
        completedToday: {
          ...prev.completedToday,
          interviews: prev.completedToday.interviews + 1
        }
      };
      storageService.setDailyGoals(next);
      return next;
    });
  };

  // Update Daily Goals
  const updateGoals = (newGoals) => {
    const updated = { ...dailyGoals, ...newGoals };
    setDailyGoals(updated);
    storageService.setDailyGoals(updated);
    success('Daily study goals updated! 🚀');
  };

  // Reset demo data
  const resetAllData = () => {
    storageService.resetAllData();
    setSolvedProblems(['two-sum', 'valid-anagram', 'reverse-linked-list', 'invert-binary-tree']);
    setBookmarkedProblems(['trapping-rain-water', 'coin-change']);
    setBookmarkedQuestions(['js-event-loop', 'dbms-acid']);
    setMasteredQuestions(['java-jvm', 'js-closures']);
    setJobApplications(INITIAL_JOB_APPLICATIONS);
    setMockHistory(INITIAL_MOCK_HISTORY);
    setDailyGoals({
      problemsTarget: 3,
      hoursTarget: 2,
      interviewsTarget: 1,
      completedToday: { problems: 2, hours: 1.5, interviews: 0 },
      streakDays: 14
    });
    info('Data reset to default demo values.');
  };

  return (
    <DataContext.Provider
      value={{
        // DSA
        dsaProblems: MOCK_DSA_PROBLEMS,
        solvedProblems,
        bookmarkedProblems,
        toggleSolveProblem,
        toggleBookmarkProblem,

        // Interview Library
        bookmarkedQuestions,
        masteredQuestions,
        toggleQuestionBookmark,
        toggleQuestionMastered,

        // Roadmaps
        roadmapProgress,
        toggleRoadmapItem,

        // Job Tracker
        jobApplications,
        addJobApplication,
        updateJobApplication,
        updateJobStatus,
        deleteJobApplication,

        // Mock Interviews
        mockHistory,
        addMockSession,

        // Daily Goals & Streak
        dailyGoals,
        updateGoals,

        // Analytics
        analyticsData: INITIAL_ANALYTICS_DATA,

        // Reset / Export
        resetAllData,
        exportAllData: storageService.exportAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
