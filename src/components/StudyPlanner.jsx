import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function StudyPlanner() {
  const { events, addEvent, exams } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');

  const filteredEvents = events.filter(e => e.date === date);
  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;
    addEvent({
      id: Date.now(),
      title: newTitle,
      time: newTime,
      type: 'focus',
      date: date
    });
    setNewTitle('');
    setNewTime('');
    setShowForm(false);
  };

  const calculateDaysLeft = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(dateString);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Study Planner & Exams</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Schedule your study sessions and track upcoming exams.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        
        {/* Planner Left Side */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Schedule for {date}</h2>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredEvents.map(ev => (
                <div key={ev.id} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', borderLeft: '4px solid var(--primary-color)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  <div style={{ minWidth: '80px', fontWeight: '600', color: 'var(--primary-color)' }}>{ev.time}</div>
                  <div>
                    <h4 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{ev.title}</h4>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && <p style={{ color: 'var(--text-secondary)', padding: '1rem' }}>No study sessions scheduled for this date.</p>}
            </div>
            
            {showForm ? (
              <form onSubmit={handleAdd} style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="task-input" style={{ width: '150px' }} />
                <input type="text" placeholder="Session Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="task-input" style={{ flex: 1 }} />
                <button type="submit" className="btn-primary">Save</button>
                <button type="button" className="filter-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            ) : (
              <button className="btn-primary" onClick={() => setShowForm(true)} style={{ marginTop: '1.5rem', width: '100%' }}>+ Schedule Study Session</button>
            )}
          </div>
        </div>

        {/* Exams Right Side */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Exam Countdown</h2>
            
            {sortedExams.slice(0, 3).map(exam => {
              const daysLeft = calculateDaysLeft(exam.date);
              return (
                <div key={exam.id} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{exam.title}</h3>
                  <p style={{ opacity: 0.8, fontSize: '0.875rem', marginTop: '0.25rem' }}>{exam.subject}</p>
                  <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {daysLeft < 0 ? 'Passed' : `${daysLeft} Days Left`}
                  </div>
                </div>
              )
            })}
            {exams.length === 0 && <p>No upcoming exams.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudyPlanner;
