import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { INITIAL_USER_PROFILE } from '../data/initialStats';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = storageService.getUser();
    // Provide active demo user by default if nothing exists so users can immediately test the dashboard and all features
    return saved || INITIAL_USER_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!storageService.getUser() || true; // Demo active by default
  });

  useEffect(() => {
    if (user) {
      storageService.setUser(user);
      setIsAuthenticated(true);
    } else {
      storageService.logout();
      setIsAuthenticated(false);
    }
  }, [user]);

  // Login handler
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Please provide both email and password.'));
          return;
        }
        // Realistic simulated auth - NEVER save password to storage
        const loggedInUser = {
          ...INITIAL_USER_PROFILE,
          email: email,
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
        };
        setUser(loggedInUser);
        resolve(loggedInUser);
      }, 500);
    });
  };

  // Demo Login (Senior or Junior profile)
  const loginAsDemo = (tier = 'senior') => {
    const demoUser = tier === 'senior' ? {
      ...INITIAL_USER_PROFILE,
      name: 'Alex Rivera (Demo)',
      role: 'Full Stack Engineer',
      targetRole: 'Senior Staff Engineer (L6 / SDE-3)',
      experience: '5+ Years'
    } : {
      ...INITIAL_USER_PROFILE,
      name: 'Jordan Lee (Demo)',
      role: 'Associate Developer',
      targetRole: 'Full Stack Engineer (L4 / SDE-1)',
      experience: '1 Year',
      dailyProblemGoal: 2,
      weeklyHoursGoal: 10
    };

    setUser(demoUser);
    return demoUser;
  };

  // Signup handler
  const signup = ({ name, email, targetRole }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email) {
          reject(new Error('Please fill in all required fields.'));
          return;
        }
        const newUser = {
          ...INITIAL_USER_PROFILE,
          name,
          email,
          targetRole: targetRole || 'Full Stack Software Engineer',
          streak: 1
        };
        setUser(newUser);
        resolve(newUser);
      }, 500);
    });
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storageService.logout();
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updatedFields };
      storageService.setUser(nextUser);
      return nextUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginAsDemo,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
