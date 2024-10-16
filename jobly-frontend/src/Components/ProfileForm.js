import React, { useState } from 'react';
import JoblyApi from '../api';

function ProfileForm({ user, updateUser }) {
  const INITIAL_STATE = { username: user.username, email: user.email, password: '' };
  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const updatedUser = await JoblyApi.updateProfile(user.username, formData);
    updateUser(updatedUser);  // Call parent to update current user
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

export default ProfileForm;
