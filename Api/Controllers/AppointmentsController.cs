using Microsoft.AspNetCore.Mvc;
using Api.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppointmentService _svc;
        public AppointmentsController(AppointmentService svc) => _svc = svc;

        [HttpPost("book")]
        public async Task<IActionResult> Book(AppointmentRequest req)
        {
            var appt = await _svc.BookAppointment(req.PatientId, req.DoctorId, req.Start, req.End);

            if (appt == null)
                return Conflict("You know i wrote this at 2 am so i don't really know soecifically what can cause this other than a conflicting appointment... so that's probably it :D");
            return Ok(appt);


        }
    }

    public record AppointmentRequest(int PatientId, int DoctorId, DateTime Start, DateTime End);
}
