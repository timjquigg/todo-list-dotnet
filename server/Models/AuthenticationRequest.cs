using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
  public class AuthenticationRequest
  {
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
  }
}