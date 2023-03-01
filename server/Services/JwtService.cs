using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TodoApi.Models;

namespace TodoApi.Services
{
  public class JwtService
  {
    // private const int EXPIRATION_MINUTES = 60;
    private readonly IConfiguration _configuration;
    public JwtService(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public AuthenticaionResponse CreateToken(User user)
    {

      _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

      var expiration = DateTime.UtcNow.AddMinutes(tokenValidityInMinutes);

      _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

      var refreshTokenExpiration = DateTime.UtcNow.AddDays(refreshTokenValidityInDays);

      var token = CreateJwtToken(
        CreateClaims(user),
        CreateSigningCredentials(),
        expiration
      );

      var tokenHandler = new JwtSecurityTokenHandler();

      return new AuthenticaionResponse
      {
        AccessToken = tokenHandler.WriteToken(token),
        RefreshToken = GenerateRefreshToken(),
        RefreshTokenExpiryTime = refreshTokenExpiration
      };
    }

    private JwtSecurityToken CreateJwtToken(Claim[] claims, SigningCredentials credentials, DateTime expiration) =>
      new JwtSecurityToken(
        claims: claims,
        expires: expiration,
        signingCredentials: credentials
      );

    private Claim[] CreateClaims(User user) =>
      new[] {
        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim("email", user.Email),
      };

    private SigningCredentials CreateSigningCredentials() =>
      new SigningCredentials(
        new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
        ),
        SecurityAlgorithms.HmacSha256
      );

    private static string GenerateRefreshToken()
    {
      var randomNumber = new byte[64];
      using var rng = RandomNumberGenerator.Create();
      rng.GetBytes(randomNumber);
      return Convert.ToBase64String(randomNumber);
    }
  }
}