using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TodoApi.Models
{
  public class User : IdentityUser
  {
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public virtual ICollection<TodoItem>? Todos { get; set; }
  }

  public class LoginUser
  {
    [Required(ErrorMessage = "Email is required")]
    [Display(Name = "Email")]
    [DataType(DataType.EmailAddress)]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string? Password { get; set; }
  }
}