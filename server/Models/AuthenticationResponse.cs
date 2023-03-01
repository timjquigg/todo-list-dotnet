using System;

namespace TodoApi.Models
{
  public class AuthenticaionResponse
  {
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
  }
}