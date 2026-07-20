import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './TodoList.css';

function TodoList() {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(AppContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      priority: 'Medium',
      category: 'General',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0]
    };
    addTask(newTask);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Completed' && !t.completed) return false;
    if (filter === 'Pending' && t.completed) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Smart To-Do List</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Organize your work, prioritize, and stay on track.</p>
        
        <div className="progress-section">
          <div className="progress-header">
            <span>Daily Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="todo-actions-card card">
        <form onSubmit={handleAddTask} className="add-task-form">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={newTaskTitle} 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="btn-primary">Add Task</button>
        </form>

        <div className="todo-filters">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
            <button className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`} onClick={() => setFilter('Pending')}>Pending</button>
            <button className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`} onClick={() => setFilter('Completed')}>Completed</button>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state card">
            <h2>No tasks found</h2>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-card card ${task.completed ? 'completed' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-meta">
                    <span className="task-category">📁 {task.category}</span>
                    <span className="task-date">📅 {task.dueDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="task-right">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <button className="btn-icon delete" onClick={() => deleteTask(task.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
