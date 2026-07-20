import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Analytics() {
  const { stats, tasks } = useContext(AppContext);

  // In a real app, this would be computed dynamically based on completed Pomodoro sessions per day
  const data = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4.2 },
    { name: 'Fri', hours: 3.0 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: stats.totalFocusMinutes / 60 },
  ];

  const totalHoursThisWeek = data.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  const tasksCompletedAllTime = stats.tasksCompletedAllTime + tasks.filter(t => t.completed).length;

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Productivity Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Track your study habits and measure your progress over time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        
        {/* Weekly Chart */}
        <div className="card" style={{ gridColumn: 'span 8', minHeight: '400px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Weekly Study Hours</h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--bg-tertiary)' }}
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} 
                />
                <Bar dataKey="hours" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)', border: 'none' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Total Hours This Week</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginTop: '0.5rem' }}>{totalHoursThisWeek}h</p>
          </div>
          
          <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)', border: 'none' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Tasks Completed</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success-color)', marginTop: '0.5rem' }}>{tasksCompletedAllTime}</p>
          </div>
          
          <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)', border: 'none' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Pomodoro Sessions</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning-color)', marginTop: '0.5rem' }}>{stats.sessionsCompleted}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
