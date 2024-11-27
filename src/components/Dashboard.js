import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Grid, Card, CardContent, Typography, Badge, Box, Paper, Divider } from '@mui/material'; // MUI components

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({ users }) => {
  // Count active and inactive users
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = users.filter(user => user.status === 'Inactive').length;

  // Get the distribution of users by role
  const rolesDistribution = {
    Admin: users.filter(user => user.role === 'Admin').length,
    Manager: users.filter(user => user.role === 'Manager').length,
    User: users.filter(user => user.role === 'User').length,
  };

  // Pie chart data for user roles
  const roleData = {
    labels: ['Admin', 'Manager', 'User'],
    datasets: [
      {
        label: 'Users by Role',
        data: [rolesDistribution.Admin, rolesDistribution.Manager, rolesDistribution.User],
        backgroundColor: ['#FF8A65', '#66BB6A', '#42A5F5'],
        hoverOffset: 4
      }
    ]
  };

  // Bar chart data for active/inactive users
  const statusData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Users by Status',
        data: [activeUsers, inactiveUsers],
        backgroundColor: ['#66BB6A', '#FF7043'],
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1
      }
    ]
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8' }}>
      <Grid container spacing={3}>
        {/* Active Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            boxShadow: 3, // Reduced shadow
            borderRadius: 3, 
            height: '250px',  // Reduced height for smaller cards
            display: 'flex', 
            flexDirection: 'column', 
            '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } 
          }}>
            <CardContent sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', // Center align content vertically and horizontally
              textAlign: 'center'  // Ensure text is centered
            }}>
              <Typography variant="h6" color="textSecondary">Active Users</Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">{activeUsers}</Typography>
              <Badge color="success" sx={{ mt: 2, borderRadius: '12px' }}>Active</Badge>
            </CardContent>
            <Paper sx={{ 
              padding: 1, 
              backgroundColor: '#66BB6A', 
              color: 'white', 
              borderBottomLeftRadius: 3, 
              borderBottomRightRadius: 3 
            }}>
              <Typography variant="body2" align="center">Total Active Users</Typography>
            </Paper>
          </Card>
        </Grid>

        {/* Inactive Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            boxShadow: 3, // Reduced shadow
            borderRadius: 3, 
            height: '250px',  // Reduced height for smaller cards
            display: 'flex', 
            flexDirection: 'column', 
            '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } 
          }}>
            <CardContent sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', // Center align content vertically and horizontally
              textAlign: 'center'  // Ensure text is centered
            }}>
              <Typography variant="h6" color="textSecondary">Inactive Users</Typography>
              <Typography variant="h3" color="error" fontWeight="bold">{inactiveUsers}</Typography>
              <Badge color="error" sx={{ mt: 2, borderRadius: '12px' }}>Inactive</Badge>
            </CardContent>
            <Paper sx={{ 
              padding: 1, 
              backgroundColor: '#FF7043', 
              color: 'white', 
              borderBottomLeftRadius: 3, 
              borderBottomRightRadius: 3 
            }}>
              <Typography variant="body2" align="center">Total Inactive Users</Typography>
            </Paper>
          </Card>
        </Grid>

        {/* Role Distribution Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            boxShadow: 3, // Reduced shadow
            borderRadius: 3, 
            height: '250px',  // Reduced height for smaller cards
            display: 'flex', 
            flexDirection: 'column', 
            '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } 
          }}>
            <CardContent sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', // Center align content vertically and horizontally
              textAlign: 'center'  // Ensure text is centered
            }}>
              <Typography variant="h6" color="textSecondary" align="center">Role Distribution</Typography>
              <ul style={{ paddingLeft: 0, listStyleType: 'none', color: '#1976D2', textAlign: 'center' }}>
                <li><strong>Admin:</strong> {rolesDistribution.Admin}</li>
                <li><strong>Manager:</strong> {rolesDistribution.Manager}</li>
                <li><strong>User:</strong> {rolesDistribution.User}</li>
              </ul>
            </CardContent>
            <Paper sx={{ 
              padding: 1, 
              backgroundColor: '#1976D2', 
              color: 'white', 
              borderBottomLeftRadius: 3, 
              borderBottomRightRadius: 3 
            }}>
              <Typography variant="body2" align="center">Role Breakdown</Typography>
            </Paper>
          </Card>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Pie Chart - User Role Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            boxShadow: 3, // Reduced shadow
            borderRadius: 3, 
            height: '250px',  // Reduced height for smaller cards
            '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } 
          }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" align="center">User Roles Distribution</Typography>
              <div style={{ maxWidth: '350px', margin: '0 auto', height: '180px' }}>
                <Pie data={roleData} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart - Active vs Inactive Users */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            boxShadow: 3, // Reduced shadow
            borderRadius: 3, 
            height: '250px',  // Reduced height for smaller cards
            '&:hover': { transform: 'scale(1.05)', boxShadow: 8 } 
          }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" align="center">Active vs Inactive Users</Typography>
              <div style={{ maxWidth: '350px', margin: '0 auto', height: '180px' }}>
                <Bar data={statusData} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
