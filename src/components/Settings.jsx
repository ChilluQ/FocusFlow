import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function Settings() {
  const { profile, setProfile } = useContext(AppContext);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    alert('Profile settings saved successfully!');
  };

  return (
    <div className="todo-container" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className="todo-header card glass-panel">
        <h1 style={{ fontSize: '2rem' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your profile and application preferences.</p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Profile Information</h2>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div className="avatar" style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold', borderRadius: '50%' }}>
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <button type="button" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                Change Avatar
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Course / Major</label>
              <input type="text" name="major" value={formData.major} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Semester</label>
              <input type="text" name="semester" value={formData.semester} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
