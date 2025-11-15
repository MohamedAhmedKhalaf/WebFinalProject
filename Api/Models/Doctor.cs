namespace Api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Specialty { get; set; } = null!;

        public List<Appointment> Appointments { get; set; } = new();
    }
}
