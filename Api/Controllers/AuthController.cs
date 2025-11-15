using Microsoft.AspNetCore.Mvc;
using Api.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _auth;

        public AuthController(AuthService auth) => _auth = auth;

        [HttpPost("login")]
        public IActionResult Login(LoginRequest req)
        {
            var user = _auth.ValidateUser(req.Email, req.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _auth.GenerateToken(user);
            return Ok(new { token, role = user.Role });
        }
    }

    public record LoginRequest(string Email, string Password);

}
