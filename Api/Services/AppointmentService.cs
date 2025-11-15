using Api.Data;
using Api.Models;
namespace Api.Services
{
    public class AppointmentService
    {
        private readonly ApiDbContext _db;

        public AppointmentService(ApiDbContext db) => _db = db;

        public bool HasConflict(int doctorId, DateTime start, DateTime end)
        {
            return _db.Appointments.Any(a => a.DoctorId == doctorId && a.Start < end && start < a.End && a.Status == "Booked");
        }

        public async Task<Appointment?> BookAppointment(int patientId, int doctorId, DateTime start, DateTime end)
        {
            if (HasConflict(doctorId, start, end))
                return null;
            var appointment = new Appointment
            {
                PatientId = patientId,
                DoctorId = doctorId,
                Start = start,
                End = end,
                Status = "Booked",
            };

            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();
            return appointment;

        }

    }
}
