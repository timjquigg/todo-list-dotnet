using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
  public class AuthenticationRequest
  {
    [Required]
    public string? AccessToken { get; set; }
    [Required]
    public string? RefreshToken { get; set; }
  }
}