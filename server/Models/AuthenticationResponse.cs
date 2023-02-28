using System;

namespace TodoApi.Models
{
  public class AuthenticaionResponse
  {
    public string Token { get; set; }
    public DateTime Expiration { get; set; }
  }
}