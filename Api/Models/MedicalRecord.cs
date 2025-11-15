namespace Api.Models
{
    public class MedicalRecord
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public Patient? Patient { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Diagnosis { get; set; } = null!;
        public string Notes { get; set; } = null!;
    }
}
