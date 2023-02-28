using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;

namespace todo_dotnet_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly JwtService _jwtService;

    public UsersController(UserManager<User> userManager, JwtService jwtService)
    {
      _userManager = userManager;
      _jwtService = jwtService;
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(LoginUser user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var result = await _userManager.CreateAsync(
        new User() { UserName = user.Email, Email = user.Email },
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
      User user = await _userManager.FindByEmailAsync(email);

      if (user == null)
      {
        return NotFound();
      }

      return new User
      {
        Email = user.Email
      };
    }

    // POST: api/Users/BearerToken
    [HttpPost("BearerToken")]
    public async Task<ActionResult<AuthenticaionResponse>> CreateBearerToken(AuthenticationRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest("Bad Credentials");
      }

      var user = await _userManager.FindByEmailAsync(request.Email);

      if (user == null)
      {
        return BadRequest("Bad credentials");
      }

      var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

      if (!isPasswordValid)
      {
        return BadRequest("Bad credentials");
      }

      var token = _jwtService.CreateToken(user);

      return Ok(token);
    }


  }


}