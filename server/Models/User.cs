using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TodoApi.Models
{
  public class User : IdentityUser
  {
    // public string Password { get; set; }
    // public virtual ICollection<TodoItem>? Todos { get; set; }
  }

  public class LoginUser
  {
    [Required]
    [Display(Name = "Email")]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }
  }
}