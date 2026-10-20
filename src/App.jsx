import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { DsaListPage } from './pages/DsaListPage';
import { DsaDetailPage } from './pages/DsaDetailPage';
import { InterviewLibraryPage } from './pages/InterviewLibraryPage';
import { RoadmapsPage } from './pages/RoadmapsPage';
import { RoadmapDetailPage } from './pages/RoadmapDetailPage';
import { CompanyPrepPage } from './pages/CompanyPrepPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { JobTrackerPage } from './pages/JobTrackerPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Marketing & Auth Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Authenticated Application Routes wrapped in AppLayout */}
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="dsa" element={<DsaListPage />} />
                  <Route path="dsa/:id" element={<DsaDetailPage />} />
                  <Route path="interview" element={<InterviewLibraryPage />} />
                  <Route path="roadmaps" element={<RoadmapsPage />} />
                  <Route path="roadmaps/:id" element={<RoadmapDetailPage />} />
                  <Route path="companies" element={<CompanyPrepPage />} />
                  <Route path="companies/:id" element={<CompanyDetailPage />} />
                  <Route path="tracker" element={<JobTrackerPage />} />
                  <Route path="mock" element={<MockInterviewPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
