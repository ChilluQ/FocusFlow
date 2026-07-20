import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

function FocusZone() {
  const { stats, completeFocusSession } = useContext(AppContext);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  const timerRef = useRef(null);

  const getModeDuration = (m) => {
    if (m === 'focus') return 25 * 60;
    if (m === 'shortBreak') return 5 * 60;
    if (m === 'longBreak') return 15 * 60;
    return 25 * 60;
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(timerRef.current);
      if (mode === 'focus') {
        completeFocusSession(25); // Adds 25 minutes to global stats
        alert('Focus session complete! Time for a break.');
      } else {
        alert('Break over! Back to work.');
      }
      setIsActive(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(getModeDuration(newMode));
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getModeDuration(mode));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = ((getModeDuration(mode) - timeLeft) / getModeDuration(mode)) * 100;

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--primary-color), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Focus Zone
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Eliminate distractions and get deep work done.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <div className="card glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '3rem', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button 
              className={`filter-btn ${mode === 'focus' ? 'active' : ''}`} 
              onClick={() => switchMode('focus')}
            >
              Focus (25m)
            </button>
            <button 
              className={`filter-btn ${mode === 'shortBreak' ? 'active' : ''}`} 
              onClick={() => switchMode('shortBreak')}
            >
              Short Break (5m)
            </button>
            <button 
              className={`filter-btn ${mode === 'longBreak' ? 'active' : ''}`} 
              onClick={() => switchMode('longBreak')}
            >
              Long Break (15m)
            </button>
          </div>

          <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle 
                cx="150" cy="150" r="140" 
                fill="none" 
                stroke="var(--bg-tertiary)" 
                strokeWidth="12" 
              />
              <circle 
                cx="150" cy="150" r="140" 
                fill="none" 
                stroke={mode === 'focus' ? 'var(--primary-color)' : 'var(--success-color)'} 
                strokeWidth="12" 
                strokeDasharray="879.64" 
                strokeDashoffset={879.64 - (progressPercentage / 100) * 879.64}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
            <button 
              onClick={toggleTimer}
              style={{ 
                padding: '1rem 3rem', 
                fontSize: '1.25rem', 
                borderRadius: 'var(--radius-xl)', 
                backgroundColor: isActive ? 'var(--bg-tertiary)' : 'var(--primary-color)',
                color: isActive ? 'var(--text-primary)' : 'white',
                fontWeight: 'bold',
                boxShadow: isActive ? 'none' : 'var(--card-shadow)',
                transition: 'all 0.2s ease'
              }}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetTimer}
              className="btn-icon" 
              style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)' }}
            >
              🔄
            </button>
          </div>

          <div style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
            Total Sessions Completed: <strong style={{ color: 'var(--primary-color)' }}>{stats.sessionsCompleted}</strong>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FocusZone;
