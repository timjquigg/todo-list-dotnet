using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace todo_dotnet_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TodoItemsController : ControllerBase
  {
    private MyDbContext db;
    private UserManager<User> manager;

    public TodoItemsController(MyDbContext context, UserManager<User> userManager)
    {
      db = context;
      manager = userManager;
    }

    // GET: api/TodoItems
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {

      string email = HttpContext.User.Claims.Single(p => p.Type.Contains("emailaddress")).Value;

      // var user = await _userManager.FindByEmailAsync(email);


      if (db.TodoItems == null)
      {
        return NotFound();
      }

      var userItems = db.TodoItems.Where(todo => todo.User.Email == email);

      return await db.TodoItems.ToListAsync();
    }

    // GET: api/TodoItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
      if (db.TodoItems == null)
      {
        return NotFound();
      }
      var todoItem = await db.TodoItems.FindAsync(id);

      if (todoItem == null)
      {
        return NotFound();
      }

      return todoItem;
    }

    // PUT: api/TodoItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<ActionResult<TodoItem>> PutTodoItem(long id, TodoItem todoItem)
    {
      if (id != todoItem.Id)
      {
        return BadRequest();
      }

      var todo = await db.TodoItems.FindAsync(id);

      if (todo == null)
      {
        return NotFound();
      }

      var entry = db.Entry(todo);

      todo.Description = todoItem.Description;

      if (todo.IsComplete == false && todoItem.IsComplete == true)
      {
        todo.DateCompleted = DateTime.UtcNow;
      }

      if (todoItem.IsComplete == false)
      {
        todo.DateCompleted = null;
      }

      todo.IsComplete = todoItem.IsComplete;
      db.Entry(todo).State = EntityState.Modified;

      try
      {
        await db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {

        throw;
      }

      return todo;
    }

    // POST: api/TodoItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
    {
      string email = HttpContext.User.Claims.Single(p => p.Type.Contains("emailaddress")).Value;
      Console.WriteLine(email);

      var user = await manager.FindByEmailAsync(email);
      Console.Write("User:");
      Console.WriteLine(user.Id);

      if (db.TodoItems == null)
      {
        return Problem("Entity set 'TodoContext.TodoItems'  is null.");
      }

      if (user == null)
      {
        return Problem("User does not exist");
      }

      todoItem.User = user;


      db.TodoItems.Add(todoItem);
      await db.SaveChangesAsync();
      todoItem.User = null;

      return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
      if (db.TodoItems == null)
      {
        return NotFound();
      }
      var todoItem = await db.TodoItems.FindAsync(id);
      if (todoItem == null)
      {
        return NotFound();
      }

      db.TodoItems.Remove(todoItem);
      await db.SaveChangesAsync();

      return NoContent();
    }

    private bool TodoItemExists(long id)
    {
      return (db.TodoItems?.Any(e => e.Id == id)).GetValueOrDefault();
    }
  }
}
