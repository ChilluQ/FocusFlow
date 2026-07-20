import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Profile State ---
  const [profile, setProfile] = useState({
    name: 'Neeraj',
    email: 'neeraj@university.edu',
    major: 'Computer Science',
    semester: 'Fall 2026',
    bio: 'Avid coder and coffee enthusiast.'
  });

  // --- Tasks State ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Math Assignment', priority: 'High', category: 'Homework', completed: true, dueDate: '2026-07-20' },
    { id: 2, title: 'Review Physics Notes', priority: 'High', category: 'Study', completed: false, dueDate: '2026-07-21' },
    { id: 3, title: 'Read Chapter 4 (History)', priority: 'Medium', category: 'Reading', completed: false, dueDate: '2026-07-22' },
  ]);

  const addTask = (task) => setTasks([task, ...tasks]);
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  // --- Assignments State ---
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Data Structures Final Project', subject: 'Computer Science', dueDate: '2026-07-25', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Shakespeare Analysis', subject: 'Literature', dueDate: '2026-07-22', status: 'Not Started', priority: 'Medium' },
  ]);

  const addAssignment = (assignment) => setAssignments([assignment, ...assignments]);
  const deleteAssignment = (id) => setAssignments(assignments.filter(a => a.id !== id));
  const updateAssignmentStatus = (id, status) => setAssignments(assignments.map(a => a.id === id ? { ...a, status } : a));

  // --- Exams State ---
  const [exams, setExams] = useState([
    { id: 1, title: 'Data Structures Midterm', subject: 'Computer Science', date: '2026-07-23', status: 'Prepared', priority: 'High' },
    { id: 2, title: 'Literature Final', subject: 'English Dept', date: '2026-08-05', status: 'Studying', priority: 'Medium' },
  ]);
  
  const addExam = (exam) => setExams([...exams, exam]);
  const deleteExam = (id) => setExams(exams.filter(e => e.id !== id));

  // --- Notes State ---
  const [notes, setNotes] = useState([
    { id: 1, title: 'Ideas for CS Project', content: 'Maybe a productivity app?', category: 'Project', color: '#e0e7ff', pinned: true },
    { id: 2, title: 'Grocery List', content: 'Milk, Eggs, Bread', category: 'Personal', color: '#fef3c7', pinned: false }
  ]);

  const addNote = (note) => setNotes([note, ...notes]);
  const togglePin = (id) => setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  // --- Study Sessions / Events State (For Planner) ---
  const [events, setEvents] = useState([
    { id: 1, title: 'Data Structures Review', time: '09:00 AM', type: 'focus', date: new Date().toISOString().split('T')[0] }
  ]);
  const addEvent = (event) => setEvents([...events, event]);

  // --- Stats / Focus Zone State ---
  const [stats, setStats] = useState({
    sessionsCompleted: 18,
    totalFocusMinutes: 1350,
    streak: 12,
    tasksCompletedAllTime: 34
  });

  const completeFocusSession = (minutes) => {
    setStats(prev => ({
      ...prev,
      sessionsCompleted: prev.sessionsCompleted + 1,
      totalFocusMinutes: prev.totalFocusMinutes + minutes
    }));
  };

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      tasks, addTask, toggleTask, deleteTask,
      assignments, addAssignment, deleteAssignment, updateAssignmentStatus,
      exams, addExam, deleteExam,
      notes, addNote, togglePin, deleteNote,
      events, addEvent,
      stats, completeFocusSession
    }}>
      {children}
    </AppContext.Provider>
  );
};
