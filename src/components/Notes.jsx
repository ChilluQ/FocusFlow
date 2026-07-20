import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Notes() {
  const { notes, addNote, togglePin, deleteNote } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const colors = ['#e0e7ff', '#fce7f3', '#dcfce7', '#fef3c7', '#f3e8ff', '#e0f2fe'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addNote({
      id: Date.now(),
      title: newTitle,
      content: newContent,
      category: newCategory || 'General',
      color: colors[Math.floor(Math.random() * colors.length)],
      pinned: false
    });
    setNewTitle('');
    setNewContent('');
    setNewCategory('');
    setShowForm(false);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  const NoteCard = ({ note }) => (
    <div className="card" style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      borderTop: `4px solid ${note.color}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      height: '100%',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{note.title}</h3>
        <button onClick={() => togglePin(note.id)} style={{ fontSize: '1.25rem', opacity: note.pinned ? 1 : 0.3, background: 'none', border: 'none', cursor: 'pointer' }}>
          📌
        </button>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', whiteSpace: 'pre-wrap', flex: 1 }}>{note.content}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
          {note.category}
        </span>
        <button onClick={() => deleteNote(note.id)} className="btn-icon delete" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
          🗑️
        </button>
      </div>
    </div>
  );

  return (
    <div className="todo-container">
      <div className="todo-header card glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Quick Notes</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Jot down ideas, outlines, and reminders.</p>
        </div>
        <div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Note'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card glass-panel" style={{ marginBottom: '1rem' }}>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Note Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="task-input" />
            <input type="text" placeholder="Category (optional)" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="task-input" style={{ width: '200px' }} />
            <textarea placeholder="Write your note here..." value={newContent} onChange={e => setNewContent(e.target.value)} className="task-input" rows="4" style={{ resize: 'vertical' }}></textarea>
            <div style={{ alignSelf: 'flex-end' }}>
              <button type="submit" className="btn-primary">Save Note</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{ width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
        />
      </div>

      {pinnedNotes.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Pinned</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {pinnedNotes.map(note => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Others</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {unpinnedNotes.map(note => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>
      )}

      {filteredNotes.length === 0 && (
        <div className="card empty-state" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2 style={{ color: 'var(--text-secondary)' }}>No notes found</h2>
        </div>
      )}
    </div>
  );
}

export default Notes;
