import { useState, useEffect } from 'react';
import { appointmentAPI, doctorAPI, patientAPI, userAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';
import Card from '../components/Card';
import './Dashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, doctorsRes, patientsRes, usersRes] = await Promise.all([
        appointmentAPI.getAll(),
        doctorAPI.getAll(),
        patientAPI.getAll(),
        userAPI.getAll(),
      ]);
      setAppointments(appointmentsRes.data);
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await userAPI.delete(id);
      setMessage('User deleted successfully!');
      loadData();
    } catch (error) {
      setMessage('Failed to delete user.');
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    try {
      await appointmentAPI.delete(id);
      setMessage('Appointment deleted successfully!');
      loadData();
    } catch (error) {
      setMessage('Failed to delete appointment.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.start);
    const today = new Date();
    return (
      aptDate.getDate() === today.getDate() &&
      aptDate.getMonth() === today.getMonth() &&
      aptDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-value">{doctors.length}</div>
          <div className="stat-label">Doctors</div>
        </div>
        <div className="stat-card stat-purple">
          <div className="stat-value">{patients.length}</div>
          <div className="stat-label">Patients</div>
        </div>
        <div className="stat-card stat-orange">
          <div className="stat-value">{todayAppointments.length}</div>
          <div className="stat-label">Today's Appointments</div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-grid">
          <Card title="Recent Appointments">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((apt) => (
                    <tr key={apt.id}>
                      <td>
                        {apt.patient?.firstName} {apt.patient?.lastName}
                      </td>
                      <td>
                        Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}
                      </td>
                      <td>{formatDateTime(apt.start)}</td>
                      <td>
                        <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <Card title="All Users">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'appointments' && (
        <Card title="All Appointments">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.id}</td>
                    <td>
                      {apt.patient?.firstName} {apt.patient?.lastName}
                    </td>
                    <td>
                      Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}
                    </td>
                    <td>{formatDateTime(apt.start)}</td>
                    <td>
                      <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAppointment(apt.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'doctors' && (
        <Card title="All Doctors">
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card-admin">
                <div className="doctor-avatar-large">
                  {doctor.firstName[0]}
                  {doctor.lastName[0]}
                </div>
                <h3 className="doctor-name">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <p className="doctor-id">ID: {doctor.id}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'patients' && (
        <Card title="All Patients">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Birth Date</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td>{new Date(patient.birthDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
