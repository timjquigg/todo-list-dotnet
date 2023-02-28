using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace todo_dotnet_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly UserManager<IdentityUser> _userManager;

    public UsersController(UserManager<IdentityUser> userManager)
    {
      _userManager = userManager;
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var result = await _userManager.CreateAsync(
        new IdentityUser() { Email = user.Email },
        user.Password
      );

      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      user.Password = null;
      return CreatedAtAction("GetUser", new { email = user.Email }, user);
    }

    // GET: api/Users/username
    [HttpGet("{email}")]
    public async Task<ActionResult<User>> GetUser(string email)
    {
      IdentityUser user = await _userManager.FindByEmailAsync(email);

      if (user == null)
      {
        return NotFound();
      }

      return new User
      {
        Email = user.Email
      };
    }

  }


}