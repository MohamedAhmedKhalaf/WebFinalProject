using Api.Data;
using Microsoft.EntityFrameworkCore;
using Api.Services;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApiDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AppointmentService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
