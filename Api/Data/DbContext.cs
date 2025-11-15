using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
          : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Patient> Patients => Set<Patient>();
        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<MedicalRecord> MedicalRecords => Set<MedicalRecord>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
              .HasIndex(u => u.Email)
              .IsUnique();
        }

    }
}
