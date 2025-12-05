import { useState, useEffect } from 'react';
import { appointmentAPI, doctorAPI, patientAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';
import Card from '../components/Card';
import './Dashboard.css';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    start: '',
    end: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
        appointmentAPI.getForUser(),
        doctorAPI.getAll(),
        patientAPI.getAll(),
      ]);
      setAppointments(appointmentsRes.data);
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await appointmentAPI.book({
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        start: formData.start,
        end: formData.end,
      });
      setMessage('Appointment booked successfully!');
      setShowBooking(false);
      setFormData({ patientId: '', doctorId: '', start: '', end: '' });
      loadData();
    } catch (error) {
      setMessage(error.response?.data || 'Failed to book appointment. Please try again.');
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await appointmentAPI.delete(id);
      setMessage('Appointment cancelled successfully!');
      loadData();
    } catch (error) {
      setMessage('Failed to cancel appointment.');
    }
  };

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
        <h1 className="dashboard-title">Patient Dashboard</h1>
        <button className="btn btn-primary" onClick={() => setShowBooking(!showBooking)}>
          {showBooking ? 'Close' : 'Book Appointment'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      {showBooking && (
        <Card title="Book New Appointment" className="booking-card">
          <form onSubmit={handleBookAppointment} className="booking-form">
            <div className="form-group">
              <label className="form-label">Select Patient</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Choose a patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Select Doctor</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Book Appointment
            </button>
          </form>
        </Card>
      )}

      <div className="dashboard-grid">
        <Card title="My Appointments">
          {appointments.length === 0 ? (
            <p className="empty-state">No appointments found. Book your first appointment!</p>
          ) : (
            <div className="appointments-list">
              {appointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="appointment-info">
                    <h3 className="appointment-doctor">
                      Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}
                    </h3>
                    <p className="appointment-specialty">{apt.doctor?.specialty}</p>
                    <p className="appointment-time">{formatDateTime(apt.start)}</p>
                    <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="appointment-actions">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelAppointment(apt.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Available Doctors">
          <div className="doctors-list">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-avatar">
                  {doctor.firstName[0]}
                  {doctor.lastName[0]}
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
