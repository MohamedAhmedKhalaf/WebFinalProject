namespace Api.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime BirthDate { get; set; }

        public List<MedicalRecord> MedicalRecords { get; set; } = new(); //TODO add MedicalRecords 
    }
}
