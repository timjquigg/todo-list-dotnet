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
    public async Task<ActionResult<User>> PostUser(LoginUser request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      User user = new User() { UserName = request.Email, Email = request.Email };
      var result = await _userManager.CreateAsync(
        user, request.Password
      );

      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
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

    // PUT: api/Users/:email
    [HttpPut("{email}")]
    public async Task<IActionResult> UpdateUser(string email, UpdateUser request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest("Bad Credentials");
      }

      if (email != request.Email)
      {
        return BadRequest("Bad Credentials");
      }

      var user = await _userManager.FindByEmailAsync(email);

      if (user == null)
      {
        return BadRequest("Bad credentials");
      }

      var result = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);

      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
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

    // GET: api/Users/Refresh
    [HttpGet("Refresh")]
    public async Task<IActionResult> RefreshToken()
    {
      bool requestEmail = Request.Cookies.TryGetValue("X-Email", out var email);
      bool requestRefreshToken = Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken);

      if (!(requestEmail && requestRefreshToken))
      {
        List<string> errors = new List<string>();
        if (!requestEmail)
          errors.Add("No e-mail provided");
        if (!requestRefreshToken)
          errors.Add("No refresh token provided");
        return BadRequest(errors);
      }


      var user = _userManager.Users.FirstOrDefault(i => i.Email == email && i.RefreshToken == refreshToken && i.RefreshTokenExpiryTime > DateTime.UtcNow);

      if (user == null)
        return BadRequest("Invalid email or refresh token provided");

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