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
    private readonly IConfiguration _configuration;

    public UsersController(UserManager<User> userManager, JwtService jwtService, IConfiguration configuration)
    {
      _userManager = userManager;
      _jwtService = jwtService;
      _configuration = configuration;
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(LoginUser user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      User newUser = new User() { UserName = user.Email, Email = user.Email };
      var result = await _userManager.CreateAsync(
        newUser, user.Password
      );

      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      var token = _jwtService.CreateToken(newUser);

      return Ok(token);
    }

    // POST: api/Users/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResponse>> CreateBearerToken(LoginUser request)
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

      user.RefreshToken = token.RefreshToken;
      user.RefreshTokenExpiryTime = token.RefreshTokenExpiryTime;

      await _userManager.UpdateAsync(user);

      Response.Cookies.Append("X-Access-Token", token.AccessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
      Response.Cookies.Append("X-Email", user.Email, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
      Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

      return Ok(token);
    }

    // [HttpDelete("{email}")]
    // public async Task<IActionResult> DeleteUser(string email)
    // {
    //   var user = await _userManager.FindByEmailAsync(email);
    //   if (user == null)
    //   {
    //     return BadRequest("Invalid user");
    //   }
    //   await _userManager.DeleteAsync(user);

    //   return NoContent();
    // }

    [HttpGet("Refresh")]
    public async Task<IActionResult> RefreshToken()
    {
      if (!(Request.Cookies.TryGetValue("X-Email", out var email) && Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken)))
        return BadRequest();

      var user = _userManager.Users.FirstOrDefault(i => i.Email == email && i.RefreshToken == refreshToken && i.RefreshTokenExpiryTime > DateTime.UtcNow);

      if (user == null)
        return BadRequest();

      var token = _jwtService.CreateToken(user);

      user.RefreshToken = token.RefreshToken;
      user.RefreshTokenExpiryTime = token.RefreshTokenExpiryTime;

      await _userManager.UpdateAsync(user);

      Response.Cookies.Append("X-Access-Token", token.AccessToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
      Response.Cookies.Append("X-Email", user.Email, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
      Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

      return Ok(token);
    }

    [HttpPost("Revoke")]
    public async Task<IActionResult> Revoke()
    {
      if (!(Request.Cookies.TryGetValue("X-Email", out var email)))
        return BadRequest();

      var user = _userManager.Users.FirstOrDefault(i => i.Email == email);

      if (user == null)
        return BadRequest();

      user.RefreshToken = null;
      await _userManager.UpdateAsync(user);

      Response.Cookies.Delete("X-Access-Token");
      Response.Cookies.Delete("X-Email");
      Response.Cookies.Delete("X-Refresh-Token");
      return NoContent();
    }
  }


}