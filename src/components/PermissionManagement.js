import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox, Grid, Typography } from '@mui/material';
import { getPermissions, getRoles, updateRolePermissions } from '../services/api';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch permissions and roles on component load
  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = async () => {
    const data = await getPermissions();
    setPermissions(data);
  };

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleSavePermissions = async (selectedPermissions) => {
    if (selectedRole) {
      const updatedRole = {
        ...selectedRole,
        permissions: selectedPermissions,
      };
      await updateRolePermissions(selectedRole.id, updatedRole);
      setShowModal(false);
      fetchRoles(); // Reload roles with updated permissions
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Role Permissions
      </Typography>

      {/* Grid container for displaying roles */}
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role.id}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6">{role.name}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {role.permissions.join(', ')}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: '#1976d2', // Default blue background color
                  color: 'white', // Text color white
                  '&:hover': {
                    backgroundColor: '#1565c0', // Darker blue on hover
                    color: 'white', // Ensure text remains white on hover
                  },
                }}
                onClick={() => handleRoleSelection(role)}
              >
                Manage Permissions
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Managing Permissions */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Manage Permissions for {selectedRole?.name}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const selectedPermissions = formData.getAll('permissions');
              handleSavePermissions(selectedPermissions);
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="h6" gutterBottom>Available Permissions</Typography>
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      name="permissions"
                      value={permission}
                      defaultChecked={selectedRole?.permissions.includes(permission)}
                    />
                  }
                  label={permission}
                />
              ))}
            </div>
            <DialogActions>
              <Button onClick={() => setShowModal(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Permissions
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionManagement;
