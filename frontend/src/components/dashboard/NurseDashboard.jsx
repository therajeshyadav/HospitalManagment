import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const NurseDashboard = () => {
  const shiftStats = [
    {
      title: 'Assigned Patients',
      value: '24',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Tasks',
      value: '8',
      icon: ClipboardList,
      color: 'text-orange-600'
    },
    {
      title: 'Completed Tasks',
      value: '15',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Shift Hours',
      value: '6/12',
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  const pendingTasks = [
    { task: 'Administer medication to Room 301', priority: 'High', time: '2:00 PM' },
    { task: 'Check vitals for Room 205', priority: 'Medium', time: '2:30 PM' },
    { task: 'Assist with patient transfer', priority: 'High', time: '3:00 PM' },
    { task: 'Update patient records', priority: 'Low', time: '3:30 PM' },
  ];

  const patientAlerts = [
    { patient: 'John Doe - Room 301', alert: 'High blood pressure reading', severity: 'urgent' },
    { patient: 'Jane Smith - Room 205', alert: 'Medication due in 30 minutes', severity: 'normal' },
    { patient: 'Mike Johnson - Room 310', alert: 'Requested assistance', severity: 'normal' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertColor = (severity) => {
    return severity === 'urgent' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Nurse Dashboard</h1>
          <p className="text-muted-foreground">Good afternoon, Nurse Johnson</p>
        </div>
        <Button>
          <ClipboardList className="h-4 w-4 mr-2" />
          View All Tasks
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shiftStats.map((stat, index) => (
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
        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks scheduled for your shift</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">Due: {task.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Patient Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Patient Alerts</CardTitle>
              <CardDescription>Important patient notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAlerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${alert.severity === 'urgent' ? 'text-red-600' : 'text-blue-600'}`} />
                      <div>
                        <p className="font-medium">{alert.patient}</p>
                        <p className="text-sm text-muted-foreground">{alert.alert}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used nursing actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <ClipboardList className="h-6 w-6 mb-2" />
                Record Vitals
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Patient Rounds
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <AlertCircle className="h-6 w-6 mb-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <CheckCircle className="h-6 w-6 mb-2" />
                Complete Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NurseDashboard;