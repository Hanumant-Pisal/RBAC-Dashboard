import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Button, Form, FormControl } from 'react-bootstrap'; // Bootstrap components
import { List, ListItem, ListItemText, Divider } from '@mui/material'; // Material UI imports

// Importing components
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';
import Dashboard from './components/Dashboard'; // Import Dashboard component

// Importing CSS file
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Set sidebar to open by default
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const saveUsersToLocalStorage = (usersList) => {
    localStorage.setItem('users', JSON.stringify(usersList));
  };

  const handleAddUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div
          className={`sidebar ${sidebarOpen ? '' : 'closed'}`}
        >
          <Button
            variant="link"
            className="close-btn"
            onClick={() => setSidebarOpen(false)} // Close the sidebar
          >
            &times;
          </Button>
          <List style={{ padding: '0' }}>
            <ListItem button component={Link} to="/" className="list-item">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/users" className="list-item">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/roles" className="list-item">
              <ListItemText primary="Roles" />
            </ListItem>
            <ListItem button component={Link} to="/permissions" className="list-item">
              <ListItemText primary="Permissions" />
            </ListItem>
          </List>
          <Divider />
        </div>

        {/* Main Content Area */}
        <div
          className={`main-content ${sidebarOpen ? '' : 'closed'}`}
        >
          {/* Navbar with "Admin Panel" on the left and Sidebar Toggle */}
          <div className="navbar navbar-dark fixed-top p-3">
            <div className="container-fluid">
              {/* "Admin Panel" title on the left */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="btn-menu d-md-none"
                  onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar visibility on mobile
                >
                  <i className="bi bi-list"></i> {/* Bootstrap Icon */}
                </button>
                <h1>Admin Panel</h1>
              </div>

              {/* Search Bar */}
              <Form className="d-flex ms-auto search-bar">
                <FormControl
                  type="search"
                  placeholder="Search users"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </div>
          </div>

          {/* Main Content */}
          <Container className="mt-5 pt-5">
            <Routes>
              <Route path="/" element={<Dashboard users={filteredUsers} />} />
              <Route
                path="/users"
                element={
                  <UserManagement
                    users={filteredUsers}
                    onAddUser={handleAddUser}
                    onDeleteUser={handleDeleteUser}
                    onUpdateUser={handleUpdateUser}
                  />
                }
              />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/permissions" element={<PermissionManagement />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
