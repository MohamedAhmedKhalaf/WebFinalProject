using Api.Data;
using Api.Models;
namespace Api.Services
{

    public class AuthService
    {
        private readonly ApiDbContext _db;

        public AuthService(ApiDbContext db) => _db = db;

        public User? ValidateUser(string email, string password)
        {
            var user = _db.Users.SingleOrDefault(u => u.Email == email);
            if (user == null) return null;
            if (!BCrypt.Net.BCrypt.Verify(password, user!.PasswordHash))
                return null;
            return user;
        }
        public string GenerateToken(User user)
        {
            return $"fake-jwt-token-lmao-{user.Email}";
        }

    }

}
