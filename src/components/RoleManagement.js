import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel, CircularProgress, IconButton, Grid, Snackbar, Alert, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRoles, createRole, updateRole, deleteRole } from '../services/api'; // Mock API functions

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch roles from the server (or mock API)
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    const data = await getRoles();
    setRoles(data);
    setLoading(false);
  };

  const handleAddRole = () => {
    setEditRole(null);
    setRoleName('');
    setPermissions([]);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setRoleName(role.name);
    setPermissions(role.permissions);
    setShowModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    await deleteRole(roleId);
    fetchRoles();
    setSnackbarMessage('Role deleted successfully');
    setOpenSnackbar(true);
  };

  const handleSaveRole = async () => {
    const role = { name: roleName, permissions };
    setLoading(true);
    if (editRole) {
      await updateRole(editRole.id, role);
      setSnackbarMessage('Role updated successfully');
    } else {
      await createRole(role);
      setSnackbarMessage('Role created successfully');
    }
    setShowModal(false);
    fetchRoles();
    setLoading(false);
    setOpenSnackbar(true);
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((item) => item !== permission)
        : [...prevPermissions, permission]
    );
  };

  return (
    <div className="container mt-4">
      {/* Add Role Button */}
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" className="mb-3">
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRole}
            startIcon={<AddIcon />}
          >
            Add New Role
          </Button>
        </Grid>
      </Grid>

      {/* Role Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.permissions.join(', ')}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditRole(role)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteRole(role.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>


      {/* Modal for Add/Edit Role */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>{editRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            variant="outlined"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <div style={{ marginBottom: '20px' }}>
            <h4>Permissions</h4>
            {['Read', 'Write', 'Delete', 'Update'].map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    name={permission}
                  />
                }
                label={permission}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveRole}
            color="primary"
            disabled={!roleName || permissions.length === 0 || loading}
          >
            {loading ? <CircularProgress size={24} /> : editRole ? 'Save Changes' : 'Create Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
