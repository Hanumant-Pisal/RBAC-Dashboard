import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, IconButton, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material'; // Importing Material UI components
import AddIcon from '@mui/icons-material/Add'; // Add Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import SearchIcon from '@mui/icons-material/Search'; // Search Icon

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const [role, setRole] = useState('User');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsersToLocalStorage = (usersList) => {
    localStorage.setItem('users', JSON.stringify(usersList));
  };

  const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSaveUser = () => {
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);

    const newUser = { id: Date.now(), name, email, status, role };
    let updatedUsers = [...users];

    if (editUser) {
      updatedUsers = updatedUsers.map((user) =>
        user.id === editUser.id ? { ...user, name, email, status, role } : user
      );
    } else {
      updatedUsers.push(newUser);
    }

    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);

    setLoading(false);
    setShowModal(false);
    setError('');
    setName('');
    setEmail('');
    setStatus('Active');
    setRole('User');
  };

  const handleDeleteUser = (userId) => {
    setLoading(true);

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);

    setLoading(false);
  };

  const handleAddUser = () => {
    setEditUser(null);
    setName('');
    setEmail('');
    setStatus('Active');
    setRole('User');
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setName(user.name);
    setEmail(user.email);
    setStatus(user.status);
    setRole(user.role);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ width: '200px' }} // Reduce the width of the search box
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddUser} 
          sx={{ marginLeft: '20px', padding: '6px 16px' }} // Reduce padding for smaller button size
          startIcon={<AddIcon />}
        >
          Add User
        </Button>
      </div>

      {/* Error Message */}
      {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}

      {/* Loading Spinner */}
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user management table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span style={{ color: user.role === 'Admin' ? 'red' : 'blue' }}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span style={{ color: user.status === 'Active' ? 'green' : 'gray' }}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* User Add/Edit Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>{editUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            {editUser ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
