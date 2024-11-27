# RBAC Dashboard

This is a **Role-Based Access Control (RBAC)** Dashboard built using **React** and **Material-UI**. It is designed to manage user roles and permissions, providing a powerful admin interface to visualize user statistics and manage user access control efficiently.

The dashboard provides a set of interactive charts and cards to display key metrics, such as:
- Active vs Inactive Users
- Role Distribution
- Permissions Management

## Features

- **Role Management**: Easily manage roles like Admin, Manager, and User.
- **Permissions Assignment**: Assign permissions to each role.
- **User Management**: Display active and inactive users, along with their roles.
- **Charts**: Visualize the distribution of users based on roles and their status using Pie and Bar charts.
  
## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React UI framework for fast and modern web development.
- **Chart.js**: A library for rendering data charts.
- **React Router**: For navigating between different views in the application.
- **Axios** (or Fetch): For API requests and handling user data.

## Installation

Follow these steps to set up and run the project locally:

![RBAC1](https://github.com/user-attachments/assets/9a5265a5-bcfb-4e6b-a498-7e2c2132b9c0)
![RBAC2](https://github.com/user-attachments/assets/5f7eaa80-15ec-4e37-aaaf-cbae7adc0ffa)
![RBAC3](https://github.com/user-attachments/assets/99649bbf-d2eb-46fb-93d2-1ed0880229c1)
![RBAC-4](https://github.com/user-attachments/assets/16e5734c-ca9c-4dae-8fea-e2f82ae496d6)
![RBAC5](https://github.com/user-attachments/assets/f7df46d4-c9c2-43d5-abae-d079db63f61f)

### 1. Clone the Repository

```bash
git clone https://github.com/Hanumant-Pisal/RBAC-Dashboard.git
cd RBAC-Dashboard

2. Install Dependencies
Make sure you have Node.js and npm installed. Then, install the required dependencies using:

3. Run the Application
After installation is complete, start the development server:

Folder Structure

RBAC-Dashboard/
├── src/
│   ├── components/              # Reusable components like Dashboard, User Management, etc.
│   ├── services/                # API requests and data management
│   ├── App.js                   # Main component file
│   ├── App.css                  # Global styling
│   ├── index.js                 # Entry point for the app
│   └── ...                      # Other project files
├── public/
│   └── index.html               # Main HTML template for the app
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file

Components

User Management
The User Management component is responsible for managing user-related operations such as displaying, editing, and deleting users from the system. It allows administrators to manage users' statuses (active or inactive) and view detailed information about their roles.

Key Features:
User List: Displays all users in a table or list format.
Edit User: Administrators can click on a user to edit their details, such as their role or status (Active/Inactive).
Delete User: Users can be removed from the system by the admin.
User Search: A search bar allows admins to quickly filter and find users by name, email, or role.

Role Management
The Role Management component is designed to manage the roles of users in the system. Admins can assign or remove roles (Admin, Manager, User) to users, which will define their access control throughout the application.

Key Features:
Assign Roles: Admin can assign roles to users.
Edit Roles: Modify the role for a particular user.
Role Permissions: Set permissions associated with each role.


Dashboard
The Dashboard is the main landing page where admins can see user statistics and role distribution in the form of cards and charts. It visualizes data on active/inactive users and roles, providing a quick overview of the system's user status.

Charts
Pie Chart: Shows the distribution of users based on their roles (Admin, Manager, User).
Bar Chart: Compares the number of active and inactive users.
Role Management
The Role Management section allows you to create, update, and delete roles. Permissions can also be assigned to each role. This section is essential for controlling access to different parts of the application based on user roles.

Add New Role: Add a new role by entering its name and selecting permissions.
Edit Role: Modify an existing role's name or permissions.
Delete Role: Remove a role from the system.
User Statistics
The User Statistics section displays the following information:

Active Users: The number of users marked as active in the system.
Inactive Users: The number of users marked as inactive.
Role Distribution: A breakdown of users by role, showing how many users are assigned to Admin, Manager, or User roles.
Charts
The dashboard includes two types of visualizations:

Pie Chart: Shows the distribution of users based on their roles (Admin, Manager, User).
Bar Chart: Compares the number of active and inactive users.
Both charts provide clear insights into the user status and roles within the system.


