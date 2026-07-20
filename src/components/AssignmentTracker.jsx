import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function AssignmentTracker() {
  const { assignments, addAssignment, deleteAssignment, updateAssignmentStatus } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim() || !newDate) return;
    addAssignment({
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      dueDate: newDate,
      status: 'Not Started',
      priority: newPriority
    });
    setNewTitle('');
    setNewSubject('');
    setNewDate('');
    setNewPriority('Medium');
    setShowForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'var(--success-color)';
      case 'In Progress': return 'var(--warning-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Assignment Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Never miss a deadline. Keep all your coursework organized.</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Your Assignments</h2>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Assignment'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <input type="text" placeholder="Assignment Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="task-input" style={{ flex: 1, minWidth: '200px' }} />
            <input type="text" placeholder="Subject" value={newSubject} onChange={e => setNewSubject(e.target.value)} className="task-input" style={{ width: '150px' }} />
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="task-input" style={{ width: '150px' }} />
            <select value={newPriority} onChange={e => setNewPriority(e.target.value)} className="task-input" style={{ width: '100px' }}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button type="submit" className="btn-primary">Save</button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Subject</th>
                <th style={{ padding: '1rem' }}>Due Date</th>
                <th style={{ padding: '1rem' }}>Priority</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(assign => (
                <tr key={assign.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{assign.title}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{assign.subject}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
                      {assign.dueDate}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`priority-badge ${assign.priority.toLowerCase()}`}>{assign.priority}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={assign.status} 
                      onChange={(e) => updateAssignmentStatus(assign.id, e.target.value)}
                      style={{ 
                        padding: '0.25rem', 
                        borderRadius: 'var(--radius-sm)', 
                        border: `1px solid ${getStatusColor(assign.status)}`,
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn-icon delete" onClick={() => deleteAssignment(assign.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {assignments.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No assignments added yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default AssignmentTracker;
