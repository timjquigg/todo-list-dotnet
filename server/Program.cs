using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoApi.Models;
using TodoApi.Services;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

var connectionString = configuration.GetConnectionString("TodoContext");

// Add services to the container.

// For Entity Framework
builder.Services.AddDbContext<MyDbContext>(opt => opt.UseNpgsql(connectionString));

//  For Identity
builder.Services
  .AddIdentityCore<User>(options =>
  {
    options.SignIn.RequireConfirmedAccount = false;
    // options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
  })
  .AddEntityFrameworkStores<MyDbContext>();

// Adding Authentication
builder.Services.AddScoped<JwtService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
              Encoding.UTF8.GetBytes(configuration["Jwt:Key"])
          )
      };
      options.SaveToken = true;
      options.Events = new JwtBearerEvents();
      options.Events.OnMessageReceived = context =>
      {
        if (context.Request.Cookies.ContainsKey("X-Access-Token"))
        {
          context.Token = context.Request.Cookies["X-Access-Token"];
        }
        return Task.CompletedTask;
      };
    })
    .AddCookie(options =>
    {
      options.Cookie.SameSite = SameSiteMode.Strict;
      options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
      options.Cookie.IsEssential = true;
    });

builder.Services.AddControllers()
.AddJsonOptions(options =>
        {
          options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
  builder =>
  {
    builder.WithOrigins("*");
  });
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
