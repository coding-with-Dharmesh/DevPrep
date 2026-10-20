/**
 * Initial Statistics, Activity Heatmap & Analytics Data for DevPrep
 */

export const INITIAL_USER_PROFILE = {
  name: 'Alex Rivera',
  email: 'alex.rivera@devprep.io',
  role: 'Full Stack Software Engineer',
  targetRole: 'Senior Software Engineer (L5 / SDE-2)',
  experience: '3.5 Years',
  bio: 'Software engineer passionate about scalable distributed systems, clean React component architecture, and algorithmic optimization. Actively preparing for FAANG/Tier-1 engineering rounds.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  targetCompanies: ['Google', 'Stripe', 'Amazon', 'Microsoft'],
  dailyProblemGoal: 3,
  weeklyHoursGoal: 15,
  streak: 14
};

export const INITIAL_ANALYTICS_DATA = {
  // Activity over the past 14 days
  studyActivity: [
    { day: 'Oct 06', problems: 2, hours: 2.2, mockInterviews: 0 },
    { day: 'Oct 07', problems: 4, hours: 3.5, mockInterviews: 1 },
    { day: 'Oct 08', problems: 3, hours: 2.8, mockInterviews: 0 },
    { day: 'Oct 09', problems: 1, hours: 1.5, mockInterviews: 0 },
    { day: 'Oct 10', problems: 5, hours: 4.0, mockInterviews: 1 },
    { day: 'Oct 11', problems: 3, hours: 3.0, mockInterviews: 1 },
    { day: 'Oct 12', problems: 4, hours: 3.2, mockInterviews: 0 },
    { day: 'Oct 13', problems: 2, hours: 2.0, mockInterviews: 0 },
    { day: 'Oct 14', problems: 6, hours: 4.5, mockInterviews: 0 },
    { day: 'Oct 15', problems: 3, hours: 3.0, mockInterviews: 1 },
    { day: 'Oct 16', problems: 4, hours: 3.8, mockInterviews: 0 },
    { day: 'Oct 17', problems: 2, hours: 2.5, mockInterviews: 0 },
    { day: 'Oct 18', problems: 5, hours: 4.2, mockInterviews: 1 },
    { day: 'Oct 19', problems: 3, hours: 2.5, mockInterviews: 0 }
  ],

  // Topic mastery percentage
  topicProficiency: [
    { topic: 'Arrays', mastered: 92, target: 100 },
    { topic: 'Strings', mastered: 85, target: 100 },
    { topic: 'Trees', mastered: 78, target: 100 },
    { topic: 'Graphs', mastered: 68, target: 100 },
    { topic: 'Dynamic Prog', mastered: 62, target: 100 },
    { topic: 'System Design', mastered: 80, target: 100 },
    { topic: 'OOP & DB', mastered: 88, target: 100 }
  ],

  // Difficulty distribution
  difficultyDistribution: [
    { name: 'Easy', count: 48, color: '#10b981', total: 60 },
    { name: 'Medium', count: 64, color: '#f59e0b', total: 95 },
    { name: 'Hard', count: 18, color: '#ef4444', total: 45 }
  ],

  // Recent activity logs
  recentActivities: [
    { id: 1, type: 'solve', title: 'Solved "Two Sum" with Hash Map approach', time: '2 hours ago', icon: 'check' },
    { id: 2, type: 'mock', title: 'Completed Mock Interview: Two Sum II (Score: 90%)', time: '1 day ago', icon: 'mic' },
    { id: 3, type: 'job', title: 'Moved Stripe to "Technical Interview" stage', time: '2 days ago', icon: 'briefcase' },
    { id: 4, type: 'roadmap', title: 'Checked off "CSS Grid & Tailwind CSS" milestone', time: '3 days ago', icon: 'map' },
    { id: 5, type: 'interview', title: 'Mastered "JVM Memory Architecture" conceptual notes', time: '4 days ago', icon: 'book' }
  ]
};
