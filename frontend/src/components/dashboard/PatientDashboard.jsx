import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Pill, DollarSign, Heart, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const PatientDashboard = () => {
  const healthStats = [
    {
      title: 'Next Appointment',
      value: 'Dec 15, 2:30 PM',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Active Prescriptions',
      value: '3',
      icon: Pill,
      color: 'text-green-600'
    },
    {
      title: 'Pending Bills',
      value: '$245.00',
      icon: DollarSign,
      color: 'text-orange-600'
    },
    {
      title: 'Last Checkup',
      value: '2 weeks ago',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const upcomingAppointments = [
    { date: 'Dec 15, 2024', time: '2:30 PM', doctor: 'Dr. Smith', type: 'Cardiology' },
    { date: 'Dec 22, 2024', time: '10:00 AM', doctor: 'Dr. Johnson', type: 'General Checkup' },
    { date: 'Jan 5, 2025', time: '3:00 PM', doctor: 'Dr. Brown', type: 'Follow-up' },
  ];

  const recentPrescriptions = [
    { medication: 'Lisinopril 10mg', dosage: 'Once daily', prescribed: '2 weeks ago', status: 'Active' },
    { medication: 'Metformin 500mg', dosage: 'Twice daily', prescribed: '1 month ago', status: 'Active' },
    { medication: 'Aspirin 81mg', dosage: 'Once daily', prescribed: '3 weeks ago', status: 'Active' },
  ];

  const recentTests = [
    { test: 'Blood Pressure', result: '120/80 mmHg', date: '2 weeks ago', status: 'Normal' },
    { test: 'Blood Sugar', result: '95 mg/dL', date: '2 weeks ago', status: 'Normal' },
    { test: 'Cholesterol', result: '180 mg/dL', date: '1 month ago', status: 'Normal' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Patient Portal</h1>
          <p className="text-muted-foreground">Welcome back, John Doe</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Prescriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Prescriptions</CardTitle>
              <CardDescription>Your current medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrescriptions.map((prescription, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{prescription.medication}</p>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        {prescription.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{prescription.prescribed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Test Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Your latest medical test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentTests.map((test, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{test.test}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                      {test.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{test.result}</p>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your healthcare needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                View Records
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Pill className="h-6 w-6 mb-2" />
                Prescriptions
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                Pay Bills
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;