import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { profile, tasks, toggleTask, stats, exams, assignments } = useContext(AppContext);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  // Find next exam
  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextExam = sortedExams.find(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)));

  return (
    <div className="dashboard-grid">
      <div className="card glass-panel" style={{ gridColumn: 'span 12' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Good Morning, {profile.name} 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>"Success is the sum of small efforts, repeated day in and day out."</p>
      </div>
      
      {/* Quick Stats */}
      <div className="card" style={{ gridColumn: 'span 3', borderTop: '4px solid var(--primary-color)' }}>
        <h3 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Today's Focus</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{Math.floor(stats.totalFocusMinutes/60)}h {stats.totalFocusMinutes%60}m</p>
      </div>
      <div className="card" style={{ gridColumn: 'span 3', borderTop: '4px solid var(--success-color)' }}>
        <h3 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Tasks Completed</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{completedCount} / {tasks.length}</p>
      </div>
      <div className="card" style={{ gridColumn: 'span 3', borderTop: '4px solid var(--primary-hover)' }}>
        <h3 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Productivity Score</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--success-color)' }}>{progressPercent}%</p>
      </div>
      <div className="card" style={{ gridColumn: 'span 3', borderTop: '4px solid var(--danger-color)' }}>
        <h3 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Next Exam</h3>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{nextExam ? nextExam.title : 'None Scheduled'}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--danger-color)' }}>{nextExam ? nextExam.date : ''}</p>
      </div>

      {/* Main Areas */}
      <div className="card" style={{ gridColumn: 'span 8', minHeight: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Today's Tasks</h2>
          <Link to="/tasks" style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: '500', textDecoration: 'none' }}>Go to Tasks</Link>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.slice(0, 4).map(task => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', opacity: task.completed ? 0.6 : 1 }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary-color)' }} />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-tertiary)' : 'inherit' }}>{task.title}</span>
              <span style={{ marginLeft: 'auto', backgroundColor: `rgba(var(--${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'}-color-rgb, 100, 100, 100), 0.1)`, padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '600' }}>{task.priority}</span>
            </li>
          ))}
          {tasks.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No tasks for today!</p>}
        </ul>
      </div>

      <div className="card" style={{ gridColumn: 'span 4', minHeight: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Upcoming Assignments</h2>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {assignments.slice(0, 3).map(assign => (
            <li key={assign.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontWeight: '600' }}>{assign.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Due: {assign.dueDate}</p>
            </li>
          ))}
          {assignments.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No upcoming assignments.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
