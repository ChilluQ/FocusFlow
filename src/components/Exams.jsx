import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function Exams() {
  const { exams, addExam, deleteExam } = useContext(AppContext);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim() || !newDate) return;
    addExam({
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      date: newDate,
      status: 'Not Started',
      priority: 'Medium'
    });
    setNewTitle('');
    setNewSubject('');
    setNewDate('');
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
        <h1 style={{ fontSize: '2rem' }}>Exam Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Track upcoming exams and preparation status.</p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Add New Exam</h2>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Exam Name" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="task-input" />
          <input type="text" placeholder="Subject" value={newSubject} onChange={e => setNewSubject(e.target.value)} className="task-input" style={{ width: '150px' }} />
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="task-input" style={{ width: '150px' }} />
          <button type="submit" className="btn-primary">Add Exam</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {exams.map(exam => {
          const daysLeft = calculateDaysLeft(exam.date);
          return (
            <div key={exam.id} className="card" style={{ position: 'relative', borderTop: `4px solid ${daysLeft <= 3 ? 'var(--danger-color)' : daysLeft <= 7 ? 'var(--warning-color)' : 'var(--success-color)'}` }}>
              <button onClick={() => deleteExam(exam.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>🗑️</button>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{exam.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{exam.subject}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {daysLeft < 0 ? 'Passed' : `${daysLeft} Days`}
                </div>
                <div style={{ fontSize: '0.875rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  {exam.date}
                </div>
              </div>
            </div>
          );
        })}
        {exams.length === 0 && <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>No exams scheduled.</div>}
      </div>
    </div>
  );
}

export default Exams;
