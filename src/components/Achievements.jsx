import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Achievements() {
  const { stats, tasks, exams } = useContext(AppContext);

  const completedTasks = tasks.filter(t => t.completed).length + stats.tasksCompletedAllTime;
  const totalFocusHours = stats.totalFocusMinutes / 60;
  const examsCompleted = exams.filter(e => e.status === 'Completed' || e.status === 'Prepared').length; // approximation for demo

  const achievements = [
    { id: 1, title: '7-Day Streak', icon: '🔥', description: 'Log in and complete a task for 7 consecutive days.', unlocked: stats.streak >= 7 },
    { id: 2, title: '30-Day Streak', icon: '🏆', description: 'Log in and complete a task for 30 consecutive days.', unlocked: stats.streak >= 30 },
    { id: 3, title: '50 Tasks Completed', icon: '⚡', description: 'Check off 50 tasks from your to-do list.', unlocked: completedTasks >= 50 },
    { id: 4, title: '10 Hours Focused', icon: '🧠', description: 'Complete 10 hours of Pomodoro focus sessions.', unlocked: totalFocusHours >= 10 },
    { id: 5, title: 'Early Bird', icon: '🌅', description: 'Complete a task before 8:00 AM.', unlocked: true }, // Static for demo
    { id: 6, title: 'Night Owl', icon: '🌙', description: 'Complete a task after 10:00 PM.', unlocked: false }, // Static for demo
    { id: 7, title: 'Exam Ace', icon: '💯', description: 'Prepare for 3 exams.', unlocked: examsCompleted >= 3 },
    { id: 8, title: 'Zen Master', icon: '🧘', description: 'Complete a 4-hour continuous focus session.', unlocked: false }
  ];

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Achievements & Gamification</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Unlock badges as you build productive habits.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {achievements.map(ach => (
          <div key={ach.id} className={`card ${ach.unlocked ? '' : 'locked'}`} style={{ 
            opacity: ach.unlocked ? 1 : 0.6,
            filter: ach.unlocked ? 'none' : 'grayscale(100%)',
            textAlign: 'center',
            padding: '2rem 1.5rem',
            border: ach.unlocked ? '2px solid var(--primary-light)' : '1px solid var(--border-color)',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}>
            {!ach.unlocked && <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.25rem' }}>🔒</div>}
            
            <div style={{ 
              fontSize: '3rem', 
              width: '80px', 
              height: '80px', 
              margin: '0 auto 1rem auto', 
              backgroundColor: ach.unlocked ? 'var(--primary-light)' : 'var(--bg-tertiary)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {ach.icon}
            </div>
            
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: ach.unlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {ach.title}
            </h3>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {ach.description}
            </p>

            {ach.unlocked && (
              <div style={{ marginTop: '1rem', color: 'var(--success-color)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Unlocked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
