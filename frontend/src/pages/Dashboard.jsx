import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';
import NurseDashboard from '../components/dashboard/NurseDashboard';
import PatientDashboard from '../components/dashboard/PatientDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'Administrator':
        return <AdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Nurse':
        return <NurseDashboard />;
      case 'Patient':
        return <PatientDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;