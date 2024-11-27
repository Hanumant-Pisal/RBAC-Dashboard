// Simulated data for users, roles, and permissions
const users = [
  { id: 1, name: 'Hanumant Pisal', email: 'hanumant.pisal@gmail.com', status: 'Active' },
  { id: 2, name: 'Virat Kohali', email: 'viratkohali@gmail.com', status: 'Inactive' },
];

const roles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete', 'Update'] },
  { id: 2, name: 'Manager', permissions: ['Read', 'Write', 'Update'] },
  { id: 3, name: 'User', permissions: ['Read'] }
];

const permissions = ['Read', 'Write', 'Delete', 'Update'];

// Mock API Calls for Users

export const getUsers = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(users), 1000));  // Simulate API call delay
};

export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = { ...user, id: users.length + 1 };
      users.push(newUser);  // Add new user to the array
      resolve(newUser);
    }, 500);
  });
};

export const updateUser = async (id, updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
      }
      resolve(users[index]);
    }, 500);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);  // Remove user from the array
      }
      resolve();
    }, 500);
  });
};

// Mock API Calls for Roles

export const getRoles = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(roles), 1000));
};

export const createRole = async (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRole = { ...role, id: roles.length + 1 };
      roles.push(newRole);  // Add new role to the array
      resolve(newRole);
    }, 500);
  });
};

export const updateRole = async (id, updatedRole) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = roles.findIndex((role) => role.id === id);
      if (index !== -1) {
        roles[index] = { ...roles[index], ...updatedRole };
      }
      resolve(roles[index]);
    }, 500);
  });
};

export const deleteRole = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = roles.findIndex((role) => role.id === id);
      if (index !== -1) {
        roles.splice(index, 1);  // Remove role from the array
      }
      resolve();
    }, 500);
  });
};

// Mock API Calls for Permissions

export const getPermissions = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(permissions), 1000));
};

// Updated function to avoid duplicate permissions when updating role permissions
export const updateRolePermissions = async (roleId, updatedRole) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = roles.findIndex((role) => role.id === roleId);
      if (index !== -1) {
        // Remove duplicates from the permissions array
        const uniquePermissions = [...new Set(updatedRole.permissions)];
        roles[index] = { ...roles[index], permissions: uniquePermissions };
      }
      resolve(roles[index]);
    }, 500);
  });
};
