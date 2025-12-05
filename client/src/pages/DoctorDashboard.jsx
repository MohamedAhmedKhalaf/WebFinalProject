import { useState, useEffect } from 'react';
import { appointmentAPI, medicalRecordAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';
import Card from '../components/Card';
import './Dashboard.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [recordData, setRecordData] = useState({
    diagnosis: '',
    notes: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentAPI.getForUser();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const appointment = appointments.find((a) => a.id === id);
      await appointmentAPI.update(id, { ...appointment, status });
      setMessage('Appointment status updated!');
      loadAppointments();
    } catch (error) {
      setMessage('Failed to update appointment status.');
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      await medicalRecordAPI.create({
        patientId: selectedAppointment.patientId,
        diagnosis: recordData.diagnosis,
        notes: recordData.notes,
      });
      setMessage('Medical record added successfully!');
      setShowRecordForm(false);
      setSelectedAppointment(null);
      setRecordData({ diagnosis: '', notes: '' });
    } catch (error) {
      setMessage('Failed to add medical record.');
    }
  };

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.start);
    const today = new Date();
    return (
      aptDate.getDate() === today.getDate() &&
      aptDate.getMonth() === today.getMonth() &&
      aptDate.getFullYear() === today.getFullYear()
    );
  });

  const upcomingAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.start);
    const today = new Date();
    return aptDate > today;
  });

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Doctor Dashboard</h1>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{todayAppointments.length}</div>
          <div className="stat-label">Today's Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{upcomingAppointments.length}</div>
          <div className="stat-label">Upcoming Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{appointments.length}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
      </div>

      {showRecordForm && selectedAppointment && (
        <Card title="Add Medical Record" className="booking-card">
          <form onSubmit={handleAddRecord} className="booking-form">
            <div className="form-group">
              <label className="form-label">Patient</label>
              <input
                type="text"
                className="form-input"
                value={`${selectedAppointment.patient?.firstName} ${selectedAppointment.patient?.lastName}`}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Diagnosis</label>
              <input
                type="text"
                className="form-input"
                value={recordData.diagnosis}
                onChange={(e) => setRecordData({ ...recordData, diagnosis: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-input"
                rows="4"
                value={recordData.notes}
                onChange={(e) => setRecordData({ ...recordData, notes: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Save Record
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowRecordForm(false);
                  setSelectedAppointment(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card title="My Schedule">
        {appointments.length === 0 ? (
          <p className="empty-state">No appointments scheduled.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <div key={apt.id} className="appointment-item doctor-appointment">
                <div className="appointment-info">
                  <h3 className="appointment-patient">
                    {apt.patient?.firstName} {apt.patient?.lastName}
                  </h3>
                  <p className="appointment-time">{formatDateTime(apt.start)}</p>
                  <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>
                <div className="appointment-actions">
                  {apt.status === 'Booked' && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setShowRecordForm(true);
                        }}
                      >
                        Add Record
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DoctorDashboard;
