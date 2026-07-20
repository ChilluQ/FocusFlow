import { useState, useEffect, useContext } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import AssignmentTracker from './components/AssignmentTracker';
import StudyPlanner from './components/StudyPlanner';
import FocusZone from './components/FocusZone';
import Notes from './components/Notes';
import Analytics from './components/Analytics';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import Exams from './components/Exams';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { profile, stats } = useContext(AppContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/tasks': return 'Tasks';
      case '/assignments': return 'Assignments';
      case '/planner': return 'Study Planner';
      case '/focus': return 'Focus Zone';
      case '/notes': return 'Notes';
      case '/analytics': return 'Analytics';
      case '/achievements': return 'Achievements';
      case '/settings': return 'Settings';
      case '/exams': return 'Exams';
      default: return 'FocusFlow';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ cursor: 'pointer' }}>
          {!sidebarCollapsed && (
            <div className="logo">
              <div className="logo-icon">F</div>
              <span className="gradient-text">FocusFlow</span>
            </div>
          )}
          {sidebarCollapsed && <div className="logo-icon">F</div>}
        </div>
        
        <ul className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📊</span>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">✅</span>
            {!sidebarCollapsed && <span>Tasks</span>}
          </NavLink>
          <NavLink to="/assignments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📚</span>
            {!sidebarCollapsed && <span>Assignments</span>}
          </NavLink>
          <NavLink to="/planner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📅</span>
            {!sidebarCollapsed && <span>Study Planner</span>}
          </NavLink>
          <NavLink to="/focus" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">⏱️</span>
            {!sidebarCollapsed && <span>Focus Zone</span>}
          </NavLink>
          <NavLink to="/notes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📝</span>
            {!sidebarCollapsed && <span>Notes</span>}
          </NavLink>
          <NavLink to="/exams" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">🎓</span>
            {!sidebarCollapsed && <span>Exams</span>}
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📈</span>
            {!sidebarCollapsed && <span>Analytics</span>}
          </NavLink>
          <NavLink to="/achievements" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">🏆</span>
            {!sidebarCollapsed && <span>Achievements</span>}
          </NavLink>
        </ul>
        
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="nav-item" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <span className="nav-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            {!sidebarCollapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </div>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">⚙️</span>
            {!sidebarCollapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder={`Search ${getPageTitle().toLowerCase()}...`} />
          </div>
          
          <div className="top-nav-actions">
            <div className="streak-indicator">
              <span>🔥 {stats.streak} Day Streak!</span>
            </div>
            <button className="action-btn">
              <span>🔔</span>
            </button>
            <NavLink to="/settings" style={{ textDecoration: 'none' }}>
              <div className="user-profile">
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{profile.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{profile.major}</span>
                </div>
                <div className="avatar" style={{ backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </NavLink>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TodoList />} />
            <Route path="/assignments" element={<AssignmentTracker />} />
            <Route path="/planner" element={<StudyPlanner />} />
            <Route path="/focus" element={<FocusZone />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/exams" element={<Exams />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
