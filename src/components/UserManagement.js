import React, { useState } from 'react';
import { createUser, resetPassword } from '../api';

const UserManagement = () => {
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
  const [resetUser, setResetUser] = useState({ username: '', newPassword: '' });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      alert('User created successfully');
      setNewUser({ username: '', password: '', role: '' });
    } catch (error) {
      alert('Error creating user');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetUser);
      alert('Password reset successfully');
      setResetUser({ username: '', newPassword: '' });
    } catch (error) {
      alert('Error resetting password');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleCreateUser}>
        <h3>Create User</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      <form onSubmit={handleResetPassword}>
        <h3>Reset Password</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={resetUser.username}
            onChange={(e) => setResetUser({ ...resetUser, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={resetUser.newPassword}
            onChange={(e) => setResetUser({ ...resetUser, newPassword: e.target.value })}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default UserManagement;
